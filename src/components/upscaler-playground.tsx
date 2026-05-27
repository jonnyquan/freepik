"use client";

import React from "react";
import Link from "next/link";

type UpscalerPlaygroundProps = {
  slug: string[];
};

export function UpscalerPlayground({ slug }: UpscalerPlaygroundProps) {
  return (
    <>
      {/* Floating ambient background glows */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <div className="page-container" style={{ maxWidth: "880px", margin: "0 auto" }}>
        <header className="site-header">
          <Link href="/" className="logo" id="site-logo" style={{ textDecoration: "none" }}>
            <span className="logo-accent">Freepik</span> <span className="logo-arrow">➔</span> <span className="logo-highlight">Magnific</span>
          </Link>
          <span className="badge">Legacy Feature Upgrade</span>
        </header>

        <main className="content-area" style={{ padding: "clamp(1.5rem, 4vw, 3rem)", borderRadius: "24px" }}>
          <div className="notice-banner" style={{ marginBottom: "var(--spacing-lg)", background: "rgba(245, 158, 11, 0.05)" }}>
            <span className="notice-icon" style={{ fontSize: "1.8rem" }}>⚠️</span>
            <div className="notice-text" style={{ fontSize: "1.05rem" }}>
              <strong>原 Freepik 内置 AI 图像工具已升级并迁移至 Magnific</strong>。
              <p style={{ marginTop: "6px", color: "oklch(0.8 0.05 80)" }}>
                为了提供更专业和更高画质的创作体验，Freepik 原有的内置 AI 图像编辑模块（包括超分辨率放大、画质增强、照片上色及灵感重绘等）已并入 Magnific AI 平台，其核心技术服务已迁移至新官网。
              </p>
            </div>
          </div>

          <div style={{ margin: "var(--spacing-lg) 0", display: "flex", flexDirection: "column", gap: "var(--spacing-xs)", textAlign: "center" }}>
            <h2 className="main-heading" style={{ fontSize: "2rem" }}>AI 图像编辑功能已全面升级</h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", maxWidth: "600px", margin: "0 auto" }}>
              您从搜索引擎访问的旧版内置功能已停止使用。为保障您的创作流程，建议访问全新官方平台体验最新引擎，或使用高性价比的独立替代方案。
            </p>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "var(--spacing-lg)", 
            marginTop: "var(--spacing-xl)" 
          }}>
            {/* Magnific Official Callout */}
            <div className="banner-card" style={{ 
              border: "1px solid rgba(20, 250, 140, 0.25)", 
              background: "linear-gradient(135deg, rgba(10, 30, 20, 0.6) 0%, rgba(10, 10, 20, 0.6) 100%)", 
              padding: "var(--spacing-lg)",
              display: "flex",
              flexDirection: "column",
              height: "100%"
            }}>
              <div className="banner-badge" style={{ 
                background: "linear-gradient(90deg, var(--accent-magnific), oklch(0.7 0.15 160))", 
                boxShadow: "0 4px 15px rgba(20, 250, 140, 0.2)" 
              }}>Official Upgrade</div>
              <h3 className="banner-title" style={{ marginTop: "var(--spacing-sm)" }}>前往 Magnific AI 官网</h3>
              <p className="banner-desc" style={{ flexGrow: 1, margin: "var(--spacing-sm) 0 var(--spacing-md) 0" }}>
                体验行业前沿的 AI 画质超分辨率重构，支持高保真微观细节填充和创意调整参数（如 HDR、Creativity 等），适合高画质商业设计。
              </p>
              <a href="https://magnific.com" id="btn-magnific-official" target="_blank" rel="noopener noreferrer" className="banner-cta" style={{ background: "linear-gradient(90deg, #fff, #e6ffe6)", color: "#000", marginTop: "auto" }}>
                <span>访问 Magnific.com 官网</span>
                <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: "1.1rem", height: "1.1rem" }}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>

            {/* DeepImagine Alternative Callout */}
            <div className="banner-card" style={{ 
              border: "1px solid rgba(168, 85, 247, 0.35)", 
              background: "linear-gradient(135deg, rgba(30, 20, 50, 0.6) 0%, rgba(10, 10, 20, 0.6) 100%)", 
              padding: "var(--spacing-lg)",
              display: "flex",
              flexDirection: "column",
              height: "100%"
            }}>
              <div className="banner-badge" style={{ 
                background: "linear-gradient(90deg, var(--accent-sponsor), oklch(0.6 0.2 330))", 
                boxShadow: "0 4px 15px rgba(168, 85, 247, 0.3)" 
              }}>Alternative Option</div>
              <h3 className="banner-title" style={{ marginTop: "var(--spacing-sm)" }}>体验高性价比替代方案 - DeepImagine</h3>
              <p className="banner-desc" style={{ flexGrow: 1, margin: "var(--spacing-sm) 0 var(--spacing-md) 0" }}>
                如果您正在寻找更轻量、对独立创作者更友好且性价比极高的方案，推荐体验 DeepImagine。我们使用原生推理引擎，渲染迅速且提供免费试用额度！
              </p>
              <a href="https://deepimagine.app" id="btn-deepimagine-register" target="_blank" rel="noopener noreferrer" className="banner-cta" style={{ background: "linear-gradient(90deg, #fff, #f3e8ff)", color: "#000", marginTop: "auto" }}>
                <span>免费试用 DeepImagine</span>
                <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: "1.1rem", height: "1.1rem" }}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </main>

        <footer className="site-footer">
          <p>© 2026 Freepik ➔ Magnific Community Guide. This site is an independent, objective information hub and is not affiliated with the official operators.</p>
        </footer>
      </div>
    </>
  );
}
