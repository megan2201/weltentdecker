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

    /*
     * Request validieren
     */
    if (!sessionId || !sessionToken) {
      return jsonResponse(
        {
          error: "sessionId and sessionToken are required",
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
     * Evaluation Session laden
     */
    const { data: session, error: sessionError } = await supabase
      .from("evaluation_sessions")
      .select("id, session_token_hash, status, completed_at")
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
     * Falls Evaluation bereits
     * abgeschlossen wurde
     */
    if (session.status === "completed") {
      return jsonResponse({
        success: true,
        alreadyCompleted: true,
        completedAt: session.completed_at,
      });
    }

    /*
     * Nur aktive Evaluationen
     * können abgeschlossen werden.
     */
    if (session.status !== "in_progress") {
      return jsonResponse(
        {
          error: "Evaluation session cannot be completed",
        },
        409,
      );
    }

    /*
     * Serverzeit verwenden
     */
    const completedAt = new Date().toISOString();

    /*
     * Evaluation abschließen
     */
    const { data: updatedSession, error: updateError } = await supabase
      .from("evaluation_sessions")
      .update({
        status: "completed",
        completed_at: completedAt,
      })
      .eq("id", sessionId)
      .eq("status", "in_progress")
      .select("id, status, completed_at")
      .single();

    if (updateError) {
      console.error("Could not finish evaluation:", updateError);

      return jsonResponse(
        {
          error: "Could not finish evaluation",
          details: updateError.message,
        },
        500,
      );
    }

    /*
     * Erfolg
     */
    return jsonResponse({
      success: true,
      alreadyCompleted: false,
      session: updatedSession,
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