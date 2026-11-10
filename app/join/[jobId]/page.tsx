import Link from "next/link";
import { notFound } from "next/navigation";
import JoinApplyForm from "@/components/JoinApplyForm";
import { JOBS, TRADE_ICONS, getJob } from "@/lib/jobs";
import "../join.css";

export function generateStaticParams() {
  return JOBS.map((job) => ({ jobId: job.id }));
}

export default async function JoinJobPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const job = getJob(jobId);
  if (!job) notFound();

  return (
    <>
      <section className="service-page-hero">
        <div className="container">
          <h1>
            <span aria-hidden>{TRADE_ICONS[job.trade]} </span>
            {job.title}
          </h1>
          <p>{job.shortDescription}</p>
        </div>
      </section>
      <section className="work-forms join-apply-page">
        <div className="container" style={{ maxWidth: "720px" }}>
          <Link href="/join" className="join-back">
            ← All openings
          </Link>
          <div className="work-form-section">
            <JoinApplyForm job={job} />
          </div>
        </div>
      </section>
    </>
  );
}
