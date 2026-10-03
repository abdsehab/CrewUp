import { useEffect, useState } from "react";
import OrgCard from "../components/OrgCard";
import fetchJSON from "../utils/api";

export default function Organizations() {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchJSON("/api/organizations")
      .then((data) => {
        if (!cancelled) {
          const verifiedOrgs = data.filter((org) => org.status === "Verified");
          setOrgs(verifiedOrgs);
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

  return (
    <main className="flex-grow pt-8 pb-20 px-4 md:px-10 max-w-[1280px] mx-auto w-full">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Partner Organizations</h1>
      <p className="text-light-muted max-w-2xl mb-12">
        Discover and collaborate with verified NGOs dedicated to environmental stewardship and tech-driven conservation.
      </p>
      {loading ? (
        <div className="flex flex-col items-center justify-center text-center bg-dark-surface border border-dark-border rounded-xl py-20 px-6">
          <p className="text-sm text-light-muted">Loading organizations...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center text-center bg-dark-surface border border-dark-border rounded-xl py-20 px-6">
          <p className="text-lg font-semibold text-white mb-2">Couldn't load organizations</p>
          <p className="text-sm text-light-muted">{error}</p>
        </div>
      ) : orgs.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center bg-dark-surface border border-dark-border rounded-xl py-20 px-6">
          <p className="text-lg font-semibold text-white mb-2">No organizations yet</p>
          <p className="text-sm text-light-muted max-w-sm">
            Verified partner organizations will appear here as they join the platform.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orgs.map((org) => (
            <OrgCard key={org.name} {...org} />
          ))}
        </div>
      )}
    </main>
  );
}