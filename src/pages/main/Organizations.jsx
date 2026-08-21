import { Search, Building2, Globe, Users, ArrowRight } from 'lucide-react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Organizations = () => {
  return (
    <div className="w-full flex-grow p-6 lg:p-12 max-w-7xl mx-auto">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Partner Organizations</h1>
        <p className="text-light-muted text-lg max-w-2xl">Discover and connect with the environmental nonprofits and eco-tech startups driving change on our platform.</p>
      </div>

      <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-96 relative">
          <Input 
            id="search" 
            placeholder="Search organizations..." 
            icon={Search}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select className="w-full md:w-auto bg-dark-surface border border-dark-border text-white text-sm rounded-lg focus:ring-brand focus:border-brand block p-2.5 outline-none">
            <option>All Sectors</option>
            <option>Urban Farming</option>
            <option>Water Conservation</option>
            <option>Reforestation</option>
          </select>
          <Button variant="primary" className="whitespace-nowrap px-6">
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="p-6 flex flex-col h-full hover:border-brand/50 transition-colors group cursor-pointer">
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 rounded-2xl bg-dark-surface border border-dark-border flex items-center justify-center">
                <Building2 className="w-8 h-8 text-brand" />
              </div>
              <span className="bg-brand/10 text-brand text-xs font-mono px-3 py-1 rounded-full border border-brand/20">Active</span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">EcoTech Initiative {i}</h3>
            <p className="text-light-muted text-sm mb-6 flex-grow">A leading organization focused on implementing modern technology solutions for urban environmental challenges.</p>
            
            <div className="flex items-center gap-4 text-xs font-mono text-light-muted mb-6">
              <div className="flex items-center"><Globe className="w-4 h-4 mr-1" /> Global</div>
              <div className="flex items-center"><Users className="w-4 h-4 mr-1" /> 1.2k Stewards</div>
            </div>

            <div className="pt-4 border-t border-dark-border flex items-center justify-between mt-auto">
              <span className="text-sm font-semibold text-white group-hover:text-brand transition-colors">View Profile</span>
              <ArrowRight className="w-5 h-5 text-brand opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Organizations;
