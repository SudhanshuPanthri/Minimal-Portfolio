import { profile } from "@/lib/data";
import Marquee from "./Marquee";

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-bigword">Developer</div>

      <div className="hero-content">
        <p className="hero-intro">{profile.tagline}</p>
        <div className="hero-meta">
          <span>{profile.role}</span>
          <span>{profile.location}</span>
          <span>Portfolio — 2026</span>
        </div>
      </div>

      <h1 className="hero-name">{profile.name}</h1>

      <Marquee />

      <div className="scroll-cue">
        <span>Scroll to explore</span>
        <span>Selected work ↓</span>
      </div>
    </header>
  );
}
