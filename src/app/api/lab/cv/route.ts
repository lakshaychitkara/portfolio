import { z } from "zod";
import { timedJson } from "@/lib/server/route-utils";

const cvSchema = z.object({
  clip: z.string().min(3),
  modelFamily: z.enum(["baseline", "multimodal"]),
});

const captionsByFamily = {
  baseline: [
    {
      model: "YOLO + DeepSORT",
      caption:
        "Detects subject movement and tracks torso alignment trends with moderate context awareness.",
      recall: 0.72,
      precision: 0.77,
    },
    {
      model: "OpenCV Classical Pipeline",
      caption:
        "Captures frame-level motion boundaries and posture transitions, but misses intent-level semantics.",
      recall: 0.65,
      precision: 0.81,
    },
  ],
  multimodal: [
    {
      model: "InternVideo2",
      caption:
        "Understands continuous ergonomic motion with temporal context and identifies risky posture windows.",
      recall: 0.88,
      precision: 0.86,
    },
    {
      model: "LanguageBind + X-CLIP",
      caption:
        "Links visual dynamics with textual intent cues, improving nuanced caption coverage in complex scenes.",
      recall: 0.91,
      precision: 0.84,
    },
  ],
} as const;

export async function POST(request: Request) {
  const startedAt = performance.now();
  try {
    const json = await request.json();
    const parsed = cvSchema.safeParse(json);

    if (!parsed.success) {
      console.warn("cv_validation_error", JSON.stringify({ issues: parsed.error.flatten() }));
      return timedJson(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid benchmark request.",
            details: parsed.error.flatten(),
          },
        },
        { status: 400, startedAt },
      );
    }

    const { clip, modelFamily } = parsed.data;
    console.info("cv_request_received", { modelFamily, clip });

    return timedJson(
      {
        clip,
        modelFamily,
        captions: captionsByFamily[modelFamily],
      },
      {
        status: 200,
        startedAt,
        cacheControl: "public, max-age=60, stale-while-revalidate=300",
      },
    );
  } catch (error) {
    console.error("cv_route_error", error);
    return timedJson(
      {
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "CV benchmark service failed.",
        },
      },
      { status: 500, startedAt },
    );
  }
}
