"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

type UpscalerPlaygroundProps = {
  slug: string[];
};

const PRESETS = [
  { 
    id: "portrait", 
    name: "👩 Portrait (无损放大)", 
    url: "/demo-portrait.png",
    filterBefore: "blur(4.5px) saturate(0.95) contrast(0.95)",
    filterAfter: "none",
    labelBefore: "Before (Low-Res)",
    labelAfter: "After (Lossless 4X)"
  },
  { 
    id: "cyberpunk", 
    name: "🌃 Cyberpunk (智能增强)", 
    url: "/demo-cyberpunk.png",
    filterBefore: "saturate(0.55) contrast(0.78) brightness(0.85) blur(1.5px)",
    filterAfter: "saturate(1.15) contrast(1.05) brightness(1.02)",
    labelBefore: "Before (Dull & Blurry)",
    labelAfter: "After (Enhanced Quality)"
  },
  { 
    id: "anime", 
    name: "🎨 Anime (灵感重绘)", 
    url: "/demo-anime.png",
    filterBefore: "saturate(0.3) blur(2.5px) contrast(0.8) brightness(0.9)",
    filterAfter: "saturate(1.25) contrast(1.1) brightness(1.02) drop-shadow(0 0 12px rgba(168, 85, 247, 0.25))",
    labelBefore: "Before (Draft / Concept)",
    labelAfter: "After (AI Reimagined)"
  },
  { 
    id: "historical", 
    name: "📜 Vintage (照片上色)", 
    url: "/demo-historical.png",
    filterBefore: "grayscale(1) contrast(0.9) brightness(0.95)",
    filterAfter: "none",
    labelBefore: "Before (Black & White)",
    labelAfter: "After (AI Colorized)"
  },
];

const TABLE_ROWS = [
  { feature: "放大倍率 & 分辨率", freepik: "仅支持 2x 简单拉伸，边缘模糊", magnific: "支持 2x 到 10x 放大，支持超高分辨率", deepimagine: "提供 2x/4x lossless 放大，满足 4K 需求" },
  { feature: "画质增强与光影", freepik: "基础调色，色彩易失真且无深度", magnific: "专业级 HDR 级平衡，光影极具质感", deepimagine: "智能光影矫正与质感修复，画面明亮自然" },
  { feature: "细节脑补与重绘", freepik: "无细节生成，纯涂抹像素拉伸", magnific: "行业顶尖，智能补充人脸、毛孔与织物微观材质", deepimagine: "搭载最新原生推理引擎，自然填充纹理与边缘" },
  { feature: "处理速度", freepik: "极快 (1-3秒)", magnific: "较慢 (通常 15-40 秒)", deepimagine: "极速原生推理 (5-10 秒)" },
  { feature: "操作参数与难度", freepik: "一键处理，零参数", magnific: "参数极多 (HDR, Creativity 等)，门槛高", deepimagine: "精简参数，一键式轻量化控制" },
  { feature: "价格与额度门槛", freepik: "主站会员包含 (已下线)", magnific: "极高 ($39 - $299/月)", deepimagine: "高性价比，注册即赠免费额度" }
];

const FAQS = [
  { q: "原 Freepik AI 创作工具去哪了？", a: "Freepik 内置的 AI 图像工具（包括放大、画质增强、着色与 Reimagine 重绘等模块）目前已全面升级并合并入更专业的 Magnific AI 平台。原有的主站简易免费版本已被停用。" },
  { q: "Magnific AI 和普通 AI 工具在细节生成上有什么区别？", a: "传统的插值或简易放大只是拉伸像素并平滑模糊边缘，而 Magnific 与 DeepImagine 采用生成式 AI 模型，能够根据画面上下文语义智能“脑补”出原本不存在的超清微观纹理（如毛孔、发丝、皮质纹路等），实现真正的无损清晰化。" },
  { q: "升级后的价格与账户体系是怎样的？", a: "由于 Magnific 定位专业级商用创作，其采用独立的账户与收费标准（每月 $39 到 $299 ），且与 Freepik 账户不互通。如果您正在寻找支持免费试用、价格更亲民的独立替代工具，DeepImagine.app 是极佳的选择。" },
  { q: "如何通过提示词获得最佳的增强或重绘效果？", a: "在高级工具中，建议您上传图片后输入微弱的提示词引导 AI，例如“high resolution, skin pores, sharp focus”，并根据需要调整 Creativity（创造力参数），以在“保留原图结构”与“丰富细节幻想”之间取得最佳平衡。" }
];

