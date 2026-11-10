"use client";

import { useSearchParams } from "next/navigation";
import { getJob } from "@/lib/jobs";

export default function JoinThankYouMessage() {
  const searchParams = useSearchParams();
  const job = getJob(searchParams.get("job") || "");
  const label = job ? job.title : "the opening";

  return (
    <>
      <h2>Application received</h2>
      <p className="form-desc">
        Thanks for applying for {label} at FIXXIT Pros. We&apos;ll review your info and reach out if it&apos;s a fit.
      </p>
    </>
  );
}
