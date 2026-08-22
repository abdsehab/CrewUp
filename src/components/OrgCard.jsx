export default function OrgCard({ name, desc, events, volunteers, icon }) {
  return (
    <div className="bg-dark-surface border border-dark-border rounded-xl p-6 flex flex-col hover:-translate-y-1 transition-transform">
      <div className="flex items-start justify-between mb-4">
        <div className="w-16 h-16 rounded-lg bg-dark-bg flex items-center justify-center">
          {icon}
        </div>
        <span className="bg-dark-surface border border-dark-border/50 text-xs px-3 py-1 rounded-full text-light-muted">
          Verified
        </span>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{name}</h3>
      <p className="text-light-muted mb-6 flex-grow">{desc}</p>
      <div className="bg-dark-bg rounded-lg p-4 flex justify-between border border-dark-border/20">
        <div>
          <p className="text-xs uppercase text-light-muted mb-1">Impact</p>
          <p className="font-semibold text-brand">{events} Events Hosted</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase text-light-muted mb-1">Volunteers</p>
          <p className="font-semibold text-brand">{volunteers}</p>
        </div>
      </div>
    </div>
  );
}