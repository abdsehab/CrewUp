import OrgCard from "../components/OrgCard";

const orgs = [
  { name: "GreenTech Initiative", desc: "Leveraging open-source hardware to monitor forest health and prevent illegal logging.", events: 42, volunteers: "1.2k+" },
  { name: "Ocean Clean AI", desc: "Deploying autonomous drone fleets guided by machine learning to map and clear ocean plastics.", events: 89, volunteers: "3.5k+" },
  { name: "Solar Action Network", desc: "Bringing sustainable energy to off-grid communities via volunteer-driven microgrid installs.", events: 15, volunteers: "850+" },
];

export default function Organizations() {
  return (
    <main className="flex-grow pt-8 pb-20 px-4 md:px-10 max-w-[1280px] mx-auto w-full">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-main">Partner Organizations</h1>
      <p className="text-text-muted max-w-2xl mb-12">
        Discover and collaborate with verified NGOs dedicated to environmental stewardship and tech-driven conservation.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orgs.map((org) => (
          <OrgCard key={org.name} {...org} />
        ))}
      </div>
    </main>
  );
}
