"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TRANSLATIONS, Lang } from "@/components/translations";

export default function Home({ lang: initialLang }: { lang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang || "en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (initialLang) {
      setLang(initialLang);
      return;
    }
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
  }, [initialLang]);

  const t = TRANSLATIONS[lang];

  return (
    <>
      {/* Floating ambient background glows */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <div className="page-container">
        <header className="site-header">
          <div className="logo" id="site-logo">
            <span className="logo-accent">Freepik</span> <span className="logo-arrow">➔</span> <span className="logo-highlight">Magnific</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span className="badge">{t.communityGuide}</span>
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

        <div className="layout-grid">
          <main className="content-area">
            <article className="guide-article">
              <h1 className="main-heading">{t.mainHeading}</h1>
              
              <div className="meta-info" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", gap: "var(--spacing-md)", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  <span className="meta-date">{t.published}</span>
                  <span className="meta-author">{t.source}</span>
                </div>
                {/* Legal Disclaimer Box */}
                <div className="disclaimer-alert-box" style={{ 
                  background: "rgba(255, 255, 255, 0.02)", 
                  border: "1px solid var(--glass-border)", 
                  borderRadius: "12px", 
                  padding: "var(--spacing-sm)", 
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  lineHeight: "1.5"
                }}>
                  <strong>{t.disclaimerLabel}</strong> {t.disclaimerText}
                </div>
              </div>

              <section className="guide-section">
                <h2>{t.section1Title}</h2>
                <p>{t.section1P1}</p>
                <p>{t.section1P2}</p>
              </section>

              <section className="guide-section">
                <h2>{t.section2Title}</h2>
                <p>{t.section2P}</p>
                
                <div className="cta-box">
                  <a href="https://magnific.com" id="link-magnific-official" target="_blank" rel="noopener noreferrer" className="official-btn">
                    <span>{t.btnMagnificOfficial}</span>
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                  </a>
                </div>
              </section>

              <section className="guide-section">
                <h2>{t.section3Title}</h2>
                <ul className="migration-list">
                  <li>
                    <strong>{t.migrationItem1Title}</strong>{t.migrationItem1Desc}
                  </li>
                  <li>
                    <strong>{t.migrationItem2Title}</strong>{t.migrationItem2Desc}
                  </li>
                  <li>
                    <strong>{t.migrationItem3Title}</strong>{t.migrationItem3Desc}
                  </li>
                </ul>
              </section>

              <section className="guide-section" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "var(--spacing-md)" }}>
                <h2>{t.section4Title}</h2>
                <p>{t.section4P}</p>
              </section>
            </article>
          </main>

          <aside className="sidebar-area">
            {/* DeepImagine Sponsored Ad Card */}
            <div className="banner-card" id="deepimagine-banner-card" style={{ border: "1px solid rgba(168, 85, 247, 0.45)", background: "linear-gradient(135deg, rgba(30, 20, 50, 0.6) 0%, rgba(10, 10, 20, 0.7) 100%)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="banner-badge" style={{ background: "linear-gradient(90deg, var(--accent-sponsor), oklch(0.6 0.2 330))" }}>
                  {t.adBadge}
                </div>
                <span style={{ 
                  fontSize: "0.7rem", 
                  color: "var(--text-muted)", 
                  background: "rgba(255, 255, 255, 0.05)", 
                  padding: "2px 6px", 
                  borderRadius: "4px", 
                  border: "1px solid var(--glass-border)",
                  letterSpacing: "0.5px"
                }}>{t.adLabel}</span>
              </div>

              <h3 className="banner-title" style={{ marginTop: "var(--spacing-xs)" }}>{t.adTitle}</h3>
              
              <p className="banner-desc">
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

              <div className="banner-features" style={{ margin: "0 0 var(--spacing-sm) 0", padding: "10px 0" }}>
                <div className="feature-item">
                  <span className="feature-icon">✨</span>
                  <span>{t.feature1Desc}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span>{t.feature2Desc}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎁</span>
                  <span>{t.feature3Desc}</span>
                </div>
              </div>

              <a href="https://deepimagine.app" id="btn-deepimagine-register" target="_blank" rel="noopener noreferrer" className="banner-cta" style={{ background: "linear-gradient(90deg, #fff, #f3e8ff)", color: "#000", fontWeight: "700" }}>
                <span>{t.btnDeepImagineRegister}</span>
                <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </aside>
        </div>

        <footer className="site-footer">
          <p>{t.footerText}</p>
        </footer>
      </div>
    </>
  );
}
