import Link from "next/link";

import { BerglineScene } from "./components/BerglineScene";

export default function Home() {
  return (
    <main className="home">
      <section className="scene-shell" aria-hidden="true">
        <BerglineScene />
      </section>

      <section className="hud" aria-label="Queue status">
        <p className="eyebrow">Live estimate</p>
        <h1>Bergline</h1>
        <p className="status">Queue path prototype</p>
      </section>

      <div className="bottom-status" aria-label="Coming soon and feedback">
        <p className="coming-soon">Coming soon</p>
        <a
          className="feedback-link"
          href="mailto:feedback@bergline.de?subject=Bergline%20feedback"
          aria-label="Give feedback by email"
        >
          <span>Give feedback</span>
          <small>Opens email</small>
        </a>
      </div>

      <nav className="legal-links" aria-label="Legal links">
        <Link href="/impressum">Impressum</Link>
        <Link href="/datenschutz">Datenschutz</Link>
      </nav>
    </main>
  );
}
