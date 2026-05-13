import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum | Bergline",
};

export default function ImpressumPage() {
  return (
    <main className="legal-page">
      <Link className="back-link" href="/">
        Back to Bergline
      </Link>

      <article className="legal-content">
        <p className="legal-kicker">Bergline</p>
        <h1>Impressum</h1>

        <section>
          <h2>Angaben gemäß § 5 DDG</h2>
          <p>
            Advantage Labs GmbH
            <br />
            Frankfurter Allee 108
            <br />
            10247 Berlin
            <br />
            Germany
          </p>
        </section>

        <section>
          <h2>Kontakt</h2>
          <p>
            Email: <a href="mailto:enquiries@advantagelabs.de">enquiries@advantagelabs.de</a>
            <br />
            Website:{" "}
            <a href="https://advantagelabs.de" rel="noreferrer" target="_blank">
              advantagelabs.de
            </a>
          </p>
        </section>

        <section>
          <h2>Vertreten durch</h2>
          <p>Managing Director: Alistair Wakelin</p>
        </section>

        <section>
          <h2>Registereintrag</h2>
          <p>Commercial Register: HRB 272765 Berlin Charlottenburg</p>
        </section>

        <section>
          <h2>Verbraucherstreitbeilegung</h2>
          <p>
            Advantage Labs GmbH is not willing or obliged to participate in dispute resolution
            proceedings before a consumer arbitration board.
          </p>
        </section>

        <section>
          <h2>Haftung für Inhalte und Links</h2>
          <p>
            We prepare the content on this website with care. We do not assume liability for
            external websites linked from this site; their operators are responsible for their own
            content.
          </p>
        </section>
      </article>
    </main>
  );
}
