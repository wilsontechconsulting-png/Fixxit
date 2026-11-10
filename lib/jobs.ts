export type JobTrade = "plumber" | "electrician" | "hvac";

export type Job = {
  id: string;
  title: string;
  trade: JobTrade;
  state: string;
  city?: string;
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

export const US_STATES: { code: string; name: string }[] = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

export function isJobTrade(value: string): value is JobTrade {
  return value === "plumber" || value === "electrician" || value === "hvac";
}

export function isUsStateCode(value: string): boolean {
  return US_STATES.some((state) => state.code === value);
}

export function stateName(code: string): string {
  return US_STATES.find((state) => state.code === code)?.name ?? code;
}

export function formatJobLocation(job: Job): string {
  const name = stateName(job.state);
  return job.city ? `${job.city}, ${name}` : name;
}

export const JOBS: Job[] = [
  {
    id: "hvac",
    title: "HVAC",
    trade: "hvac",
    state: "FL",
    shortDescription: "Openings to qualify and lead the HVAC division, or to join as an experienced HVAC technician.",
    featured: true,
  },
  {
    id: "electrical",
    title: "Electrical",
    trade: "electrician",
    state: "FL",
    shortDescription: "Openings to qualify and lead the electrical division, or to join as an experienced electrical technician.",
    featured: true,
  },
  {
    id: "plumber",
    title: "Plumber",
    trade: "plumber",
    state: "FL",
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
