import Link from "next/link";
import { TRADE_ICONS, TRADE_LABELS, type Job } from "@/lib/jobs";

export default function JoinJobCard({ job }: { job: Job }) {
  return (
    <Link href={`/join/${job.id}`} className="join-job-card">
      <div className="join-job-meta">
        <span aria-hidden>{TRADE_ICONS[job.trade]}</span>
        <span>{TRADE_LABELS[job.trade]}</span>
        <span>{job.location}</span>
      </div>
      <h3>{job.title}</h3>
      <p>{job.shortDescription}</p>
      <span className="join-apply-cta" style={{ alignSelf: "flex-start" }}>Apply</span>
    </Link>
  );
}
