export default function Home() {
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
          <span className="badge">Community Guide</span>
        </header>

        <div className="layout-grid">
          <main className="content-area">
            <article className="guide-article">
              <h1 className="main-heading">Freepik ➡️ Magnific Brand Upgrade & Community Migration Guide</h1>
              
              <div className="meta-info" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", gap: "var(--spacing-md)", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  <span className="meta-date">Published: May 2026</span>
                  <span className="meta-author">Source: Compiled by Community Users</span>
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
                  <strong>Disclaimer:</strong> This is an unofficial, independent community guide and informational archival site. We are not affiliated with, endorsed by, or connected to Freepik Company, S.L.U. or Magnific. 本站仅为独立、非官方的社区指引及信息归档网站，与 Freepik 或 Magnific AI 无任何关联、背书或商业合作关系。
                </div>
              </div>

              <section className="guide-section">
                <h2>What is this Brand & Technology Upgrade?</h2>
                <p>In May 2024, the globally renowned creative assets and design platform <strong>Freepik</strong> officially announced the acquisition of <strong>Magnific AI</strong>, the star tool in the field of AI image super-resolution and enhancement. This acquisition marks a deep technical integration of AI creative workflows between both parties.</p>
                <p>With the integration of the ecosystem, some of Freepik's built-in AI enhancement modules and workflows are gradually migrating and unifying under the more professional and powerful Magnific platform. Whether you are a photographer, concept artist seeking ultimate details, or a designer who needs high-definition assets daily, this upgrade will bring a stunning visual quality enhancement experience.</p>
              </section>

              <section className="guide-section">
                <h2>How to Access the Official New Platform?</h2>
                <p>If you need to use the most cutting-edge technology for image super-resolution reconstruction, hallucination-guided detail injection, and redrawing enhancement, please visit Magnific's official website directly:</p>
                
                <div className="cta-box">
                  <a href="https://magnific.com" id="link-magnific-official" target="_blank" rel="noopener noreferrer" className="official-btn">
                    <span>Go to Magnific.com Official Website</span>
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                  </a>
                </div>
              </section>

              <section className="guide-section">
                <h2>Notes for Community Users During Migration</h2>
                <ul className="migration-list">
                  <li>
                    <strong>Accounts & Login:</strong>{" "}
                    Although Magnific is now owned by Freepik, its billing and account systems remain relatively independent from Freepik's main site. Please head to the official Magnific website to register your dedicated account.
                  </li>
                  <li>
                    <strong>Feature Differences:</strong>{" "}
                    Magnific offers extremely precise parameters (such as HDR, Creativity, Resemblance, etc.). While this is much more professional than the simple upscaling features previously built into Freepik, it also comes with a steeper learning curve.
                  </li>
                  <li>
                    <strong>Pricing Adjustments:</strong>{" "}
                    The professional positioning of Magnific's official service means a higher pricing threshold, suitable for high-end creators with ultimate image quality demands for commercial projects.
                  </li>
                </ul>
              </section>

              <section className="guide-section" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "var(--spacing-md)" }}>
                <h2>Looking for a Budget-Friendly Alternative?</h2>
                <p>
                  对于广大独立设计师和摄影爱好者来说，虽然 Magnific 的画质超分辨率和细节重塑极为级出色，但其独立的高昂订阅价格（每月 $39 - $299）以及繁琐的专业参数，使日常轻量创作的门槛大幅上升。如果您正在寻找一款操作更简易、对独立开发者更友好、且价格亲民的平替工具，我们非常建议您尝试旁边的独立第三方替代推荐 <strong>DeepImagine</strong>。
                </p>
              </section>
            </article>
          </main>

          <aside className="sidebar-area">
            {/* DeepImagine Sponsored Ad Card */}
            <div className="banner-card" id="deepimagine-banner-card" style={{ border: "1px solid rgba(168, 85, 247, 0.45)", background: "linear-gradient(135deg, rgba(30, 20, 50, 0.6) 0%, rgba(10, 10, 20, 0.7) 100%)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="banner-badge" style={{ background: "linear-gradient(90deg, var(--accent-sponsor), oklch(0.6 0.2 330))" }}>
                  Sponsor • 推荐替代
                </div>
                <span style={{ 
                  fontSize: "0.7rem", 
                  color: "var(--text-muted)", 
                  background: "rgba(255, 255, 255, 0.05)", 
                  padding: "2px 6px", 
                  borderRadius: "4px", 
                  border: "1px solid var(--glass-border)",
                  letterSpacing: "0.5px"
                }}>AD · 广告</span>
              </div>

              <h3 className="banner-title" style={{ marginTop: "var(--spacing-xs)" }}>觉得 Magnific 太贵太复杂？</h3>
              
              <p className="banner-desc">
                试试下一代轻量级 AI 图像增强平替工具：<strong>DeepImagine.app</strong>。新注册用户送免费额度，极速无损放大画质！
              </p>

              {/* Functional Preview Box (Before/After comparison) */}
              <div className="ad-preview-box">
                <div className="preview-img-container">
                  <img src="/demo-portrait.png" alt="Before Original" className="preview-img preview-before" />
                  <span className="preview-badge-text">Before (原图)</span>
                </div>
                <div className="preview-arrow">➔</div>
                <div className="preview-img-container">
                  <img src="/demo-portrait.png" alt="After Enhanced" className="preview-img preview-after" />
                  <span className="preview-badge-text">After (超清重构)</span>
                </div>
              </div>

              <div className="banner-features" style={{ margin: "0 0 var(--spacing-sm) 0", padding: "10px 0" }}>
                <div className="feature-item">
                  <span className="feature-icon">✨</span>
                  <span><strong>一键式处理：</strong>傻瓜式操作，无需繁琐调参</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span><strong>秒级极速渲染：</strong>原生推理，无需排队等待</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎁</span>
                  <span><strong>免费额度赠送：</strong>新注册立即获赠免费算力积分</span>
                </div>
              </div>

              <a href="https://deepimagine.app" id="btn-deepimagine-register" target="_blank" rel="noopener noreferrer" className="banner-cta" style={{ background: "linear-gradient(90deg, #fff, #f3e8ff)", color: "#000", fontWeight: "700" }}>
                <span>立即免费试用 DeepImagine</span>
                <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <line x1={5} y1={12} x2={19} y2={12} />
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
