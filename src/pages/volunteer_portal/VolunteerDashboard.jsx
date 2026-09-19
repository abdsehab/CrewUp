import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import EventCard from '../../components/EventCard';
import { Search } from 'lucide-react';
import fetchJSON from '../../utils/api';

export default function VolunteerDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'volunteer')) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (loading || !user) return;
    let cancelled = false;

    const fetchData = async () => {
      try {
        setIsFetching(true);
        const [eventsData, regsData] = await Promise.all([
          fetchJSON('/api/events'),
          fetchJSON('/api/registrations/my', { credentials: 'include' })
        ]);
        
        if (!cancelled) {
          setEvents(eventsData);
          setRegistrations(regsData);
        }
      } catch (err) {
        if (!cancelled) setError("Failed to load events.");
      } finally {
        if (!cancelled) setIsFetching(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [user, loading]);

  const handleRegister = async (eventId) => {
    try {
      await fetchJSON('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: eventId }),
        credentials: 'include'
      });
      // Update local state immediately
      setRegistrations([...registrations, { event: { _id: String(eventId) } }]);
    } catch (err) {
      alert(err.message || "Failed to register");
    }
  };

  const filteredEvents = events.filter(event => 
    event.title?.toLowerCase().includes(search.toLowerCase()) || 
    event.category?.toLowerCase().includes(search.toLowerCase())
  );

  const registeredEventIds = new Set(
    registrations.map(r => {
      if (!r.event) return null;
      return String(r.event._id || r.event.id || r.event);
    }).filter(Boolean)
  );

  const registeredEvents = filteredEvents.filter(event => 
    registeredEventIds.has(String(event._id)) || registeredEventIds.has(String(event.id))
  );
  
  const availableEvents = filteredEvents.filter(event => 
    !registeredEventIds.has(String(event._id)) && !registeredEventIds.has(String(event.id))
  );

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

      {isFetching ? (
        <div className="flex flex-col items-center justify-center text-center bg-dark-surface border border-dark-border rounded-2xl py-12 px-6">
          <p className="text-base font-semibold text-white mb-2">Loading events...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center text-center bg-dark-surface border border-dark-border rounded-2xl py-12 px-6">
          <p className="text-base font-semibold text-red-400 mb-2">{error}</p>
        </div>
      ) : (
        <>
          {/* Registered Events Section */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-white mb-6 border-b border-dark-border pb-2">Registered Events</h3>
            {registeredEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center bg-dark-surface border border-dark-border rounded-2xl py-12 px-6">
                <p className="text-base font-semibold text-white mb-2">You haven't registered for any events yet.</p>
                <p className="text-sm text-light-muted max-w-sm">
                  Check out the available events below and start making a difference.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {registeredEvents.map(event => (
                  <EventCard key={event._id || event.id} event={event} isRegistered={true} />
                ))}
              </div>
            )}
          </div>

          {/* Available Events Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 border-b border-dark-border pb-2">Available Events</h3>
            {availableEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center bg-dark-surface border border-dark-border rounded-2xl py-12 px-6">
                <p className="text-base font-semibold text-white mb-2">No events are currently available.</p>
                <p className="text-sm text-light-muted max-w-sm">
                  We couldn't find any available events matching your search. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableEvents.map(event => (
                  <EventCard key={event._id || event.id} event={event} isRegistered={false} onRegister={() => handleRegister(event._id || event.id)} />
                ))}
              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
}
