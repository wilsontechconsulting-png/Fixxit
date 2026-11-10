import Link from "next/link";
import { notFound } from "next/navigation";
import JoinApplyForm from "@/components/JoinApplyForm";
import { JOBS, TRADE_ICONS, getJob, isUsStateCode, stateName } from "@/lib/jobs";
import "../join.css";

export function generateStaticParams() {
  return JOBS.map((job) => ({ jobId: job.id }));
}

export default async function JoinJobPage({
  params,
  searchParams,
}: {
  params: Promise<{ jobId: string }>;
  searchParams: Promise<{ state?: string }>;
}) {
  const { jobId } = await params;
  const { state: stateParam } = await searchParams;
  const job = getJob(jobId);
  if (!job) notFound();
  const applicantState = stateParam && isUsStateCode(stateParam) ? stateParam : undefined;
  const joinHref = applicantState ? `/join?state=${encodeURIComponent(applicantState)}` : "/join";
  const showPartnerNote =
    Boolean(applicantState) && !JOBS.some((item) => item.state === applicantState);

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
          <Link href={joinHref} className="join-back">
            ← All openings
          </Link>
          {showPartnerNote && applicantState && (
            <p className="join-partner-note">
              We&apos;re currently looking for partners in {stateName(applicantState)}. Apply below to
              help launch FIXXIT Pros in your state.
            </p>
          )}
          <div className="work-form-section">
            <JoinApplyForm job={job} applicantState={applicantState} />
          </div>
        </div>
      </section>
    </>
  );
}
