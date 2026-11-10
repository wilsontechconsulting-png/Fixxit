export type JobTrade = "plumber" | "electrician" | "hvac";

export type Job = {
  id: string;
  title: string;
  trade: JobTrade;
  location: string;
  shortDescription: string;
  featured: boolean;
};

export const TRADE_LABELS: Record<JobTrade, string> = {
  plumber: "Plumbing",
  electrician: "Electrical",
  hvac: "HVAC",
};

export const TRADE_ICONS: Record<JobTrade, string> = {
  plumber: "🔧",
  electrician: "⚡",
  hvac: "❄️",
};

export const JOBS: Job[] = [
  {
    id: "hvac",
    title: "HVAC",
    trade: "hvac",
    location: "Florida",
    shortDescription: "Openings to qualify and lead the HVAC division, or to join as an experienced HVAC technician.",
    featured: true,
  },
  {
    id: "electrical",
    title: "Electrical",
    trade: "electrician",
    location: "Florida",
    shortDescription: "Openings to qualify and lead the electrical division, or to join as an experienced electrical technician.",
    featured: true,
  },
  {
    id: "plumber",
    title: "Plumber",
    trade: "plumber",
    location: "Florida",
    shortDescription: "Openings to qualify and lead the plumbing division, or to join as an experienced plumbing technician.",
    featured: true,
  },
];

export function getJob(id: string): Job | undefined {
  return JOBS.find((job) => job.id === id);
}

export function featuredJobs(): Job[] {
  return JOBS.filter((job) => job.featured);
}
