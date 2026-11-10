export type TradeSlug = "plumber" | "electrician" | "hvac";

export type FieldType = "text" | "email" | "tel" | "number" | "textarea" | "select" | "radio" | "checkbox" | "checkbox-group" | "file" | "files";

export type FormField = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  help?: string;
  accept?: string;
  maxSizeMb?: number;
  visibleWhen?: { name: string; value: string };
};

export const TRADES: Record<
  TradeSlug,
  {
    slug: TradeSlug;
    label: string;
    short: string;
    color: string;
    accent: string;
    tradeFields: FormField[];
  }
> = {
  plumber: {
    slug: "plumber",
    label: "Plumber",
    short: "Plumbing division",
    color: "#0ea5e9",
    accent: "#0369a1",
    tradeFields: [
      {
        name: "has_cfc",
        label: "Do you hold an active Florida Certified Plumbing Contractor (CFC) license?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes — Certified (CFC)" },
          { value: "registered", label: "Registered / local only (RF)" },
          { value: "no", label: "No license yet" },
        ],
      },
      {
        name: "license_number",
        label: "License number (if any)",
        type: "text",
        placeholder: "e.g. CFC1234567",
        help: "Verify at MyFloridaLicense.com",
      },
      {
        name: "registered_county",
        label: "If registered (RF), which county?",
        type: "text",
        placeholder: "County name",
      },
      {
        name: "specialties",
        label: "Specialties",
        type: "checkbox-group",
        options: [
          { value: "water_heaters", label: "Water heaters" },
          { value: "repipes", label: "Repipes" },
          { value: "gas_lines", label: "Gas lines" },
          { value: "bathroom_remodels", label: "Bathroom remodels" },
        ],
      },
    ],
  },
  electrician: {
    slug: "electrician",
    label: "Electrician",
    short: "Electrical division",
    color: "#f59e0b",
    accent: "#b45309",
    tradeFields: [
      {
        name: "has_ec",
        label: "Do you hold an active Florida Certified Electrical Contractor (EC) license?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes — Certified (EC)" },
          { value: "limited_energy", label: "Limited Energy only" },
          { value: "registered", label: "Registered / local only" },
          { value: "no", label: "No license yet" },
        ],
      },
      {
        name: "license_number",
        label: "License number (if any)",
        type: "text",
        placeholder: "e.g. EC1234567",
        help: "Verify at MyFloridaLicense.com",
      },
      {
        name: "local_license",
        label: "Registered / local license details (if any)",
        type: "text",
        placeholder: "County and license number",
      },
      {
        name: "ev_experience",
        label: "EV charger / Tesla install experience?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes" },
          { value: "some", label: "Some / assisted" },
          { value: "no", label: "No" },
        ],
      },
      {
        name: "three_phase",
        label: "Commercial / three-phase experience?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes" },
          { value: "some", label: "Some" },
          { value: "no", label: "No" },
        ],
      },
      {
        name: "permits_inspections",
        label: "Experience pulling permits and passing inspections?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes" },
          { value: "some", label: "Some" },
          { value: "no", label: "No" },
        ],
      },
    ],
  },
  hvac: {
    slug: "hvac",
    label: "HVAC",
    short: "HVAC division",
    color: "#10b981",
    accent: "#047857",
    tradeFields: [
      {
        name: "license_type",
        label: "Active Florida HVAC license type?",
        type: "select",
        required: true,
        options: [
          { value: "class_a", label: "Certified Class A Air-Conditioning" },
          { value: "class_b", label: "Certified Class B Air-Conditioning" },
          { value: "cmc", label: "Certified Mechanical (CMC)" },
          { value: "registered", label: "Registered / local only" },
          { value: "no", label: "No license yet" },
        ],
      },
      {
        name: "license_number",
        label: "License number (if any)",
        type: "text",
        placeholder: "e.g. CAC1234567",
        help: "Verify at MyFloridaLicense.com",
      },
      {
        name: "epa_608",
        label: "EPA 608 certification",
        type: "select",
        required: true,
        options: [
          { value: "universal", label: "Universal" },
          { value: "type1", label: "Type I" },
          { value: "type2", label: "Type II" },
          { value: "type3", label: "Type III" },
          { value: "none", label: "None" },
        ],
      },
      {
        name: "heat_pump_minisplit",
        label: "Heat pump / mini-split experience?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes" },
          { value: "some", label: "Some" },
          { value: "no", label: "No" },
        ],
      },
      {
        name: "load_calcs",
        label: "Comfortable with load calculations?",
        type: "select",
        required: true,
        options: [
          { value: "yes", label: "Yes" },
          { value: "some", label: "Some" },
          { value: "no", label: "No" },
        ],
      },
    ],
  },
};


