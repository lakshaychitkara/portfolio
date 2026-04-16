import { z } from "zod";
import { timedJson } from "@/lib/server/route-utils";

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(12).max(3000),
});

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

    console.info(
      "contact_message_received",
      JSON.stringify({
        nameLength: parsed.data.name.length,
        messageLength: parsed.data.message.length,
      }),
    );

    return timedJson(
      {
        ok: true,
        message:
          "Thanks for reaching out. This portfolio demo captured your message payload successfully.",
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
