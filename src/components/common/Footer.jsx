import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-dark-surface border-t border-dark-border py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-brand" />
            <span className="text-xl font-semibold tracking-tight text-brand">CrewUp</span>
          </Link>
          <p className="text-sm text-light-muted">
            Mobilizing communities for high-impact eco-tech initiatives.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold text-light mb-4 text-sm tracking-wider uppercase">Platform</h3>
          <ul className="space-y-2 text-sm text-light-muted">
            <li><Link to="/events" className="hover:text-brand transition-colors">Explore Events</Link></li>
            <li><Link to="/about" className="hover:text-brand transition-colors">About Us</Link></li>
            <li><Link to="/auth/org-register" className="hover:text-brand transition-colors">For Organizations</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-light mb-4 text-sm tracking-wider uppercase">Legal</h3>
          <ul className="space-y-2 text-sm text-light-muted">
            <li><Link to="/legal/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link></li>
            <li><Link to="/legal/terms" className="hover:text-brand transition-colors">Terms of Service</Link></li>
            <li><Link to="/legal/guidelines" className="hover:text-brand transition-colors">Volunteer Guidelines</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-light mb-4 text-sm tracking-wider uppercase">Support</h3>
          <ul className="space-y-2 text-sm text-light-muted">
            <li><Link to="/legal/support" className="hover:text-brand transition-colors">Contact Support</Link></li>
            <li><a href="mailto:hello@crewup.example.com" className="hover:text-brand transition-colors">hello@crewup.example.com</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-dark-border text-center text-sm text-light-muted">
        &copy; {new Date().getFullYear()} CrewUp Platform Network. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
