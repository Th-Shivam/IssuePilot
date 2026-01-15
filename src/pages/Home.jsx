import HeroSection from '../components/HeroSection';

function Home() {
  return (
    <>
      <HeroSection />

      {/* Signature Branding */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "40px",
          fontFamily: "'Great Vibes', cursive",
          fontSize: "3rem",
          color: "#ffffff", // Solid white
          zIndex: 2147483647, // Max z-index
          pointerEvents: "none",
          transform: "rotate(-5deg)",
          textShadow: "0 2px 4px rgba(0,0,0,0.5), 0 0 15px rgba(255, 255, 255, 0.6)", // Better contrast with shadow
          letterSpacing: "2px",
          opacity: 0.8 // Slight transparency for watermark feel
        }}
      >
        Shivam
      </div>
    </>
  );
}

export default Home;
