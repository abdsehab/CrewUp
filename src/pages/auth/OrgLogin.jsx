import { Link, useNavigate } from 'react-router-dom'; // 1. Added useNavigate
import { Mail, Lock, ArrowRight, Eye, Building2, ShieldCheck } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import bgImg from '../../assets/auth_org.jpg';

const OrgLogin = () => {
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/organizer/dashboard'); 
  };

  return (
    <div className="w-full flex-grow flex">
      {/* Left side - Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center p-16 border-r border-dark-border">
        {/* Abstract pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#2A2E2C_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
        
        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-bold text-brand mb-6 leading-tight">CrewUp Portal</h1>
          <p className="text-light-muted text-lg leading-relaxed mb-16">
            The central command for eco-tech stewards. Manage events, coordinate volunteers, and track your organization's impact in real-time.
          </p>

          {/* Feature Image/Card */}
          <div className="relative rounded-2xl overflow-hidden border border-dark-border shadow-2xl">
            <img src={bgImg} alt="Control Room" className="w-full h-auto object-cover grayscale opacity-80" />
            <div className="absolute inset-0 bg-brand/10 mix-blend-overlay"></div>
          </div>

          <div className="mt-16 flex items-center space-x-6 text-xs font-mono tracking-widest text-light-muted uppercase">
            <div className="flex items-center">
              <ShieldCheck className="w-4 h-4 text-brand mr-2" /> SECURE ACCESS
            </div>
            <div>• REAL-TIME ANALYTICS</div>
            <div>• VOLUNTEER COORDINATION</div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-dark-surface border border-dark-border rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle green glow behind the card content */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-2">Organizer Sign In</h2>
            <p className="text-light-muted text-sm mb-8">Welcome back to your dashboard.</p>

            {/* 4. Added onSubmit handler to the form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input label="Organization Email" id="email" type="email" icon={Mail} placeholder="admin@eco-tech.org" />
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="text-xs font-mono uppercase tracking-wider text-light-muted">Password</label>
                  <a href="#" className="text-xs text-brand hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Input id="password" type="password" icon={Lock} placeholder="••••••••" />
                  <button type="button" className="absolute right-3 top-[11px] text-light-muted hover:text-white transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="rounded border-dark-border bg-dark-bg text-brand focus:ring-brand focus:ring-offset-dark-surface" />
                <label htmlFor="remember" className="text-sm text-light-muted">Remember this device</label>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" className="w-full group rounded-md">
                  <span className="font-semibold text-sm tracking-wide">Access Portal</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-dark-border"></div>
                <span className="flex-shrink-0 mx-4 text-xs font-mono text-light-muted uppercase">OR</span>
                <div className="flex-grow border-t border-dark-border"></div>
              </div>

              <Button type="button" variant="secondary" className="w-full rounded-md flex items-center justify-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span className="text-sm">Sign in with Organization SSO</span>
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-light-muted">
              New organization? <Link to="/auth/org-register" className="text-brand hover:underline">Register your NGO</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgLogin;