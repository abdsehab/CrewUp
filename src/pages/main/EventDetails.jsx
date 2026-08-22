import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Globe, Users, Award, Dumbbell, Shirt, Coffee, BadgeCheck } from 'lucide-react';
import { EVENTS } from '../../data/eventsData';

const REQ_ICONS = { walk: Dumbbell, shoe: Shirt, food: Coffee, award: Award };

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}
function formatTime(start, end) {
  const fmt = (d) => new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  return `${fmt(start)} – ${fmt(end)}`;
}

export default function EventDetails() {
  const { id } = useParams();
  const event = EVENTS.find((e) => e.id === Number(id));

  if (!event) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-white text-xl font-semibold">Event not found.</p>
      <Link to="/events" className="text-brand text-sm font-mono underline">← Back to Events</Link>
    </div>
  );

  const { title, category, start_time, end_time, location, address, is_remote, image_url,
          description, requirements, organizer, capacity, filled } = event;
  const filledPct = Math.round((filled / capacity) * 100);

  return (
    <div className="w-full">
      {/* ── Hero ── */}
      <section className="relative w-full h-[480px] overflow-hidden bg-dark-bg">
        {image_url
          ? <img src={image_url} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-40" />
          : <div className="absolute inset-0 bg-gradient-to-br from-dark-bg to-dark-surface" />}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent" />

        <div className="absolute bottom-0 w-full px-4 md:px-10 pb-10 max-w-7xl mx-auto left-1/2 -translate-x-1/2 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            <Link to="/events" className="flex items-center gap-1 text-light-muted text-xs font-mono hover:text-brand transition-colors w-fit">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Events
            </Link>
            <div className="flex flex-wrap gap-2">
              <span className="bg-dark-surface border border-dark-border text-light-muted text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full">{category}</span>
              <span className="border border-brand/40 text-brand text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                <BadgeCheck className="w-3 h-3" /> Verified Partner
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">{title}</h1>
            <p className="text-light-muted text-sm max-w-xl">{description[0]}</p>
          </div>

          {/* CTA — hidden on mobile (sticky bar handles it) */}
          <div className="hidden md:flex flex-col items-end gap-1 shrink-0">
            <button className="bg-brand text-dark-bg font-semibold px-8 py-4 rounded-xl hover:bg-brand-hover transition-colors flex items-center gap-2">
              Register to Volunteer →
            </button>
            <span className="text-brand text-xs font-mono">{filled} / {capacity} Filled</span>
          </div>
        </div>
      </section>

      {/* ── Content Grid ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* Left — details */}
        <div className="lg:col-span-8 flex flex-col gap-10">

          {/* About */}
          <div>
            <h2 className="text-xl font-semibold text-brand mb-4">About the Event</h2>
            <div className="space-y-3 text-light-muted text-sm leading-relaxed">
              {description.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          {/* Requirements & Perks */}
          <div>
            <h2 className="text-xl font-semibold text-brand mb-4">Requirements &amp; Perks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requirements.map((req) => {
                const Icon = REQ_ICONS[req.icon] ?? Award;
                return (
                  <div key={req.title} className="flex gap-4">
                    <Icon className="w-6 h-6 text-brand shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">{req.title}</h3>
                      <p className="text-light-muted text-sm">{req.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Organizer */}
          <div className="bg-dark-surface border border-dark-border rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img src={organizer.image} alt={organizer.name} className="w-14 h-14 rounded-full object-cover shrink-0" />
            <div className="flex-grow">
              <h3 className="text-white font-semibold flex items-center gap-2">
                {organizer.name} <BadgeCheck className="w-4 h-4 text-brand" />
              </h3>
              <p className="text-light-muted text-sm mt-1">{organizer.bio}</p>
            </div>
            <button className="text-brand text-xs font-mono uppercase tracking-widest hover:text-brand-hover transition-colors shrink-0">
              View Profile
            </button>
          </div>
        </div>

        {/* Right — sticky sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 bg-dark-surface border border-dark-border rounded-2xl p-6 flex flex-col gap-6">

            <div className="flex flex-col gap-1.5">
              <p className="text-[11px] font-mono uppercase tracking-widest text-light-muted flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-brand" /> Date &amp; Time</p>
              <p className="text-white font-semibold text-sm">{formatDate(start_time)}</p>
              <p className="text-light-muted text-sm">{formatTime(start_time, end_time)}</p>
            </div>

            <div className="h-px bg-dark-border" />

            <div className="flex flex-col gap-1.5">
              <p className="text-[11px] font-mono uppercase tracking-widest text-light-muted flex items-center gap-1.5">
                {is_remote ? <Globe className="w-3.5 h-3.5 text-brand" /> : <MapPin className="w-3.5 h-3.5 text-brand" />} Location
              </p>
              <p className="text-white font-semibold text-sm">{location}</p>
              <p className="text-light-muted text-sm">{address}</p>
            </div>

            <div className="h-px bg-dark-border" />

            <div className="flex flex-col gap-1.5">
              <p className="text-[11px] font-mono uppercase tracking-widest text-light-muted flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-brand" /> Capacity</p>
              <div className="w-full h-1.5 bg-dark-bg rounded-full overflow-hidden">
                <div className="h-full bg-brand rounded-full transition-all" style={{ width: `${filledPct}%` }} />
              </div>
              <p className="text-light-muted text-xs font-mono">{filled} / {capacity} spots filled</p>
            </div>

            {/* Map placeholder */}
            <div className="w-full h-28 rounded-xl overflow-hidden bg-dark-bg border border-dark-border flex items-center justify-center">
              <p className="text-light-muted text-[11px] font-mono uppercase tracking-widest opacity-50">Map · {location}</p>
            </div>
          </div>
        </aside>
      </section>

      {/* ── Sticky mobile CTA ── */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full p-4 bg-dark-bg/90 backdrop-blur-lg z-50 border-t border-dark-border">
        <button className="w-full bg-brand text-dark-bg font-semibold py-4 rounded-xl hover:bg-brand-hover transition-colors">
          Register to Volunteer →
        </button>
      </div>
    </div>
  );
}
