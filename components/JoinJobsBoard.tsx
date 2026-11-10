"use client";

import { useMemo, useState } from "react";
import JoinJobCard from "@/components/JoinJobCard";
import { JOBS, TRADE_LABELS, featuredJobs, type JobTrade } from "@/lib/jobs";

export default function JoinJobsBoard() {
  const featured = featuredJobs();
  const [trade, setTrade] = useState<"all" | JobTrade>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return JOBS.filter((job) => {
      if (trade !== "all" && job.trade !== trade) return false;
      if (!q) return true;
      const haystack = [job.title, job.shortDescription, job.location, TRADE_LABELS[job.trade]]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [trade, query]);

  return (
    <>
      <section>
        <h2 className="join-section-title">Hiring now</h2>
        <div className="join-job-grid featured">
          {featured.map((job) => (
            <JoinJobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      <section className="join-all-openings">
        <h2 className="join-section-title">All openings</h2>
        <div className="join-filters">
          <div className="form-group" style={{ marginBottom: 0 }}>
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
            <select id="join-trade" value={trade} onChange={(e) => setTrade(e.target.value as "all" | JobTrade)}>
              <option value="all">All trades</option>
              <option value="hvac">HVAC</option>
              <option value="electrician">Electrical</option>
              <option value="plumber">Plumbing</option>
            </select>
          </div>
        </div>
        {filtered.length ? (
          <div className="join-job-grid">
            {filtered.map((job) => (
              <JoinJobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p className="join-empty">No openings match that search. Try another trade or keyword.</p>
        )}
      </section>
    </>
  );
}
