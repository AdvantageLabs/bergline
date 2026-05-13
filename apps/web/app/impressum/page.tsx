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
            The competent consumer dispute resolution body in Germany for general businesses is:
            Universalschlichtungsstelle des Bundes, Straßburger Straße 8, 77694 Kehl am Rhein.
            Email:{" "}
            <a href="mailto:mail@verbraucher-schlichter.de">mail@verbraucher-schlichter.de</a>.
            Website:{" "}
            <a href="https://www.universalschlichtungsstelle.de/" rel="noreferrer" target="_blank">
              universalschlichtungsstelle.de
            </a>
            .
          </p>
          <p>
            Advantage Labs GmbH is not legally required to participate in arbitration but will
            assess dispute resolution requests on a case-by-case basis.
          </p>
        </section>

        <section>
          <h2>Legal Disclaimer & Copyright</h2>
          <p>
            All content on this website is protected by copyright law. Unauthorized use,
            reproduction, or distribution is strictly prohibited without prior written consent from
            Advantage Labs GmbH. We assume no liability for the content of external links. The
            respective operators are responsible for their content.
          </p>
        </section>
      </article>
    </main>
  );
}
