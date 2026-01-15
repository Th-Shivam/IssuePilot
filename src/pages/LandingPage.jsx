import HeroSection from '../components/HeroSection';

function LandingPage() {
    return (
        <>
            <div className="page-transition">
                <HeroSection />

                {/* Credits Note */}
                <div style={{
                    width: "100%",
                    textAlign: "center",
                    padding: "20px 0 80px 0", // Extra bottom padding to avoid overlap with fixed branding
                    color: "rgba(255, 255, 255, 0.3)",
                    fontSize: "0.75rem",
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.05em",
                    position: "relative",
                    zIndex: 10
                }}>
                    Video Background & Design Inspiration Credits: <span style={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: "500" }}>Apertre Season 3 Website</span>
                </div>
            </div>

            {/* Developer Branding (Left) */}
            <div
                style={{
                    position: "fixed",
                    bottom: "30px",
                    left: "40px",
                    zIndex: 2147483647,
                    textAlign: "left",
                    fontFamily: "'Inter', sans-serif", // Assuming Inter or system sans
                    pointerEvents: "none",
                }}
            >
                <div style={{
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.6)",
                    letterSpacing: "3px",
                    marginBottom: "2px",
                    fontWeight: "600",
                    textTransform: "uppercase"
                }}>
                    DEVELOPED BY
                </div>
                <div style={{
                    fontSize: "1.8rem",
                    color: "#ffffff",
                    fontWeight: "900",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    fontFamily: "'Orbitron', sans-serif", // Applied Orbitron
                    textShadow: "0 2px 10px rgba(0,0,0,0.5)"
                }}>
                    ANOTNET
                </div>
            </div>

            {/* Community Branding (Right) */}
            <div
                style={{
                    position: "fixed",
                    bottom: "30px",
                    right: "40px",
                    zIndex: 2147483647,
                    textAlign: "right",
                    fontFamily: "'Inter', sans-serif",
                    pointerEvents: "none",
                }}
            >
                <div style={{
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.6)",
                    letterSpacing: "3px",
                    marginBottom: "2px",
                    fontWeight: "600",
                    textTransform: "uppercase"
                }}>
                    ENGINEERED BY
                </div>
                <div style={{
                    fontSize: "1.2rem",
                    color: "#ffffff",
                    fontWeight: "700",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    textShadow: "0 2px 10px rgba(0,0,0,0.5)"
                }}>
                    SHIVAM SINGH
                </div>
            </div>
        </>
    );
}

export default LandingPage;
