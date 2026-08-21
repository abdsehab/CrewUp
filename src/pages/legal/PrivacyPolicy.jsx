
const PrivacyPolicy = () => {
  return (
    <div className="w-full flex-grow py-24 px-6">
      <div className="max-w-3xl mx-auto bg-dark-surface border border-dark-border rounded-2xl p-8 md:p-12 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-light-muted leading-relaxed text-sm md:text-base">
          <p>Last updated: August 2026</p>
          
          <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Information We Collect</h2>
          <p>
            CrewUp collects information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested (for delivery services), and other information you choose to provide.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Use of Information</h2>
          <p>
            We may use the information we collect about you to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, maintain, and improve our Services;</li>
            <li>Perform internal operations, including, for example, to prevent fraud and abuse of our Services;</li>
            <li>Send or facilitate communications between you and a Volunteer or Organization;</li>
            <li>Send you communications we think will be of interest to you, including information about products, services, promotions, news, and events of CrewUp and other companies, where permissible and according to local applicable laws.</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Sharing of Information</h2>
          <p>
            We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including as follows:
            With Organizations when you sign up for an event, we share your name, photo, and other necessary information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
