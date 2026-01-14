import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

function Login() {
    const { user, signInWithGitHub, loading } = useAuth();

    // Redirect if already logged in
    if (user) {
        return <Navigate to="/explore" replace />;
    }

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                color: 'var(--text-primary)'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚀</div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '120px', minHeight: '80vh' }}>
            <div style={{
                maxWidth: '500px',
                margin: '0 auto',
                textAlign: 'center',
                padding: '3rem 2rem'
            }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        marginBottom: '1rem',
                        color: 'white'
                    }}>
                        Welcome to IssuePilot
                    </h1>
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '1.1rem',
                        lineHeight: '1.6'
                    }}>
                        Find your next open source contribution opportunity
                    </p>
                </div>

                <div style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '2.5rem',
                    marginTop: '2rem'
                }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Sign in to continue</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Connect with your GitHub account to explore issues
                        </p>
                    </div>

                    <button
                        onClick={signInWithGitHub}
                        className="btn-primary"
                        style={{
                            width: '100%',
                            padding: '1rem 2rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            background: '#24292e',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.background = '#1a1e22'}
                        onMouseOut={(e) => e.target.style.background = '#24292e'}
                    >
                        <svg height="20" width="20" viewBox="0 0 16 16" fill="white">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                        Sign in with GitHub
                    </button>

                    <p style={{
                        marginTop: '1.5rem',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.5'
                    }}>
                        By signing in, you agree to our terms of service and privacy policy
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
