import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchJSON from "../../utils/api";
import OrganizerSidebar from "../../components/organizer_portal/OrganizerSidebar";
import { useAuth } from "../../hooks/useAuth";
import {
  CalendarCheck,
  Users,
  ClipboardCheck,
  Menu,
  Plus,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Calendar,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";

function OrganizerDashboard() {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Backend state
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on load
  useEffect(() => {
    let cancelled = false;

    const loadDashboardData = async () => {
      try {
        const [regsResult, eventsResult] = await Promise.allSettled([
          fetchJSON("/api/registrations", { credentials: "include" }),
          fetchJSON("/api/events?mine=true", { credentials: "include" }),
        ]);

        if (!cancelled) {
          if (
            regsResult.status === "fulfilled" &&
            Array.isArray(regsResult.value)
          ) {
            setRegistrations(regsResult.value);
          }
          if (
            eventsResult.status === "fulfilled" &&
            Array.isArray(eventsResult.value)
          ) {
            setEvents(eventsResult.value);
          }
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      cancelled = true;
    };
  }, []);

  // Computed metrics
  const activeEventsCount = events.length;
  const totalParticipantsFromEvents = events.reduce(
    (sum, e) => sum + (e.participant_count ?? e.filled ?? 0),
    0,
  );
  const totalVolunteersCount = Math.max(
    registrations.length,
    totalParticipantsFromEvents,
  );
  const pendingCount = registrations.filter(
    (reg) => reg.status === "Pending",
  ).length;

  return (
    <div className="flex min-h-screen bg-[#101413] text-[#e0e3e1]">
      <OrganizerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-7 md:px-8 lg:px-10 lg:py-11">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="mb-6 rounded-lg border border-[#324539] bg-[#1c201f] p-3 text-[#afff66] lg:hidden"
        >
          <Menu size={24} />
        </button>

        {/* HEADER & QUICK ACTION */}
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 lg:mb-11 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
              Dashboard Overview
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#c1cab3] sm:text-base sm:leading-7">
              Welcome back{user?.displayName ? `, ${user.displayName}` : ""}.
              Here is the current status of your volunteer events and community
              initiatives.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              to="/organizer/create-event"
              className="flex items-center gap-2 rounded-xl bg-[#afff66] px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#101413] transition hover:bg-[#b7ff72]"
            >
              <Plus size={18} />
              Create Event
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-8 rounded-xl border border-red-500/50 bg-red-900/30 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        {/* STAT CARDS */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {/* Card 1: Active Events */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#324539] bg-[#1c201f] p-5 sm:p-6 lg:p-7">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#c1cab3]">
                Active Events
              </span>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#24342A] text-[#afff66]">
                <CalendarCheck size={20} />
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-4xl font-semibold sm:text-5xl">
                {loading ? "-" : activeEventsCount}
              </h2>
              <Link
                to="/organizer/events"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-[#afff66] transition hover:underline"
              >
                Manage Events <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Card 2: Total Volunteers */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#324539] bg-[#1c201f] p-5 sm:p-6 lg:p-7">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#c1cab3]">
                Total Volunteers
              </span>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#24342A] text-[#afff66]">
                <Users size={20} />
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-4xl font-semibold sm:text-5xl">
                {loading ? "-" : totalVolunteersCount}
              </h2>
              <Link
                to="/organizer/volunteers"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-[#afff66] transition hover:underline"
              >
                View Directory <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Card 3: Pending Approvals */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#324539] bg-[#1c201f] p-5 sm:p-6 lg:p-7">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#c1cab3]">
                Pending Approvals
              </span>
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  pendingCount > 0
                    ? "bg-[#7f1111] text-white"
                    : "bg-[#24342A] text-[#afff66]"
                }`}
              >
                <ClipboardCheck size={20} />
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-4xl font-semibold sm:text-5xl">
                {loading ? "-" : pendingCount}
              </h2>
              <Link
                to="/organizer/volunteers"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-[#afff66] transition hover:underline"
              >
                Review Now <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* EVENTS SECTION */}
        <section className="w-full">
          <div className="mb-6 flex items-center justify-between border-b border-[#24342A] pb-4">
            <div>
              <h2 className="text-xl font-semibold sm:text-2xl">
                Events
              </h2>
              <p className="text-xs text-[#879083]">
                Summary of events you are hosting
              </p>
            </div>
            {events.length > 0 && (
              <Link
                to="/organizer/events"
                className="flex items-center gap-1 text-xs uppercase tracking-widest text-[#afff66] transition hover:underline"
              >
                View All ({events.length}) <ArrowRight size={14} />
              </Link>
            )}
          </div>

          {loading && (
            <div className="rounded-2xl border border-[#324539] bg-[#1c201f] p-12 text-center text-[#c1cab3]">
              Loading your events...
            </div>
          )}

          {!loading && events.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#324539] bg-[#1c201f]/60 p-12 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#24342A] text-[#afff66]">
                <Sparkles size={28} />
              </div>
              <h3 className="text-lg font-semibold text-white">
                No Events Created Yet
              </h3>
              <p className="mt-2 max-w-md text-sm text-[#c1cab3]">
                You have not published any events under your organization.
                Publish your first event to recruit volunteers and drive
                stewardship.
              </p>
              <Link
                to="/organizer/create-event"
                className="mt-6 flex items-center gap-2 rounded-xl bg-[#afff66] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#101413] transition hover:bg-[#b7ff72]"
              >
                <Plus size={16} /> Create Your First Event
              </Link>
            </div>
          )}

          {!loading && events.length > 0 && (
            <div className="space-y-4">
              {events.map((event) => {
                const count = event.participant_count ?? event.filled ?? 0;
                const cap =
                  event.capacity && event.capacity > 0 ? event.capacity : 50;
                const pct = Math.min(Math.round((count / cap) * 100), 100);

                return (
                  <div
                    key={event._id || event.id}
                    className="group flex flex-col justify-between gap-4 rounded-2xl border border-[#324539] bg-[#1c201f] p-5 transition hover:border-[#afff66]/50 sm:flex-row sm:items-center sm:gap-6"
                  >
                    <div className="flex min-w-0 items-start gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#24342A] text-[#424938]">
                        {event.image_url ? (
                          <img
                            src={event.image_url}
                            alt={event.title}
                            className="h-full w-full object-cover transition group-hover:scale-105"
                          />
                        ) : (
                          <ImageIcon size={24} />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-md bg-[#24342A] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#afff66]">
                            {event.category || "Environmental"}
                          </span>
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                              event.status === "Draft"
                                ? "bg-[#29302d] text-[#c1cab3]"
                                : "bg-[#213324] text-[#afff66]"
                            }`}
                          >
                            {event.status || "Published"}
                          </span>
                        </div>

                        <h3 className="mt-1 truncate text-base font-semibold text-white">
                          {event.title}
                        </h3>

                        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#c1cab3]">
                          <span className="flex items-center gap-1">
                            <Calendar size={13} className="text-[#879083]" />
                            {event.start_time
                              ? new Date(event.start_time).toLocaleDateString()
                              : "TBD"}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={13} className="text-[#879083]" />
                            <span className="max-w-[180px] truncate sm:max-w-[280px]">
                              {event.location || "Remote"}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Registration meter and actions */}
                    <div className="flex shrink-0 items-center justify-between border-t border-[#24342A] pt-3 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                      <div>
                        <div className="flex items-center justify-between gap-3 text-xs sm:justify-end">
                          <span className="text-[#879083]">Capacity:</span>
                          <span className="font-semibold text-white">
                            {count} / {cap}
                          </span>
                          <span className="rounded bg-[#24342A] px-1.5 py-0.5 text-[10px] text-[#afff66]">
                            {pct}%
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-44 overflow-hidden rounded-full bg-[#24342A]">
                          <div
                            className="h-full rounded-full bg-[#afff66] transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <Link
                          to={`/events/${event.id}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#324539] px-3 py-1.5 text-xs text-[#c1cab3] transition hover:bg-[#24342A] hover:text-white"
                        >
                          View <ArrowUpRight size={13} />
                        </Link>
                        <Link
                          to="/organizer/events"
                          className="inline-flex items-center rounded-lg bg-[#24342A] px-3 py-1.5 text-xs font-medium text-[#afff66] transition hover:bg-[#324539]"
                        >
                          Manage
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default OrganizerDashboard;
