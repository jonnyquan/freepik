"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

type UpscalerPlaygroundProps = {
  slug: string[];
};

type TableRow = {
  feature: string;
  freepik: string;
  magnific: string;
  deepimagine: string;
};

type ToolConfig = {
  type: string;
  nameZh: string;
  nameEn: string;
  tagline: string;
  filterBefore: string;
  filterAfter: string;
  labelBefore: string;
  labelAfter: string;
  defaultPresetId: string;
  introZh: string;
  faqs: { q: string; a: string }[];
  tableRows: TableRow[];
};

const PRESETS = [
  { id: "portrait", name: "👩 Portrait (人像)", url: "/demo-portrait.png" },
  { id: "cyberpunk", name: "🌃 Cyberpunk (赛博城市)", url: "/demo-cyberpunk.png" },
  { id: "anime", name: "🎨 Anime (动漫)", url: "/demo-anime.png" },
  { id: "historical", name: "📜 Vintage (历史街区)", url: "/demo-historical.png" },
];

const TOOL_CONFIGS: Record<string, ToolConfig> = {
  upscaler: {
    type: "upscaler",
    nameZh: "高清无损放大",
    nameEn: "AI Image Upscaler",
    tagline: "Make your images crisp, detailed, and 4K ready with native AI detail injection.",
    filterBefore: "blur(4.5px) saturate(0.95) contrast(0.95)",
    filterAfter: "none",
    labelBefore: "Before (Original Low-Res)",
    labelAfter: "After (DeepImagine 4X)",
    defaultPresetId: "portrait",
    introZh: "原 Freepik AI Image Upscaler 已经升级并合并入更专业的 Magnific AI 平台。原有的主站简易放大功能已被下线，取而代之的是 Magnific 高级细节重构。虽然新引擎画质极佳，但订阅门槛高。如果您需要轻量、高性价比的独立放大工具，推荐体验 DeepImagine。",
    tableRows: [
      { feature: "放大倍率 & 分辨率", freepik: "仅支持 2x 简单拉伸，细节模糊", magnific: "支持 2x 到 10x 放大，支持超高分辨率", deepimagine: "提供 2x/4x lossless 放大，满足 4K 需求" },
      { feature: "细节生成与脑补", freepik: "无，单纯像素插值，有涂抹感", magnific: "行业顶尖，智能补充微观材质与纹理", deepimagine: "搭载最新原生推理引擎，自然填充纹理" },
      { feature: "处理速度", freepik: "极快 (1-3秒)", magnific: "较慢 (通常 15-40 秒)", deepimagine: "极速原生推理 (5-10 秒)" },
      { feature: "操作参数与难度", freepik: "一键处理，零参数", magnific: "参数极多 (HDR, Creativity 等)，门槛高", deepimagine: "精简参数，一键式轻量化控制" },
      { feature: "价格与额度门槛", freepik: "主站会员包含 (已下线)", magnific: "极高 ($39 - $299/月)", deepimagine: "高性价比，注册即赠免费额度" }
    ],
    faqs: [
      { q: "原 Freepik AI 放大功能去哪了？", a: "该功能已全面升级并合并入 Magnific AI。原有的主站免费/简易放大版已被停用，如果需要体验高保真超分辨率，可访问 Magnific 官网或选择 DeepImagine 替代。" },
      { q: "Magnific AI 放大和普通双三次插值放大有什么区别？", a: "传统放大只是单纯拉伸像素并平滑模糊边缘；而 Magnific 和 DeepImagine 的 AI 放大使用生成式对抗网络（GAN）和扩散模型，能够智能“脑补”出原本不存在的细节，如皮肤毛孔、布料纹理、发丝等，实现真正的高清。" },
      { q: "升级后的价格与账户体系是怎样的？", a: "虽然 Magnific 被 Freepik 收购，但目前两者的账号并不互通，Magnific 采用独立的专业级收费标准（每月 $39 - $299 ）。如果您在寻找支持免费试用、价格更亲民的工具，DeepImagine.app 是极佳的替代选择。" },
      { q: "如何获得最佳的放大细节？", a: "上传时可以输入微弱的提示词（Prompt）辅助引导，例如“8k resolution, extreme details, skin pores”，并合理调节“Creativity（创造力）”参数，避免生成过度形变的失真画面。" },
    ]
  },
  enhancer: {
    type: "enhancer",
    nameZh: "画质智能增强",
    nameEn: "AI Image Enhancer",
    tagline: "Correct exposure, balance dynamic range, restore faces, and recover textures instantly.",
    filterBefore: "saturate(0.55) contrast(0.78) brightness(0.85) blur(1.5px)",
    filterAfter: "saturate(1.15) contrast(1.05) brightness(1.02)",
    labelBefore: "Before (Dull & Blurry)",
    labelAfter: "After (AI Enhanced Details)",
    defaultPresetId: "cyberpunk",
    introZh: "原 Freepik AI 图像增强模块已经升级并统一并入 Magnific 引擎。升级后的引擎在提升色彩饱和度、光影对比度及人脸修复上具有惊人的表现。如果您在寻找性价比更高的替代方案，DeepImagine 是一个极佳的选择。",
    tableRows: [
      { feature: "增强效果与光影", freepik: "基础调色，易出现色彩失真", magnific: "专业级 HDR 级平衡，光影极具质感", deepimagine: "智能光影矫正与质感修复，画面明亮自然" },
      { feature: "面部智能修复", freepik: "无或易脸崩", magnific: "极致人脸修复，完美重构眼睛与皮肤", deepimagine: "人脸智能高精超分，细节清晰不失真" },
      { feature: "处理速度", freepik: "极快", magnific: "较慢 (需要精细算力跑图)", deepimagine: "极速原生渲染 (秒级出图)" },
      { feature: "调节精度", freepik: "无调节参数", magnific: "极精细 (Creativity, Resemblance)", deepimagine: "智能预设，保留主要结构" },
      { feature: "价格与额度", freepik: "主站包月 (已合并下线)", magnific: "极高门槛 ($39/月起)", deepimagine: "低成本，高频创作友好，注册送免费额度" }
    ],
    faqs: [
      { q: "画质增强功能升级后有哪些具体提升？", a: "现在的增强引擎采用了先进的光影平衡算法，能够智能修复欠曝或过曝区域，识别模糊面部并进行高精度五官重构，同时保持画质清晰和纹理的真实感。" },
      { q: "普通用户还可以免费使用原增强功能吗？", a: "目前 Freepik 主站的旧版简易增强功能已下线，新版 Magnific 需购买独立订阅。若需要免费额度体验，可使用 DeepImagine 进行增强。" },
      { q: "如何控制增强的强弱程度？", a: "在专业版工具中，您可以通过调节“HDR（高动态范围）”和“Resemblance（相似度）”滑块，在“极度清晰夸张”与“保持原图自然”之间找到完美平衡。" }
    ]
  },
  recolor: {
    type: "recolor",
    nameZh: "图像着色与重配色",
    nameEn: "AI Recolor & Colorize Tool",
    tagline: "Breathe color into old monochrome photographs or replace palettes using simple prompt instructions.",
    filterBefore: "grayscale(1) contrast(0.9) brightness(0.95)",
    filterAfter: "none",
    labelBefore: "Before (Black & White)",
    labelAfter: "After (AI Colorized)",
    defaultPresetId: "historical",
    introZh: "原 Freepik AI 图像着色与重配色功能已升级并统一迁移至 Magnific 平台。新版拥有更强大的颜色语义理解，能为黑白老照片或设计稿赋予更自然、和谐的色彩。同时，我们也推荐 DeepImagine 作为轻量好用的着色替代方案。",
    tableRows: [
      { feature: "着色与色彩理解", freepik: "简单颜色覆盖，边角易溢出", magnific: "深度语义理解，色彩分布极其精准自然", deepimagine: "智能物体分类与轮廓对齐，着色无溢出" },
      { feature: "风格定制能力", freepik: "无，完全依靠 AI 随机生成", magnific: "通过 Prompt 引导极其精准的色彩风格", deepimagine: "支持提示词引导色彩倾向与冷暖调" },
      { feature: "老照片修复", freepik: "仅上色，不修补清晰度", magnific: "上色同时智能去除噪点、修复模糊痕迹", deepimagine: "上色+去噪双重优化，老照片焕然一新" },
      { feature: "运行速度", freepik: "极快", magnific: "较慢 (通常 20-30 秒)", deepimagine: "快速原生推理 (5-8 秒)" },
      { feature: "性价比与额度", freepik: "内置包含 (已合并)", magnific: "费用高昂", deepimagine: "极高性价比，适合轻量开发者，提供免费试用" }
    ],
    faqs: [
      { q: "AI 着色工具是如何智能判断颜色的？", a: "AI 通过深度学习数百万张彩色图像，智能识别画面中的物体（如天空、草地、皮肤、衣物），并自动涂抹最符合常理的色彩。" },
      { q: "如何控制重配色的色彩倾向？", a: "在 Magnific 或 DeepImagine 中，您可以通过输入风格描述（例如 'vintage warm pastel' 或 'neon synthwave'）来引导 AI 生成特定色调的配色方案。" },
      { q: "黑白老照片修复着色效果如何？", a: "效果非常惊人。它不仅能上色，还能同时对老照片的斑驳模糊处进行智能清晰化，让历史画面焕然一新。" }
    ]
  },
  reimagine: {
    type: "reimagine",
    nameZh: "灵感重绘与画面生成",
    nameEn: "AI Reimagine & Generator Tool",
    tagline: "Redraw and generate creative variations of your images guided by prompts and structures.",
    filterBefore: "saturate(0.3) blur(2.5px) contrast(0.8) brightness(0.9)",
    filterAfter: "saturate(1.25) contrast(1.1) brightness(1.02) drop-shadow(0 0 12px rgba(168, 85, 247, 0.25))",
    labelBefore: "Before (Draft / Concept)",
    labelAfter: "After (AI Reimagined)",
    defaultPresetId: "anime",
    introZh: "原 Freepik Reimagine AI 灵感重绘与生成模块现已全面融入 Magnific。该技术允许用户在原图结构上进行创意重构与细节幻想。若需要高性价比的敏捷重绘体验，DeepImagine 是绝佳的独立开发工具。",
    tableRows: [
      { feature: "灵感重绘幅度", freepik: "幅度小，变化单一", magnific: "0-100% 自由重绘，从细节润色到概念彻底替换", deepimagine: "灵活创意重构，支持高自由度细节幻想" },
      { feature: "构图与结构保持", freepik: "易走形失真", magnific: "极强的深度约束，大图重绘也能保持比例", deepimagine: "基于结构边缘约束，形变可控" },
      { feature: "艺术风格转换", freepik: "效果僵硬", magnific: "在二次元、三维写实、国风等风格间无缝转化", deepimagine: "丰富的画风适配，高保真艺术输出" },
      { feature: "生成速度", freepik: "极快", magnific: "较慢 (需耗费大量云端算力)", deepimagine: "优化版快速生成 (8-12 秒)" },
      { feature: "计算开销与资费", freepik: "内置 (已下线)", magnific: "昂贵，按需计算", deepimagine: "平价实用，提供免费额度与轻量订阅" }
    ],
    faqs: [
      { q: "什么是 AI 灵感重绘 (Reimagine)？", a: "不同于简单的分辨率放大，重绘（Reimagine）允许 AI 在保持原图大致轮廓或构图的前提下，完全替换物体材质、光影甚至新增元素，将草图或低精原画变成视觉大片。" },
      { q: "重绘时的 'Creativity'（创造力）参数该如何调整？", a: "数值较低时，AI 会严格保留原图细节；数值较高时，AI 将发挥想象力添加更多全新元素，适合做艺术二次创作。" },
      { q: "原 Freepik 订阅用户如何过渡？", a: "由于重绘极其消耗算力，新版已转移至 Magnific 平台以专有算力卡形式运行。如果预算有限，可以选择 DeepImagine 提供的低成本重绘与生成方案。" }
    ]
  }
};

