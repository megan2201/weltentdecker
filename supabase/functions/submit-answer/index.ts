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
    const questionId =
      typeof body.questionId === "string" ? body.questionId : "";
    const answer = typeof body.answer === "string" ? body.answer.trim() : "";
    const taskId = typeof body.taskId === "string" ? body.taskId : null;

    /*
     * Request validieren
     */
    if (!sessionId || !sessionToken || !questionId || !answer) {
      return jsonResponse(
        {
          error: "sessionId, sessionToken, questionId and answer are required",
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
     * Session Token hashen
     */
    const sessionTokenHash = await sha256(sessionToken);

    /*
     * Evaluation Session überprüfen
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
     * Neue Antwort speichern
     */
    const { data: savedAnswer, error: insertError } = await supabase
      .from("evaluation_answers")
      .insert({
        session_id: sessionId,
        task_id: taskId,
        question_id: questionId,
        answer,
      })
      .select("id, question_id, task_id, answer, created_at")
      .single();

    if (insertError) {
      console.error("Could not save answer:", insertError);

      return jsonResponse(
        {
          error: "Could not save answer",
          details: insertError.message,
        },
        500,
      );
    }

    /*
     * Erfolgreich gespeichert
     */
    return jsonResponse({
      success: true,
      answer: savedAnswer,
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