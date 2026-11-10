"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import JoinJobCard from "@/components/JoinJobCard";
import {
  JOBS,
  TRADE_LABELS,
  US_STATES,
  featuredJobs,
  formatJobLocation,
  isJobTrade,
  isUsStateCode,
  stateName,
  type JobTrade,
} from "@/lib/jobs";

export default function JoinJobsBoard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tradeParam = searchParams.get("trade") ?? "";
  const stateParam = searchParams.get("state") ?? "";
  const trade: "all" | JobTrade = isJobTrade(tradeParam) ? tradeParam : "all";
  const state = isUsStateCode(stateParam) ? stateParam : "all";
  const [query, setQuery] = useState("");

  const updateParams = useCallback(
    (next: { trade?: string; state?: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      const nextTrade = next.trade ?? trade;
      const nextState = next.state ?? state;
      if (!nextTrade || nextTrade === "all") params.delete("trade");
      else params.set("trade", nextTrade);
      if (!nextState || nextState === "all") params.delete("state");
      else params.set("state", nextState);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [searchParams, router, pathname, trade, state]
  );

  const listedInSelectedState =
    state !== "all" && JOBS.some((job) => job.state === state);
  const partnerState = state !== "all" && !listedInSelectedState ? state : null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return JOBS.filter((job) => {
      if (trade !== "all" && job.trade !== trade) return false;
      if (state !== "all" && listedInSelectedState && job.state !== state) return false;
      if (!q) return true;
      const haystack = [
        job.title,
        job.shortDescription,
        formatJobLocation(job),
        job.city ?? "",
        job.state,
        stateName(job.state),
        TRADE_LABELS[job.trade],
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [trade, state, query, listedInSelectedState]);

  const featured = useMemo(() => {
    return featuredJobs().filter((job) => {
      if (trade !== "all" && job.trade !== trade) return false;
      if (state !== "all" && listedInSelectedState && job.state !== state) return false;
      return true;
    });
  }, [trade, state, listedInSelectedState]);

  const applyHref = (jobId: string) =>
    state !== "all" ? `/join/${jobId}?state=${encodeURIComponent(state)}` : `/join/${jobId}`;

  return (
    <>
      {partnerState && (
        <p className="join-partner-note">
          We&apos;re currently looking for partners in {stateName(partnerState)}. Apply below to
          help launch FIXXIT Pros in your state.
        </p>
      )}

      {featured.length > 0 && (
        <section>
          <h2 className="join-section-title">Hiring now</h2>
          <div className="join-job-grid featured">
            {featured.map((job) => (
              <JoinJobCard
                key={job.id}
                job={job}
                href={applyHref(job.id)}
                showLocation={!partnerState}
              />
            ))}
          </div>
        </section>
      )}

      <section className={`join-all-openings${featured.length ? "" : " no-featured"}`}>
        <h2 className="join-section-title">All openings</h2>
        <div className="join-filters">
          <div className="form-group join-search" style={{ marginBottom: 0 }}>
            <label htmlFor="join-search">Search</label>
            <input
              id="join-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="join-trade">Trade</label>
            <select
              id="join-trade"
              value={trade}
              onChange={(e) => updateParams({ trade: e.target.value })}
            >
              <option value="all">All trades</option>
              <option value="hvac">HVAC</option>
              <option value="electrician">Electrical</option>
              <option value="plumber">Plumbing</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="join-state">State</label>
            <select
              id="join-state"
              value={state}
              onChange={(e) => updateParams({ state: e.target.value })}
            >
              <option value="all">All states</option>
              {US_STATES.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {filtered.length ? (
          <div className="join-job-grid">
            {filtered.map((job) => (
              <JoinJobCard
                key={job.id}
                job={job}
                href={applyHref(job.id)}
                showLocation={!partnerState}
              />
            ))}
          </div>
        ) : (
          <p className="join-empty">No openings match that search. Try another trade, state, or keyword.</p>
        )}
      </section>
    </>
  );
}
