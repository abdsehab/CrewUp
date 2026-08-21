export default function OrgCard({ name, desc, events, volunteers, icon }) {
  return (
    <div className="bg-[#24342A] border border-[#324539] rounded-xl p-6 flex flex-col hover:-translate-y-1 transition-transform">
      <div className="flex items-start justify-between mb-4">
        <div className="w-16 h-16 rounded-lg bg-surface-container-high flex items-center justify-center">
          {icon}
        </div>
        <span className="bg-[#24342A] border border-outline-variant/50 text-xs px-3 py-1 rounded-full">Verified</span>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-primary">{name}</h3>
      <p className="text-on-surface-variant mb-6 flex-grow">{desc}</p>
      <div className="bg-surface-container-high rounded-lg p-4 flex justify-between border border-outline-variant/20">
        <div>
          <p className="text-xs uppercase text-on-surface-variant mb-1">Impact</p>
          <p className="font-semibold text-primary-fixed">{events} Events Hosted</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase text-on-surface-variant mb-1">Volunteers</p>
          <p className="font-semibold text-primary-fixed">{volunteers}</p>
        </div>
      </div>
    </div>
  );
}