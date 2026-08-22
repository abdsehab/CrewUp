import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Plus,
  CalendarCheck,
  User,
  ClipboardCheck,
  Filter,
  Mail,
  MoreVertical,
  LogOut,
} from "lucide-react";

function OrganizerDashboard() {
  const volunteers = [
    {
      name: "Jane Doe",
      email: "jane.d@example.com",
      role: "Team Lead",
      status: "Registered",
      initials: "JD",
      image: false,
    },
    {
      name: "Marcus Wright",
      email: "m.wright@domain.com",
      role: "Logistics Support",
      status: "Approved",
      initials: "MW",
      image: false,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#101413] text-[#e0e3e1]">
      {/* ---------------- SIDEBAR ------------------- */}
      <aside className="flex min-h-screen w-[275px] flex-col justify-between border-r border-[#24342A] bg-[#1c201f] px-6 py-7">
        <div>
          {/* Logo */}
          <div className="mb-12 flex items-center gap-3">
            <div className="h-11 w-11 rounded-full border border-[#424938] bg-[#24342A]" />

            <div>
              <h2 className="text-lg font-semibold tracking-wide text-[#afff66]">
                Organizer Portal
              </h2>

              <p className="text-xs tracking-wider text-[#c1cab3]">
                Eco-Tech Management
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {/* Dashboard */}
            <NavLink
              to="/organizer/dashboard"
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
              to="/organizer/events"
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

            <NavLink
              to="/organizer/volunteers"
              className={({ isActive }) =>
                `flex w-full items-center gap-4 rounded-lg px-4 py-4 text-xs uppercase tracking-widest transition ${
                  isActive
                    ? "bg-[#424f47] text-[#afff66]"
                    : "text-[#c1cab3] hover:bg-[#24342A]"
                }`
              }
            >
              <Users size={20} />
              Volunteers
            </NavLink>
          </nav>
        </div>

        <div className="space-y-3">
          {/* Sign Out */}
          <NavLink
            to="/"
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#324539] py-4 font-medium tracking-wide text-[#c1cab3] transition hover:bg-[#24342A] hover:text-[#afff66]"
          >
            <LogOut size={20} />
            Sign Out
          </NavLink>

          {/* Create Event */}
          <button className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#afff66] py-4 font-medium tracking-wide text-[#101413] transition hover:bg-[#b7ff72]">
            <Plus size={21} />
            Create Event
          </button>
        </div>
      </aside>

      {/* ----------------- MAIN CONTENT -------------------- */}
      <main className="flex-1 px-10 py-11">
        {/* Page Heading */}
        <div className="mb-11">
          <h1 className="text-5xl font-semibold">Dashboard Overview</h1>

          <p className="mt-3 text-base text-[#c1cab3]">
            Welcome back. Here is the current status of your volunteer events
            and activities.
          </p>
        </div>

        {/* ----------------- STAT CARDS --------------------- */}
        <div className="mb-11 grid grid-cols-3 gap-6">
          {/* Active Events */}
          <div className="relative h-[214px] overflow-hidden rounded-2xl border border-[#324539] bg-[#1c201f] p-7">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest text-[#c1cab3]">
                Active Events
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#24342A] text-[#afff66]">
                <CalendarCheck size={20} />
              </div>
            </div>

            <h2 className="absolute bottom-12 text-5xl font-semibold">12</h2>
          </div>

          {/* Volunteer Hours */}
          <div className="h-[214px] rounded-2xl border border-[#324539] bg-[#1c201f] p-7">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest text-[#c1cab3]">
                Total Volunteers
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#24342A] text-[#afff66]">
                <User size={20} />
              </div>
            </div>

            <h2 className="mt-12 text-5xl font-semibold">1,450</h2>
          </div>

          {/* Pending Approvals */}
          <div className="h-[214px] rounded-2xl border border-[#324539] bg-[#1c201f] p-7">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest text-[#c1cab3]">
                Pending Approvals
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7f1111] text-white">
                <ClipboardCheck size={20} />
              </div>
            </div>

            <h2 className="mt-10 text-5xl font-semibold">24</h2>

            <Link
              to="/organizer/volunteers"
              className="mt-5 inline-block text-sm font-medium uppercase tracking-widest text-[#afff66]"
            >
              Review Now
            </Link>
          </div>
        </div>

        {/* ----------------- RECENT REGISTRATIONS --------------------- */}

        <div className="mb-4 flex items-end justify-between border-b border-[#24342A] pb-5">
          <div>
            <h2 className="text-2xl font-semibold">Recent Registrations</h2>
          </div>

          <button className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#afff66]">
            <Filter size={20} />
            Filter
          </button>
        </div>

        {/* ------------------------- VOLUNTEER TABLE ------------------------------ */}

        <section className="overflow-hidden rounded-2xl border border-[#324539] bg-[#1c201f]">
          {/* Table Header */}
          <div className="grid grid-cols-[1.5fr_1.1fr_0.8fr_0.7fr] bg-[#2a302d] px-5 py-5 text-[11px] uppercase tracking-widest text-[#c1cab3]">
            <div>Volunteer Name</div>
            <div>Assigned Role</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>

          {/* Table Rows */}
          {volunteers.map((volunteer, index) => (
            <div
              key={index}
              className="grid min-h-[82px] grid-cols-[1.5fr_1.1fr_0.8fr_0.7fr] items-center border-b border-[#24342A] px-5"
            >
              {/* Volunteer */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c1cab3] text-sm font-medium text-[#24342A]">
                  {volunteer.initials}
                </div>

                <div>
                  <h3 className="font-semibold">{volunteer.name}</h3>

                  <p className="mt-1 text-sm text-[#c1cab3]">
                    {volunteer.email}
                  </p>
                </div>
              </div>

              {/* Role */}
              <div className="text-sm">{volunteer.role}</div>

              {/* Status */}
              <div>
                <span
                  className={`rounded-full px-3 py-2 text-[10px] uppercase tracking-wider ${
                    volunteer.status === "Approved"
                      ? "bg-[#324539] text-[#afff66]"
                      : "bg-[#303735] text-[#c1cab3]"
                  }`}
                >
                  {volunteer.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-5">
                <Mail
                  size={20}
                  className="cursor-pointer text-[#c1cab3] transition hover:text-[#afff66]"
                />

                {volunteer.status === "Registered" ? (
                  <button className="rounded-lg border border-[#537244] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#afff66] transition hover:bg-[#24342A]">
                    Approve
                  </button>
                ) : (
                  <MoreVertical
                    size={21}
                    className="cursor-pointer text-[#c1cab3] transition hover:text-[#afff66]"
                  />
                )}
              </div>
            </div>
          ))}

        </section>
      </main>
    </div>
  );
}

export default OrganizerDashboard;
