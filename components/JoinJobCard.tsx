import Link from "next/link";
import { TRADE_ICONS, TRADE_LABELS, formatJobLocation, type Job } from "@/lib/jobs";

export default function JoinJobCard({
  job,
  href,
  showLocation = true,
}: {
  job: Job;
  href?: string;
  showLocation?: boolean;
}) {
  return (
    <Link href={href ?? `/join/${job.id}`} className="join-job-card">
      <div className="join-job-meta">
        <span aria-hidden>{TRADE_ICONS[job.trade]}</span>
        <span>{TRADE_LABELS[job.trade]}</span>
        {showLocation && <span>{formatJobLocation(job)}</span>}
      </div>
      <h3>{job.title}</h3>
      <p>{job.shortDescription}</p>
      <span className="join-apply-cta" style={{ alignSelf: "flex-start" }}>Apply</span>
    </Link>
  );
}
