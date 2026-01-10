import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="planet-glow"></div>
      <div className="stars"></div>

      <div className="hero-content container">
        <h1 className="hero-title">
          Begin Your <span className="gradient-text">Open Source</span> Journey
        </h1>
        <p className="hero-subtitle">
          Discover beginner-friendly GitHub issues tailored to your skills and start contributing with confidence.
        </p>

        <div className="hero-actions">
          <Link to="/explore" className="btn-primary">Explore Opportunities</Link>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-glass">Join Community</a>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          padding-top: 60px; /* Offset for fixed header if needed, but centering handles it mostly */
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 800px;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 3rem);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 24px;
          animation: fadeUp 1s ease-out;
        }

        .gradient-text {
          background: linear-gradient(135deg, #fff 0%, #4DA3FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: clamp(1.1rem, 2vw, 1.25rem);
          color: var(--text-secondary);
          margin-bottom: 40px;
          line-height: 1.6;
          animation: fadeUp 1s ease-out 0.2s backwards;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          animation: fadeUp 1s ease-out 0.4s backwards;
        }

        /* Planet Effect */
        .planet-glow {
          position: absolute;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, rgba(77, 163, 255, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          filter: blur(60px);
          z-index: 1;
          animation: pulseGlow 8s ease-in-out infinite alternate;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulseGlow {
          0% { transform: translateX(-50%) scale(0.9); opacity: 0.5; }
          100% { transform: translateX(-50%) scale(1.1); opacity: 0.8; }
        }
        
        @media (max-width: 600px) {
           .hero-actions { flex-direction: column; padding: 0 20px; }
        }
      `}</style>
    </section>
  );
}

export default HeroSection;
