export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-border-alt/20 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-10 py-12 max-w-[1280px] mx-auto">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold text-accent">CrewUp</span>
          <p className="text-text-muted">© 2026 CrewUp Platform. Empowering Eco-Tech Stewardship.</p>
        </div>
        <div className="md:col-span-2 flex flex-wrap justify-start md:justify-end gap-6 md:gap-12 mt-6 md:mt-0">
          <a href="#" className="text-text-muted hover:text-accent">Privacy Policy</a>
          <a href="#" className="text-text-muted hover:text-accent">Terms of Service</a>
          <a href="#" className="text-text-muted hover:text-accent">Contact Support</a>
          <a href="#" className="text-text-muted hover:text-accent">Volunteer Guide</a>
        </div>
      </div>
    </footer>
  );
}