export function UpscalerPlayground({ slug }: UpscalerPlaygroundProps) {
  const [activePresetId, setActivePresetId] = useState("portrait");
  const [imageSrc, setImageSrc] = useState("/demo-portrait.png");
  const [hasUploaded, setHasUploaded] = useState(false);
  const [sliderVal, setSliderVal] = useState(50);
  const [isUpscaling, setIsUpscaling] = useState(false);
  const [hasUpscaled, setHasUpscaled] = useState(true);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activePreset = PRESETS.find(p => p.id === activePresetId) || PRESETS[0];
  const filterBefore = hasUploaded ? "blur(4.5px) saturate(0.95) contrast(0.95)" : activePreset.filterBefore;
  const filterAfter = hasUploaded ? "none" : activePreset.filterAfter;
  const labelBefore = hasUploaded ? "Before (Original)" : activePreset.labelBefore;
  const labelAfter = hasUploaded ? "After (AI Enhanced)" : activePreset.labelAfter;

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
    setImageSrc("/demo-portrait.png");
    setActivePresetId("portrait");
    setHasUploaded(false);
    setHasUpscaled(true);
    setIsUpscaling(false);
    setSliderVal(50);
  };

  const toolSlugName = slug[slug.length - 1] || "AI Tool";
  const displaySlugBadge = toolSlugName.replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

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
          <span className="badge">Legacy Feature / {displaySlugBadge}</span>
        </header>

        <div className="notice-banner">
          <span className="notice-icon">⚠️</span>
          <div className="notice-text">
            <strong>原 Freepik AI 图像工具已升级为 Magnific</strong>，其超分辨率重建、画质增强、着色与 Reimagine 等算法功能已并入新官网。据测试，新版引擎极其强大，但价格门槛较高。
          </div>
        </div>

        <div className="layout-grid">
          <main className="content-area" style={{ padding: "var(--spacing-lg)" }}>
            <article className="guide-article">
              <h1 className="main-heading">AI Image Enhancer & Detail Reconstruction</h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: "1.6" }}>
                Experience next-generation AI image enhancement and detail injection. Drag the slider to compare original and processed details, or choose a preset option to experience different tools.
              </p>

              <div className="playground-section">
                {/* Preset Selector */}
                <div className="preset-selector-container">
                  <span className="preset-selector-title">⚡ 快速体验不同 AI 工具效果 (Click to switch):</span>
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
                  {/* Bottom Layer: Enhanced Output */}
                  <div className="compare-img-layer compare-after-layer">
                    <img 
                      src={imageSrc} 
                      alt="Processed Output" 
                      style={!hasUpscaled ? { filter: filterBefore } : (filterAfter !== "none" ? { filter: filterAfter } : undefined)}
                    />
                  </div>

                  {/* Top Layer: Original (Clipped) */}
                  <div 
                    className="compare-img-layer compare-before-layer" 
                    style={{ 
                      clipPath: `inset(0 ${100 - sliderVal}% 0 0)`,
                      filter: filterBefore 
                    }}
                  >
                    <img src={imageSrc} alt="Original Input" />
                  </div>

                  {/* Badges */}
                  <span className="compare-badge badge-before">{labelBefore}</span>
                  <span className="compare-badge badge-after">
                    {hasUpscaled ? labelAfter : `${labelBefore} (Unprocessed)`}
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
                        <span>Processing AI Tool Inference...</span>
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
                      <span>🚀 {hasUpscaled ? "Ready to Compare" : "Process with AI Enhancer"}</span>
                    </button>
                    {(hasUploaded || imageSrc !== "/demo-portrait.png") && (
                      <button className="reset-btn" onClick={resetToDefault}>
                        Reset to Preset
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* Detailed SEO Content */}
              <section className="guide-section text-content-section" style={{ marginTop: "var(--spacing-xl)" }}>
                <h2>关于原内置 AI 工具的技术升级与迁移说明</h2>
                <p>
                  原 Freepik 平台提供的多项 AI 图像编辑工具（包括超分放大、画质提升、智能着色和 Reimagine 重绘生成等模块）已经完成了技术架构的升级，并统一并入更具表现力的 Magnific AI 平台。
                </p>
                <p>
                  以往内置于设计工作流中的简易版工具只能满足基础的分辨率放大或随机色调调整。升级后的 Magnific 专业级渲染引擎不仅能完美重建光影和曝光度，还能深入分析图像的像素语境，重现极度细腻逼真的微观细节（例如发丝、皮肤毛孔、历史照片的建筑肌理）。然而，由于算力开销巨大，新平台采用了独立的账户与专业级订阅资费。
                </p>
                <p>
                  对于追求高画质的普通创作者、独立开发者或追求极致性价比的用户，我们十分推荐将 <strong>DeepImagine.app</strong> 作为日常替代工具，以更加友好的资费体验高性能的无损放大和画质修复。
                </p>
              </section>

              {/* Comparison Table */}
              <section className="guide-section comparison-section" style={{ marginTop: "var(--spacing-lg)" }}>
                <h2>三大平台核心能力对比 (Feature Comparison)</h2>
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
                      {TABLE_ROWS.map((row, idx) => (
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

              {/* FAQ Accordion */}
              <section className="guide-section faq-section" style={{ marginTop: "var(--spacing-lg)" }}>
                <h2>常见问题 (FAQ)</h2>
                <div className="faq-accordion">
                  {FAQS.map((faq, index) => (
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
