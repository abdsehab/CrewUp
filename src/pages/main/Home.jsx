import { ArrowRight, CheckCircle2, Search, Activity, Award, Calendar, MapPin, Plus } from 'lucide-react';
import Button from '../../components/common/Button';
import heroImg from '../../assets/hero.jpg';

const Home = () => {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Column - Content */}
        <div className="space-y-8 pr-0 lg:pr-8">
          <div className="inline-flex items-center space-x-2 border border-dark-border rounded-full px-4 py-1.5 bg-dark-surface/50 text-xs font-mono tracking-wider text-brand">
            <span className="w-2 h-2 rounded-full bg-brand"></span>
            <span>NEXT-GEN STEWARDSHIP</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Mobilizing Communities for <span className="text-brand">Eco-Tech</span> Impact
          </h1>

          <p className="text-lg text-light-muted max-w-xl leading-relaxed">
            CrewUp leverages modern technology to seamlessly connect passionate volunteers with high-impact environmental organizations. Discover initiatives, track your stewardship hours, and earn verified digital credentials.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Button to="/auth/volunteer-register" variant="primary" className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl flex items-center justify-center font-semibold">
              Join as Volunteer <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button to="/auth/org-register" variant="secondary" className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl flex items-center justify-center font-semibold">
              Register Organization
            </Button>
          </div>
        </div>

        {/* Right Column - Hero Image */}
        <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden border border-dark-border shadow-2xl">
          <img src={heroImg} alt="Volunteers in action" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent"></div>
          
          {/* Floating Impact Card */}
          <div className="absolute bottom-8 right-8 bg-dark-bg/90 backdrop-blur-md border border-dark-border rounded-2xl p-6 flex items-center space-x-4 shadow-xl">
            <div className="bg-brand text-dark-bg p-2 rounded-full">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-mono text-light-muted tracking-wider uppercase">Community Impact</p>
              <p className="text-2xl font-bold text-white">12,450 Hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Platform Capabilities */}
      <div className="bg-dark-surface border-y border-dark-border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Platform Capabilities</h2>
            <p className="text-light-muted max-w-2xl mx-auto">Everything you need to organize, execute, and verify environmental stewardship initiatives at scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-dark-bg border border-dark-border rounded-2xl p-8 hover:border-brand/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-dark-surface flex items-center justify-center mb-6 border border-dark-border">
                <Search className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Intelligent Discovery</h3>
              <p className="text-light-muted text-sm leading-relaxed">Find local eco-initiatives that match your skills and schedule using our smart matching algorithm.</p>
            </div>

            <div className="bg-dark-bg border border-dark-border rounded-2xl p-8 hover:border-brand/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-dark-surface flex items-center justify-center mb-6 border border-dark-border">
                <Activity className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Frictionless Tracking</h3>
              <p className="text-light-muted text-sm leading-relaxed">Log your volunteer hours effortlessly on-site with geofenced check-ins and one-tap confirmations.</p>
            </div>

            <div className="bg-dark-bg border border-dark-border rounded-2xl p-8 hover:border-brand/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-dark-surface flex items-center justify-center mb-6 border border-dark-border">
                <Award className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Digital Certificates</h3>
              <p className="text-light-muted text-sm leading-relaxed">Earn verified digital credentials for your contributions, perfect for LinkedIn or professional portfolios.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Trending Events */}
      <div className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Trending Events</h2>
            <p className="text-light-muted">High-priority eco-missions happening near you.</p>
          </div>
          <a href="#" className="mt-4 md:mt-0 inline-flex items-center text-brand font-mono text-xs uppercase tracking-widest hover:underline">
            View All Missions <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Main Event Card */}
          <div className="relative rounded-3xl overflow-hidden border border-dark-border shadow-xl h-[450px] group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-dark-bg mix-blend-overlay z-0"></div>
            <img src={heroImg} className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 transition-transform duration-700" alt="Hydroponics" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent"></div>
            
            <div className="absolute top-6 right-6 flex space-x-4 text-xs font-mono uppercase tracking-widest text-white">
              <span>About</span>
              <span>Features</span>
              <span>Contact</span>
            </div>

            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex space-x-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-dark-surface border border-dark-border text-xs font-mono text-white">Urban Farming</span>
                <span className="px-3 py-1 rounded-full bg-brand/10 border border-brand/50 text-brand text-xs font-mono">High Priority</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">Metro Hydroponics Setup</h3>
              <div className="flex items-center space-x-6 text-sm text-light-muted">
                <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> Oct 24, 2024</div>
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> Downtown Sector</div>
              </div>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-8 h-[450px]">
            {/* Secondary Event Card */}
            <div className="relative rounded-3xl overflow-hidden border border-dark-border shadow-xl group cursor-pointer p-8 flex flex-col justify-end bg-gradient-to-br from-dark-surface to-dark-bg">
              <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-transparent"></div>
              
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-dark-bg border border-dark-border text-xs font-mono text-white mb-3">Water Quality</span>
                <h3 className="text-2xl font-bold text-white mb-2">River Basin Testing</h3>
                <p className="text-sm text-light-muted mb-6 max-w-sm">Assist environmental scientists in gathering crucial data for the annual watershed report.</p>
                <div className="text-brand text-xs font-mono uppercase tracking-widest flex items-center group-hover:underline">
                  Join Mission <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>

            {/* Explore More Card */}
            <div className="relative rounded-3xl overflow-hidden border border-dark-border shadow-xl p-8 flex flex-col items-center justify-center text-center bg-dark-surface">
              <div className="w-12 h-12 rounded-full border border-dark-border bg-dark-bg flex items-center justify-center mb-6 group-hover:bg-brand transition-colors cursor-pointer group">
                <Plus className="w-6 h-6 text-brand group-hover:text-dark-bg transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Explore 40+ More Events</h3>
              <p className="text-sm text-light-muted mb-6">Find the perfect mission for your skills and schedule.</p>
              <button className="px-6 py-2 rounded-lg bg-dark-bg border border-dark-border text-xs font-mono uppercase tracking-widest text-light hover:border-brand hover:text-brand transition-colors">
                Open Directory
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
