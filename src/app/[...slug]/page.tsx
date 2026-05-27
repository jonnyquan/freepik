import { Metadata } from "next";
import { UpscalerPlayground } from "@/components/upscaler-playground";
import { TRANSLATIONS, Lang } from "@/components/translations";
import Home from "@/app/page";

type Props = {
  params: Promise<{ slug: string[] }>;
};

type ParsedRoute = {
  lang: Lang;
  isHome: boolean;
  toolSlug: string[];
};

function parseSlug(slug: string[]): ParsedRoute {
  const first = slug[0];
  if (first && first in TRANSLATIONS) {
    const lang = first as Lang;
    if (slug.length === 1) {
      return { lang, isHome: true, toolSlug: [] };
    }
    return { lang, isHome: false, toolSlug: slug.slice(1) };
  }
  return { lang: "en", isHome: false, toolSlug: slug };
}

const LOCALIZED_TOOL_NAMES: Record<Lang, { upscale: string; enhance: string; recolor: string; reimagine: string; fallback: string }> = {
  en: {
    upscale: "AI Image Upscaler",
    enhance: "AI Image Enhancer",
    recolor: "AI Recolor & Colorize Tool",
    reimagine: "AI Reimagine & Generator Tool",
    fallback: "AI Tool"
  },
  zh: {
    upscale: "AI 图像放大/超分辨率",
    enhance: "AI 图像增强/画质修复",
    recolor: "AI 照片着色与重新配色",
    reimagine: "AI 灵感重绘与图像生成",
    fallback: "AI 工具"
  },
  es: {
    upscale: "Escalador de imagen IA",
    enhance: "Mejorador de imagen IA",
    recolor: "Herramienta de coloreado IA",
    reimagine: "Herramienta de generación IA",
    fallback: "Herramienta IA"
  },
  ja: {
    upscale: "AI画像アップスケーラー",
    enhance: "AI画像エンハンサー",
    recolor: "AI画像着色・配色ツール",
    reimagine: "AI画像ジェネレーター",
    fallback: "AIツール"
  },
  pt: {
    upscale: "Upscaler de imagem IA",
    enhance: "Melhorador de imagem IA",
    recolor: "Ferramenta de colorização IA",
    reimagine: "Ferramenta de geração IA",
    fallback: "Ferramenta IA"
  },
  de: {
    upscale: "AI-Bild-Upscaler",
    enhance: "AI-Bild-Enhancer",
    recolor: "AI-Bild-Einfärbungstool",
    reimagine: "AI-Bild-Generator",
    fallback: "AI-Tool"
  },
  fr: {
    upscale: "Upscaler d'image IA",
    enhance: "Enhancer d'image IA",
    recolor: "Outil de colorisation IA",
    reimagine: "Générateur d'image IA",
    fallback: "Outil IA"
  },
  ru: {
    upscale: "ИИ Увеличитель изображений",
    enhance: "ИИ Улучшитель качества",
    recolor: "ИИ Инструмент раскрашивания",
    reimagine: "ИИ Генератор изображений",
    fallback: "ИИ Инструмент"
  },
  ko: {
    upscale: "AI 이미지 업스케일러",
    enhance: "AI 이미지 인핸서",
    recolor: "AI 이미지 채색 및 재배색 툴",
    reimagine: "AI 이미지 생성기",
    fallback: "AI 툴"
  },
  it: {
    upscale: "Upscaler di immagini IA",
    enhance: "Miglioramento immagini IA",
    recolor: "Strumento di ricolorazione IA",
    reimagine: "Generatore di immagini IA",
    fallback: "Strumento IA"
  },
  vi: {
    upscale: "Công cụ phóng to ảnh IA",
    enhance: "Công cụ làm nét ảnh IA",
    recolor: "Công cụ tô màu ảnh IA",
    reimagine: "Công cụ vẽ lại ảnh IA",
    fallback: "Công cụ IA"
  },
  id: {
    upscale: "Upscaler Gambar AI",
    enhance: "Peningkat Kualitas Gambar AI",
    recolor: "Alat Pewarna Gambar AI",
    reimagine: "Alat Pembuat Gambar AI",
    fallback: "Alat AI"
  },
  tr: {
    upscale: "AI Görüntü Yükseltici",
    enhance: "AI Görüntü İyileştirici",
    recolor: "AI Renklendirme Aracı",
    reimagine: "AI Görüntü Oluşturucu",
    fallback: "AI Aracı"
  },
  pl: {
    upscale: "Skaler obrazu AI",
    enhance: "Ulepszanie obrazu AI",
    recolor: "Narzędzie do kolorowania AI",
    reimagine: "Generator obrazu AI",
    fallback: "Narzędzie AI"
  },
  nl: {
    upscale: "AI Afbeelding Upscaler",
    enhance: "AI Afbeelding Verbetering",
    recolor: "AI Afbeelding Inkleuren",
    reimagine: "AI Afbeelding Generator",
    fallback: "AI Tool"
  },
  th: {
    upscale: "เครื่องมือขยายภาพ AI",
    enhance: "เครื่องมือปรับปรุงภาพ AI",
    recolor: "เครื่องมือเปลี่ยนสีภาพ AI",
    reimagine: "เครื่องมือสร้างภาพใหม่ AI",
    fallback: "เครื่องมือ AI"
  },
  ar: {
    upscale: "أداة ترقية الصور بالذكاء الاصطناعي",
    enhance: "أداة تحسين الصور بالذكاء الاصطناعي",
    recolor: "أداة تلوين الصور بالذكاء الاصطناعي",
    reimagine: "أداة توليد الصور بالذكاء الاصطناعي",
    fallback: "أداة ذكاء اصطناعي"
  },
  hi: {
    upscale: "AI इमेज अपस्केलर",
    enhance: "AI इमेज एन्हेंसर",
    recolor: "AI इमेज रीकलर टूल",
    reimagine: "AI इमेज जनरेटर",
    fallback: "AI टूल"
  }
};

