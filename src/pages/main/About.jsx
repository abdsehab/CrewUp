import Card from '../../components/common/Card';
import { Target, Users, Globe2 } from 'lucide-react';

const About = () => {
  return (
    <div className="w-full flex-grow py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Empowering the <span className="text-brand">Next Generation</span> of Stewards
          </h1>
          <p className="text-lg text-light-muted">
            CrewUp was founded on a simple principle: connecting passionate individuals with organizations that are making a real, tangible impact on our environment through technology and coordinated action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-dark-bg border border-dark-border rounded-full flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-brand" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-light-muted leading-relaxed">
              To build the largest, most effective network of eco-tech volunteers and organizations, driving measurable environmental change.
            </p>
          </Card>

          <Card className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-dark-bg border border-dark-border rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-brand" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">The Community</h3>
            <p className="text-light-muted leading-relaxed">
              We bring together technologists, environmentalists, students, and professionals who share a common goal of planetary stewardship.
            </p>
          </Card>

          <Card className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-dark-bg border border-dark-border rounded-full flex items-center justify-center mb-6">
              <Globe2 className="w-8 h-8 text-brand" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Global Impact</h3>
            <p className="text-light-muted leading-relaxed">
              From local cleanups to global tech-driven conservation projects, our network spans across borders to create worldwide change.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
