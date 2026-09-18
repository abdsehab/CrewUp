import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Leaf, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate('/');
  };

  const displayName = user?.displayName || user?.username;

  return (
    <nav className="w-full bg-dark-bg/80 backdrop-blur-md border-b border-dark-border py-4 px-6 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <Leaf className="h-6 w-6 text-brand transition-transform group-hover:scale-110" />
          <span className="text-xl font-semibold tracking-tight text-brand">CrewUp</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link to="/events" className={`transition-colors hover:text-brand ${location.pathname === '/events' ? 'text-brand' : 'text-light'}`}>
            Explore Events
          </Link>
          <Link to="/organizations" className={`transition-colors hover:text-brand ${location.pathname === '/organizations' ? 'text-brand' : 'text-light'}`}>
            Organizations
          </Link>
          <Link to="/about" className={`transition-colors hover:text-brand ${location.pathname === '/about' ? 'text-brand' : 'text-light'}`}>
            About Us
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {loading ? null : user ? (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen((open) => !open)} className="flex items-center space-x-2 group">
                <div className="w-9 h-9 rounded-full bg-dark-bg border border-brand overflow-hidden flex items-center justify-center select-none">
                  {/* profileImage = "https://i.pravatar.cc/150?img=12" (hardcoded image) 
                      Later: profileImage = user.profileImage */}
                  <img src={user?.profileImage || "https://i.pravatar.cc/150?img=12"} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span className="hidden md:inline text-sm font-medium text-light group-hover:text-brand transition-colors max-w-[120px] truncate">
                  {displayName}
                </span>
                <ChevronDown className={`w-4 h-4 text-light-muted transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-3 w-44 bg-dark-surface border border-dark-border rounded-xl py-2 shadow-xl">
                  {user?.role === 'volunteer' && (
                    <Link 
                      to="/volunteer/dashboard" 
                      onClick={() => setMenuOpen(false)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-light-muted hover:text-brand transition-colors"
                    >
                      Dashboard
                    </Link>
                  )}
                  {user?.role === 'organization' && (
                    <Link 
                      to="/organizer/dashboard" 
                      onClick={() => setMenuOpen(false)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-light-muted hover:text-brand transition-colors"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-light-muted hover:text-brand transition-colors">
                    <LogOut className="w-4 h-4" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/auth/login" className="hidden md:inline-block text-sm font-medium text-light hover:text-brand transition-colors">
                Login
              </Link>
              <Link 
                to="/auth/register" 
                className="bg-brand text-dark-bg hover:bg-brand-hover px-5 py-2 rounded-full text-sm font-semibold transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;