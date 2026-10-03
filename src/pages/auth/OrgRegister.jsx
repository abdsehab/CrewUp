import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { API_BASE } from '../../utils/api';

const OrgRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orgName: '',
    email: '',
    password: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let imageUrl = undefined;

      if (imageFile) {
        const fd = new FormData();
        fd.append("file", imageFile);
        fd.append("upload_preset", "ml_default");

        try {
          const uploadRes = await fetch("https://api.cloudinary.com/v1_1/dsemiizxm/image/upload", {
            method: "POST",
            body: fd
          });
          const uploadData = await uploadRes.json();
          if (uploadData.secure_url) {
            imageUrl = uploadData.secure_url;
          }
        } catch (uploadErr) {
          console.error("Cloudinary upload failed:", uploadErr);
        }
      }

      const response = await fetch(`${API_BASE}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.email,
          displayName: formData.orgName,
          password: formData.password,
          role: 'organization',
          image: imageUrl
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      navigate('/auth/org-login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
            {error && <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded text-red-200 text-sm">{error}</div>}

            <Input label="Organization Name *" id="orgName" placeholder="e.g., Eco-Tech Stewardship" value={formData.orgName} onChange={handleChange} required />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Primary Contact Email *" id="email" type="email" icon={Mail} placeholder="contact@organization.org" value={formData.email} onChange={handleChange} required />
              <Input label="Password *" id="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="flex flex-col gap-1 mt-1">
              <label className="text-sm font-medium text-light-muted mb-1">Organization Logo (Optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full text-sm text-[#e0e3e1] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-[#324539] file:text-[#afff66] file:font-semibold hover:file:bg-[#24342A] file:cursor-pointer file:transition outline-none cursor-pointer"
              />
            </div>

            <div className="pt-8 border-t border-dark-border flex items-center justify-between">
              <Link to="/auth/org-login" className="text-sm text-light-muted hover:text-brand transition-colors">
                Cancel
              </Link>
              <Button type="submit" variant="primary" className="group rounded-md" disabled={loading}>
                <span className="font-mono text-sm tracking-widest uppercase">{loading ? 'Submitting...' : 'Submit Registration'}</span>
                {!loading && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
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