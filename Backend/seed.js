import "dotenv/config";
import mongoose from "mongoose";
import Organization from "./model/organization.js";
import Event from "./model/event.js";

const ORGANIZATIONS = [
  {
    name: "GreenTech Initiative",
    desc: "Leveraging open-source hardware to monitor forest health and prevent illegal logging.",
    bio: "Leveraging open-source hardware to monitor and restore urban ecosystems since 2019.",
    image: "https://res.cloudinary.com/dsemiizxm/image/upload/v1789831588/org_greentech_initiative_xrfpht.webp",
    events: 42,
    volunteers: "1.2k+",
  },
  {
    name: "Ocean Clean AI",
    desc: "Deploying autonomous drone fleets guided by machine learning to map and clear ocean plastics.",
    bio: "Deploying tech-first solutions to connect, empower and clean our communities globally.",
    image: "https://res.cloudinary.com/dsemiizxm/image/upload/v1789831588/org_ocean_clean_ai_w6fog8.webp",
    events: 89,
    volunteers: "3.5k+",
  },
  {
    name: "Solar Action Network",
    desc: "Bringing sustainable energy to off-grid communities via volunteer-driven microgrid installs.",
    bio: "Bringing sustainable energy to off-grid communities via volunteer-driven microgrid installs.",
    image: "https://res.cloudinary.com/dsemiizxm/image/upload/v1789831589/org_solar_action_network_stx2ea.webp",
    events: 15,
    volunteers: "850+",
  },
  {
    name: "Urban Roots Collective",
    desc: "Fostering greener, climate-resilient cities through grassroots community stewardship.",
    bio: "Fostering greener, climate-resilient cities through grassroots community stewardship.",
    image: "https://res.cloudinary.com/dsemiizxm/image/upload/v1789831590/org_urban_roots_collective_pqfsgl.webp",
    events: 28,
    volunteers: "950+",
  },
];

const daysFromNow = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
};

const atHour = (date, hour, minute = 0) => {
  const d = new Date(date);
  d.setHours(hour, minute, 0, 0);
  return d;
};

const thisWeekend = () => {
  const today = new Date();
  const daysUntilSaturday = (6 - today.getDay() + 7) % 7;
  return daysFromNow(daysUntilSaturday);
};

const weekendStart = thisWeekend();
const weekendEnd = atHour(new Date(weekendStart.getTime() + 86400000), 23, 59);

