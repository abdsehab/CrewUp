import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

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
          <Link to="/auth/login" className="hidden md:inline-block text-sm font-medium text-light hover:text-brand transition-colors">
            Login
          </Link>
          <Link 
            to="/auth/register" 
            className="bg-brand text-dark-bg hover:bg-brand-hover px-5 py-2 rounded-full text-sm font-semibold transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
