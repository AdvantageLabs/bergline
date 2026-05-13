import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz | Bergline",
};

export default function DatenschutzPage() {
  return (
    <main className="legal-page">
      <Link className="back-link" href="/">
        Back to Bergline
      </Link>

      <article className="legal-content">
        <p className="legal-kicker">Bergline</p>
        <h1>Datenschutzerklärung</h1>

        <section>
          <h2>Verantwortlicher</h2>
          <p>
            Advantage Labs GmbH
            <br />
            Frankfurter Allee 108
            <br />
            10247 Berlin
            <br />
            Germany
            <br />
            Email: <a href="mailto:enquiries@advantagelabs.de">enquiries@advantagelabs.de</a>
          </p>
        </section>

        <section>
          <h2>Access logs and hosting</h2>
          <p>
            When you visit this website, technical access data may be processed to deliver the site
            securely and reliably. This can include your IP address, date and time of access,
            requested files, referrer URL, browser type, operating system, and status codes.
          </p>
          <p>
            The legal basis is Art. 6(1)(f) GDPR. Our legitimate interest is providing, securing,
            and troubleshooting this website. Hosting providers may process this data on our behalf.
          </p>
        </section>

        <section>
          <h2>Feedback email</h2>
          <p>
            If you contact us using the feedback email link, we process the personal data contained
            in your email, such as your email address, message content, and any information you
            choose to include.
          </p>
          <p>
            The legal basis is Art. 6(1)(f) GDPR for responding to feedback and improving Bergline,
            and Art. 6(1)(b) GDPR where your message relates to pre-contractual or contractual
            communication.
          </p>
        </section>

        <section>
          <h2>Cookies and analytics</h2>
          <p>
            Bergline does not currently use analytics, advertising trackers, or non-essential
            cookies.
          </p>
        </section>

        <section>
          <h2>Retention</h2>
          <p>
            We keep personal data only for as long as necessary for the purposes above or where
            legal retention obligations apply. Feedback emails may be retained while we evaluate and
            respond to the feedback.
          </p>
        </section>

        <section>
          <h2>Your rights</h2>
          <p>
            Subject to the legal requirements, you have rights of access, rectification, erasure,
            restriction of processing, data portability, and objection. You also have the right to
            lodge a complaint with a competent data protection supervisory authority.
          </p>
        </section>

        <section>
          <h2>Changes</h2>
          <p>We may update this privacy policy when the website or its data processing changes.</p>
        </section>
      </article>
    </main>
  );
}
