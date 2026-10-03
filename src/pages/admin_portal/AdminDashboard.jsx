import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";
import {
  LayoutDashboard,
  CalendarDays,
  Building2,
  CalendarCheck,
  ClipboardCheck,
  Filter,
  LogOut,
} from "lucide-react";

function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const [stats, setStats] = useState({
    totalOrganizations: 0,
    activeEvents: 0,
    pendingApprovals: 0,
    recentApplications: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/admin/stats`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#101413] text-[#e0e3e1]">
      <aside className="flex min-h-screen w-[275px] flex-col justify-between border-r border-[#24342A] bg-[#1c201f] px-6 py-7">
        <div>
          <div className="mb-12 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#24342A] text-sm text-[#afff66]">AP</div>
            <div>
              <h2 className="text-lg font-semibold tracking-wide text-[#afff66]">Admin Portal</h2>
              <p className="text-xs tracking-wider text-[#c1cab3]">Platform Administration</p>
            </div>
          </div>
          <nav className="space-y-2">
            <NavLink to="/admin/dashboard" className={({ isActive }) => `flex w-full items-center gap-4 rounded-lg px-4 py-4 text-left text-xs uppercase tracking-widest transition ${isActive ? "bg-[#424f47] text-[#afff66]" : "text-[#c1cab3] hover:bg-[#24342A]"}`}>
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>
            <NavLink to="/admin/events" className={({ isActive }) => `flex w-full items-center gap-4 rounded-lg px-4 py-4 text-left text-xs uppercase tracking-widest transition ${isActive ? "bg-[#424f47] text-[#afff66]" : "text-[#c1cab3] hover:bg-[#24342A]"}`}>
              <CalendarDays size={20} />
              Manage Events
            </NavLink>
            <NavLink to="/admin/orgs" className={({ isActive }) => `flex w-full items-center gap-4 rounded-lg px-4 py-4 text-left text-xs uppercase tracking-widest transition ${isActive ? "bg-[#424f47] text-[#afff66]" : "text-[#c1cab3] hover:bg-[#24342A]"}`}>
              <Building2 size={20} />
              Manage Orgs
            </NavLink>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#324539] py-4 font-medium tracking-wide text-[#c1cab3] transition hover:bg-[#24342A] hover:text-[#afff66]"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </aside>

      <main className="flex-1 px-10 py-11">
        <div className="mb-11">
          <h1 className="text-5xl font-semibold">Dashboard Overview</h1>
          <p className="mt-3 text-base text-[#c1cab3]">Platform-wide view of organizations, events, and volunteer activity.</p>
        </div>

        {loading ? (
          <div className="text-center text-sm tracking-widest text-[#c1cab3] mb-11">LOADING DASHBOARD...</div>
        ) : (
          <>
            <div className="mb-8 lg:mb-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="relative h-[180px] lg:h-[214px] overflow-hidden rounded-2xl border border-[#324539] bg-[#1c201f] p-5 lg:p-7">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] lg:text-xs uppercase tracking-widest text-[#c1cab3]">Total Organizations</p>
                  <div className="flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-[#24342A] text-[#afff66]"><Building2 size={16} /></div>
                </div>
                <h2 className="absolute bottom-6 lg:bottom-12 text-4xl lg:text-5xl font-semibold">{stats.totalOrganizations}</h2>
              </div>
              <div className="relative h-[180px] lg:h-[214px] rounded-2xl border border-[#324539] bg-[#1c201f] p-5 lg:p-7">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] lg:text-xs uppercase tracking-widest text-[#c1cab3]">Active Events</p>
                  <div className="flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-[#24342A] text-[#afff66]"><CalendarCheck size={16} /></div>
                </div>
                <h2 className="absolute bottom-6 lg:bottom-12 text-4xl lg:text-5xl font-semibold">{stats.activeEvents}</h2>
              </div>
              <div className="relative h-[180px] lg:h-[214px] rounded-2xl border border-[#324539] bg-[#1c201f] p-5 lg:p-7">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] lg:text-xs uppercase tracking-widest text-[#c1cab3]">Pending Approvals</p>
                  <div className="flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-[#7f1111] text-white"><ClipboardCheck size={16} /></div>
                </div>
                <h2 className="absolute bottom-6 lg:bottom-12 text-4xl lg:text-5xl font-semibold">{stats.pendingApprovals}</h2>
                <Link to="/admin/orgs" className="absolute bottom-6 lg:bottom-5 right-5 lg:right-7 inline-block text-[10px] lg:text-sm font-medium uppercase tracking-widest text-[#afff66]">Review</Link>
              </div>
            </div>

            <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-[#24342A] pb-5 gap-3 sm:gap-0">
              <h2 className="text-xl lg:text-2xl font-semibold">New Organization Applications</h2>
              <button className="flex w-fit items-center gap-2 lg:gap-3 text-[10px] lg:text-xs uppercase tracking-widest text-[#afff66]">
                <Filter size={16} /> Filter
              </button>
            </div>

            <div className="w-full overflow-x-auto hide-scrollbar rounded-2xl">
              <section className="min-w-[700px] overflow-hidden rounded-2xl border border-[#324539] bg-[#1c201f]">
                <div className="grid grid-cols-[1.5fr_1.1fr_0.8fr_0.7fr] bg-[#2a302d] px-5 py-5 text-[11px] uppercase tracking-widest text-[#c1cab3]">
                  <div>Organization</div>
                  <div>Focus Area</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                {stats.recentApplications.length === 0 ? (
                  <div className="p-8 text-center text-sm text-[#c1cab3]">No pending applications.</div>
                ) : (
                  stats.recentApplications.map((app, index) => (
                    <div key={app._id || index} className="grid min-h-[82px] grid-cols-[1.5fr_1.1fr_0.8fr_0.7fr] items-center border-b border-[#24342A] px-5 py-3 lg:py-0">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 lg:h-10 lg:w-10 shrink-0 items-center justify-center rounded-full bg-[#c1cab3] text-sm font-medium text-[#24342A] uppercase">
                          {app.name.substring(0, 2)}
                        </div>
                        <div className="min-w-0 pr-3">
                          <h3 className="font-semibold truncate">{app.name}</h3>
                          <p className="mt-0.5 text-[12px] text-[#c1cab3] truncate">{app.email}</p>
                        </div>
                      </div>
                      <div className="text-[13px] truncate pr-4">{app.desc || "General"}</div>
                      <div>
                        <span className="rounded-full px-3 py-1.5 lg:py-2 text-[9px] lg:text-[10px] uppercase tracking-wider bg-[#303735] text-[#c1cab3]">
                          {app.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-end gap-5">
                        <Link to={`/admin/orgs`} className="rounded-lg border border-[#537244] px-4 py-2 text-[10px] lg:text-xs font-semibold uppercase tracking-wider text-[#afff66] transition hover:bg-[#24342A]">
                          Review
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
