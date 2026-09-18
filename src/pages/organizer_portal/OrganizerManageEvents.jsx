import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchJSON from "../../utils/api";
import OrganizerSidebar from "../../components/organizer_portal/OrganizerSidebar";
import {
  Menu,
  Search,
  SlidersHorizontal,
  Trash2,
  RefreshCw,
  Image,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
} from "lucide-react";

function OrganizerManageEvents() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchJSON("/api/events", { credentials: "include" })
      .then((data) => {
        if (!cancelled) {
          setEvents(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleDeleteEvent = async (eventId, eventTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${eventTitle}"?`)) {
      return;
    }

    setDeletingId(eventId);
    try {
      let res;
      try {
        res = await fetch(`/api/events/${eventId}`, {
          method: "DELETE",
          credentials: "include",
        });
      } catch {
        res = await fetch(`http://localhost:4000/api/events/${eventId}`, {
          method: "DELETE",
          credentials: "include",
        });
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete event");
      }

      setEvents((prev) =>
        prev.filter((e) => e.id !== eventId && e._id !== eventId),
      );
    } catch (err) {
      alert(err.message || "Failed to delete event");
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered list
  const filteredEvents = events.filter((event) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      event.title?.toLowerCase().includes(q) ||
      event.location?.toLowerCase().includes(q) ||
      event.category?.toLowerCase().includes(q);

    const eventStatus = event.status || "Published";
    const matchesStatus =
      statusFilter === "All" ||
      eventStatus.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div
      className="flex min-h-screen bg-[#101413] text-[#e0e3e1]"
      onClick={() => setIsFilterOpen(false)}
    >
      <OrganizerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <main className="min-w-0 flex-1 px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-11">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="mb-6 rounded-lg border border-[#324539] bg-[#1c201f] p-3 text-[#afff66] lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div className="mb-10 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-semibold sm:text-4xl lg:text-5xl">
              Manage Events
            </h1>
            <p className="text-base text-[#c1cab3]">
              Track, edit, and monitor the status of your organized
              eco-stewardship activities.
            </p>
          </div>
          <div className="flex w-full flex-wrap items-center gap-4 lg:w-auto">
            <div className="flex w-full items-center gap-4 rounded-xl border border-[#324539] bg-[#1c201f] p-4 sm:w-[170px]">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#24342A] text-[#afff66]">
                <RefreshCw size={23} />
              </div>
              <div>
                <p className="text-sm text-[#c1cab3]">Active</p>
                <h3 className="text-xl font-semibold">{events.length}</h3>
              </div>
            </div>
            <Link
              to="/organizer/create-event"
              className="flex h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-[#afff66] px-6 text-xs font-semibold uppercase tracking-widest text-[#101413] transition hover:bg-[#b7ff72] sm:w-auto"
            >
              <Plus size={18} />
              Create Event
            </Link>
          </div>
        </div>

        <section className="w-full overflow-hidden rounded-2xl border border-[#324539] bg-[#1c201f]">
          <div className="flex flex-col gap-4 bg-[#24342A] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            {/* Search Input */}
            <div className="flex h-10 w-full sm:w-[480px] items-center gap-3 rounded-md border border-[#324539] bg-[#14251d] px-4 text-[#c1cab3]">
              <Search size={20} className="shrink-0 text-[#879083]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events by title, location, or category..."
                className="w-full bg-transparent text-sm tracking-wide outline-none placeholder:text-[#879083]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-[#879083] hover:text-[#afff66]"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFilterOpen(!isFilterOpen);
                }}
                className={`flex items-center gap-2 rounded-md border border-[#324539] px-5 py-2.5 text-sm tracking-widest transition ${
                  statusFilter !== "All" || isFilterOpen
                    ? "bg-[#1c201f] text-[#afff66]"
                    : "text-[#c1cab3] hover:bg-[#1c201f]"
                }`}
              >
                <SlidersHorizontal size={17} />
                {statusFilter === "All" ? "Filter" : `Filter: ${statusFilter}`}
              </button>

              {isFilterOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 top-12 z-20 w-44 rounded-xl border border-[#324539] bg-[#1c201f] p-2 shadow-xl"
                >
                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#879083]">
                    Status
                  </div>
                  {["All", "Published", "Draft"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setStatusFilter(item);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full rounded-md px-3 py-2 text-left text-xs uppercase tracking-wider transition ${
                        statusFilter === item
                          ? "bg-[#24342A] text-[#afff66]"
                          : "text-[#c1cab3] hover:bg-[#24342A]"
                      }`}
                    >
                      {item === "All" ? "All Events" : item}
                    </button>
                  ))}
                  {statusFilter !== "All" && (
                    <button
                      type="button"
                      onClick={() => {
                        setStatusFilter("All");
                        setIsFilterOpen(false);
                      }}
                      className="mt-2 w-full border-t border-[#324539] pt-2 text-center text-xs text-[#879083] hover:text-[#afff66]"
                    >
                      Reset Filter
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="min-w-[950px]">
            <div className="grid grid-cols-[2.3fr_1.1fr_0.9fr_0.9fr_0.6fr] bg-[#19201d] px-9 py-5 text-[11px] uppercase tracking-widest text-[#c1cab3]">
              <div>Event Name & Details</div>
              <div>Date & Time</div>
              <div>Registrations</div>
              <div>Status</div>
              <div className="text-right">Action</div>
            </div>
          </div>

          {loading && (
            <div className="p-8 text-center text-[#c1cab3]">
              Loading events...
            </div>
          )}
          {error && <div className="p-8 text-center text-red-400">{error}</div>}

          {!loading &&
            !error &&
            filteredEvents.map((event, index) => (
              <div
                key={event._id || event.id || index}
                className="grid min-h-[120px] grid-cols-[2.3fr_1.1fr_0.9fr_0.9fr_0.6fr] items-center border-b border-[#24342A] px-9 py-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-md bg-[#24342A] text-[#424938]">
                    {event.image_url ? (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Image size={28} />
                    )}
                  </div>
                  <div>
                    <h3 className="max-w-[260px] text-[17px] font-semibold leading-7">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#c1cab3]">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm">
                    {event.start_time
                      ? new Date(event.start_time).toLocaleDateString()
                      : "TBD"}
                  </p>
                  <span className="text-xs text-[#c1cab3]">
                    {event.start_time
                      ? new Date(event.start_time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>
                </div>

                <div>
                  <p className="mb-2 text-sm">
                    <strong>{event.participant_count || 0}</strong>
                  </p>
                  <div className="h-[7px] w-[110px] overflow-hidden rounded-full bg-[#324539]">
                    <div
                      className="h-full rounded-full bg-[#afff66]"
                      style={{
                        width: `${Math.min(((event.participant_count || 0) / 50) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  {(!event.status || event.status === "Published") && (
                    <span className="rounded-full border border-[#324539] bg-[#213324] px-3 py-2 text-[10px] tracking-widest text-[#afff66]">
                      ● PUBLISHED
                    </span>
                  )}
                  {event.status === "Draft" && (
                    <span className="rounded-full border border-[#324539] bg-[#29302d] px-3 py-2 text-[10px] tracking-widest text-[#c1cab3]">
                      ◌ DRAFT
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-end text-[#c1cab3]">
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteEvent(event.id || event._id, event.title)
                    }
                    disabled={deletingId === (event.id || event._id)}
                    title="Delete event"
                    className="p-2 rounded-lg text-[#c1cab3] transition hover:bg-[#24342A] hover:text-red-400 disabled:opacity-40"
                  >
                    <Trash2 size={19} />
                  </button>
                </div>
              </div>
            ))}

          {!loading && !error && filteredEvents.length === 0 && (
            <div className="p-12 text-center text-[#c1cab3]">
              <p className="text-base font-medium">No events found</p>
              <p className="mt-1 text-xs text-[#879083]">
                {events.length === 0
                  ? "You haven't created any events yet."
                  : "No events match your search or filter selection."}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-4 px-5 py-4 text-xs tracking-wider text-[#c1cab3] sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing {filteredEvents.length} of {events.length} events
            </p>
            <div className="flex items-center gap-3">
              <ChevronLeft size={18} />
              <button className="flex h-8 w-8 items-center justify-center rounded-md bg-[#424f47] text-[#e0e3e1]">
                1
              </button>
              <ChevronRight size={18} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default OrganizerManageEvents;
