import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import EventCard from '../../components/EventCard';
import FilterSidebar from '../../components/FilterSidebar';
import { EVENTS } from '../../data/eventsData';

export default function ExploreEvents() {
  const [selectedCategories, setSelectedCategories] = useState(['Environmental']);
  const [dateFilter, setDateFilter] = useState('Any Date');
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  const toggleCategory = (cat) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const filtered = EVENTS.filter((e) => {
    const matchCat = selectedCategories.length === 0 || selectedCategories.includes(e.category);
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 md:px-6">
      <FilterSidebar
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        city={city}
        setCity={setCity}
      />

      <main className="flex-1 py-10 lg:pl-10 min-w-0">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-1">Explore Events</h1>
            <p className="text-light-muted text-sm">Find opportunities to make a tech-driven impact.</p>
          </div>
          <div className="flex items-center gap-2 bg-dark-surface border border-dark-border rounded-xl px-3 py-2 focus-within:border-brand/50 transition-colors w-full md:w-64">
            <Search className="w-4 h-4 text-light-muted flex-shrink-0" />
            <input type="text" placeholder="Search events..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent outline-none text-sm text-light placeholder-light-muted/50 w-full" />
          </div>
        </div>

        {/* Grid */}
        <p className="text-xs font-mono text-light-muted uppercase tracking-widest mb-6">{filtered.length} events found</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.slice(0, visibleCount).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filtered.length && (
          <div className="mt-12 flex justify-center">
            <button onClick={() => setVisibleCount((n) => n + 3)} className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-light-muted hover:text-brand transition-colors group">
              Load More Events
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
