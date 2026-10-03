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
  Check,
  X,
  RotateCcw,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

function AdminManageOrgs() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/organizations`);
      if (response.ok) {
        const data = await response.json();
        setOrganizations(data);
      }
    } catch (err) {
      console.error("Error fetching orgs:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE}/api/organizations/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setOrganizations((prev) =>
          prev.map((org) => (org._id === id ? { ...org, status: newStatus, verified: newStatus === 'Verified' } : org))
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const verifiedCount = organizations.filter(o => o.status === "Verified").length;

  const filteredOrganizations = organizations.filter(org =>
    org.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.email?.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="mb-2 text-3xl lg:text-5xl font-semibold">Manage Organizations</h1>
            <p className="text-sm lg:text-base text-[#c1cab3]">Verify, monitor, and moderate partner organizations across the platform.</p>
          </div>
          <div className="flex gap-4 w-full lg:w-auto">
            <div className="flex w-full lg:w-[170px] items-center gap-4 rounded-xl border border-[#324539] bg-[#1c201f] p-4">
              <div className="flex h-10 w-10 lg:h-12 lg:w-12 shrink-0 items-center justify-center rounded-md bg-[#24342A] text-[#afff66]"><Building2 size={23} /></div>
              <div>
                <p className="text-xs lg:text-sm text-[#c1cab3]">Verified</p>
                <h3 className="text-lg lg:text-xl font-semibold">{verifiedCount}</h3>
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
                  placeholder="Search organizations..."
                  className="w-full bg-transparent text-sm tracking-wide outline-none placeholder:text-[#879083]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-[2fr_0.8fr_0.7fr_0.9fr_0.9fr_0.5fr] bg-[#19201d] px-9 py-5 text-[11px] uppercase tracking-widest text-[#c1cab3]">
              <div>Organization</div>
              <div>Events Hosted</div>
              <div>Members</div>
              <div>Joined</div>
              <div>Status</div>
              <div>Actions</div>
            </div>

            {loading ? (
              <div className="p-8 text-center text-sm text-[#c1cab3]">Loading organizations...</div>
            ) : filteredOrganizations.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#c1cab3]">No organizations found.</div>
            ) : (
              filteredOrganizations.map((org) => (
                <div key={org._id} className="grid min-h-[120px] grid-cols-[2fr_0.8fr_0.7fr_0.9fr_0.9fr_0.5fr] items-center border-b border-[#24342A] px-9 py-4">
                  <div className="flex items-center gap-4">
                    {org.image ? (
                      <img src={org.image} alt={org.name} className="h-[52px] w-[52px] shrink-0 rounded-md object-cover" />
                    ) : (
                      <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-md bg-[#34463d] text-sm font-semibold text-[#afff66]">
                        {org.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="max-w-[240px] text-[17px] font-semibold leading-7">{org.name}</h3>
                      <p className="mt-1 text-sm text-[#c1cab3]">{org.email || "System Default"}</p>
                    </div>
                  </div>
                  <div className="pr-2 text-sm">{org.events || 0}</div>
                  <div className="pr-2 text-sm">{org.volunteers || "-"}</div>
                  <div>
                    <span className="text-xs text-[#c1cab3]">
                      {org.createdAt ? new Date(org.createdAt).toLocaleDateString() : "Legacy"}
                    </span>
                  </div>
                  <div>
                    {org.status === "Verified" && <span className="rounded-full border border-[#324539] bg-[#213324] px-3 py-2 text-[10px] tracking-widest text-[#afff66]">● VERIFIED</span>}
                    {org.status === "Pending" && <span className="rounded-full border border-[#324539] bg-[#29302d] px-3 py-2 text-[10px] tracking-widest text-[#c1cab3]">◌ PENDING</span>}
                    {org.status === "Suspended" && <span className="rounded-full border border-[#324539] bg-[#33201d] px-3 py-2 text-[10px] tracking-widest text-[#e08a8a]">◉ SUSPENDED</span>}
                  </div>
                  <div className="flex items-center justify-between pr-4 text-[#c1cab3]">
                    {org.status === "Pending" ? (
                      <>
                        <Check size={21} className="cursor-pointer transition hover:text-[#afff66]" onClick={() => updateStatus(org._id, "Verified")} />
                        <X size={21} className="cursor-pointer transition hover:text-[#afff66]" onClick={() => updateStatus(org._id, "Suspended")} />
                      </>
                    ) : org.status === "Suspended" ? (
                      <RotateCcw size={19} className="cursor-pointer transition hover:text-[#afff66]" onClick={() => updateStatus(org._id, "Verified")} />
                    ) : (
                      <X size={21} className="cursor-pointer transition hover:text-[#afff66]" onClick={() => updateStatus(org._id, "Suspended")} title="Suspend" />
                    )}
                  </div>
                </div>
              ))
            )}

            <div className="flex items-center justify-between px-5 py-4 text-xs tracking-wider text-[#c1cab3]">
              <span>Showing {filteredOrganizations.length} organizations</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AdminManageOrgs;
