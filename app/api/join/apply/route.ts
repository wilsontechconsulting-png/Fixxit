import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getRecruitingSupabase } from "@/lib/join-supabase";
import { isApplicationRole, isTradeSlug } from "@/lib/join-trades";
import { getJob } from "@/lib/jobs";


const ALLOWED_RESUME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_IMAGE = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
]);
const MAX_BYTES = 10 * 1024 * 1024;

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const jobId = String(form.get("job_id") || "").trim();
    const job = getJob(jobId);
    if (!job) {
      return NextResponse.json({ error: "Invalid job" }, { status: 400 });
    }
    const trade = job.trade;
    if (!isTradeSlug(trade)) {
      return NextResponse.json({ error: "Invalid trade" }, { status: 400 });
    }

    const full_name = String(form.get("full_name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const city_county = String(form.get("city_county") || "").trim();
    const counties_willing = String(form.get("counties_willing") || "").trim();
    const role_interest = String(form.get("role_interest") || "").trim();
    const availability = String(form.get("availability") || "").trim();
    const references_text = String(form.get("references_text") || "").trim();
    const consent = form.get("consent") === "true" || form.get("consent") === "on";
    const years_experience = Number(form.get("years_experience") || 0);
    const years_supervising_raw = form.get("years_supervising");
    const years_supervising =
      years_supervising_raw === null || String(years_supervising_raw) === ""
        ? null
        : Number(years_supervising_raw);

    if (!full_name || !email || !phone || !city_county || !role_interest || !consent) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let trade_answers: Record<string, unknown> = {};
    const rawTrade = form.get("trade_answers");
    if (typeof rawTrade === "string" && rawTrade) {
      try {
        trade_answers = JSON.parse(rawTrade);
      } catch {
        return NextResponse.json({ error: "Invalid trade answers" }, { status: 400 });
      }
    }

    const roleRaw = String(form.get("role") || trade_answers.role || "").trim();
    if (!isApplicationRole(roleRaw)) {
      return NextResponse.json(
        { error: "Please choose whether you are applying to lead a division or as a technician" },
        { status: 400 },
      );
    }
    const role = roleRaw;
    trade_answers.role = role;
    trade_answers.job_id = job.id;
    trade_answers.job_title = job.title;
    const licenseNumber = String(
      form.get("license_number") || trade_answers.license_number || "",
    ).trim();
    if (licenseNumber) {
      trade_answers.license_number = licenseNumber;
    }

    const resume = form.get("resume");
    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json({ error: "Resume is required" }, { status: 400 });
    }
    if (resume.size > MAX_BYTES) {
      return NextResponse.json({ error: "Resume must be 10 MB or less" }, { status: 400 });
    }
    if (resume.type && !ALLOWED_RESUME.has(resume.type)) {
      return NextResponse.json({ error: "Resume must be PDF, DOC, or DOCX" }, { status: 400 });
    }

    const supabase = getRecruitingSupabase();
    const stamp = Date.now();
    const resumePath = `${trade}/${stamp}-${safeName(resume.name)}`;
    const resumeBytes = Buffer.from(await resume.arrayBuffer());
    const { error: resumeErr } = await supabase.storage
      .from("resumes")
      .upload(resumePath, resumeBytes, {
        contentType: resume.type || "application/octet-stream",
        upsert: false,
      });
    if (resumeErr) {
      console.error("resume upload", resumeErr);
      return NextResponse.json({ error: "Could not upload resume" }, { status: 500 });
    }

    const work_photos_paths: string[] = [];
    const photos = form.getAll("work_photos");
    for (const photo of photos.slice(0, 5)) {
      if (!(photo instanceof File) || photo.size === 0) continue;
      if (photo.size > MAX_BYTES) continue;
      if (photo.type && !ALLOWED_IMAGE.has(photo.type)) continue;
      const path = `${trade}/photos/${stamp}-${safeName(photo.name)}`;
      const bytes = Buffer.from(await photo.arrayBuffer());
      const { error } = await supabase.storage.from("resumes").upload(path, bytes, {
        contentType: photo.type || "image/jpeg",
        upsert: false,
      });
      if (!error) work_photos_paths.push(path);
    }

    const applicationId = crypto.randomUUID();
    const { error } = await supabase.from("applications").insert({
      id: applicationId,
      trade,
      full_name,
      email,
      phone,
      city_county,
      counties_willing: counties_willing || null,
      years_experience: Number.isFinite(years_experience) ? years_experience : null,
      years_supervising:
        years_supervising !== null && Number.isFinite(years_supervising) ? years_supervising : null,
      role_interest,
      role,
      availability: availability || null,
      references_text: references_text || null,
      resume_path: resumePath,
      work_photos_paths,
      consent,
      trade_answers,
      source: "fixxitpros.com/join",
    });

    if (error) {
      console.error("insert", error);
      return NextResponse.json({ error: "Could not save application" }, { status: 500 });
    }
    const data = { id: applicationId };

    const notifyTo = process.env.NOTIFY_EMAIL || "jed@powerofadvertising.com";
    const from = process.env.RESEND_FROM;
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey && from) {
      try {
        const resend = new Resend(apiKey);
        const tradeLabel = trade.charAt(0).toUpperCase() + trade.slice(1);
        const roleTag = role === "leader" ? "Division leader" : "Technician";
        const roleLabel =
          role === "leader"
            ? `Qualify and lead the ${tradeLabel} division`
            : `Experienced ${tradeLabel} technician`;
        await resend.emails.send({
          from,
          to: [notifyTo],
          subject: `FIXXIT Pros application: ${job.title} ${roleTag} — ${full_name}`,
          text: [
            `New FIXXIT Pros application`,
            ``,
            `Job: ${job.title}`,
            `Job ID: ${job.id}`,
            `Applying for: ${roleLabel}`,
            `Role: ${roleTag}`,
            `Florida license number: ${licenseNumber || "—"}`,
            `Trade: ${tradeLabel}`,
            `Name: ${full_name}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            `City/County: ${city_county}`,
            `Counties willing: ${counties_willing || "—"}`,
            `Years experience: ${years_experience}`,
            `Years supervising: ${years_supervising ?? "—"}`,
            `Role interest: ${role_interest}`,
            `Availability: ${availability || "—"}`,
            `References: ${references_text || "—"}`,
            `Application ID: ${data.id}`,
            `Resume path (Supabase storage bucket "resumes"): ${resumePath}`,
            `Work photos: ${work_photos_paths.length ? work_photos_paths.join(", ") : "none"}`,
            ``,
            `Trade answers:`,
            JSON.stringify(trade_answers, null, 2),
            ``,
            `View rows in Supabase Table Editor → applications`,
            `View files in Supabase Storage → resumes`,
            `License lookup: https://www.myfloridalicense.com/wl11.asp`,
          ].join("\n"),
        });
      } catch (mailErr) {
        console.error("notify email failed", mailErr);
        // Application already saved — do not fail the request
      }
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
