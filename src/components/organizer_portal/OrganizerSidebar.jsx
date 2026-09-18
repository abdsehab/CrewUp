import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Plus,
  LogOut,
  X,
} from "lucide-react";

function OrganizerSidebar({ isOpen, setIsOpen }) {
  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex min-h-screen w-[275px] flex-col justify-between
  border-r border-[#24342A] bg-[#1c201f] px-6 py-7 transition-transform duration-300
  lg:static lg:translate-x-0
  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div>
        {/* Close Button for Mobile */}
        <div className="mb-5 flex justify-end lg:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#c1cab3] hover:text-[#afff66]"
          >
            <X size={26} />
          </button>
        </div>

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
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
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

          {/* Volunteers */}
          <NavLink
            to="/organizer/volunteers"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex w-full items-center gap-4 rounded-lg px-4 py-4 text-left text-xs uppercase tracking-widest transition ${
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

      {/* Bottom Buttons */}
      <div className="space-y-3">
        {/* Sign Out */}
        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#324539] py-4 font-medium tracking-wide text-[#c1cab3] transition hover:bg-[#24342A] hover:text-[#afff66]"
        >
          <LogOut size={20} />
          Sign Out
        </NavLink>

        {/* Create Event */}
        <NavLink
          to="/organizer/create-event"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `flex w-full items-center justify-center gap-3 rounded-lg py-4 font-medium tracking-wide transition ${
              isActive
                ? "bg-[#b7ff72] text-[#101413] shadow-lg"
                : "bg-[#afff66] text-[#101413] hover:bg-[#b7ff72]"
            }`
          }
        >
          <Plus size={21} />
          Create Event
        </NavLink>
      </div>
    </aside>
  );
}

export default OrganizerSidebar;
