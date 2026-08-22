import { Link } from 'react-router-dom';
import { Calendar, Globe, Leaf, MapPin, Network, Terminal, Wifi } from 'lucide-react';

// ─── Icon map: string key from DB → React component ──────────
const ICON_MAP = {
  leaf:     <Leaf     className="w-5 h-5 text-brand" />,
  network:  <Network  className="w-5 h-5 text-brand" />,
  terminal: <Terminal className="w-5 h-5 text-brand" />,
  tree:     <Leaf     className="w-5 h-5 text-brand" />,
  wifi:     <Wifi     className="w-5 h-5 text-brand" />,
};

// ─── Helpers ──────────────────────────────────────────────────
function formatDateRange(start, end) {
  const s = new Date(start);
  const e = new Date(end);
  const sameDay = s.toDateString() === e.toDateString();
  const dateStr = s.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = `${s.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} – ${e.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  if (!sameDay) {
    const endDate = e.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${dateStr} – ${endDate}`;
  }
  return `${dateStr} • ${timeStr}`;
}

function buildParticipantDisplay(previews, count) {
  const shown = previews.slice(0, 2).map((p) => p.initials);
  const extra = count - shown.length;
  if (extra > 0) shown.push(`+${extra}`);
  return shown;
}

// ─── Participant Avatars ──────────────────────────────────────
function ParticipantAvatars({ previews, count }) {
  const labels = buildParticipantDisplay(previews, count);
  return (
    <div className="flex -space-x-2">
      {labels.map((label, i) => (
        <div key={i} className="w-8 h-8 rounded-full bg-dark-surface border-2 border-dark-bg flex items-center justify-center text-[10px] font-mono text-light-muted select-none">
          {label}
        </div>
      ))}
    </div>
  );
}

// ─── Event Card ───────────────────────────────────────────────
export default function EventCard({ event }) {
  const { title, start_time, end_time, location, is_remote, status, icon, image_url, participant_count, participant_previews } = event;

  const badge = status === 'urgent' ? { label: 'Urgent', pulse: true }
              : status === 'remote' ? { label: 'Remote', pulse: false }
              : null;

  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden border border-dark-border bg-dark-surface hover:border-brand/40 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-brand/10">

      {/* Image / Placeholder */}
      <div className="relative h-48 bg-dark-bg overflow-hidden flex-shrink-0">
        {image_url ? (
          <img src={image_url} alt={title} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-dark-bg to-dark-surface" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Terminal className="w-16 h-16 text-brand/10" />
            </div>
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-surface/60 via-transparent to-transparent" />
        {badge && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-dark-bg/80 backdrop-blur-sm border border-dark-border text-light px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider">
            {badge.pulse && <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />}
            {badge.label}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-white leading-snug">{title}</h2>
          <div className="w-9 h-9 rounded-full bg-dark-bg border border-dark-border flex-shrink-0 flex items-center justify-center">
            {ICON_MAP[icon] ?? <Leaf className="w-5 h-5 text-brand" />}
          </div>
        </div>

        <div className="space-y-2 mb-6 text-sm text-light-muted">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand/70 flex-shrink-0" />
            <span>{formatDateRange(start_time, end_time)}</span>
          </div>
          <div className="flex items-center gap-2">
            {is_remote ? <Globe className="w-4 h-4 text-brand/70 flex-shrink-0" /> : <MapPin className="w-4 h-4 text-brand/70 flex-shrink-0" />}
            <span>{location}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-dark-border flex items-center justify-between gap-3">
          <ParticipantAvatars previews={participant_previews} count={participant_count} />
          <Link to={`/events/${event.id}`} className="flex-shrink-0 border border-brand/30 text-brand px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-widest hover:bg-brand/10 transition-colors">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
