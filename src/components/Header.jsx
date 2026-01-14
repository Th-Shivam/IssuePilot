import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const isActive = (path) => location.pathname === path;

  const isExplore = location.pathname === '/explore';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className={`navbar-container ${isExplore ? 'explore-mode' : ''}`}>
      <div className="navbar">
        <Link to="/" className="nav-left" style={{ textDecoration: 'none' }}>
          <span className="logo-text">IssuePilot</span>
        </Link>

        <nav className="nav-center">
          <Link to="/" className={`nav-icon ${isActive('/') ? 'active' : ''}`} title="Home">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </Link>
          <Link to="/explore" className={`nav-icon ${isActive('/explore') ? 'active' : ''}`} title="Explore">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
          </Link>
          <Link to="/community" className={`nav-icon ${isActive('/community') ? 'active' : ''}`} title="Community">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87"></path><path d="M16 3.13a4 4 0 010 7.75"></path></svg>
          </Link>
        </nav>

        <div className="nav-right">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '20px'
              }}>
                <img
                  src={user.user_metadata?.avatar_url}
                  alt={user.user_metadata?.user_name || 'User'}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 255, 255, 0.3)'
                  }}
                />
                <span style={{
                  fontSize: '0.85rem',
                  color: 'white',
                  fontWeight: '500'
                }}>
                  {user.user_metadata?.user_name || user.email}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="btn-signin"
                style={{ padding: '6px 16px', fontSize: '0.85rem' }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="btn-signin"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      <style>{`
        .navbar-container {
          position: fixed;
          top: 20px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          z-index: 100;
          padding: 0 20px;
          transition: all 0.4s ease;
        }

        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 900px;
          height: 64px;
          padding: 0 24px;
          
          /* Glassmorphism Specs (Default/Cinematic) */
          background: rgba(255, 255, 255, 0.05); /* Increased transparency */
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        /* Explore Mode Styles */
        .navbar-container.explore-mode {
          top: 0;
          padding: 0;
          background: rgba(10, 20, 60, 0.6); /* Translucent for glass effect */
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
        }

        .navbar-container.explore-mode .navbar {
          max-width: 100%; /* Full width */
          border-radius: 0;
          border: none;
          background: transparent;
          box-shadow: none;
          height: 60px; /* Stronger compaction */
        }

        .navbar:hover {
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 20px rgba(77, 163, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.25);
        }
        
        .navbar-container.explore-mode .navbar:hover {
            background: transparent;
            box-shadow: none;
        }

        /* Left: Logo */
        .nav-left {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        /* Center: Icons */
        .nav-center {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .nav-icon {
          color: rgba(255, 255, 255, 0.6);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        
        .nav-icon svg {
          width: 20px;
          height: 20px;
        }

        .nav-icon:hover, .nav-icon.active {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
        }

        /* Right: CTA */
        .btn-signin {
          background: transparent;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 8px 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-signin:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: white;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }

        @media (max-width: 600px) {
          .nav-text { display: none; }
          .nav-center { gap: 12px; }
          .navbar { padding: 0 16px; }
        }
      `}</style>
    </header>
  );
}

export default Header;
