import { Link, useNavigate } from 'react-router-dom';
import { Mail, MapPin, ArrowRight } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import bgImg from '../../assets/auth_volunteer.jpg';

const VolunteerRegister = () => {
  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/auth/volunteer-login');
  };
  return (
    <div className="w-full flex-grow flex">
      {/* Left side - Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-end p-16">
        <img src={bgImg} alt="Volunteers" className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 mix-blend-overlay" />
        <div className="absolute inset-0 bg-dark-bg/40"></div>
        
        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-bold text-brand mb-6 leading-tight">Mobilize for Impact.</h1>
          <p className="text-light-muted text-lg leading-relaxed mb-8">
            Join a network of proactive stewards. Connect with high-leverage eco-tech initiatives and track your real-world progress.
          </p>
          <div className="flex items-center space-x-2 text-sm font-mono tracking-widest text-light-muted uppercase">
            <span className="w-4 h-4 rounded-full border-2 border-brand flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-brand rounded-full"></span>
            </span>
            <span>CREWUP PLATFORM NETWORK</span>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-dark-surface border border-dark-border rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle green glow behind the card content */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-light-muted text-sm mb-8">Enter your details to configure your stewardship profile.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" id="firstName" placeholder="Jane" />
                <Input label="Last Name" id="lastName" placeholder="Doe" />
              </div>
              
              <Input label="Email Address" id="email" type="email" icon={Mail} placeholder="jane.doe@example.com" />
              <Input label="Primary Location" id="location" icon={MapPin} placeholder="City, Region" />

              <div className="pt-2">
                <label className="text-xs font-mono uppercase tracking-wider text-light-muted mb-3 block">Areas of Interest</label>
                <div className="flex flex-wrap gap-2">
                  {['Environmental', 'Education', 'Tech Support', 'Logistics'].map((tag) => (
                    <button key={tag} type="button" className="px-4 py-2 rounded-full border border-dark-border bg-dark-bg text-xs font-medium text-light hover:border-brand hover:text-brand transition-colors">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Button type="submit" variant="primary" className="w-full group rounded-xl">
                  <span className="font-mono text-sm tracking-widest uppercase">INITIALIZE PROFILE</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>

            <div className="mt-8 text-center text-sm text-light-muted">
              Already have a configuration? <Link to="/auth/volunteer-login" className="text-brand hover:underline">Log in here.</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerRegister;
