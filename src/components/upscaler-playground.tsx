"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

type UpscalerPlaygroundProps = {
  slug: string[];
};

function formatToolName(slug: string[]): string {
  const path = slug.join("/");
  const lower = path.toLowerCase();
  if (lower.includes("upscale") || lower.includes("upscaler")) {
    return "高清放大功能 (AI Upscaler)";
  }
  if (lower.includes("enhance") || lower.includes("enhancer")) {
    return "图像增强功能 (AI Enhancer)";
  }
  if (lower.includes("recolor") || lower.includes("colorize")) {
    return "AI 图像着色功能 (Recolor/Colorize)";
  }
  if (lower.includes("reimagine") || lower.includes("generate") || lower.includes("generator")) {
    return "AI 图像重绘与生成功能 (Reimagine/Generator)";
  }
  
  const last = slug[slug.length - 1] || "AI Tool";
  return last
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function UpscalerPlayground({ slug }: UpscalerPlaygroundProps) {
  const [sliderVal, setSliderVal] = useState(50);
  const [imageSrc, setImageSrc] = useState("/demo-upscale.png");
  const [isUpscaling, setIsUpscaling] = useState(false);
  const [hasUpscaled, setHasUpscaled] = useState(true);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toolName = formatToolName(slug);

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
        setHasUpscaled(false); // New image starts as low-res until upscaled
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
    setImageSrc("/demo-upscale.png");
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
          <span className="badge">Legacy Feature / {slug[slug.length - 1]}</span>
        </header>

        <div className="notice-banner">
          <span className="notice-icon">⚠️</span>
          <div className="notice-text">
            <strong>原 Freepik {toolName} 已经升级为 Magnific</strong>，其高清放大与细节重构功能已并入新官网。据官方测试，新版虽然功能强大，但价格较高。
          </div>
        </div>

        <div className="layout-grid">
          <main className="content-area" style={{ padding: "var(--spacing-lg)" }}>
            <article className="guide-article">
              <h1 className="main-heading">AI Image Upscaler & Detail Injector</h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
                Experience native detail reconstruction below. Drag the slider to compare original (low-res) and enhanced details, or upload your own image.
              </p>

              <div className="playground-section">
                {/* Compare Slider Box */}
                <div className="compare-container">
                  {/* Bottom Layer: Enhanced / High Resolution */}
                  <div className="compare-img-layer compare-after-layer">
                    <img 
                      src={imageSrc} 
                      alt="Upscaled Details" 
                      style={!hasUpscaled ? { filter: "blur(3.5px) saturate(0.9) contrast(0.95)" } : undefined}
                    />
                  </div>

                  {/* Top Layer: Original / Low Resolution (Clipped) */}
                  <div 
                    className="compare-img-layer compare-before-layer" 
                    style={{ clipPath: `inset(0 ${100 - sliderVal}% 0 0)` }}
                  >
                    <img src={imageSrc} alt="Original Low Resolution" />
                  </div>

                  {/* Badges */}
                  <span className="compare-badge badge-before">Before (Original Low-Res)</span>
                  <span className="compare-badge badge-after">
                    {hasUpscaled ? "After (DeepImagine 4X)" : "Before (Low-Res)"}
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
                        <span>Processing Native AI Upscaling...</span>
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
                      <span>🚀 {hasUpscaled ? "Ready to Compare" : "Upscale 4x (DeepImagine)"}</span>
                    </button>
                    {imageSrc !== "/demo-upscale.png" && (
                      <button className="reset-btn" onClick={resetToDefault}>
                        Reset
                      </button>
                    )}
                  </div>
                </div>

              </div>
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
