import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { CLOUDINARY_IMAGES } from '../../constants/cloudinaryImages';
import { API_BASE } from '../../utils/api';

const VolunteerRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.email,
          displayName: formData.name.trim(),
          password: formData.password,
          role: 'volunteer'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      navigate('/auth/volunteer-login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex-grow flex">
      {/* Left side - Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-end p-16">
        <img src={CLOUDINARY_IMAGES.auth_volunteer} alt="Volunteers" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
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
            <p className="text-light-muted text-sm mb-6">Enter your details to configure your stewardship profile.</p>

            {error && <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded text-red-200 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <Input label="Name" id="name" placeholder="Jane Doe" value={formData.name} onChange={handleChange} required />
              </div>
              
              <Input label="Email Address" id="email" type="email" icon={Mail} placeholder="jane.doe@example.com" value={formData.email} onChange={handleChange} required />
              <Input label="Password" id="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />

              <div className="pt-2">
                <Button type="submit" variant="primary" className="w-full group rounded-xl" disabled={loading}>
                  <span className="font-mono text-sm tracking-widest uppercase">{loading ? 'INITIALIZING...' : 'INITIALIZE PROFILE'}</span>
                  {!loading && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
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
