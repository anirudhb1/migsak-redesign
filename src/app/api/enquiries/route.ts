import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { validateEnquiry } from "@/lib/validation";

// Maximum allowable request body size: 20KB
const MAX_BODY_BYTES = 20 * 1024;

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request.headers);

    // 1. IP Rate Limiting (5 requests per 10 minutes)
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error:
            "Too many enquiries submitted from this network. Please wait a few minutes before trying again or email us directly at contact@migsak.com.",
        },
        { status: 429 }
      );
    }

    // 2. Reject request bodies exceeding 20KB
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Payload exceeds allowable size limit (max 20KB)." },
        { status: 413 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    // 3. Honeypot check: silently drop bot submissions without alerting the bot
    if (body.honeypot && typeof body.honeypot === "string" && body.honeypot.trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Thank you for reaching out." },
        { status: 200 }
      );
    }

    // 4. Server-side validation using the shared validator
    const validation = validateEnquiry(body);
    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        {
          error: "Validation failed",
          errors: validation.errors,
          suggestion: validation.emailSuggestion,
        },
        { status: 400 }
      );
    }

    const { name, email, country, phone, service, budget, message } = validation.data;

    // 5. Database Persistence with Supabase Postgres
    if (isSupabaseConfigured()) {
      const { error: dbError } = await supabaseAdmin.from("enquiries").insert([
        {
          name,
          email,
          country,
          phone,
          service,
          budget,
          message,
        },
      ]);

      if (dbError) {
        console.error("Supabase insert error:", dbError.message);
        return NextResponse.json(
          {
            error:
              "Unable to record your enquiry right now. Please email us directly at contact@migsak.com.",
          },
          { status: 500 }
        );
      }
    } else {
      console.warn("Supabase not configured. In-memory dev log:", {
        name,
        email,
        country,
        phone,
        service,
        budget,
        message,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! We have received your project details and will reply within one working day.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unexpected enquiry handler error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again or email contact@migsak.com." },
      { status: 500 }
    );
  }
}
