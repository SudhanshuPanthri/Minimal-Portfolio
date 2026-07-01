"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

export default function StickyNav() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShown(window.scrollY > window.innerHeight * 0.85);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`sticky-nav ${shown ? "is-shown" : ""}`} aria-hidden={!shown}>
      <div className="nav-left">
        <a href="#top">
          <h1>{profile.name}</h1>
          <div>{profile.role}</div>
        </a>
      </div>
      {profile.available ? (
        <span className="availability">{profile.availabilityLabel}</span>
      ) : (
        <a href="#contact" className="availability">
          Get in touch
        </a>
      )}
    </nav>
  );
}
