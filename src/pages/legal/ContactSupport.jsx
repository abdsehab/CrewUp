import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Mail, MessageSquare } from 'lucide-react';

const ContactSupport = () => {
  return (
    <div className="w-full flex-grow py-24 px-6 flex items-center justify-center">
      <div className="max-w-xl w-full bg-dark-surface border border-dark-border rounded-2xl p-8 md:p-12 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-4">Contact Support</h1>
        <p className="text-light-muted mb-8">Need help? We're here for you. Fill out the form below and our team will get back to you shortly.</p>
        
        <form className="space-y-6">
          <Input label="Your Name" id="name" placeholder="Full Name" />
          <Input label="Email Address" id="email" type="email" icon={Mail} placeholder="you@example.com" />
          
          <div className="flex flex-col mb-4">
            <label className="text-xs font-mono uppercase tracking-wider text-light-muted mb-2">Message</label>
            <div className="relative">
              <div className="absolute top-3 left-3 flex items-center pointer-events-none">
                <MessageSquare className="h-5 w-5 text-light-muted" />
              </div>
              <textarea 
                className="w-full bg-dark-bg border border-dark-border text-light rounded-md shadow-sm focus:ring-1 focus:ring-brand focus:border-brand focus:outline-none pl-10 pr-3 py-3 text-sm placeholder-light-muted placeholder-opacity-50 min-h-[120px]"
                placeholder="How can we help you?"
              ></textarea>
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactSupport;
