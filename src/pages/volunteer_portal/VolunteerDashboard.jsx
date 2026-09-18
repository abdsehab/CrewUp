import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import EventCard from '../../components/EventCard';
import { Search } from 'lucide-react';

const HARDCODED_EVENTS = [
  {
    id: "mock-1",
    title: "Urban Forest Mapping Initiative",
    start_time: new Date(Date.now() + 86400000).toISOString(),
    end_time: new Date(Date.now() + 86400000 + 5 * 3600000).toISOString(),
    location: "Downtown Metro Park",
    address: "120 Metro Park Blvd, Central District",
    is_remote: false,
    status: "urgent",
    isRegistered: true,
    icon: "leaf",
    category: "Environmental",
    image_url: "https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=1200&q=80",
    participant_count: 7,
    participant_previews: [{ initials: "JD" }, { initials: "AK" }],
    capacity: 50,
    filled: 32,
    description: [
      "The Urban Forest Mapping Initiative is a city-wide effort to digitally catalogue every tree in the metro area using GPS tagging and AI-assisted species identification.",
      "Volunteers will be equipped with mobile devices pre-loaded with our mapping app. No prior tech experience needed — our team will train you on-site within the first 30 minutes.",
    ],
    requirements: [
      { icon: "walk", title: "Physicality", desc: "Light to moderate. Comfortable walking for 2–4 hours on paved and unpaved paths." },
      { icon: "shoe", title: "Apparel", desc: "Comfortable walking shoes. Weather-appropriate layering recommended." },
      { icon: "food", title: "Provisions", desc: "Water and snacks provided. Bring your own refillable bottle." },
      { icon: "award", title: "Skills Gained", desc: "GIS data collection, species ID, open-source mapping tools." },
    ],
    organizer: {
      name: "GreenTech Initiative",
      bio: "Leveraging open-source hardware to monitor and restore urban ecosystems since 2019.",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=100&q=80",
    },
  },
  {
    id: "mock-2",
    title: "Community Network Infrastructure Build",
    start_time: new Date(Date.now() + 3 * 86400000).toISOString(),
    end_time: new Date(Date.now() + 3 * 86400000 + 6 * 3600000).toISOString(),
    location: "Eastside Tech Hub",
    address: "88 Innovation Lane, Eastside",
    is_remote: false,
    status: null,
    icon: "network",
    category: "Community Tech",
    image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    participant_count: 3,
    participant_previews: [{ initials: "LM" }],
    capacity: 20,
    filled: 12,
    description: [
      "Help build a free mesh Wi-Fi network for an underserved neighbourhood. This event focuses on physical installation of access points, cable management, and router configuration.",
      "You will work alongside network engineers and leave with hands-on experience in real-world infrastructure deployment.",
    ],
    requirements: [
      { icon: "walk", title: "Physicality", desc: "Moderate. Involves ladder work and carrying equipment up to 30lbs." },
      { icon: "shoe", title: "Apparel", desc: "Closed-toe shoes required. Avoid loose clothing near equipment." },
      { icon: "food", title: "Provisions", desc: "Lunch provided by the Hub cafeteria." },
      { icon: "award", title: "Skills Gained", desc: "Network configuration, cable crimping, site survey basics." },
    ],
    organizer: {
      name: "Ocean Clean AI",
      bio: "Deploying tech-first solutions to connect, empower and clean our communities globally.",
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=100&q=80",
    }
  },
  {
    id: "mock-3",
    title: "Open Source Eco-Tracker Hackathon",
    start_time: new Date(Date.now() + 5 * 86400000).toISOString(),
    end_time: new Date(Date.now() + 7 * 86400000).toISOString(),
    location: "Online (Global)",
    address: "Remote — Discord & GitHub",
    is_remote: true,
    status: "remote",
    icon: "terminal",
    category: "Community Tech",
    image_url: null,
    participant_count: 44,
    participant_previews: [{ initials: "JS" }, { initials: "RT" }],
    capacity: 200,
    filled: 44,
    description: [
      "A 48-hour global hackathon to build open-source tools that help communities track local environmental data — air quality, water pH, noise pollution and more.",
      "Teams of 2–5 will compete across categories: Best Data Visualisation, Best Hardware Integration, and Most Impactful Prototype.",
    ],
    requirements: [
      { icon: "walk", title: "Physicality", desc: "Remote event. Sit comfortably — just bring your laptop and creativity." },
      { icon: "shoe", title: "Apparel", desc: "Whatever you hack best in." },
      { icon: "food", title: "Provisions", desc: "Fuel yourself — snack budget reimbursement up to $20 for finalists." },
      { icon: "award", title: "Skills Gained", desc: "Full-stack development, IoT integration, data visualisation." },
    ],
    organizer: {
      name: "Solar Action Network",
      bio: "Bringing sustainable energy to off-grid communities via volunteer-driven microgrid installs.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&q=80",
    }
  }
];

export default function VolunteerDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [events] = useState(HARDCODED_EVENTS);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'volunteer')) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  // Later, events will be fetched from backend using:
  // fetchJSON('/api/events')

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(search.toLowerCase()) || 
    event.category.toLowerCase().includes(search.toLowerCase())
  );

  const registeredEvents = filteredEvents.filter(event => event.isRegistered);
  const availableEvents = filteredEvents.filter(event => !event.isRegistered);

  if (loading || !user) return null;

  return (
    <div className="flex flex-col flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-10">
      
      {/* Header / Welcome Section */}
      <div className="mb-10 bg-dark-surface border border-dark-border rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Welcome back, {user?.displayName || user?.username || 'Volunteer'}!
          </h1>
          <p className="text-light-muted text-lg">
            Ready to make a difference? Explore upcoming events from verified organizations and find your next opportunity to help.
          </p>
        </div>
      </div>

      {/* Global Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Your Dashboard</h2>
          <p className="text-light-muted text-sm tracking-wide">Manage your registrations and discover new opportunities.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-dark-surface border border-dark-border rounded-xl px-3 py-2 focus-within:border-brand/50 transition-colors w-full md:w-72">
          <Search className="w-4 h-4 text-light-muted flex-shrink-0" />
          <input 
            type="text" 
            placeholder="Search events..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="bg-transparent outline-none text-sm text-light placeholder-light-muted/50 w-full" 
          />
        </div>
      </div>

      {/* Registered Events Section */}
      {registeredEvents.length > 0 && (
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6 border-b border-dark-border pb-2">Registered Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registeredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Available Events Section */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-6 border-b border-dark-border pb-2">Available Events</h3>
        {availableEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center bg-dark-surface border border-dark-border rounded-2xl py-12 px-6">
            <p className="text-base font-semibold text-white mb-2">No available events found</p>
            <p className="text-sm text-light-muted max-w-sm">
              We couldn't find any available events matching your search. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
