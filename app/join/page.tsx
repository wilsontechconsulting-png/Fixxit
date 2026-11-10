import JoinJobsBoard from "@/components/JoinJobsBoard";
import "./join.css";

export default function JoinPage() {
  return (
    <>
      <section className="service-page-hero">
        <div className="container">
          <h1>Run your own division.</h1>
          <p>We build the business around you.</p>
        </div>
      </section>

      <section className="work-forms join-page">
        <div className="container" style={{ maxWidth: "1040px" }}>
          <div className="join-intro">
            <p className="join-headline">
              Looking for licensed Florida pros to qualify and lead each division, plus experienced technicians.
            </p>
            <div className="join-franchise">
              <h2>No franchise fees. No pyramid at the top.</h2>
              <ul>
                <li>This isn&apos;t a franchise, and you don&apos;t pay franchise fees to get in.</li>
                <li>There&apos;s no setup where money gets funneled up to the top.</li>
                <li>The work and the earnings stay with the pros doing the job.</li>
              </ul>
            </div>
          </div>
          <JoinJobsBoard />
        </div>
      </section>
    </>
  );
}
