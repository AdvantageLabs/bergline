import { BerglineScene } from "./components/BerglineScene";

export default function Home() {
  return (
    <main className="home">
      <section className="scene-shell" aria-label="Bergline queue visualization">
        <BerglineScene />
      </section>

      <section className="hud" aria-label="Queue status">
        <p className="eyebrow">Live estimate</p>
        <h1>Bergline</h1>
        <p className="status">Queue path prototype</p>
      </section>
    </main>
  );
}
