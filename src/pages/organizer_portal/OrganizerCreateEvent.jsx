import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import OrganizerSidebar from "../../components/organizer_portal/OrganizerSidebar";
import { CLOUDINARY_IMAGES } from "../../constants/cloudinaryImages";
import {
  Menu,
  ArrowLeft,
  Calendar,
  MapPin,
  FileText,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const CATEGORIES = [
  "Environmental",
  "Community Tech",
  "Education",
  "Urban Renewal",
];

const ICONS = [
  { value: "leaf", label: "Leaf (Environmental)" },
  { value: "tree", label: "Tree (Restoration / Forestry)" },
  { value: "network", label: "Network (Infrastructure / Mesh)" },
  { value: "wifi", label: "Wifi (Smart Grid / Digital)" },
  { value: "terminal", label: "Terminal (Hackathon / Coding)" },
];

const DEFAULT_REQUIREMENTS = [
  {
    icon: "walk",
    title: "Physicality",
    desc: "Light to moderate walking.",
  },
  {
    icon: "shoe",
    title: "Apparel",
    desc: "Closed-toe shoes required.",
  },
  {
    icon: "food",
    title: "Provisions",
    desc: "Water and light snacks provided.",
  },
  {
    icon: "award",
    title: "Skills Gained",
    desc: "Practical field stewardship experience.",
  },
];

function OrganizerCreateEvent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Environmental",
    icon: "leaf",
    image_url: CLOUDINARY_IMAGES.event_urban_forest_mapping,
    start_time: "",
    end_time: "",
    is_remote: false,
    location: "",
    address: "",
    capacity: 50,
    status: "Published",
    description: "",
  });

  const [requirements, setRequirements] = useState(DEFAULT_REQUIREMENTS);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRequirementChange = (index, field, value) => {
    setRequirements((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        title: formData.title.trim(),
        category: formData.category,
        icon: formData.icon,
        organizer: user?.displayName || undefined,
        image_url: formData.image_url.trim() || undefined,
        start_time: formData.start_time
          ? new Date(formData.start_time).toISOString()
          : undefined,
        end_time: formData.end_time
          ? new Date(formData.end_time).toISOString()
          : undefined,
        is_remote: Boolean(formData.is_remote),
        location: formData.location.trim(),
        address: formData.address.trim(),
        capacity: Number(formData.capacity) || 50,
        status: formData.status,
        description: formData.description.trim() || "No description provided.",
        requirements: requirements.filter((r) => r.title.trim()),
      };

      let response;
      try {
        response = await fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
      } catch {
        response = await fetch("http://localhost:4000/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to create event");
      }

      navigate("/organizer/events");
    } catch (err) {
      setError(err.message || "An error occurred while creating the event.");
    } finally {
      setSubmitting(false);
    }
  };

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

        {/* Top Header */}
        <div className="mb-8 lg:mb-10">
          <Link
            to="/organizer/events"
            className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#c1cab3] transition hover:text-[#afff66]"
          >
            <ArrowLeft size={16} /> Back to Events
          </Link>
          <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Create New Event
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#c1cab3] sm:text-base sm:leading-7">
            Publish a new eco-stewardship activity or community initiative for
            volunteers.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/50 bg-red-900/30 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        {/* Event Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
          {/* 1. Basic Information */}
          <section className="rounded-2xl border border-[#324539] bg-[#1c201f] p-6 sm:p-8">
            <h2 className="mb-6 flex items-center gap-2.5 text-lg font-semibold text-[#afff66]">
              <Sparkles size={20} />
              Basic Information
            </h2>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-[#c1cab3]">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Urban Forest Mapping & Tree Inventory"
                  className="w-full rounded-lg border border-[#324539] bg-[#14251d] px-4 py-3.5 text-sm text-[#e0e3e1] outline-none transition placeholder:text-[#879083] focus:border-[#afff66]"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-[#c1cab3]">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#324539] bg-[#14251d] px-4 py-3.5 text-sm text-[#e0e3e1] outline-none transition focus:border-[#afff66]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-[#1c201f]">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-[#c1cab3]">
                    Category Icon
                  </label>
                  <select
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#324539] bg-[#14251d] px-4 py-3.5 text-sm text-[#e0e3e1] outline-none transition focus:border-[#afff66]"
                  >
                    {ICONS.map((item) => (
                      <option
                        key={item.value}
                        value={item.value}
                        className="bg-[#1c201f]"
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-[#c1cab3]">
                    Hosting Organization
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={user?.displayName || "My Organization"}
                    className="w-full cursor-not-allowed rounded-lg border border-[#324539] bg-[#14251d]/60 px-4 py-3.5 text-sm font-medium text-[#afff66] outline-none select-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-[#c1cab3]">
                    Publishing Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#324539] bg-[#14251d] px-4 py-3.5 text-sm text-[#e0e3e1] outline-none transition focus:border-[#afff66]"
                  >
                    <option value="Published" className="bg-[#1c201f]">
                      Published (Active & Visible)
                    </option>
                    <option value="Draft" className="bg-[#1c201f]">
                      Draft (Hidden)
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-[#c1cab3]">
                  Cover Image URL
                </label>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <input
                      type="url"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleChange}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full rounded-lg border border-[#324539] bg-[#14251d] px-4 py-3.5 text-sm text-[#e0e3e1] outline-none transition placeholder:text-[#879083] focus:border-[#afff66]"
                    />
                  </div>
                  {formData.image_url && (
                    <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-[#324539] bg-[#14251d]">
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* 2. Date & Time */}
          <section className="rounded-2xl border border-[#324539] bg-[#1c201f] p-6 sm:p-8">
            <h2 className="mb-6 flex items-center gap-2.5 text-lg font-semibold text-[#afff66]">
              <Calendar size={20} />
              Date & Schedule
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-[#c1cab3]">
                  Start Date & Time *
                </label>
                <input
                  type="datetime-local"
                  name="start_time"
                  required
                  value={formData.start_time}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#324539] bg-[#14251d] px-4 py-3.5 text-sm text-[#e0e3e1] outline-none transition focus:border-[#afff66] [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-[#c1cab3]">
                  End Date & Time *
                </label>
                <input
                  type="datetime-local"
                  name="end_time"
                  required
                  value={formData.end_time}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#324539] bg-[#14251d] px-4 py-3.5 text-sm text-[#e0e3e1] outline-none transition focus:border-[#afff66] [color-scheme:dark]"
                />
              </div>
            </div>
          </section>

          {/* 3. Location & Capacity */}
          <section className="rounded-2xl border border-[#324539] bg-[#1c201f] p-6 sm:p-8">
            <h2 className="mb-6 flex items-center gap-2.5 text-lg font-semibold text-[#afff66]">
              <MapPin size={20} />
              Location & Capacity
            </h2>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_remote"
                  name="is_remote"
                  checked={formData.is_remote}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-[#324539] bg-[#14251d] text-[#afff66] focus:ring-0 focus:ring-offset-0"
                />
                <label
                  htmlFor="is_remote"
                  className="text-sm font-medium text-[#e0e3e1]"
                >
                  This is a remote / virtual event
                </label>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-[#c1cab3]">
                    {formData.is_remote ? "Platform / Venue *" : "Location / Venue *"}
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder={
                      formData.is_remote
                        ? "e.g. Online (Global)"
                        : "e.g. Riverside Nature Reserve"
                    }
                    className="w-full rounded-lg border border-[#324539] bg-[#14251d] px-4 py-3.5 text-sm text-[#e0e3e1] outline-none transition placeholder:text-[#879083] focus:border-[#afff66]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-[#c1cab3]">
                    {formData.is_remote
                      ? "Virtual Link / Server"
                      : "Physical Address"}
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder={
                      formData.is_remote
                        ? "e.g. Remote — Discord & GitHub"
                        : "e.g. 5 River Rd, North District"
                    }
                    className="w-full rounded-lg border border-[#324539] bg-[#14251d] px-4 py-3.5 text-sm text-[#e0e3e1] outline-none transition placeholder:text-[#879083] focus:border-[#afff66]"
                  />
                </div>
              </div>

              <div className="max-w-xs">
                <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-[#c1cab3]">
                  Volunteer Capacity *
                </label>
                <input
                  type="number"
                  name="capacity"
                  min="1"
                  max="1000"
                  required
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#324539] bg-[#14251d] px-4 py-3.5 text-sm text-[#e0e3e1] outline-none transition focus:border-[#afff66]"
                />
              </div>
            </div>
          </section>

          {/* 4. Event Description */}
          <section className="rounded-2xl border border-[#324539] bg-[#1c201f] p-6 sm:p-8">
            <h2 className="mb-6 flex items-center gap-2.5 text-lg font-semibold text-[#afff66]">
              <FileText size={20} />
              Description & Details
            </h2>

            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-[#c1cab3]">
                Event Description *
              </label>
              <textarea
                name="description"
                rows={5}
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the initiative, volunteer responsibilities, and expected outcomes. You can separate paragraphs with line breaks."
                className="w-full resize-none rounded-lg border border-[#324539] bg-[#14251d] px-4 py-3.5 text-sm leading-relaxed text-[#e0e3e1] outline-none transition placeholder:text-[#879083] focus:border-[#afff66]"
              />
              <p className="mt-2 text-xs text-[#879083]">
                Each line or paragraph break will be formatted as a readable
                section on the event details page.
              </p>
            </div>
          </section>

          {/* 5. Requirements & Perks */}
          <section className="rounded-2xl border border-[#324539] bg-[#1c201f] p-6 sm:p-8">
            <h2 className="mb-6 flex items-center gap-2.5 text-lg font-semibold text-[#afff66]">
              <CheckCircle2 size={20} />
              Requirements & Perks
            </h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {requirements.map((req, idx) => (
                <div
                  key={req.icon || idx}
                  className="rounded-xl border border-[#324539] bg-[#14251d] p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#afff66]">
                      {req.title}
                    </span>
                    <span className="rounded bg-[#24342A] px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#c1cab3]">
                      {req.icon}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={req.desc}
                    onChange={(e) =>
                      handleRequirementChange(idx, "desc", e.target.value)
                    }
                    placeholder={`Details for ${req.title}`}
                    className="w-full rounded-md border border-[#24342A] bg-[#101413] px-3 py-2 text-xs text-[#e0e3e1] outline-none transition focus:border-[#afff66]"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-4 pt-4 sm:flex-row sm:items-center sm:justify-end">
            <Link
              to="/organizer/events"
              className="flex items-center justify-center rounded-lg border border-[#324539] px-6 py-4 text-xs font-medium uppercase tracking-widest text-[#c1cab3] transition hover:bg-[#24342A] hover:text-[#afff66]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#afff66] px-8 py-4 text-xs font-semibold uppercase tracking-widest text-[#101413] transition hover:bg-[#b7ff72] disabled:opacity-50"
            >
              {submitting ? "Publishing Event..." : "Publish Event"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default OrganizerCreateEvent;

