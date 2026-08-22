import { MapPin } from 'lucide-react';
import { CATEGORIES, DATE_OPTIONS } from '../data/eventsData';

export default function FilterSidebar({ selectedCategories, toggleCategory, dateFilter, setDateFilter, city, setCity }) {
  return (
    <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto pr-2">
      <div className="bg-dark-surface border border-dark-border rounded-2xl p-6 flex flex-col gap-8">

        {/* Categories */}
        <div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-light-muted mb-4">Categories</p>
          <div className="space-y-3">
            {CATEGORIES.map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} className="w-4 h-4 rounded accent-brand" />
                <span className="text-sm text-light group-hover:text-brand transition-colors">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="h-px bg-dark-border" />

        {/* Date */}
        <div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-light-muted mb-4">Date</p>
          <div className="space-y-3">
            {DATE_OPTIONS.map((opt) => (
              <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="date-filter" checked={dateFilter === opt} onChange={() => setDateFilter(opt)} className="w-4 h-4 accent-brand" />
                <span className="text-sm text-light group-hover:text-brand transition-colors">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="h-px bg-dark-border" />

        {/* Location */}
        <div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-light-muted mb-4">Location</p>
          <div className="flex items-center gap-2 bg-dark-bg border border-dark-border rounded-xl px-3 py-2 focus-within:border-brand/50 transition-colors">
            <MapPin className="w-4 h-4 text-light-muted flex-shrink-0" />
            <input type="text" placeholder="Enter city..." value={city} onChange={(e) => setCity(e.target.value)} className="bg-transparent outline-none text-sm text-light placeholder-light-muted/50 w-full" />
          </div>
        </div>

      </div>
    </aside>
  );
}
