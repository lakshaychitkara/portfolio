import { z } from "zod";
import { profile } from "@/lib/content/profile";
import { timedJson } from "@/lib/server/route-utils";

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(12).max(3000),
});

function buildFallbackMailto(data: z.infer<typeof contactSchema>) {
  const subject = encodeURIComponent(`Portfolio inquiry from ${data.name}`);
  const body = encodeURIComponent(`${data.message}\n\nReply to: ${data.email}`);
  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
}

async function deliverToWebhook(data: z.infer<typeof contactSchema>) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return false;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        source: "lakshay-portfolio",
        receivedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
    });

    return response.ok;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  const startedAt = performance.now();
  try {
    const json = await request.json();
    const parsed = contactSchema.safeParse(json);

    if (!parsed.success) {
      console.warn(
        "contact_validation_error",
        JSON.stringify({ issues: parsed.error.flatten() }),
      );
      return timedJson(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid input. Name, email, and message are required.",
            details: parsed.error.flatten(),
          },
        },
        { status: 400, startedAt },
      );
    }

    const delivered = await deliverToWebhook(parsed.data).catch((error) => {
      console.error("contact_webhook_error", error);
      return false;
    });
    const fallbackMailtoHref = buildFallbackMailto(parsed.data);

    console.info("contact_message_processed", {
      delivered,
      nameLength: parsed.data.name.length,
      messageLength: parsed.data.message.length,
    });

    return timedJson(
      {
        ok: true,
        delivered,
        fallbackMailtoHref: delivered ? undefined : fallbackMailtoHref,
        message: delivered
          ? "Thanks for reaching out. Your message was delivered successfully."
          : "Thanks for reaching out. Direct delivery is not configured here, so please use the email fallback.",
      },
      { status: 200, startedAt, cacheControl: "no-store" },
    );
  } catch (error) {
    console.error("contact_route_error", error);
    return timedJson(
      {
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to process request.",
        },
      },
      { status: 500, startedAt },
    );
  }
}