export type ApplicationRole = "leader" | "technician";

export function isApplicationRole(value: string): value is ApplicationRole {
  return value === "leader" || value === "technician";
}

export function applicationRoleFields(trade: TradeSlug): FormField[] {
  const label = TRADES[trade].label;
  const licensePlaceholder =
    trade === "plumber" ? "e.g. CFC1234567" : trade === "electrician" ? "e.g. EC1234567" : "e.g. CAC1234567";
  return [
    {
      name: "role",
      label: "What are you applying for?",
      type: "radio",
      required: true,
      options: [
        {
          value: "leader",
          label: `Qualify and lead the ${label} division (licensed Florida contractor)`,
        },
        {
          value: "technician",
          label: `Experienced ${label} technician`,
        },
      ],
    },
    {
      name: "license_number",
      label: "Florida license number",
      type: "text",
      placeholder: licensePlaceholder,
      help: "Optional. You can verify a Florida license at MyFloridaLicense.com.",
      visibleWhen: { name: "role", value: "leader" },
    },
  ];
}

export const COMMON_FIELDS: FormField[] = [
  { name: "full_name", label: "Full name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  {
    name: "city_county",
    label: "City / county in Florida",
    type: "text",
    required: true,
    placeholder: "e.g. Tampa, Hillsborough County",
  },
  {
    name: "counties_willing",
    label: "Counties you're willing to cover",
    type: "textarea",
    placeholder: "List counties or say statewide",
  },
  {
    name: "years_experience",
    label: "Years of experience",
    type: "number",
    required: true,
  },
  {
    name: "years_supervising",
    label: "Years supervising crews",
    type: "number",
  },
  {
    name: "role_interest",
    label: "Role interest",
    type: "select",
    required: true,
    options: [
      { value: "qualifying_agent", label: "W-2 qualifying agent" },
      { value: "partner", label: "Partner" },
      { value: "division_manager", label: "Division manager" },
      { value: "technician", label: "Technician" },
    ],
  },
  {
    name: "availability",
    label: "Availability",
    type: "text",
    placeholder: "e.g. Immediate, 2 weeks notice",
  },
  {
    name: "references_text",
    label: "References",
    type: "textarea",
    placeholder: "Name, phone or email — optional but helpful",
  },
];

export const UPLOAD_FIELDS: FormField[] = [
  {
    name: "resume",
    label: "Resume / CV",
    type: "file",
    required: true,
    accept: ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    maxSizeMb: 10,
    help: "PDF, DOC, or DOCX — max 10 MB",
  },
  {
    name: "work_photos",
    label: "Optional work photos",
    type: "files",
    accept: "image/jpeg,image/png,image/webp,image/heic,.jpg,.jpeg,.png,.webp,.heic",
    maxSizeMb: 10,
    help: "Up to 5 photos, optional",
  },
  {
    name: "consent",
    label:
      "I confirm the information is accurate and I consent to FIXXIT Pros contacting me about this application. I understand license claims may be verified via MyFloridaLicense.com.",
    type: "checkbox",
    required: true,
  },
];

export function isTradeSlug(value: string): value is TradeSlug {
  return value === "plumber" || value === "electrician" || value === "hvac";
}
