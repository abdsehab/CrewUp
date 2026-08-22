import { NavLink } from "react-router-dom";

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
  const organizations = [
    {
      name: "GreenTech Initiative",
      email: "contact@greentech.org",
      eventsHosted: 24,
      members: 310,
      joined: "Jan 2024",
      status: "Verified",
      initials: "GI",
    },
    {
      name: "Ocean Clean AI",
      email: "hello@oceanclean.ai",
      eventsHosted: 12,
      members: 148,
      joined: "Mar 2024",
      status: "Verified",
      initials: "OC",
    },
    {
      name: "Urban Roots Collective",
      email: "team@urbanroots.org",
      eventsHosted: 3,
      members: 52,
      joined: "Aug 2026",
      status: "Pending",
      initials: "UR",
    },
    {
      name: "Solar Action Network",
      email: "team@solaraction.org",
      eventsHosted: 18,
      members: 205,
      joined: "Nov 2023",
      status: "Suspended",
      initials: "SA",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#101413] text-[#e0e3e1]">
      {/* ------------------- SIDEBAR -------------------- */}
      <aside className="flex min-h-screen w-[275px] flex-col justify-between border-r border-[#24342A] bg-[#1c201f] px-6 py-7">
        <div>
          {/* Logo */}
          <div className="mb-12 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#24342A] text-sm text-[#afff66]">
              AP
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-wide text-[#afff66]">
                Admin Portal
              </h2>

              <p className="text-xs tracking-wider text-[#c1cab3]">
                Platform Administration
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {/* Dashboard */}
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex w-full items-center gap-4 rounded-lg px-4 py-4 text-left text-xs uppercase tracking-widest transition ${
                  isActive
                    ? "bg-[#424f47] text-[#afff66]"
                    : "text-[#c1cab3] hover:bg-[#24342A]"
                }`
              }
            >
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>

            {/* Manage Events */}
            <NavLink
              to="/admin/events"
              className={({ isActive }) =>
                `flex w-full items-center gap-4 rounded-lg px-4 py-4 text-left text-xs uppercase tracking-widest transition ${
                  isActive
                    ? "bg-[#424f47] text-[#afff66]"
                    : "text-[#c1cab3] hover:bg-[#24342A]"
                }`
              }
            >
              <CalendarDays size={20} />
              Manage Events
            </NavLink>

            {/* Manage Orgs */}
            <NavLink
              to="/admin/orgs"
              className={({ isActive }) =>
                `flex w-full items-center gap-4 rounded-lg px-4 py-4 text-left text-xs uppercase tracking-widest transition ${
                  isActive
                    ? "bg-[#424f47] text-[#afff66]"
                    : "text-[#c1cab3] hover:bg-[#24342A]"
                }`
              }
            >
              <Building2 size={20} />
              Manage Orgs
            </NavLink>
          </nav>
        </div>

        {/* Sign Out */}
        <NavLink
          to="/"
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#324539] py-4 font-medium tracking-wide text-[#c1cab3] transition hover:bg-[#24342A] hover:text-[#afff66]"
        >
          <LogOut size={20} />
          Sign Out
        </NavLink>
      </aside>

      {/* ----------------- MAIN CONTENT -------------------- */}
      <main className="flex-1 px-10 py-11">
        {/* Top Section */}
        <div className="mb-20 flex items-start justify-between">
          <div>
            <h1 className="mb-2 text-5xl font-semibold">Manage Organizations</h1>

            <p className="text-base text-[#c1cab3]">
              Verify, monitor, and moderate partner organizations across the
              platform.
            </p>
          </div>

          {/* Statistics */}
          <div className="flex gap-4">
            <div className="flex w-[170px] items-center gap-4 rounded-xl border border-[#324539] bg-[#1c201f] p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#24342A] text-[#afff66]">
                <Building2 size={23} />
              </div>

              <div>
                <p className="text-sm text-[#c1cab3]">Verified</p>

                <h3 className="text-xl font-semibold">21</h3>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- ORGS CARD --------------------- */}
        <section className="max-w-[1050px] overflow-hidden rounded-2xl border border-[#324539] bg-[#1c201f]">
          {/* Search */}
          <div className="flex items-center justify-between bg-[#24342A] p-6">
            <div className="flex h-10 w-[480px] items-center gap-3 rounded-md border border-[#324539] bg-[#14251d] px-4 text-[#c1cab3]">
              <Search size={20} />

              <input
                type="text"
                placeholder="Search organizations..."
                className="w-full bg-transparent text-sm tracking-wide outline-none placeholder:text-[#879083]"
              />
            </div>

            <button className="flex items-center gap-2 rounded-md border border-[#324539] px-5 py-2.5 text-sm tracking-widest text-[#c1cab3] transition hover:bg-[#1c201f]">
              <SlidersHorizontal size={17} />
              Filter
            </button>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-[2fr_0.8fr_0.7fr_0.9fr_0.9fr_0.5fr] bg-[#19201d] px-9 py-5 text-[11px] uppercase tracking-widest text-[#c1cab3]">
            <div>Organization</div>
            <div>Events Hosted</div>
            <div>Members</div>
            <div>Joined</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {/* Organizations */}
          {organizations.map((org, index) => (
            <div
              key={index}
              className="grid min-h-[120px] grid-cols-[2fr_0.8fr_0.7fr_0.9fr_0.9fr_0.5fr] items-center border-b border-[#24342A] px-9 py-4"
            >
              {/* Organization Information */}
              <div className="flex items-center gap-4">
                <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-md bg-[#34463d] text-sm font-semibold text-[#afff66]">
                  {org.initials}
                </div>

                <div>
                  <h3 className="max-w-[240px] text-[17px] font-semibold leading-7">
                    {org.name}
                  </h3>

                  <p className="mt-1 text-sm text-[#c1cab3]">{org.email}</p>
                </div>
              </div>

              {/* Events Hosted */}
              <div className="pr-2 text-sm">{org.eventsHosted}</div>

              {/* Members */}
              <div className="pr-2 text-sm">{org.members}</div>

              {/* Joined */}
              <div>
                <span className="text-xs text-[#c1cab3]">{org.joined}</span>
              </div>

              {/* Status */}
              <div>
                {org.status === "Verified" && (
                  <span className="rounded-full border border-[#324539] bg-[#213324] px-3 py-2 text-[10px] tracking-widest text-[#afff66]">
                    ● VERIFIED
                  </span>
                )}

                {org.status === "Pending" && (
                  <span className="rounded-full border border-[#324539] bg-[#29302d] px-3 py-2 text-[10px] tracking-widest text-[#c1cab3]">
                    ◌ PENDING
                  </span>
                )}

                {org.status === "Suspended" && (
                  <span className="rounded-full border border-[#324539] bg-[#33201d] px-3 py-2 text-[10px] tracking-widest text-[#e08a8a]">
                    ◉ SUSPENDED
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pr-4 text-[#c1cab3]">
                {org.status === "Pending" ? (
                  <>
                    <Check
                      size={21}
                      className="cursor-pointer transition hover:text-[#afff66]"
                    />

                    <X
                      size={21}
                      className="cursor-pointer transition hover:text-[#afff66]"
                    />
                  </>
                ) : org.status === "Suspended" ? (
                  <RotateCcw
                    size={19}
                    className="cursor-pointer transition hover:text-[#afff66]"
                  />
                ) : (
                  <MoreVertical
                    size={21}
                    className="cursor-pointer transition hover:text-[#afff66]"
                  />
                )}
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-4 text-xs tracking-wider text-[#c1cab3]">
            <p>Showing 1–4 of 22 organizations</p>

            <div className="flex items-center gap-3">
              <ChevronLeft size={18} />

              <button className="flex h-8 w-8 items-center justify-center rounded-md bg-[#424f47] text-[#e0e3e1]">
                1
              </button>

              <button>2</button>

              <ChevronRight size={18} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminManageOrgs;
