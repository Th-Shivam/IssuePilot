import { useState, useEffect } from 'react';

function VideoBackground() {
    const [shouldPlay, setShouldPlay] = useState(true);
    const [videoLoaded, setVideoLoaded] = useState(false);

    useEffect(() => {
        // Check system preference for reduced motion
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        // Initial check
        if (mediaQuery.matches) {
            setShouldPlay(false);
        }

        // Listener for changes
        const handleMotionChange = (e) => setShouldPlay(!e.matches);
        mediaQuery.addEventListener('change', handleMotionChange);

        return () => mediaQuery.removeEventListener('change', handleMotionChange);
    }, []);

    if (!shouldPlay) {
        return (
            <div className="video-background-container static-fallback">
                <div className="video-overlay"></div>
                {/* Static fallback visual handled by CSS on .static-fallback */}
            </div>
        );
    }

    return (
        <div className="video-background-container" style={{ backgroundColor: '#0A1A3F' }}>
            <video
                autoPlay
                loop
                muted
                playsInline
                className={`video-bg ${videoLoaded ? 'loaded' : 'loading'}`}
                onLoadedData={() => setVideoLoaded(true)}
            >
                <source src="bg.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay"></div>
        </div>
    );
}

export default VideoBackground;
