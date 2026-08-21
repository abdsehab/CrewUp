import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-background border-b border-outline-variant/30">
      <div className="flex justify-between items-center px-4 md:px-10 py-2 max-w-[1280px] mx-auto">
        <div className="flex items-center gap-6">
          <span className="text-3xl font-bold text-primary-fixed">CrewUp</span>
          <div className="hidden md:flex gap-6 items-center ml-8">
            <Link to="/" className="text-on-surface-variant font-semibold hover:text-primary">Explore Events</Link>
            <Link to="/organizations" className="text-primary-fixed border-b-2 border-primary-fixed pb-2 font-semibold">Organizations</Link>
            <Link to="/about" className="text-on-surface-variant font-semibold hover:text-primary">About Us</Link>
          </div>
        </div>
        <button className="bg-primary-fixed text-[#1c3700] font-semibold px-6 py-2 rounded-full">Join Now</button>
      </div>
    </nav>
  );
}