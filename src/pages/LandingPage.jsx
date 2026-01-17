import HeroSection from '../components/HeroSection';

function LandingPage() {
    return (
        <>
            <div className="page-transition">
                <HeroSection />

                {/* Credits Note */}
                {/* Credits Note */}
                <div className="credits-note">
                    Video Background & Design Inspiration Credits: <span style={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: "500" }}>Apertre Season 3 Website</span>
                </div>
            </div>

            {/* Footer Branding */}
            <footer className="landing-footer">
                <div className="branding-container branding-left">
                    <div className="brand-label">
                        DEVELOPED BY
                    </div>
                    <div className="brand-name">
                        ANOTNET
                    </div>
                </div>

                <div className="branding-container branding-right">
                    <div className="brand-label">
                        ENGINEERED BY
                    </div>
                    <div className="brand-name">
                        SHIVAM SINGH
                    </div>
                </div>
            </footer>
        </>
    );
}

export default LandingPage;
