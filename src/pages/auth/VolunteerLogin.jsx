import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Leaf } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import bgImg from '../../assets/auth_volunteer.jpg';

const VolunteerLogin = () => {
  return (
    <div className="w-full flex-grow flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col p-16">
        <img src={bgImg} alt="Eco-Tech Facility" className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 mix-blend-overlay" />
        <div className="absolute inset-0 bg-dark-bg/30"></div>
        
        <div className="relative z-10 flex items-center space-x-2">
          <Leaf className="w-10 h-10 text-brand" />
          <span className="text-4xl font-bold tracking-tight text-brand">CrewUp</span>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-dark-surface border border-dark-border rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle green glow behind the card content */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-light-muted text-sm mb-8">Sign in to continue your stewardship journey.</p>

            <form className="space-y-6">
              <Input label="Email Address" id="email" type="email" icon={Mail} placeholder="volunteer@example.com" />
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="text-xs font-mono uppercase tracking-wider text-light-muted">Password</label>
                  <a href="#" className="text-xs text-brand hover:underline">Forgot?</a>
                </div>
                <Input id="password" type="password" icon={Lock} placeholder="••••••••" />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="rounded border-dark-border bg-dark-bg text-brand focus:ring-brand focus:ring-offset-dark-surface" />
                <label htmlFor="remember" className="text-sm text-light-muted">Remember me</label>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" className="w-full group rounded-xl font-semibold">
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>

            <div className="mt-8 text-center text-sm text-light-muted">
              Don't have an account? <Link to="/auth/volunteer-register" className="text-brand hover:underline">Register here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerLogin;
