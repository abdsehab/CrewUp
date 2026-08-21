export default function OrgCard({ name, desc, events, volunteers, icon }) {
  return (
    <div className="bg-surface-alt border border-border rounded-xl p-6 flex flex-col hover:-translate-y-1 transition-transform">
      <div className="flex items-start justify-between mb-4">
        <div className="w-16 h-16 rounded-lg bg-surface flex items-center justify-center">
          {icon}
        </div>
        <span className="bg-surface-alt border border-border-alt/50 text-xs px-3 py-1 rounded-full text-text-muted">
          Verified
        </span>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-text-main">{name}</h3>
      <p className="text-text-muted mb-6 flex-grow">{desc}</p>
      <div className="bg-surface rounded-lg p-4 flex justify-between border border-border-alt/20">
        <div>
          <p className="text-xs uppercase text-text-muted mb-1">Impact</p>
          <p className="font-semibold text-accent">{events} Events Hosted</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase text-text-muted mb-1">Volunteers</p>
          <p className="font-semibold text-accent">{volunteers}</p>
        </div>
      </div>
    </div>
  );
}