function CommunityPage() {
    return (
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
            {/* Hero Section */}
            <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '900px', margin: '0 auto' }}>
                <h1 style={{
                    fontSize: '3rem',
                    marginBottom: '1.5rem',
                    color: 'white',
                    fontWeight: '700'
                }}>
                    Join Our Community
                </h1>


                {/* Two Column Layout */}
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    marginBottom: '3rem',
                    flexWrap: 'wrap'
                }}>
                    {/* Motivational Section */}
                    <div style={{
                        flex: '1',
                        minWidth: '300px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '3rem 2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <p style={{
                            color: 'var(--text-primary)',
                            fontSize: '1.3rem',
                            lineHeight: '1.8',
                            marginBottom: '1.5rem',
                            fontWeight: '500'
                        }}>
                            In this startup era, just doing DSA isn't enough anymore.
                        </p>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            marginBottom: '2rem'
                        }}>
                            You need to showcase your skills through real-world contributions.
                            Open source is your portfolio, your proof of work, and your gateway to opportunities.
                        </p>
                        <div style={{
                            display: 'inline-block',
                            padding: '1rem 2rem',
                            background: 'linear-gradient(135deg, rgba(77, 163, 255, 0.2), rgba(138, 43, 226, 0.2))',
                            border: '2px solid var(--accent-primary)',
                            borderRadius: '12px',
                            fontSize: '1.2rem',
                            fontWeight: '700',
                            color: 'var(--accent-primary)',
                            textAlign: 'center'
                        }}>
                            ✨ Start Contributing Today
                        </div>
                    </div>

                    {/* Community Links */}
                    <div style={{
                        flex: '1',
                        minWidth: '300px',
                        background: 'linear-gradient(135deg, rgba(77, 163, 255, 0.1), rgba(138, 43, 226, 0.1))',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '3rem 2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Connect With Us 🌟</h2>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.1rem',
                            margin: '0 auto 2rem',
                            lineHeight: '1.6'
                        }}>
                            Join our vibrant community of developers. Get help, share knowledge, and grow together!
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a
                                href="https://discord.gg/ygYn8dQbC"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none' }}
                            >
                                <button className="btn-primary" style={{
                                    padding: '1rem 2rem',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer'
                                }}>
                                    💬 Join Discord
                                </button>
                            </a>
                            <a
                                href="https://chat.whatsapp.com/Gk8Kyk5pEGWFOAkWp5hUVH"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none' }}
                            >
                                <button className="btn-primary" style={{
                                    padding: '1rem 2rem',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    background: 'transparent',
                                    border: '2px solid var(--accent-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer'
                                }}>
                                    💬 Join WhatsApp
                                </button>
                            </a>
                        </div>
                    </div>
                </div>


                {/* Leaderboard Coming Soon */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '3rem 2rem',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Leaderboard</h2>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.75rem 1.5rem',
                        background: 'rgba(77, 163, 255, 0.2)',
                        border: '1px solid var(--accent-primary)',
                        borderRadius: '20px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: 'var(--accent-primary)',
                        marginBottom: '1rem'
                    }}>
                        Coming Soon
                    </div>
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '1rem',
                        lineHeight: '1.6',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        We're building a leaderboard to showcase top contributors.
                        Start contributing now to secure your spot when it launches!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CommunityPage;