const EVENTS = [
  {
    id: 1,
    title: "Urban Forest Mapping Initiative",
    start_time: atHour(daysFromNow(1), 9),
    end_time: atHour(daysFromNow(1), 14),
    location: "Downtown Metro Park",
    address: "120 Metro Park Blvd, Central District",
    is_remote: false,
    status: "urgent",
    icon: "leaf",
    category: "Environmental",
    image_url: "https://res.cloudinary.com/dsemiizxm/image/upload/v1789831586/event_urban_forest_mapping_e5uqyi.webp",
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
    organizer: "GreenTech Initiative",
  },
  {
    id: 2,
    title: "Community Network Infrastructure Build",
    start_time: atHour(daysFromNow(3), 10),
    end_time: atHour(daysFromNow(3), 16),
    location: "Eastside Tech Hub",
    address: "88 Innovation Lane, Eastside",
    is_remote: false,
    status: null,
    icon: "network",
    category: "Community Tech",
    image_url: "https://res.cloudinary.com/dsemiizxm/image/upload/v1789831592/event_community_network_build_pfndax.webp",
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
    organizer: "Ocean Clean AI",
  },
  {
    id: 3,
    title: "Open Source Eco-Tracker Hackathon",
    start_time: weekendStart,
    end_time: weekendEnd,
    location: "Online (Global)",
    address: "Remote — Discord & GitHub",
    is_remote: true,
    status: "remote",
    icon: "terminal",
    category: "Community Tech",
    image_url: "https://res.cloudinary.com/dsemiizxm/image/upload/v1789831593/event_eco_tracker_hackathon_liazoh.webp",
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
    organizer: "Solar Action Network",
  },
  {
    id: 4,
    title: "Watershed Restoration Sprint",
    start_time: atHour(daysFromNow(6), 8),
    end_time: atHour(daysFromNow(6), 13),
    location: "Riverside Nature Reserve",
    address: "5 River Rd, North District",
    is_remote: false,
    status: null,
    icon: "tree",
    category: "Environmental",
    image_url: "https://res.cloudinary.com/dsemiizxm/image/upload/v1789831588/event_watershed_restoration_rs5s3p.webp",
    participant_count: 11,
    participant_previews: [{ initials: "MR" }, { initials: "SA" }, { initials: "PO" }],
    capacity: 40,
    filled: 11,
    description: [
      "Assist environmental scientists in restoring a degraded stretch of riverbank. Activities include native plant installation, invasive species removal, and water quality sampling.",
      "This is a foundational restoration sprint — your contributions will have measurable ecological impact tracked and published in the annual watershed report.",
    ],
    requirements: [
      { icon: "walk", title: "Physicality", desc: "High. Expect muddy terrain, kneeling, and lifting up to 25lbs." },
      { icon: "shoe", title: "Apparel", desc: "Waterproof boots essential. Gloves and aprons provided on site." },
      { icon: "food", title: "Provisions", desc: "Hot breakfast and packed lunch included." },
      { icon: "award", title: "Skills Gained", desc: "Water sampling, native flora identification, ecological data logging." },
    ],
    organizer: "GreenTech Initiative",
  },
  {
    id: 5,
    title: "Smart Grid Education Workshop",
    start_time: atHour(daysFromNow(10), 14),
    end_time: atHour(daysFromNow(10), 18),
    location: "City Innovation Centre",
    address: "200 Civic Square, Downtown",
    is_remote: false,
    status: null,
    icon: "wifi",
    category: "Education",
    image_url: "https://res.cloudinary.com/dsemiizxm/image/upload/v1789831585/event_smart_grid_workshop_fni9fv.webp",
    participant_count: 15,
    participant_previews: [{ initials: "KN" }],
    capacity: 60,
    filled: 15,
    description: [
      "A hands-on workshop teaching community members how smart grids work and how to read and reduce their household energy consumption using open data dashboards.",
      "Facilitators include energy engineers from the city's utility provider. Interactive stations let participants simulate load balancing and peak-demand scenarios.",
    ],
    requirements: [
      { icon: "walk", title: "Physicality", desc: "Minimal. Mostly seated workshop with some demonstration stations." },
      { icon: "shoe", title: "Apparel", desc: "No specific requirements. Smart casual or comfortable." },
      { icon: "food", title: "Provisions", desc: "Coffee, tea and light refreshments throughout." },
      { icon: "award", title: "Skills Gained", desc: "Energy literacy, smart meter reading, demand-response strategies." },
    ],
    organizer: "Solar Action Network",
  },
  {
    id: 6,
    title: "Urban Renewal Planning Hackathon",
    start_time: atHour(daysFromNow(14), 0),
    end_time: atHour(daysFromNow(15), 23, 59),
    location: "Online (Global)",
    address: "Remote — Figma & Miro",
    is_remote: true,
    status: "remote",
    icon: "terminal",
    category: "Urban Renewal",
    image_url: "https://res.cloudinary.com/dsemiizxm/image/upload/v1789831586/event_urban_renewal_hackathon_l58ij4.webp",
    participant_count: 30,
    participant_previews: [{ initials: "BR" }, { initials: "EC" }],
    capacity: 150,
    filled: 30,
    description: [
      "A design and planning hackathon focused on reimagining underused urban spaces. Teams will pitch data-backed proposals for parks, community gardens, and mixed-use green corridors.",
      "Submissions are judged by urban planners, architects, and city council representatives. Top proposals are submitted to the city's public consultation process.",
    ],
    requirements: [
      { icon: "walk", title: "Physicality", desc: "Remote. Comfortable setup with good internet connection recommended." },
      { icon: "shoe", title: "Apparel", desc: "Casual — it's remote!" },
      { icon: "food", title: "Provisions", desc: "Self-catered. Finalist teams receive a meal voucher." },
      { icon: "award", title: "Skills Gained", desc: "Urban design thinking, data storytelling, stakeholder pitching." },
    ],
    organizer: "Ocean Clean AI",
  },
  {
    id: 7,
    title: "Dhanmondi Lake Cleaning Initiative",
    start_time: atHour(daysFromNow(18), 7, 30),
    end_time: atHour(daysFromNow(18), 12, 30),
    location: "Dhanmondi Lake Park",
    address: "Road 8A, Dhanmondi, Dhaka",
    is_remote: false,
    status: "urgent",
    icon: "leaf",
    category: "Environmental",
    image_url: "https://res.cloudinary.com/dsemiizxm/image/upload/v1789831592/event_dhanmondi_lake_cleaning_hzrqh7.webp",
    participant_count: 22,
    participant_previews: [{ initials: "TH" }, { initials: "RH" }, { initials: "SZ" }],
    capacity: 80,
    filled: 45,
    description: [
      "A community-driven ecological initiative dedicated to restoring and revitalizing Dhanmondi Lake and its surrounding walkways using IoT water sensors and volunteer cleanup squads.",
      "Participants will remove floating debris, install bio-filter mats, and collect water sample metrics to log into our open environmental observatory.",
    ],
    requirements: [
      { icon: "walk", title: "Physicality", desc: "Moderate. Bending, walking lakeside, and carrying collection bins." },
      { icon: "shoe", title: "Apparel", desc: "Sturdy rubber boots and comfortable clothes. Protective gear provided." },
      { icon: "food", title: "Provisions", desc: "Breakfast, drinking water, and glucose packs provided on arrival." },
      { icon: "award", title: "Skills Gained", desc: "Water sampling, bio-retention maintenance, community leadership." },
    ],
    organizer: "Urban Roots Collective",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to database");

    await Organization.deleteMany({});
    await Event.deleteMany({});

    const insertedOrgs = await Organization.insertMany(ORGANIZATIONS);
    console.log(`Inserted ${insertedOrgs.length} organizations`);

    const orgByName = new Map(
      insertedOrgs.map((org) => [org.name, org._id]),
    );

    const events = EVENTS.map(({ organizer, ...rest }) => ({
      ...rest,
      organizer: orgByName.get(organizer),
    }));

    const insertedEvents = await Event.insertMany(events);
    console.log(`Inserted ${insertedEvents.length} events`);

    await mongoose.disconnect();
    console.log("Seeding complete");
  } catch (err) {
    console.error("Seeding failed:", err);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seed();