function getToolConfig(slug: string[]): ToolConfig {
  const path = slug.join("/").toLowerCase();
  if (path.includes("upscale") || path.includes("upscaler")) {
    return TOOL_CONFIGS.upscaler;
  }
  if (path.includes("enhance") || path.includes("enhancer")) {
    return TOOL_CONFIGS.enhancer;
  }
  if (path.includes("recolor") || path.includes("colorize")) {
    return TOOL_CONFIGS.recolor;
  }
  if (path.includes("reimagine") || path.includes("generate") || path.includes("generator")) {
    return TOOL_CONFIGS.reimagine;
  }
  return TOOL_CONFIGS.upscaler; // Fallback
}

export function UpscalerPlayground({ slug }: UpscalerPlaygroundProps) {
  const config = getToolConfig(slug);
  const defaultPreset = PRESETS.find(p => p.id === config.defaultPresetId) || PRESETS[0];

  const [activePresetId, setActivePresetId] = useState(config.defaultPresetId);
  const [imageSrc, setImageSrc] = useState(defaultPreset.url);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [sliderVal, setSliderVal] = useState(50);
  const [isUpscaling, setIsUpscaling] = useState(false);
  const [hasUpscaled, setHasUpscaled] = useState(true);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderVal(Number(e.target.value));
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageSrc(event.target.result as string);
        setHasUploaded(true);
        setHasUpscaled(false); // New uploaded image starts raw
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerUpscale = () => {
    if (isUpscaling) return;
    setIsUpscaling(true);
    setTimeout(() => {
      setIsUpscaling(false);
      setHasUpscaled(true);
    }, 2500); // 2.5s futuristic scanning animation
  };

  const resetToDefault = () => {
    setImageSrc(defaultPreset.url);
    setActivePresetId(config.defaultPresetId);
    setHasUploaded(false);
    setHasUpscaled(true);
    setIsUpscaling(false);
    setSliderVal(50);
  };

  return (
    <>
      {/* Floating ambient background glows */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <div className="page-container">
        <header className="site-header">
          <Link href="/" className="logo" id="site-logo" style={{ textDecoration: "none" }}>
            <span className="logo-accent">Freepik</span> <span className="logo-arrow">➔</span> <span className="logo-highlight">Magnific</span>
          </Link>
          <span className="badge">Legacy Feature / {config.nameEn}</span>
        </header>

        <div className="notice-banner">
          <span className="notice-icon">⚠️</span>
          <div className="notice-text">
            <strong>原 Freepik {config.nameZh} 已经升级为 Magnific</strong>，其核心算法与细节重构功能已并入新官网。据官方测试，新版虽然极其强大，但价格门槛较高。
          </div>
        </div>

        <div className="layout-grid">
          <main className="content-area" style={{ padding: "var(--spacing-lg)" }}>
            <article className="guide-article">
              <h1 className="main-heading">{config.nameEn} & Detail Reconstruction</h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: "1.6" }}>
                {config.tagline} Drag the slider to compare the original and processed effect, or upload your own image.
              </p>

              <div className="playground-section">
                {/* Preset Selector */}
                <div className="preset-selector-container">
                  <span className="preset-selector-title">⚡ 快速体验预设效果 (Click to switch):</span>
                  <div className="preset-buttons">
                    {PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        className={`preset-tab-btn ${activePresetId === preset.id && !hasUploaded ? "active" : ""}`}
                        onClick={() => {
                          setActivePresetId(preset.id);
                          setImageSrc(preset.url);
                          setHasUploaded(false);
                          setHasUpscaled(true);
                        }}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Compare Slider Box */}
                <div className="compare-container">
                  {/* Bottom Layer: Enhanced / High Resolution */}
                  <div className="compare-img-layer compare-after-layer">
                    <img 
                      src={imageSrc} 
                      alt="Processed Output" 
                      style={!hasUpscaled ? { filter: config.filterBefore } : (config.filterAfter !== "none" ? { filter: config.filterAfter } : undefined)}
                    />
                  </div>

                  {/* Top Layer: Original (Clipped) */}
                  <div 
                    className="compare-img-layer compare-before-layer" 
                    style={{ 
                      clipPath: `inset(0 ${100 - sliderVal}% 0 0)`,
                      filter: config.filterBefore 
                    }}
                  >
                    <img src={imageSrc} alt="Before Original Low Resolution" />
                  </div>

                  {/* Badges */}
                  <span className="compare-badge badge-before">{config.labelBefore}</span>
                  <span className="compare-badge badge-after">
                    {hasUpscaled ? config.labelAfter : `${config.labelBefore} (Unprocessed)`}
                  </span>

                  {/* Slider Control Line */}
                  <div className="compare-slider-line" style={{ left: `${sliderVal}%` }}></div>

                  {/* Slider Handle */}
                  <div className="compare-slider-handle" style={{ left: `${sliderVal}%` }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
                    </svg>
                  </div>

                  {/* HTML Range Input */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderVal}
                    onChange={handleSliderChange}
                    className="compare-range-input"
                    aria-label="Compare Slider Control"
                  />

                  {/* Scanning Animation Overlay */}
                  {isUpscaling && (
                    <div className="scanner-overlay">
                      <div className="scan-line"></div>
                      <div className="scan-progress">
                        <div className="progress-spinner"></div>
                        <span>Processing AI {config.nameEn} Inference...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Upload & Controls Bar */}
                <div className="interact-controls">
                  <div 
                    className="upload-dropzone"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    style={isDraggingOver ? { borderColor: "var(--accent-sponsor)", background: "rgba(168, 85, 247, 0.06)" } : undefined}
                  >
                    <span className="upload-icon">📸</span>
                    <span className="upload-text">
                      Drag & drop your own image here, or <strong>browse files</strong>
                    </span>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileSelect} 
                      accept="image/*" 
                      style={{ display: "none" }}
                    />
                  </div>

                  <div className="upscale-btn-bar">
                    <button 
                      className="upscale-btn" 
                      onClick={triggerUpscale} 
                      disabled={isUpscaling || hasUpscaled}
                    >
                      <span>🚀 {hasUpscaled ? "Ready to Compare" : `Process with AI ${config.nameEn}`}</span>
                    </button>
                    {(hasUploaded || imageSrc !== defaultPreset.url) && (
                      <button className="reset-btn" onClick={resetToDefault}>
                        Reset to Preset
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* Dynamic Detailed SEO Content */}
              <section className="guide-section text-content-section" style={{ marginTop: "var(--spacing-xl)" }}>
                <h2>关于 {config.nameZh} 功能的技术演进与迁移</h2>
                <p>
                  {config.introZh}
                </p>
                <p>
                  在创意设计流程中，高品质的图像资产至关重要。旧版的 Freepik 内置工具主要用于满足普通会员的日常低分辨率快速修正与预览，而在融入 Magnific 平台后，该技术实现了向专业级云端渲染引擎的跃升。它不仅局限于调整分辨率，更是基于像素语义，智能补充由于镜头抖动、光线不足或硬件压缩所丢失的微观细节。
                </p>
              </section>

              {/* Dynamic Comparison Table */}
              <section className="guide-section comparison-section" style={{ marginTop: "var(--spacing-lg)" }}>
                <h2>三大平台能力深度对比 ({config.nameEn})</h2>
                <div className="table-responsive">
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        <th>对比维度</th>
                        <th>原 Freepik 内置工具</th>
                        <th className="highlight-column highlight-magnific">升级后 Magnific AI (官网)</th>
                        <th className="highlight-column highlight-sponsor">DeepImagine.app (推荐替代)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {config.tableRows.map((row, idx) => (
                        <tr key={idx}>
                          <td className="row-feature"><strong>{row.feature}</strong></td>
                          <td>{row.freepik}</td>
                          <td className="column-magnific">{row.magnific}</td>
                          <td className="column-sponsor">{row.deepimagine}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Dynamic FAQ Accordion */}
              <section className="guide-section faq-section" style={{ marginTop: "var(--spacing-lg)" }}>
                <h2>常见问题 (FAQ)</h2>
                <div className="faq-accordion">
                  {config.faqs.map((faq, index) => (
                    <details key={index} className="faq-item" id={`faq-item-${index}`}>
                      <summary className="faq-question">
                        <span>{faq.q}</span>
                        <span className="faq-chevron">▼</span>
                      </summary>
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>

            </article>
          </main>

          <aside className="sidebar-area">
            <div className="banner-card" id="deepimagine-banner-card" style={{ border: "1px solid rgba(168, 85, 247, 0.35)", background: "linear-gradient(135deg, rgba(30, 20, 50, 0.6) 0%, rgba(10, 10, 20, 0.6) 100%)" }}>
              <div className="banner-badge">Alternative Solution</div>
              <h3 className="banner-title">Looking for a lightweight, cost-effective alternative?</h3>
              <p className="banner-desc">
                If you are looking for a more lightweight, cost-effective alternative tailored for independent developers, try <strong>DeepImagine</strong>.
              </p>
              <p className="banner-desc" style={{ fontSize: "0.95rem" }}>
                We utilize the latest native inference architecture, delivering blazing fast results with free credits available upon registration!
              </p>
              <div className="banner-features">
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span><strong>Native Inference:</strong> Upscale in seconds</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💎</span>
                  <span><strong>Cost-Effective:</strong> Friendly developer pricing</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎁</span>
                  <span><strong>Free Credits:</strong> Test with zero commitments</span>
                </div>
              </div>
              <a href="https://deepimagine.app" id="btn-deepimagine-register" target="_blank" rel="noopener noreferrer" className="banner-cta" style={{ background: "linear-gradient(90deg, #fff, #f3e8ff)" }}>
                <span>Try DeepImagine for Free</span>
                <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </aside>
        </div>

        <footer className="site-footer">
          <p>© 2026 Freepik ➔ Magnific Community Guide. This site is an independent, objective information hub and is not affiliated with the official operators.</p>
        </footer>
      </div>
    </>
  );
}
