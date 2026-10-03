import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ShieldAlert } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import { API_BASE } from '../../utils/api';
import { CLOUDINARY_IMAGES } from '../../constants/cloudinaryImages';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username: formData.email, password: formData.password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            if (data.role && data.role !== 'admin') {
                throw new Error('Unauthorized Access.');
            }

            login(data);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex-grow flex relative min-h-screen items-center justify-center">
            <img src={CLOUDINARY_IMAGES.auth_volunteer} alt="Eco-Tech Facility" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay grayscale" />
            <div className="absolute inset-0 bg-red-900/40 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-[#101413]/80"></div>

            <div className="relative z-10 w-full max-w-md p-6">
                <div className="flex items-center justify-center space-x-2 text-red-500 mb-8">
                    <ShieldAlert className="w-10 h-10" />
                    <span className="text-4xl font-bold tracking-tight">Admin Portal</span>
                </div>

                <div className="bg-[#1c201f]/90 backdrop-blur-sm border border-red-900/40 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-2">System Access</h2>
                        <p className="text-[#c1cab3] text-sm mb-8">Authorized personnel only.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && <div className="p-3 bg-red-900/30 border border-red-500/50 rounded text-red-200 text-sm">{error}</div>}
                            <Input label="Email Address" id="email" type="email" icon={Mail} placeholder="Enter admin email" value={formData.email} onChange={handleChange} required />

                            <div>
                                <label htmlFor="password" className="text-xs font-mono uppercase tracking-wider text-[#c1cab3] block mb-2">Master Password</label>
                                <Input id="password" type="password" icon={Lock} placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                            </div>

                            <div className="pt-2">
                                <Button type="submit" variant="primary" className="w-full group rounded-xl font-semibold bg-red-600 hover:bg-red-700 text-white border-none" disabled={loading}>
                                    <span>{loading ? 'Authenticating...' : 'Secure Login'}</span>
                                    {!loading && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
