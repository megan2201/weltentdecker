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
   * CORS Preflight
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
    /*
     * Request Body lesen
     */
    const body = await req.json();

    const inputCode = typeof body.code === "string" ? body.code.trim() : "";

    if (!inputCode) {
      return jsonResponse(
        {
          error: "Evaluation code is required",
        },
        400,
      );
    }

    /*
     * Evaluation Code aus dem
     * Supabase Secret lesen.
     */
    const evaluationCode = Deno.env.get("EVALUATION_CODE");

    if (!evaluationCode) {
      console.error("EVALUATION_CODE secret is not configured.");

      return jsonResponse(
        {
          error: "Evaluation is not configured.",
        },
        500,
      );
    }

    /*
     * Code überprüfen
     */
    if (inputCode.toUpperCase() !== evaluationCode.trim().toUpperCase()) {
      return jsonResponse(
        {
          error: "Invalid evaluation code",
        },
        401,
      );
    }

    /*
     * Supabase Server Client.
     *
     * Dieser Key befindet sich NICHT
     * im React-Frontend.
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
     * Session-ID erzeugen
     */
    const sessionId = crypto.randomUUID();

    /*
     * Kryptographisch zufälliges
     * Session-Token erzeugen.
     *
     * 64 Hex-Zeichen
     */
    const randomBytes = new Uint8Array(32);

    crypto.getRandomValues(randomBytes);

    const sessionToken = Array.from(randomBytes)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    /*
     * Wir speichern NICHT das Token,
     * sondern nur dessen SHA-256 Hash.
     */
    const sessionTokenHash = await sha256(sessionToken);

    /*
     * Session in DB speichern
     */
    const { error } = await supabase.from("evaluation_sessions").insert({
      id: sessionId,
      session_token_hash: sessionTokenHash,
      current_task_id: null,
      status: "in_progress",
    });

    if (error) {
      console.error("Could not create evaluation session:", error);

      return jsonResponse(
        {
          error: "Could not create evaluation session",
        },
        500,
      );
    }

    /*
     * Nur diese Daten gehen zurück
     * an das React-Frontend.
     */
    return jsonResponse({
      sessionId,
      sessionToken,
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
