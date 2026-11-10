import Link from "next/link";
import "./HiringBanner.css";

export default function HiringBanner() {
  return (
    <Link href="/join" className="hiring-banner">
      <span className="hiring-banner-inner">
        <span className="hiring-banner-copy">
          Now hiring licensed Florida pros and experienced technicians
        </span>
        <span className="hiring-banner-cta">Join Our Team →</span>
      </span>
    </Link>
  );
}
