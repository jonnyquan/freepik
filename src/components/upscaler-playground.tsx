"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TRANSLATIONS, Lang } from "@/components/translations";

type UpscalerPlaygroundProps = {
  slug: string[];
};

export function UpscalerPlayground({ slug }: UpscalerPlaygroundProps) {
  const [lang, setLang] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("site-lang") as Lang;
    if (savedLang && savedLang in TRANSLATIONS) {
      setLang(savedLang);
    } else {
      const browserLang = navigator.language.toLowerCase();
      const prefix = browserLang.split("-")[0] as Lang;
      if (prefix && prefix in TRANSLATIONS) {
        setLang(prefix);
      } else {
        setLang("en");
      }
    }
  }, []);

  const t = TRANSLATIONS[lang];
  const toolSlugName = slug[slug.length - 1] || "AI Tool";
  const displaySlugBadge = toolSlugName.replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

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
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span className="badge">{t.communityGuide} / {displaySlugBadge}</span>
            <select 
              value={lang} 
              onChange={(e) => {
                const val = e.target.value as Lang;
                setLang(val);
                localStorage.setItem("site-lang", val);
              }}
              className="lang-select"
            >
              <option value="en">🌐 English</option>
              <option value="zh">🌐 简体中文</option>
              <option value="es">🌐 Español</option>
              <option value="ja">🌐 日本語</option>
              <option value="pt">🌐 Português</option>
              <option value="de">🌐 Deutsch</option>
              <option value="fr">🌐 Français</option>
              <option value="ru">🌐 Русский</option>
              <option value="ko">🌐 한국어</option>
              <option value="it">🌐 Italiano</option>
              <option value="vi">🌐 Tiếng Việt</option>
              <option value="id">🌐 Bahasa Indonesia</option>
              <option value="tr">🌐 Türkçe</option>
              <option value="pl">🌐 Polski</option>
              <option value="nl">🌐 Nederlands</option>
              <option value="th">🌐 ภาษาไทย</option>
              <option value="ar">🌐 العربية</option>
              <option value="hi">🌐 हिन्दी</option>
            </select>
          </div>
        </header>

        <main className="content-area" style={{ padding: "clamp(1.5rem, 4vw, 3rem)", borderRadius: "24px" }}>
          <div className="notice-banner" style={{ marginBottom: "var(--spacing-lg)", background: "rgba(245, 158, 11, 0.05)" }}>
            <span className="notice-icon" style={{ fontSize: "1.8rem" }}>⚠️</span>
            <div className="notice-text" style={{ fontSize: "1.05rem" }}>
              <strong>{t.subpageWarningTitle}</strong>
              <p style={{ marginTop: "6px", color: "oklch(0.8 0.05 80)" }}>
                {t.subpageWarningP}
              </p>
            </div>
          </div>

          <div style={{ margin: "var(--spacing-lg) 0", display: "flex", flexDirection: "column", gap: "var(--spacing-xs)", textAlign: "center" }}>
            <h2 className="main-heading" style={{ fontSize: "2rem" }}>{t.subpageHeading}</h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", maxWidth: "600px", margin: "0 auto" }}>
              {t.subpageDesc}
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
              }}>{t.subpageCard1Badge}</div>
              <h3 className="banner-title" style={{ marginTop: "var(--spacing-sm)" }}>{t.subpageCard1Title}</h3>
              <p className="banner-desc" style={{ flexGrow: 1, margin: "var(--spacing-sm) 0 var(--spacing-md) 0" }}>
                {t.subpageCard1Desc}
              </p>
              <a href="https://magnific.com" id="btn-magnific-official" target="_blank" rel="noopener noreferrer" className="banner-cta" style={{ background: "linear-gradient(90deg, #fff, #e6ffe6)", color: "#000", marginTop: "auto" }}>
                <span>{t.subpageCard1Btn}</span>
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
                }}>{t.adBadge}</div>
                <span style={{ 
                  fontSize: "0.7rem", 
                  color: "var(--text-muted)", 
                  background: "rgba(255,255,255,0.05)", 
                  padding: "2px 6px", 
                  borderRadius: "4px", 
                  border: "1px solid var(--glass-border)",
                  letterSpacing: "0.5px"
                }}>{t.adLabel}</span>
              </div>
              <h3 className="banner-title" style={{ marginTop: "var(--spacing-sm)", fontSize: "1.4rem", fontWeight: "800" }}>{t.adTitle}</h3>
              
              <p className="banner-desc" style={{ margin: "var(--spacing-xs) 0 var(--spacing-sm) 0" }}>
                {t.adDesc}
              </p>

              {/* Functional Preview Box (Before/After comparison) */}
              <div className="ad-preview-box">
                <div className="preview-img-container">
                  <img src="/demo-portrait.png" alt="Before Original" className="preview-img preview-before" />
                  <span className="preview-badge-text">{t.adPreviewBefore}</span>
                </div>
                <div className="preview-arrow">➔</div>
                <div className="preview-img-container">
                  <img src="/demo-portrait.png" alt="After Enhanced" className="preview-img preview-after" />
                  <span className="preview-badge-text">{t.adPreviewAfter}</span>
                </div>
              </div>

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
                  <span>{t.feature2Desc}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent-sponsor)", fontSize: "1.1rem" }}>💎</span>
                  <span>{t.feature1Desc}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent-sponsor)", fontSize: "1.1rem" }}>🎁</span>
                  <span>{t.feature3Desc}</span>
                </div>
              </div>

              <a href="https://deepimagine.app" id="btn-deepimagine-register" target="_blank" rel="noopener noreferrer" className="banner-cta" style={{ background: "linear-gradient(90deg, #fff, #f3e8ff)", color: "#000", marginTop: "auto", fontWeight: "700" }}>
                <span>{t.btnDeepImagineRegister}</span>
                <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: "1.1rem", height: "1.1rem" }}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </main>

        <footer className="site-footer">
          <p>{t.footerText}</p>
        </footer>
      </div>
    </>
  );
}
