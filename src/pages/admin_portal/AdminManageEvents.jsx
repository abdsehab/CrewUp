import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { API_BASE } from "../../utils/api";
import {
  LayoutDashboard,
  CalendarDays,
  Building2,
  Search,
  SlidersHorizontal,
  X,
  Trash2,
  RefreshCw,
  Image,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

function AdminManageEvents() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/events`);
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to remove this event?")) return;
    try {
      const response = await fetch(`${API_BASE}/api/events/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setEvents((prev) => prev.filter((event) => event._id !== id));
      }
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const calculateProgress = (filled, capacity) => {
    if (!capacity) return 0;
    return Math.min(Math.round((filled / capacity) * 100), 100);
  };

  const filteredEvents = events.filter(event =>
    event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.organizer?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#101413] text-[#e0e3e1]">
      <aside className="flex w-full lg:min-h-screen lg:w-[275px] flex-col justify-between border-b lg:border-r border-[#24342A] bg-[#1c201f] px-6 py-5 lg:py-7 shrink-0">
        <div className="flex flex-col lg:block">
          <div className="mb-6 lg:mb-12 flex items-center justify-between lg:justify-start gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full bg-[#24342A] text-sm text-[#afff66]">AP</div>
              <div>
                <h2 className="text-base lg:text-lg font-semibold tracking-wide text-[#afff66]">Admin Portal</h2>
                <p className="hidden lg:block text-xs tracking-wider text-[#c1cab3]">Platform Administration</p>
              </div>
            </div>
            {/* Mobile Logout (Header) */}
            <button onClick={handleLogout} className="lg:hidden flex items-center gap-2 rounded-lg border border-[#324539] px-3 py-2 text-xs font-medium tracking-wide text-[#c1cab3] transition hover:bg-[#24342A] hover:text-[#afff66]">
              <LogOut size={16} /> Sign Out
            </button>
          </div>
          <nav className="flex overflow-x-auto lg:flex-col lg:space-y-2 pb-2 lg:pb-0 gap-2 lg:gap-0 hide-scrollbar">
            <NavLink to="/admin/dashboard" className={({ isActive }) => `flex shrink-0 lg:w-full items-center gap-2 lg:gap-4 rounded-lg px-4 py-3 lg:py-4 text-[10px] lg:text-xs uppercase tracking-widest transition ${isActive ? "bg-[#424f47] text-[#afff66]" : "text-[#c1cab3] hover:bg-[#24342A]"}`}>
              <LayoutDashboard size={18} className="lg:w-5 lg:h-5" /> Dashboard
            </NavLink>
            <NavLink to="/admin/events" className={({ isActive }) => `flex shrink-0 lg:w-full items-center gap-2 lg:gap-4 rounded-lg px-4 py-3 lg:py-4 text-[10px] lg:text-xs uppercase tracking-widest transition ${isActive ? "bg-[#424f47] text-[#afff66]" : "text-[#c1cab3] hover:bg-[#24342A]"}`}>
              <CalendarDays size={18} className="lg:w-5 lg:h-5" /> Manage Events
            </NavLink>
            <NavLink to="/admin/orgs" className={({ isActive }) => `flex shrink-0 lg:w-full items-center gap-2 lg:gap-4 rounded-lg px-4 py-3 lg:py-4 text-[10px] lg:text-xs uppercase tracking-widest transition ${isActive ? "bg-[#424f47] text-[#afff66]" : "text-[#c1cab3] hover:bg-[#24342A]"}`}>
              <Building2 size={18} className="lg:w-5 lg:h-5" /> Manage Orgs
            </NavLink>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="hidden lg:flex w-full items-center justify-center gap-3 rounded-lg border border-[#324539] py-4 font-medium tracking-wide text-[#c1cab3] transition hover:bg-[#24342A] hover:text-[#afff66]"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </aside>

      <main className="flex-1 px-4 lg:px-10 py-8 lg:py-11 overflow-hidden">
        <div className="mb-8 lg:mb-20 flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-0">
          <div>
            <h1 className="mb-2 text-3xl lg:text-5xl font-semibold">Manage Events</h1>
            <p className="text-sm lg:text-base text-[#c1cab3]">Monitor and moderate every event hosted across the platform.</p>
          </div>
          <div className="flex gap-4 w-full lg:w-auto">
            <div
              className="flex w-full lg:w-[170px] items-center gap-4 rounded-xl border border-[#324539] bg-[#1c201f] p-4 cursor-pointer hover:bg-[#24342A] transition-colors"
              onClick={fetchEvents}
              title="Click to refresh events"
            >
              <div className="flex h-10 w-10 lg:h-12 lg:w-12 shrink-0 items-center justify-center rounded-md bg-[#24342A] text-[#afff66]">
                <RefreshCw size={23} className={loading ? "animate-spin" : ""} />
              </div>
              <div>
                <p className="text-xs lg:text-sm text-[#c1cab3]">Active</p>
                <h3 className="text-lg lg:text-xl font-semibold">{events.length}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto hide-scrollbar rounded-2xl">
          <section className="min-w-[1050px] overflow-hidden rounded-2xl border border-[#324539] bg-[#1c201f]">
            <div className="flex items-center justify-between bg-[#24342A] p-6">
              <div className="flex h-10 w-full max-w-[480px] items-center gap-3 rounded-md border border-[#324539] bg-[#14251d] px-4 text-[#c1cab3]">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full bg-transparent text-sm tracking-wide outline-none placeholder:text-[#879083]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-[2fr_0.85fr_0.95fr_0.9fr_0.85fr_0.5fr] bg-[#19201d] px-9 py-5 text-[11px] uppercase tracking-widest text-[#c1cab3]">
              <div>Event Name & Details</div>
              <div>Organizer</div>
              <div>Date & Time</div>
              <div>Registrations</div>
              <div>Status</div>
              <div>Actions</div>
            </div>

            {loading && events.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#c1cab3]">Loading events...</div>
            ) : filteredEvents.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#c1cab3]">No events found.</div>
            ) : (
              filteredEvents.map((event, index) => (
                <div key={event._id} className="grid min-h-[120px] grid-cols-[2fr_0.85fr_0.95fr_0.9fr_0.85fr_0.5fr] items-center border-b border-[#24342A] px-9 py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-[60px] w-[60px] lg:h-[68px] lg:w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#24342A] text-[#424938]">
                      {event.image_url ? (
                        <img src={event.image_url} alt={event.title} className="h-full w-full object-cover" />
                      ) : (
                        <Image size={28} />
                      )}
                    </div>
                    <div className="min-w-0 pr-2">
                      <h3 className="text-base lg:text-[17px] font-semibold leading-6 lg:leading-7 truncate">{event.title}</h3>
                      <p className="mt-1 text-sm text-[#c1cab3] truncate">{event.location}</p>
                    </div>
                  </div>
                  <div className="pr-2 text-sm truncate">{event.organizer?.name || "Unknown"}</div>
                  <div>
                    <p className="mb-1 lg:mb-2 text-[13px] lg:text-sm">{new Date(event.start_time).toLocaleDateString()}</p>
                    <span className="text-xs text-[#c1cab3]">{new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div>
                    <p className="mb-1 lg:mb-2 text-[13px] lg:text-sm">
                      <strong>{event.filled || 0}</strong>
                      <span className="text-[#c1cab3]"> / {event.capacity || 0}</span>
                    </p>
                    <div className="h-[7px] w-[90px] lg:w-[110px] overflow-hidden rounded-full bg-[#324539]">
                      <div
                        className="h-full rounded-full bg-[#afff66]"
                        style={{ width: `${calculateProgress(event.filled, event.capacity)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    {event.status === "Completed" ? (
                      <span className="rounded-full border border-[#324539] px-2 py-1.5 lg:px-3 lg:py-2 text-[9px] lg:text-[10px] tracking-widest text-[#a3aaa1]">◉ COMPLETED</span>
                    ) : (
                      <span className="rounded-full border border-[#324539] bg-[#213324] px-2 py-1.5 lg:px-3 lg:py-2 text-[9px] lg:text-[10px] tracking-widest text-[#afff66]">● ACTIVE</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between pr-4 text-[#c1cab3]">
                    {event.status !== "Completed" && (
                      <Trash2
                        size={19}
                        className="cursor-pointer transition hover:text-[#afff66]"
                        onClick={() => deleteEvent(event._id)}
                        title="Delete Event"
                      />
                    )}
                  </div>
                </div>
              ))
            )}

            <div className="flex items-center justify-between px-5 py-4 text-xs tracking-wider text-[#c1cab3]">
              <span>Showing {filteredEvents.length} events</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AdminManageEvents;
