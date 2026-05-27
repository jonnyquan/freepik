import { Metadata } from "next";
import { UpscalerPlayground } from "@/components/upscaler-playground";

type Props = {
  params: Promise<{ slug: string[] }>;
};

function formatTitleName(slug: string[]): string {
  const path = slug.join("/");
  const lower = path.toLowerCase();
  if (lower.includes("upscale") || lower.includes("upscaler")) {
    return "AI Image Upscaler";
  }
  if (lower.includes("enhance") || lower.includes("enhancer")) {
    return "AI Image Enhancer";
  }
  if (lower.includes("recolor") || lower.includes("colorize")) {
    return "AI Recolor & Colorize Tool";
  }
  if (lower.includes("reimagine") || lower.includes("generate") || lower.includes("generator")) {
    return "AI Reimagine & Generator Tool";
  }
  
  const last = slug[slug.length - 1] || "AI Tool";
  return last
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const toolName = formatTitleName(slug);

  return {
    title: `Freepik ${toolName} Upgrade & Alternative - Community Guide`,
    description: `Original Freepik ${toolName} has upgraded and merged into Magnific AI. Discover migration details and explore DeepImagine.app as a cost-effective, high-performance alternative.`,
  };
}

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params;
  return <UpscalerPlayground slug={slug} />;
}
