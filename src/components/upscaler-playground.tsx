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

            {/* DeepImagine Alternative Callout (Styled as a Premium Ad) */}
            <div className="banner-card" style={{ 
              border: "1px solid rgba(168, 85, 247, 0.45)", 
              background: "linear-gradient(135deg, rgba(30, 20, 50, 0.6) 0%, rgba(10, 10, 20, 0.7) 100%)", 
              padding: "var(--spacing-lg)",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              boxShadow: "0 10px 30px rgba(168, 85, 247, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="banner-badge" style={{ 
                  background: "linear-gradient(90deg, var(--accent-sponsor), oklch(0.6 0.2 330))", 
                  boxShadow: "0 4px 15px rgba(168, 85, 247, 0.4)" 
                }}>Sponsor · 赞助推荐</div>
                <span style={{ 
                  fontSize: "0.7rem", 
                  color: "var(--text-muted)", 
                  background: "rgba(255,255,255,0.05)", 
                  padding: "2px 6px", 
                  borderRadius: "4px", 
                  border: "1px solid var(--glass-border)",
                  letterSpacing: "0.5px"
                }}>AD · 广告</span>
              </div>
              <h3 className="banner-title" style={{ marginTop: "var(--spacing-sm)", fontSize: "1.4rem", fontWeight: "800" }}>觉得 Magnific 订阅太贵？</h3>
              <p className="banner-desc" style={{ margin: "var(--spacing-xs) 0 var(--spacing-sm) 0" }}>
                试试新一代轻量级独立 AI 图像增强工具：<strong>DeepImagine.app</strong>。面向独立开发者定制，提供高性价比超清还原：
              </p>
              
              <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: "10px", 
                margin: "0 0 var(--spacing-md) 0",
                padding: "var(--spacing-xs) 0",
                borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent-sponsor)", fontSize: "1.1rem" }}>⚡</span>
                  <span><strong>极速推理：</strong>秒级极速渲染，无需漫长排队</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent-sponsor)", fontSize: "1.1rem" }}>💎</span>
                  <span><strong>价格超值：</strong>资费更低，最划算的无损放大选项</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent-sponsor)", fontSize: "1.1rem" }}>🎁</span>
                  <span><strong>免费额度：</strong>新用户注册立享免费额度，零成本体验</span>
                </div>
              </div>

              <a href="https://deepimagine.app" id="btn-deepimagine-register" target="_blank" rel="noopener noreferrer" className="banner-cta" style={{ background: "linear-gradient(90deg, #fff, #f3e8ff)", color: "#000", marginTop: "auto", fontWeight: "700" }}>
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