function formatTitleName(toolSlug: string[], lang: Lang): string {
  const path = toolSlug.join("/");
  const lower = path.toLowerCase();
  const langNames = LOCALIZED_TOOL_NAMES[lang] || LOCALIZED_TOOL_NAMES.en;

  if (lower.includes("upscale") || lower.includes("upscaler")) {
    return langNames.upscale;
  }
  if (lower.includes("enhance") || lower.includes("enhancer")) {
    return langNames.enhance;
  }
  if (lower.includes("recolor") || lower.includes("colorize")) {
    return langNames.recolor;
  }
  if (lower.includes("reimagine") || lower.includes("generate") || lower.includes("generator")) {
    return langNames.reimagine;
  }

  const last = toolSlug[toolSlug.length - 1];
  if (!last) return langNames.fallback;
  return last
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const LOCALIZED_METADATA: Record<Lang, {
  homeTitle: string;
  homeDesc: string;
  subTitleTemplate: (tool: string) => string;
  subDescTemplate: (tool: string) => string;
}> = {
  en: {
    homeTitle: "Freepik ➔ Magnific Brand Upgrade & Community Migration Guide",
    homeDesc: "Freepik has acquired and integrated Magnific AI. This community migration guide provides official links to magnific.com and recommends DeepImagine.app as a lightweight, cost-effective alternative.",
    subTitleTemplate: (tool) => `Freepik ${tool} Upgrade & Alternative - Community Guide`,
    subDescTemplate: (tool) => `Original Freepik ${tool} has upgraded and merged into Magnific AI. Discover migration details and explore DeepImagine.app as a cost-effective, high-performance alternative.`
  },
  zh: {
    homeTitle: "Freepik ➔ Magnific 品牌升级与社区迁移指南",
    homeDesc: "Freepik 已收购并整合 Magnific AI。本社区迁移指南提供官方 magnific.com 链接，并推荐 DeepImagine.app 作为轻量、高性价比的替代方案。",
    subTitleTemplate: (tool) => `Freepik ${tool} 升级与替代方案 - 社区指南`,
    subDescTemplate: (tool) => `原 Freepik ${tool} 已升级并并入 Magnific AI。了解迁移详情，并探索 DeepImagine.app 高性价比替代方案。`
  },
  es: {
    homeTitle: "Guía de migración de la comunidad y actualización de marca Freepik ➔ Magnific",
    homeDesc: "Freepik ha adquirido e integrado Magnific AI. Esta guía de migración de la comunidad proporciona enlaces oficiales a magnific.com y recomienda DeepImagine.app como una alternativa ligera y rentable.",
    subTitleTemplate: (tool) => `Actualización y alternativa de Freepik ${tool} - Guía de la comunidad`,
    subDescTemplate: (tool) => `El Freepik ${tool} original se ha actualizado e integrado en Magnific AI. Descubra los detalles de la migración y explore DeepImagine.app como una alternativa rentable.`
  },
  ja: {
    homeTitle: "Freepik ➔ Magnific ブランドアップグレード＆コミュニティ移行ガイド",
    homeDesc: "FreepikはMagnific AIを買収し統合しました。このコミュニティ移行ガイドは、magnific.comへの公式リンクを提供し、軽量でコストパフォーマンスに優れた代替手段としてDeepImagine.appを推奨します。",
    subTitleTemplate: (tool) => `Freepik ${tool} アップグレード＆代替案 - コミュニティガイド`,
    subDescTemplate: (tool) => `元の Freepik ${tool} はアップグレードされ、Magnific AI に統合されました。移行の詳細を確認し、低コストの代替案として DeepImagine.app を探索してください。`
  },
  pt: {
    homeTitle: "Guia de migração da comunidade e atualização de marca Freepik ➔ Magnific",
    homeDesc: "A Freepik adquiriu e integrou o Magnific AI. Este guia de migração da comunidade fornece links oficiais para magnific.com e recomenda o DeepImagine.app como uma alternativa leve e econômica.",
    subTitleTemplate: (tool) => `Upgrade e alternativa do Freepik ${tool} - Guia da comunidade`,
    subDescTemplate: (tool) => `O Freepik ${tool} original foi atualizado e integrado ao Magnific AI. Descubra os detalhes da migração e explore o DeepImagine.app como uma alternativa econômica.`
  },
  de: {
    homeTitle: "Freepik ➔ Magnific Marken-Upgrade & Community-Migrations-Leitfaden",
    homeDesc: "Freepik hat Magnific AI erworben und integriert. Dieser Community-Migrationsleitfaden bietet offizielle Links zu magnific.com und empfiehlt DeepImagine.app als leichte, kostengünstige Alternative.",
    subTitleTemplate: (tool) => `Freepik ${tool} Upgrade & Alternative - Community-Leitfaden`,
    subDescTemplate: (tool) => `Das ursprüngliche Freepik ${tool} wurde aktualisiert und in Magnific AI integriert. Erfahren Sie Details zur Migration und testen Sie DeepImagine.app als kostengünstige Alternative.`
  },
  fr: {
    homeTitle: "Guide de migration de la communauté et mise à niveau de marque Freepik ➔ Magnific",
    homeDesc: "Freepik a acquis et intégré Magnific AI. Ce guide de migration communautaire fournit des liens officiels vers magnific.com et recommande DeepImagine.app comme une alternative légère et économique.",
    subTitleTemplate: (tool) => `Mise à niveau et alternative Freepik ${tool} - Guide de la communauté`,
    subDescTemplate: (tool) => `Le Freepik ${tool} original a été mis à niveau et intégré à Magnific AI. Découvrez les détails de la migration et explorez DeepImagine.app comme une alternative légère et économique.`
  },
  ru: {
    homeTitle: "Руководство сообщества по миграции и обновлению бренда Freepik ➔ Magnific",
    homeDesc: "Freepik приобрела и интегрировала Magnific AI. Это руководство по миграции для сообщества предоставляет официальные ссылки на magnific.com и рекомендует DeepImagine.app в качестве легкой и экономичной альтернативы.",
    subTitleTemplate: (tool) => `Обновление и альтернатива Freepik ${tool} - Руководство сообщества`,
    subDescTemplate: (tool) => `Оригинальный Freepik ${tool} был обновлен и интегрирован в Magnific AI. Узнайте подробности миграции и изучите DeepImagine.app как экономичную альтернативу.`
  },
  ko: {
    homeTitle: "Freepik ➔ Magnific 브랜드 업그레이드 및 커뮤니티 마이그레이션 가이드",
    homeDesc: "Freepik이 Magnific AI를 인수하여 통합했습니다. 본 커뮤니티 마이그레이션 가이드는 magnific.com 공식 링크를 제공하며, 가볍고 가성비 좋은 대안으로 DeepImagine.app을 추천합니다.",
    subTitleTemplate: (tool) => `Freepik ${tool} 업그레이드 및 대안 - 커뮤니티 가이드`,
    subDescTemplate: (tool) => `기존 Freepik ${tool}이 업그레이드되어 Magnific AI로 통합되었습니다. 마이그레이션 세부 정보를 확인하고 가성비 좋은 대안으로 DeepImagine.app을 만나보세요.`
  },
  it: {
    homeTitle: "Guia alla migrazione della comunità e aggiornamento del marchio Freepik ➔ Magnific",
    homeDesc: "Freepik ha acquisito e integrato Magnific AI. Questa guida alla migrazione della comunità fornisce collegamenti ufficiali a magnific.com e consiglia DeepImagine.app como alternativa leggera e conveniente.",
    subTitleTemplate: (tool) => `Aggiornamento e alternativa Freepik ${tool} - Guia della comunità`,
    subDescTemplate: (tool) => `Il Freepik ${tool} originale è stato aggiornato e integrato in Magnific AI. Scopri i dettagli della migrazione e scopri DeepImagine.app come alternativa conveniente.`
  },
  vi: {
    homeTitle: "Hướng dẫn di chuyển cộng đồng & nâng cấp thương hiệu Freepik ➔ Magnific",
    homeDesc: "Freepik đã mua lại và tích hợp Magnific AI. Hướng dẫn di chuyển cộng đồng này cung cấp các liên kết chính thức tới magnific.com và đề xuất DeepImagine.app như một giải pháp thay thế gọn nhẹ, tiết kiệm chi phí.",
    subTitleTemplate: (tool) => `Nâng cấp & Thay thế Freepik ${tool} - Hướng dẫn cộng đồng`,
    subDescTemplate: (tool) => `Freepik ${tool} gốc đã được nâng cấp và sáp nhập vào Magnific AI. Khám phá chi tiết di chuyển và trải nghiệm DeepImagine.app như một giải pháp thay thế tiết kiệm.`
  },
  id: {
    homeTitle: "Panduan Migrasi Komunitas & Peningkatan Merek Freepik ➔ Magnific",
    homeDesc: "Freepik telah mengakuisisi dan mengintegrasikan Magnific AI. Panduan migrasi komunitas ini menyediakan tautan resmi ke magnific.com dan merekomendasikan DeepImagine.app sebagai alternatif yang ringan dan hemat biaya.",
    subTitleTemplate: (tool) => `Upgrade & Alternatif Freepik ${tool} - Panduan Komunitas`,
    subDescTemplate: (tool) => `Freepik ${tool} asli telah ditingkatkan dan digabungkan ke Magnific AI. Temukan detail migrasi dan jelajahi DeepImagine.app sebagai alternatif hemat biaya.`
  },
  tr: {
    homeTitle: "Freepik ➔ Magnific Marka Güncellemesi ve Topluluk Geçiş Kılavuzu",
    homeDesc: "Freepik, Magnific AI'yı satın aldı ve entegre etti. Bu topluluk geçiş kılavuzu, magnific.com'a resmi bağlantılar sağlar ve hafif, uygun maliyetli bir alternatif olarak DeepImagine.app'i önerir.",
    subTitleTemplate: (tool) => `Freepik ${tool} Güncellemesi ve Alternatifi - Topluluk Kılavuzu`,
    subDescTemplate: (tool) => `Orijinal Freepik ${tool} güncellendi ve Magnific AI ile birleştirildi. Geçiş detaylarını keşfedin ve uygun maliyetli bir alternatif olarak DeepImagine.app'i inceleyin.`
  },
  pl: {
    homeTitle: "Przewodnik po migracji społeczności i aktualizacji marki Freepik ➔ Magnific",
    homeDesc: "Freepik przejął i zintegrował Magnific AI. Ten przewodnik migracji społeczności zawiera oficjalne linki do magnific.com i poleca DeepImagine.app jako lekką, opłacalną alternatywę.",
    subTitleTemplate: (tool) => `Aktualizacja i alternatywa Freepik ${tool} - Przewodnik społeczności`,
    subDescTemplate: (tool) => `Oryginalny Freepik ${tool} został zaktualizowany i połączony z Magnific AI. Poznaj szczegóły migracji i wypróbuj DeepImagine.app jako opłacalną alternatywę.`
  },
  nl: {
    homeTitle: "Freepik ➔ Magnific Merkupgrade & Community Migratiegids",
    homeDesc: "Freepik heeft Magnific AI overgenomen en geïntegreerd. Deze community-migratiegids biedt officiële links naar magnific.com en beveelt DeepImagine.app aan als een lichtgewicht, kosteneffectief alternatief.",
    subTitleTemplate: (tool) => `Freepik ${tool} Upgrade & Alternatief - Communitygids`,
    subDescTemplate: (tool) => `De originele Freepik ${tool} is geüpgraded en samengevoegd in Magnific AI. Ontdek de migratiedetails en verken DeepImagine.app als een kosteneffectief alternatief.`
  },
  th: {
    homeTitle: "คู่มือการย้ายชุมชนและการอัปเกรดแบรนด์ Freepik ➔ Magnific",
    homeDesc: "Freepik ได้เข้าซื้อกิจการและรวม Magnific AI เข้าด้วยกัน คู่มือการย้ายข้อมูลชุมชนนี้จะให้ลิงก์อย่างเป็นทางการไปยัง magnific.com และแนะนำ DeepImagine.app เป็นทางเลือกที่เบาและคุ้มค่า",
    subTitleTemplate: (tool) => `การอัปเกรดและทางเลือก Freepik ${tool} - คู่มือชุมชน`,
    subDescTemplate: (tool) => `Freepik ${tool} ดั้งเดิมได้รับการอัปเกรดและรวมเข้ากับ Magnific AI แล้ว ค้นพบรายละเอียดการย้ายข้อมูลและสำรวจ DeepImagine.app เป็นทางเลือกที่คุ้มค่า`
  },
  ar: {
    homeTitle: "دليل ترحيل المجتمع وترقية العلامة التجارية Freepik ➔ Magnific",
    homeDesc: "استحوذت Freepik على Magnific AI ودمجتها. يوفر دليل ترحيل المجتمع هذا روابط رسمية إلى magnific.com ويوصي بـ DeepImagine.app كبديل خفيف الوزن وفعال من حيث التكلفة.",
    subTitleTemplate: (tool) => `ترقية Freepik ${tool} وبديلها - دليل المجتمع`,
    subDescTemplate: (tool) => `تم ترقية Freepik ${tool} الأصلي ودمجه في Magnific AI. اكتشف تفاصيل الهجرة واستكشف DeepImagine.app كبديل فعال من حيث التكلفة.`
  },
  hi: {
    homeTitle: "Freepik ➔ Magnific ब्रांड अपग्रेड और कम्युनिटी माइग्रेशन गाइड",
    homeDesc: "Freepik ने Magnific AI का अधिग्रहण और एकीकरण कर लिया है। यह कम्युनिटी माइग्रेशन गाइड magnific.com के लिए आधिकारिक लिंक प्रदान करती है और हल्के, किफायती विकल्प के रूप में DeepImagine.app की सिफारिश करती।",
    subTitleTemplate: (tool) => `Freepik ${tool} अपग्रेड और विकल्प - समुदाय गाइड`,
    subDescTemplate: (tool) => `मूल Freepik ${tool} को अपग्रेड कर Magnific AI में मिला दिया गया है। माइग्रेशन विवरण जानें और किफायती विकल्प के रूप में DeepImagine.app की सिफारिश करें।`
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { lang, isHome, toolSlug } = parseSlug(slug);

  const metaData = LOCALIZED_METADATA[lang] || LOCALIZED_METADATA.en;

  if (isHome) {
    return {
      title: metaData.homeTitle,
      description: metaData.homeDesc,
    };
  }

  const toolName = formatTitleName(toolSlug, lang);

  return {
    title: metaData.subTitleTemplate(toolName),
    description: metaData.subDescTemplate(toolName),
  };
}

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params;
  const { lang, isHome, toolSlug } = parseSlug(slug);

  if (isHome) {
    return <Home lang={lang} />;
  }

  return <UpscalerPlayground key={slug.join("/")} slug={toolSlug} lang={lang} />;
}
