import { Link, useNavigate } from 'react-router-dom';
import { Globe, Mail, Hash, UploadCloud, ArrowRight } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const OrgRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/auth/org-login');
  };

  return (
    <div className="w-full flex-grow flex items-center justify-center p-6 md:p-12 relative">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-brand mb-4">Register Organization</h1>
          <p className="text-light-muted text-sm max-w-lg mx-auto">
            Join the CrewUp ecosystem. Provide your organization's details to begin coordinating impactful events and managing volunteers efficiently.
          </p>
        </div>

        <div className="bg-dark-surface border border-dark-border rounded-xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <Input label="Organization Name *" id="orgName" placeholder="e.g., Eco-Tech Stewardship" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Website URL" id="website" icon={Globe} placeholder="https://example.org" />
              <Input label="Primary Contact Email *" id="email" type="email" icon={Mail} placeholder="contact@organization.org" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Tax ID / EIN" id="taxId" icon={Hash} placeholder="XX-XXXXXXX" />
              
              <div className="flex flex-col mb-4">
                <label className="text-xs font-mono uppercase tracking-wider text-light-muted mb-2">Organization Type</label>
                <select className="w-full bg-dark-bg border border-dark-border text-light rounded-md shadow-sm focus:ring-1 focus:ring-brand focus:border-brand focus:outline-none px-3 py-2.5 text-sm appearance-none">
                  <option>Select type</option>
                  <option>Non-profit (501c3)</option>
                  <option>Educational Institution</option>
                  <option>Community Group</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-xs font-mono uppercase tracking-wider text-light-muted mb-2">Mission Statement *</label>
              <textarea 
                className="w-full bg-dark-bg border border-dark-border text-light rounded-md shadow-sm focus:ring-1 focus:ring-brand focus:border-brand focus:outline-none px-3 py-3 text-sm placeholder-light-muted placeholder-opacity-50 min-h-[100px]"
                placeholder="Describe your organization's core purpose and impact goals..."
              ></textarea>
            </div>

            <div className="pt-2">
              <label className="text-xs font-mono uppercase tracking-wider text-light-muted mb-3 block">Verification Documents</label>
              <p className="text-xs text-light-muted mb-4">Please upload 501(c)(3) determination letters, official club charters, or other proof of status.</p>
              
              <div className="border-2 border-dashed border-dark-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-brand/50 transition-colors cursor-pointer bg-dark-bg/50">
                <UploadCloud className="w-10 h-10 text-light-muted mb-4" />
                <p className="text-sm font-medium text-white mb-1">Drag & drop files here</p>
                <p className="text-xs font-mono text-light-muted mb-4">or click to browse (Max 5MB per file)</p>
                <p className="text-[10px] text-light-muted uppercase tracking-widest">Supported: PDF, JPG, PNG</p>
              </div>
            </div>

            <div className="pt-8 border-t border-dark-border flex items-center justify-between">
              <Link to="/auth/org-login" className="text-sm text-light-muted hover:text-brand transition-colors">
                Cancel
              </Link>
              <Button type="submit" variant="primary" className="group rounded-md">
                <span className="font-mono text-sm tracking-widest uppercase">Submit Registration</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

          </form>
        </div>

        <div className="mt-8 flex justify-center space-x-6 text-xs text-light-muted">
          <Link to="/legal/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/legal/terms" className="hover:text-white">Terms of Service</Link>
          <Link to="/legal/support" className="hover:text-white">Support</Link>
        </div>
      </div>
    </div>
  );
};

export default OrgRegister;