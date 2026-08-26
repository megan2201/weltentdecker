import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

async function sha256(value: string) {
  const data = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req) => {
  /*
   * CORS
   */
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  /*
   * Nur POST erlauben
   */
  if (req.method !== "POST") {
    return jsonResponse(
      {
        error: "Method not allowed",
      },
      405,
    );
  }

  try {
    const body = await req.json();
    const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
    const sessionToken =
      typeof body.sessionToken === "string" ? body.sessionToken : "";
    const taskId = typeof body.taskId === "string" ? body.taskId : "";

    /*
     * Request validieren
     */
    if (!sessionId || !sessionToken || !taskId) {
      return jsonResponse(
        {
          error: "sessionId, sessionToken and taskId are required",
        },
        400,
      );
    }

    /*
     * Supabase Server Client
     */
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );

    /*
     * Token hashen
     */
    const sessionTokenHash = await sha256(sessionToken);

    /*
     * Evaluation Session laden
     */
    const { data: session, error: sessionError } = await supabase
      .from("evaluation_sessions")
      .select("id, session_token_hash, status")
      .eq("id", sessionId)
      .maybeSingle();

    if (sessionError) {
      console.error("Could not find session:", sessionError);

      return jsonResponse(
        {
          error: "Could not validate session",
        },
        500,
      );
    }

    /*
     * Session existiert nicht
     */
    if (!session) {
      return jsonResponse(
        {
          error: "Session not found",
        },
        404,
      );
    }

    /*
     * Session Token überprüfen
     */
    if (session.session_token_hash !== sessionTokenHash) {
      return jsonResponse(
        {
          error: "Invalid session",
        },
        401,
      );
    }

    /*
     * Session muss aktiv sein
     */
    if (session.status !== "in_progress") {
      return jsonResponse(
        {
          error: "Evaluation session is not active",
        },
        409,
      );
    }

    /*
     * Task Session laden
     */
    const { data: taskSession, error: taskSessionError } = await supabase
      .from("evaluation_task_sessions")
      .select("id, task_id, started_at, completed_at, duration_seconds")
      .eq("session_id", sessionId)
      .eq("task_id", taskId)
      .maybeSingle();

    if (taskSessionError) {
      console.error("Could not find task session:", taskSessionError);

      return jsonResponse(
        {
          error: "Could not find task session",
        },
        500,
      );
    }

    /*
     * Task wurde noch nicht gestartet
     */
    if (!taskSession) {
      return jsonResponse(
        {
          error: "Task has not been started",
        },
        409,
      );
    }

    /*
     * Task wurde bereits abgeschlossen
     */
    if (taskSession.completed_at) {
      return jsonResponse({
        success: true,
        alreadyCompleted: true,
        taskSessionId: taskSession.id,
        startedAt: taskSession.started_at,
        completedAt: taskSession.completed_at,
        durationSeconds: taskSession.duration_seconds,
      });
    }

    /*
     * Server-Zeitpunkt des Abschlusses
     */
    const completedAt = new Date();

    /*
     * Startzeit aus der DB
     */
    const startedAt = new Date(taskSession.started_at);

    /*
     * Dauer berechnen
     */
    const durationSeconds = Math.max(
      0,
      Math.round((completedAt.getTime() - startedAt.getTime()) / 1000),
    );

    /*
     * Task abschließen
     */
    const { data: updatedTask, error: updateError } = await supabase
      .from("evaluation_task_sessions")
      .update({
        completed_at: completedAt.toISOString(),
        duration_seconds: durationSeconds,
      })
      .eq("id", taskSession.id)
      .select("id, task_id, started_at, completed_at, duration_seconds")
      .single();

    if (updateError) {
      console.error("Could not complete task:", updateError);

      return jsonResponse(
        {
          error: "Could not complete task",
          details: updateError.message,
        },
        500,
      );
    }

    /*
     * Erfolgreich abgeschlossen
     */
    return jsonResponse({
      success: true,
      alreadyCompleted: false,
      taskSessionId: updatedTask.id,
      taskId: updatedTask.task_id,
      startedAt: updatedTask.started_at,
      completedAt: updatedTask.completed_at,
      durationSeconds: updatedTask.duration_seconds,
    });
  } catch (error) {
    console.error("Unexpected error:", error);

    return jsonResponse(
      {
        error: "Invalid request",
      },
      400,
    );
  }
});