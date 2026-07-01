"use client";

import { useState } from "react";
import { navCategories } from "@/lib/data";

export default function CategoryNav() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <nav className="nav-container" aria-label="Sections">
      {navCategories.map((cat, i) => (
        <div
          key={cat.label}
          className={`nav-item ${active === i ? "active" : ""}`}
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
        >
          <a href={cat.href}>
            <div className="item-category">{cat.label}</div>
          </a>
          <ul>
            {cat.items.map((item) => (
              <li key={item.label}>
                <a
                  className="item-subcategory"
                  href={item.href}
                  {...(item.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
