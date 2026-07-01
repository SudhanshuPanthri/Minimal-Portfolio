"use client";

import { useState } from "react";
import { profile } from "@/lib/data";
import Reveal from "./Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <section className="section contact" id="contact">
      <Reveal>
        <div className="contact-label">Let&apos;s work together</div>
        <a className="address" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>

        <div className="contact-row">
          <div className="contact-actions">
            <button className="btn" onClick={copyEmail}>
              {copied ? "Copied ✓" : "Copy email"}
            </button>
            <a className="btn btn-outline" href={`mailto:${profile.email}`}>
              Email me
            </a>
            <a
              className="btn btn-outline"
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé ↗
            </a>
          </div>
          <div className="hero-meta" style={{ textAlign: "right" }}>
            <span>{profile.phone}</span>
            <span>{profile.location}</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
