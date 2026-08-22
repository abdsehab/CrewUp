import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Plus,
  Search,
  SlidersHorizontal,
  Pencil,
  X,
  Trash2,
  Eye,
  RefreshCw,
  Image,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

function OrganizerManageEvents() {
  const events = [
    {
      name: "Riverfront Revitalization & Cleanup",
      details: "Downtown Waterfront District · Habitat...",
      date: "Oct 24, 2024",
      time: "08:00 AM - 12:00 PM",
      registrations: 45,
      total: 50,
      progress: 90,
      status: "Published",
      image: true,
    },
    {
      name: "Tech Waste Recycling Drive",
      details: "Main City Plaza · Recycling Initiative",
      date: "Nov 12, 2024",
      time: "10:00 AM - 04:00 PM",
      registrations: 0,
      total: 100,
      progress: 0,
      status: "Draft",
      image: false,
    },
    {
      name: "Community Garden Expansion",
      details: "Eastside Park · Urban Agriculture",
      date: "Sep 15, 2024",
      time: "Completed",
      registrations: 30,
      total: 30,
      progress: 100,
      status: "Completed",
      image: true,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#101413] text-[#e0e3e1]">
      {/* ------------------- SIDEBAR -------------------- */}
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
        {/* Top Section */}
        <div className="mb-20 flex items-start justify-between">
          <div>
            <h1 className="mb-2 text-5xl font-semibold">Manage Events</h1>

            <p className="text-base text-[#c1cab3]">
              Track, edit, and monitor the status of your organized
              eco-stewardship activities.
            </p>
          </div>

          {/* Statistics */}
          <div className="flex gap-4">
            <div className="flex w-[170px] items-center gap-4 rounded-xl border border-[#324539] bg-[#1c201f] p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#24342A] text-[#afff66]">
                <RefreshCw size={23} />
              </div>

              <div>
                <p className="text-sm text-[#c1cab3]">Active</p>

                <h3 className="text-xl font-semibold">12</h3>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- EVENTS CARD --------------------- */}
        <section className="max-w-[1050px] overflow-hidden rounded-2xl border border-[#324539] bg-[#1c201f]">
          {/* Search */}
          <div className="flex items-center justify-between bg-[#24342A] p-6">
            <div className="flex h-10 w-[480px] items-center gap-3 rounded-md border border-[#324539] bg-[#14251d] px-4 text-[#c1cab3]">
              <Search size={20} />

              <input
                type="text"
                placeholder="Search events..."
                className="w-full bg-transparent text-sm tracking-wide outline-none placeholder:text-[#879083]"
              />
            </div>

            <button className="flex items-center gap-2 rounded-md border border-[#324539] px-5 py-2.5 text-sm tracking-widest text-[#c1cab3] transition hover:bg-[#1c201f]">
              <SlidersHorizontal size={17} />
              Filter
            </button>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-[2.3fr_1.1fr_0.9fr_0.9fr_0.6fr] bg-[#19201d] px-9 py-5 text-[11px] uppercase tracking-widest text-[#c1cab3]">
            <div>Event Name & Details</div>
            <div>Date & Time</div>
            <div>Registrations</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {/* Events */}
          {events.map((event, index) => (
            <div
              key={index}
              className="grid min-h-[120px] grid-cols-[2.3fr_1.1fr_0.9fr_0.9fr_0.6fr] items-center border-b border-[#24342A] px-9 py-4"
            >
              {/* Event Information */}
              <div className="flex items-center gap-4">
                <div className="flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-md bg-[#24342A] text-[#424938]">
                  {event.image ? (
                    <div
                      className={`h-full w-full ${
                        index === 0
                          ? "bg-gradient-to-br from-[#31503d] via-[#739e6b] to-[#17231b]"
                          : "bg-gradient-to-br from-[#202a24] via-[#4a5549] to-[#161b17]"
                      }`}
                    />
                  ) : (
                    <Image size={28} />
                  )}
                </div>

                <div>
                  <h3 className="max-w-[260px] text-[17px] font-semibold leading-7">
                    {event.name}
                  </h3>

                  <p className="mt-1 text-sm text-[#c1cab3]">{event.details}</p>
                </div>
              </div>

              {/* Date */}
              <div>
                <p className="mb-2 text-sm">{event.date}</p>

                <span className="text-xs text-[#c1cab3]">{event.time}</span>
              </div>

              {/* Registrations */}
              <div>
                <p className="mb-2 text-sm">
                  <strong>{event.registrations}</strong>
                  <span className="text-[#c1cab3]"> / {event.total}</span>
                </p>

                <div className="h-[7px] w-[110px] overflow-hidden rounded-full bg-[#324539]">
                  <div
                    className="h-full rounded-full bg-[#afff66]"
                    style={{
                      width: `${event.progress}%`,
                    }}
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                {event.status === "Published" && (
                  <span className="rounded-full border border-[#324539] bg-[#213324] px-3 py-2 text-[10px] tracking-widest text-[#afff66]">
                    ● PUBLISHED
                  </span>
                )}

                {event.status === "Draft" && (
                  <span className="rounded-full border border-[#324539] bg-[#29302d] px-3 py-2 text-[10px] tracking-widest text-[#c1cab3]">
                    ◌ DRAFT
                  </span>
                )}

                {event.status === "Completed" && (
                  <span className="rounded-full border border-[#324539] px-3 py-2 text-[10px] tracking-widest text-[#a3aaa1]">
                    ◉ COMPLETED
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between text-[#c1cab3]">
                {event.status === "Completed" ? (
                  <Eye
                    size={20}
                    className="cursor-pointer transition hover:text-[#afff66]"
                  />
                ) : (
                  <>
                    <Pencil
                      size={19}
                      className="cursor-pointer transition hover:text-[#afff66]"
                    />

                    {event.status === "Published" ? (
                      <X
                        size={21}
                        className="cursor-pointer transition hover:text-[#afff66]"
                      />
                    ) : (
                      <Trash2
                        size={19}
                        className="cursor-pointer transition hover:text-[#afff66]"
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-4 text-xs tracking-wider text-[#c1cab3]">
            <p>Showing 1–3 of 15 events</p>

            <div className="flex items-center gap-3">
              <ChevronLeft size={18} />

              <button className="flex h-8 w-8 items-center justify-center rounded-md bg-[#424f47] text-[#e0e3e1]">
                1
              </button>

              <button>2</button>
              <button>3</button>

              <ChevronRight size={18} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default OrganizerManageEvents;
