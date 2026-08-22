import { Link } from 'react-router-dom';
import { User, Building2, ArrowRight } from 'lucide-react';
import Card from '../../components/common/Card';

const RegisterSelection = () => {
  return (
    <div className="flex-grow flex items-center justify-center p-6 relative h-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand/5 rounded-full blur-[100px]"></div>
      
      <div className="max-w-4xl w-full relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Join CrewUp</h1>
        <p className="text-light-muted text-lg mb-12">Choose how you want to make an impact.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Link to="/auth/volunteer-register" className="block group">
            <Card className="p-8 h-full flex flex-col items-center justify-center border-dark-border hover:border-brand transition-all duration-300 hover:-translate-y-1 bg-dark-bg/50 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-full bg-dark-surface flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <User className="w-8 h-8 text-brand" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Volunteer</h3>
              <p className="text-light-muted text-sm mb-6">Create a profile to discover local eco-missions.</p>
              <div className="flex items-center text-brand text-sm font-semibold mt-auto">
                Register <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </Card>
          </Link>

          <Link to="/auth/org-register" className="block group">
            <Card className="p-8 h-full flex flex-col items-center justify-center border-dark-border hover:border-brand transition-all duration-300 hover:-translate-y-1 bg-dark-bg/50 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-full bg-dark-surface flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8 text-brand" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Organization</h3>
              <p className="text-light-muted text-sm mb-6">Register your NGO to recruit and manage stewards.</p>
              <div className="flex items-center text-brand text-sm font-semibold mt-auto">
                Register <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterSelection;
