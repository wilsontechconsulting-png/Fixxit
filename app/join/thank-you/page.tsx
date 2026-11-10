import Link from "next/link";
import { Suspense } from "react";
import JoinThankYouMessage from "@/components/JoinThankYouMessage";
import "../join.css";

export default function JoinThankYouPage() {
  return (
    <section className="work-forms">
      <div className="container" style={{ maxWidth: "640px" }}>
        <div className="work-form-section" style={{ textAlign: "center" }}>
          <div className="form-success-icon">✅</div>
          <Suspense fallback={<h1>Application received</h1>}>
            <JoinThankYouMessage />
          </Suspense>
          <Link href="/" className="btn btn-blue" style={{ marginTop: "1.5rem", display: "inline-flex" }}>
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
