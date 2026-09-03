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
   * Nur POST
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
    const taskIndex = typeof body.taskIndex === "number" ? body.taskIndex : 0;

    /*
     * Request validieren
     */
    if (!sessionId || !sessionToken || !taskId || !Number.isInteger(taskIndex)) {
      return jsonResponse(
        {
          error: "sessionId, sessionToken, taskId and taskIndex are required",
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
     * Session überprüfen
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

    if (!session) {
      return jsonResponse(
        {
          error: "Session not found",
        },
        404,
      );
    }

    /*
     * Token überprüfen
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
     * Sessionstatus überprüfen
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
     * Prüfen, ob der Task bereits
     * gestartet wurde.
     */
    const { data: existingTask, error: existingTaskError } = await supabase
      .from("evaluation_task_sessions")
      .select("id, started_at, completed_at")
      .eq("session_id", sessionId)
      .eq("task_id", taskId)
      .maybeSingle();

    if (existingTaskError) {
      console.error("Could not check existing task:", existingTaskError);

      return jsonResponse(
        {
          error: "Could not check task",
        },
        500,
      );
    }

    /*
     * Task wurde bereits gestartet
     */
    if (existingTask) {
      return jsonResponse({
        success: true,
        taskSessionId: existingTask.id,
        startedAt: existingTask.started_at,
        alreadyStarted: true,
      });
    }

    /*
     * Task neu starten
     *
     * Der Zeitpunkt wird vom Server
     * gesetzt.
     */
    const { data: taskSession, error: taskError } = await supabase
      .from("evaluation_task_sessions")
      .insert({
        session_id: sessionId,
        task_id: taskId,
        task_index: taskIndex,
      })
      .select("id, started_at")
      .single();

    if (taskError) {
      console.error("Could not start task:", taskError);

      return jsonResponse(
        {
          error: "Could not start task",
          details: taskError.message,
        },
        500,
      );
    }

    /*
    * Session updaten
    */
    const { error: sessionUpdateError } = await supabase
      .from("evaluation_sessions")
      .update({
        current_task_id: taskId,
        current_task_index: taskIndex
      })
      .eq("id", sessionId);

    if (sessionUpdateError) {
      console.error("Could not update current task:", sessionUpdateError);

      return jsonResponse(
        {
          error: "Could not update current task",
        },
        500,
      );
    }

    /*
     * Erfolg
     */
    return jsonResponse({
      success: true,
      taskSessionId: taskSession.id,
      startedAt: taskSession.started_at,
      alreadyStarted: false,
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
