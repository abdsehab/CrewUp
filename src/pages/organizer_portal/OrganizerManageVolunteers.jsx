import { useState, useEffect } from "react";
import fetchJSON from "../../utils/api";
import OrganizerSidebar from "../../components/organizer_portal/OrganizerSidebar";
import {
  Search,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Mail,
  Check,
  Trash2,
} from "lucide-react";

function OrganizerManageVolunteers() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("All Events");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // Selection state for bulk operations
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [approvingIds, setApprovingIds] = useState(new Set());
  const [bulkApproving, setBulkApproving] = useState(false);
  const [removingIds, setRemovingIds] = useState(new Set());
  const [bulkRemoving, setBulkRemoving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchJSON("/api/registrations", { credentials: "include" })
      .then((data) => {
        if (!cancelled) {
          setRegistrations(Array.isArray(data) ? data : []);
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

  const handleApprove = async (registrationId) => {
    setApprovingIds((prev) => new Set(prev).add(registrationId));
    try {
      let response;
      try {
        response = await fetch(`/api/registrations/${registrationId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: "Approved" }),
        });
      } catch {
        response = await fetch(
          `http://localhost:4000/api/registrations/${registrationId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ status: "Approved" }),
          },
        );
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to approve");

      setRegistrations((prev) =>
        prev.map((reg) =>
          reg._id === registrationId ? { ...reg, status: "Approved" } : reg,
        ),
      );
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(registrationId);
        return next;
      });
    } catch (err) {
      alert(err.message || "Failed to approve registration");
    } finally {
      setApprovingIds((prev) => {
        const next = new Set(prev);
        next.delete(registrationId);
        return next;
      });
    }
  };

  const handleRemove = async (registrationId, volunteerName) => {
    if (
      !window.confirm(
        `Are you sure you want to remove ${volunteerName ? `"${volunteerName}"` : "this volunteer"} from the event?`,
      )
    ) {
      return;
    }

    setRemovingIds((prev) => new Set(prev).add(registrationId));
    try {
      let response;
      try {
        response = await fetch(`/api/registrations/${registrationId}`, {
          method: "DELETE",
          credentials: "include",
        });
      } catch {
        response = await fetch(
          `http://localhost:4000/api/registrations/${registrationId}`,
          {
            method: "DELETE",
            credentials: "include",
          },
        );
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to remove volunteer");

      setRegistrations((prev) => prev.filter((reg) => reg._id !== registrationId));
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(registrationId);
        return next;
      });
    } catch (err) {
      alert(err.message || "Failed to remove volunteer");
    } finally {
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(registrationId);
        return next;
      });
    }
  };

  const handleBulkApprove = async () => {
    if (selectedIds.size === 0) {
      alert("Please select at least one volunteer to approve.");
      return;
    }

    const pendingToApprove = registrations.filter(
      (r) => selectedIds.has(r._id) && r.status !== "Approved",
    );

    if (pendingToApprove.length === 0) {
      alert("The selected volunteer(s) are already approved.");
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to approve ${pendingToApprove.length} selected volunteer registration(s)?`,
      )
    ) {
      return;
    }

    setBulkApproving(true);
    try {
      for (const reg of pendingToApprove) {
        try {
          await fetch(`/api/registrations/${reg._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ status: "Approved" }),
          });
        } catch {
          await fetch(`http://localhost:4000/api/registrations/${reg._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ status: "Approved" }),
          });
        }
      }

      const approvedIdSet = new Set(pendingToApprove.map((r) => r._id));
      setRegistrations((prev) =>
        prev.map((r) =>
          approvedIdSet.has(r._id) ? { ...r, status: "Approved" } : r,
        ),
      );
      setSelectedIds(new Set());
    } catch (err) {
      alert(err.message || "An error occurred during bulk approval");
    } finally {
      setBulkApproving(false);
    }
  };

  const handleBulkRemove = async () => {
    if (selectedIds.size === 0) {
      alert("Please select at least one volunteer to remove.");
      return;
    }

    const selectedList = registrations.filter((r) => selectedIds.has(r._id));

    if (
      !window.confirm(
        `Are you sure you want to remove ${selectedList.length} selected volunteer registration(s)?`,
      )
    ) {
      return;
    }

    setBulkRemoving(true);
    try {
      for (const reg of selectedList) {
        try {
          await fetch(`/api/registrations/${reg._id}`, {
            method: "DELETE",
            credentials: "include",
          });
        } catch {
          await fetch(`http://localhost:4000/api/registrations/${reg._id}`, {
            method: "DELETE",
            credentials: "include",
          });
        }
      }

      const removedIdSet = new Set(selectedList.map((r) => r._id));
      setRegistrations((prev) => prev.filter((r) => !removedIdSet.has(r._id)));
      setSelectedIds(new Set());
    } catch (err) {
      alert(err.message || "An error occurred during bulk removal");
    } finally {
      setBulkRemoving(false);
    }
  };

  // Distinct events for filter dropdown
  const uniqueEventTitles = Array.from(
    new Set(
      registrations
        .map((r) => r.event?.title)
        .filter(Boolean),
    ),
  );

  // Filtered registrations
  const filteredRegistrations = registrations.filter((reg) => {
    const volunteer = reg.user || reg.volunteer;
    const name = volunteer?.displayName || volunteer?.username || "";
    const eventTitle = reg.event?.title || "";
    const q = searchQuery.toLowerCase().trim();

    const matchesSearch =
      !q ||
      name.toLowerCase().includes(q) ||
      eventTitle.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "All" ||
      reg.status?.toLowerCase() === statusFilter.toLowerCase();

    const matchesEvent =
      selectedEvent === "All Events" || reg.event?.title === selectedEvent;

    return matchesSearch && matchesStatus && matchesEvent;
  });

  const allFilteredSelected =
    filteredRegistrations.length > 0 &&
    filteredRegistrations.every((r) => selectedIds.has(r._id));

  const toggleSelectAll = () => {
    if (allFilteredSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredRegistrations.map((r) => r._id)));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div
      className="flex min-h-screen bg-[#101413] text-[#e0e3e1]"
      onClick={() => {
        setIsEventDropdownOpen(false);
        setIsStatusDropdownOpen(false);
      }}
    >
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

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
              Manage Volunteers
            </h1>
            <p className="mt-3 max-w-[720px] text-sm leading-6 text-[#c1cab3] sm:text-base sm:leading-7">
              Review, filter, and approve volunteer registrations across all
              your active eco-tech initiatives.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:w-auto">
            <button
              type="button"
              onClick={handleBulkApprove}
              disabled={bulkApproving || bulkRemoving || loading}
              className={`flex h-[52px] w-full items-center justify-center gap-2.5 rounded-lg px-5 text-xs font-semibold uppercase tracking-widest transition disabled:opacity-50 sm:w-auto ${
                selectedIds.size > 0
                  ? "bg-[#afff66] text-[#101413] hover:bg-[#b7ff72]"
                  : "border border-[#324539] bg-[#1c201f] text-[#c1cab3] hover:border-[#afff66] hover:text-[#afff66]"
              }`}
              title={
                selectedIds.size > 0
                  ? `Approve ${selectedIds.size} selected volunteer(s)`
                  : "Select volunteers from the table to approve"
              }
            >
              <CheckCheck size={20} />
              <span>
                {bulkApproving ? (
                  "Approving..."
                ) : selectedIds.size > 0 ? (
                  <>Approve Selected ({selectedIds.size})</>
                ) : (
                  <>Select Volunteers</>
                )}
              </span>
            </button>

            {selectedIds.size > 0 && (
              <button
                type="button"
                onClick={handleBulkRemove}
                disabled={bulkApproving || bulkRemoving || loading}
                className="flex h-[52px] w-full items-center justify-center gap-2.5 rounded-lg border border-red-500/40 bg-red-500/10 px-5 text-xs font-semibold uppercase tracking-widest text-red-400 transition hover:border-red-500 hover:bg-red-500/20 disabled:opacity-50 sm:w-auto"
                title={`Remove ${selectedIds.size} selected volunteer(s)`}
              >
                <Trash2 size={18} />
                <span>
                  {bulkRemoving
                    ? "Removing..."
                    : `Remove Selected (${selectedIds.size})`}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <div className="flex h-[48px] w-full items-center gap-3 rounded-lg border border-[#324539] bg-[#14251d] px-5 sm:w-[420px]">
            <Search size={20} className="shrink-0 text-[#879083]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by volunteer name or event..."
              className="w-full bg-transparent text-sm tracking-wide text-[#e0e3e1] outline-none placeholder:text-[#879083]"
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

          {/* Event Filter */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsEventDropdownOpen(!isEventDropdownOpen);
                setIsStatusDropdownOpen(false);
              }}
              className="flex h-[48px] w-full items-center justify-between gap-2 rounded-lg border border-[#324539] bg-[#1c2923] px-5 text-sm tracking-wider text-[#e0e3e1] transition hover:border-[#afff66] sm:w-[220px]"
            >
              <span className="truncate">{selectedEvent}</span>
              <ChevronDown size={18} className="shrink-0 text-[#879083]" />
            </button>

            {isEventDropdownOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 top-14 z-30 max-h-60 w-64 overflow-y-auto rounded-xl border border-[#324539] bg-[#1c201f] p-2 shadow-2xl"
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedEvent("All Events");
                    setIsEventDropdownOpen(false);
                  }}
                  className={`w-full rounded-md px-3 py-2 text-left text-xs uppercase tracking-wider transition ${
                    selectedEvent === "All Events"
                      ? "bg-[#24342A] text-[#afff66]"
                      : "text-[#c1cab3] hover:bg-[#24342A]"
                  }`}
                >
                  All Events
                </button>
                {uniqueEventTitles.map((title) => (
                  <button
                    key={title}
                    type="button"
                    onClick={() => {
                      setSelectedEvent(title);
                      setIsEventDropdownOpen(false);
                    }}
                    className={`w-full truncate rounded-md px-3 py-2 text-left text-xs tracking-wide transition ${
                      selectedEvent === title
                        ? "bg-[#24342A] text-[#afff66]"
                        : "text-[#c1cab3] hover:bg-[#24342A]"
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Filter */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsStatusDropdownOpen(!isStatusDropdownOpen);
                setIsEventDropdownOpen(false);
              }}
              className="flex h-[48px] w-full items-center justify-between gap-2 rounded-lg border border-[#324539] bg-[#1c2923] px-5 text-sm tracking-wider text-[#e0e3e1] transition hover:border-[#afff66] sm:w-[150px]"
            >
              <span>{statusFilter === "All" ? "Status" : statusFilter}</span>
              <ChevronDown size={18} className="shrink-0 text-[#879083]" />
            </button>

            {isStatusDropdownOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 top-14 z-30 w-44 rounded-xl border border-[#324539] bg-[#1c201f] p-2 shadow-2xl"
              >
                {["All", "Pending", "Approved"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      setStatusFilter(st);
                      setIsStatusDropdownOpen(false);
                    }}
                    className={`w-full rounded-md px-3 py-2 text-left text-xs uppercase tracking-wider transition ${
                      statusFilter === st
                        ? "bg-[#24342A] text-[#afff66]"
                        : "text-[#c1cab3] hover:bg-[#24342A]"
                    }`}
                  >
                    {st === "All" ? "All Statuses" : st}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* REGISTRATIONS TABLE */}
        <section className="mt-6 w-full overflow-hidden rounded-2xl border border-[#324539] bg-[#1c201f]">
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              <div className="grid grid-cols-[50px_1.5fr_1.1fr_1.4fr_0.85fr_1fr] items-center border-b border-[#24342A] px-4 py-5 text-[11px] uppercase tracking-widest text-[#c1cab3]">
                <div>
                  <button
                    type="button"
                    onClick={toggleSelectAll}
                    className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                      allFilteredSelected
                        ? "border-[#afff66] bg-[#afff66] text-[#101413]"
                        : "border-[#324539] bg-[#101413]"
                    }`}
                  >
                    {allFilteredSelected && <Check size={12} strokeWidth={3} />}
                  </button>
                </div>
                <div>Volunteer</div>
                <div>Event Applied</div>
                <div>Key Skills</div>
                <div>Status</div>
                <div className="text-right">Actions</div>
              </div>

              {loading && (
                <div className="p-8 text-center text-[#c1cab3]">
                  Loading applications...
                </div>
              )}
              {error && (
                <div className="p-8 text-center text-red-400">{error}</div>
              )}

              {!loading &&
                !error &&
                filteredRegistrations.map((reg, index) => {
                  const volunteer = reg.user || reg.volunteer;
                  const volunteerName =
                    volunteer?.displayName ||
                    volunteer?.username ||
                    "Unknown User";
                  const volunteerEmail = volunteer?.username || "N/A";
                  const initials = volunteerName.substring(0, 2).toUpperCase();
                  const isSelected = selectedIds.has(reg._id);
                  const isApproving = approvingIds.has(reg._id);
                  const isRemoving = removingIds.has(reg._id);

                  return (
                    <div
                      key={reg._id || index}
                      className="grid min-h-[122px] grid-cols-[50px_1.5fr_1.1fr_1.4fr_0.85fr_1fr] items-center border-b border-[#24342A] px-4 transition hover:bg-[#14251d]/40"
                    >
                      <div>
                        <button
                          type="button"
                          onClick={() => toggleSelectOne(reg._id)}
                          className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                            isSelected
                              ? "border-[#afff66] bg-[#afff66] text-[#101413]"
                              : "border-[#324539] bg-[#101413]"
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                            index % 2 === 0
                              ? "bg-[#34463d] text-[#afff66]"
                              : "bg-[#1f3731] text-[#afff66]"
                          }`}
                        >
                          {initials}
                        </div>
                        <div>
                          <h3 className="text-[17px] font-semibold text-white">
                            {volunteerName}
                          </h3>
                          <a
                            href={`mailto:${volunteerEmail}`}
                            className="mt-1 flex items-center gap-1.5 text-sm text-[#c1cab3] hover:text-[#afff66]"
                          >
                            <Mail size={13} className="text-[#879083]" />
                            {volunteerEmail}
                          </a>
                        </div>
                      </div>

                      <div>
                        <p className="max-w-[200px] truncate text-[17px] font-medium text-white">
                          {reg.event?.title || "Unknown Event"}
                        </p>
                        <p className="mt-1 text-xs text-[#c1cab3]">
                          {reg.event?.start_time
                            ? new Date(
                                reg.event.start_time,
                              ).toLocaleDateString()
                            : ""}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {reg.skills && reg.skills.length > 0 ? (
                          reg.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="rounded-full bg-[#303735] px-3 py-1.5 text-xs tracking-wider text-[#c1cab3]"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-[#525b50]">
                            General Volunteer
                          </span>
                        )}
                      </div>

                      <div>
                        {reg.status === "Approved" ? (
                          <span className="whitespace-nowrap rounded-full border border-[#afff66] bg-[#24342A] px-4 py-2 text-xs tracking-wider text-[#afff66]">
                            • Approved
                          </span>
                        ) : (
                          <span className="whitespace-nowrap rounded-full border border-[#324539] bg-[#2a342d] px-4 py-2 text-xs tracking-wider text-[#c1cab3]">
                            <span className="mr-2 text-yellow-400">•</span>
                            Pending
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-end gap-2 text-right">
                        {reg.status !== "Approved" && (
                          <button
                            type="button"
                            onClick={() => handleApprove(reg._id)}
                            disabled={isApproving || isRemoving}
                            className="rounded-lg border border-[#537244] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#afff66] transition hover:bg-[#24342A] disabled:opacity-50"
                          >
                            {isApproving ? "..." : "Approve"}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemove(reg._id, volunteerName)}
                          disabled={isApproving || isRemoving}
                          title={`Remove ${volunteerName}`}
                          className="rounded-lg border border-red-500/30 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider text-red-400 transition hover:border-red-500 hover:bg-red-500/15 disabled:opacity-50"
                        >
                          {isRemoving ? "..." : "Remove"}
                        </button>
                      </div>
                    </div>
                  );
                })}

              {!loading && !error && filteredRegistrations.length === 0 && (
                <div className="p-12 text-center text-[#c1cab3]">
                  <p className="text-base font-medium">No volunteers found</p>
                  <p className="mt-1 text-xs text-[#879083]">
                    {registrations.length === 0
                      ? "No volunteers have registered for your events yet."
                      : "No volunteer applications match your search or filter selection."}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm tracking-wider text-[#c1cab3]">
              Showing {filteredRegistrations.length} of {registrations.length}{" "}
              registrations
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded bg-[#0d1411] text-[#c1cab3] transition hover:bg-[#24342A]"
              >
                <ChevronLeft size={19} />
              </button>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded bg-[#0d1411] text-[#c1cab3] transition hover:bg-[#24342A]"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default OrganizerManageVolunteers;
