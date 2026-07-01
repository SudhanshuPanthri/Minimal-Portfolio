import { marqueeWords } from "@/lib/data";

export default function Marquee() {
  // Duplicate the list so the -50% translate loops seamlessly.
  const items = [...marqueeWords, ...marqueeWords];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((word, i) => (
          <span className="marquee-item" key={i}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
