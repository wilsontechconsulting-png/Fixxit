"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  COMMON_FIELDS,
  TRADES,
  UPLOAD_FIELDS,
  applicationRoleFields,
  type FormField,
} from "@/lib/join-trades";
import type { Job } from "@/lib/jobs";

type Props = { job: Job };

export default function JoinApplyForm({ job }: Props) {
  const router = useRouter();
  const trade = job.trade;
  const config = TRADES[trade];
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [groups, setGroups] = useState<Record<string, string[]>>({});
  const [resume, setResume] = useState<File | null>(null);
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [consent, setConsent] = useState(false);

  const roleFields = useMemo(() => applicationRoleFields(trade), [trade]);

  const steps = useMemo(
    () => [
      { key: "role", title: "What are you applying for?", fields: roleFields },
      { key: "trade", title: `${config.label} experience`, fields: config.tradeFields },
      { key: "about", title: "About you", fields: COMMON_FIELDS },
      { key: "upload", title: "Resume & submit", fields: UPLOAD_FIELDS },
    ],
    [config, roleFields],
  );

  function isVisible(field: FormField) {
    if (!field.visibleWhen) return true;
    return values[field.visibleWhen.name] === field.visibleWhen.value;
  }

  function fieldsForStep(stepIndex: number): FormField[] {
    const current = steps[stepIndex];
    const visible = current.fields.filter(isVisible);
    if (current.key !== "trade") return visible;
    const alreadyAsked = new Set(roleFields.filter(isVisible).map((field) => field.name));
    return visible.filter((field) => !alreadyAsked.has(field.name));
  }

  function setValue(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function toggleGroup(name: string, option: string) {
    setGroups((prev) => {
      const current = prev[name] || [];
      const next = current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option];
      return { ...prev, [name]: next };
    });
  }

  function validateStep(): string | null {
    const fields = fieldsForStep(step);
    for (const field of fields) {
      if (!field.required) continue;
      if (field.type === "checkbox") {
        if (!consent) return "Please confirm the consent checkbox.";
        continue;
      }
      if (field.type === "file") {
        if (!resume) return "Please upload your resume.";
        continue;
      }
      if (field.type === "checkbox-group") continue;
      if (!String(values[field.name] || "").trim()) {
        return `Please fill in: ${field.label}`;
      }
    }
    return null;
  }

  async function next() {
    const issue = validateStep();
    if (issue) {
      setError(issue);
      return;
    }
    setError(null);
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    await submit();
  }

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const tradeAnswers: Record<string, unknown> = {};
      for (const field of [...roleFields, ...config.tradeFields]) {
        if (field.type === "checkbox-group") {
          tradeAnswers[field.name] = groups[field.name] || [];
        } else if (isVisible(field) || values[field.name]) {
          tradeAnswers[field.name] = values[field.name] || "";
        }
      }

      const form = new FormData();
      form.set("trade", trade);
      form.set("role", values.role || "");
      form.set("job_id", job.id);
      form.set("job_title", job.title);
      form.set("trade_answers", JSON.stringify(tradeAnswers));
      for (const field of COMMON_FIELDS) {
        form.set(field.name, values[field.name] || "");
      }
      form.set("consent", consent ? "true" : "false");
      if (resume) form.set("resume", resume);
      if (photos) {
        Array.from(photos).slice(0, 5).forEach((file) => form.append("work_photos", file));
      }

      const res = await fetch("/api/join/apply", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }
      router.push(`/join/thank-you?job=${job.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
      setBusy(false);
    }
  }

  return (
    <div className="join-form">
      <div className="join-steps">
        {steps.map((s, i) => (
          <div key={s.key} style={{ display: "flex", flex: 1, alignItems: "center", gap: "0.5rem" }}>
            <div className={`join-step-num${i <= step ? " active" : ""}`}>{i + 1}</div>
            {i < steps.length - 1 && <div className={`join-step-bar${i < step ? " active" : ""}`} />}
          </div>
        ))}
      </div>

      <h2>{steps[step].title}</h2>
      <p className="form-desc">
        Step {step + 1} of {steps.length} · {config.label}
      </p>

      <div>
        {fieldsForStep(step).map((field) => (
          <Field
            key={field.name}
            field={field}
            value={values[field.name] || ""}
            group={groups[field.name] || []}
            consent={consent}
            onChange={setValue}
            onToggleGroup={toggleGroup}
            onConsent={setConsent}
            onResume={setResume}
            onPhotos={setPhotos}
            resumeName={resume?.name}
          />
        ))}
      </div>

      {error && (
        <p className="join-error" role="alert">
          {error}
        </p>
      )}

      <div className="join-actions">
        {step > 0 && (
          <button type="button" className="btn join-back-btn" onClick={() => { setError(null); setStep((s) => s - 1); }} disabled={busy}>
            Back
          </button>
        )}
        <button type="button" className="btn btn-blue join-continue-btn" onClick={next} disabled={busy}>
          {busy ? "Submitting…" : step === steps.length - 1 ? "Submit application" : "Continue"}
        </button>
      </div>

      <p className="join-license-note">
        Verify Florida licenses at{" "}
        <a href="https://www.myfloridalicense.com/wl11.asp" target="_blank" rel="noopener noreferrer">
          MyFloridaLicense.com
        </a>
        . We do not auto-verify licenses on this form.
      </p>
    </div>
  );
}

function Field({
  field,
  value,
  group,
  consent,
  onChange,
  onToggleGroup,
  onConsent,
  onResume,
  onPhotos,
  resumeName,
}: {
  field: FormField;
  value: string;
  group: string[];
  consent: boolean;
  onChange: (name: string, value: string) => void;
  onToggleGroup: (name: string, option: string) => void;
  onConsent: (v: boolean) => void;
  onResume: (f: File | null) => void;
  onPhotos: (f: FileList | null) => void;
  resumeName?: string;
}) {
  if (field.type === "checkbox") {
    return (
      <label className="checkbox-item join-consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => onConsent(e.target.checked)}
          required={field.required}
        />
        <span>{field.label}</span>
      </label>
    );
  }

  if (field.type === "radio") {
    return (
      <fieldset className="join-fieldset">
        <legend>
          {field.label}
          {field.required ? " *" : ""}
        </legend>
        <div className="join-radio-list">
          {(field.options || []).map((opt) => (
            <label key={opt.value} className={`join-radio-option${value === opt.value ? " selected" : ""}`}>
              <input
                type="radio"
                name={field.name}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(field.name, opt.value)}
                required={field.required}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (field.type === "checkbox-group") {
    return (
      <fieldset className="join-fieldset">
        <legend>{field.label}</legend>
        <div className="services-checkbox-grid">
          {(field.options || []).map((opt) => (
            <label key={opt.value} className="checkbox-item">
              <input
                type="checkbox"
                checked={group.includes(opt.value)}
                onChange={() => onToggleGroup(field.name, opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (field.type === "file" || field.type === "files") {
    const multiple = field.type === "files";
    return (
      <div className="form-group join-file">
        <label htmlFor={field.name}>
          {field.label}
          {field.required ? " *" : ""}
        </label>
        <input
          id={field.name}
          type="file"
          accept={field.accept}
          multiple={multiple}
          onChange={(e) => {
            if (multiple) onPhotos(e.target.files);
            else onResume(e.target.files?.[0] || null);
          }}
        />
        {field.help && <p className="join-help">{field.help}</p>}
        {!multiple && resumeName && <p className="join-help">Selected: {resumeName}</p>}
      </div>
    );
  }

  return (
    <div className="form-group">
      <label htmlFor={field.name}>
        {field.label}
        {field.required ? " *" : ""}
      </label>
      {field.type === "textarea" ? (
        <textarea
          id={field.name}
          value={value}
          placeholder={field.placeholder}
          required={field.required}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      ) : field.type === "select" ? (
        <select
          id={field.name}
          value={value}
          required={field.required}
          onChange={(e) => onChange(field.name, e.target.value)}
        >
          <option value="">Select…</option>
          {(field.options || []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={field.name}
          type={field.type}
          value={value}
          placeholder={field.placeholder}
          required={field.required}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      )}
      {field.help && <p className="join-help">{field.help}</p>}
    </div>
  );
}
