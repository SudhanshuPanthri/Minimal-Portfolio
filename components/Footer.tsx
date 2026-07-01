"use client";

import { useEffect, useRef, useState } from "react";
import { profile, navCategories } from "@/lib/data";

const HEADLINE = ["LET'S WORK", "TOGETHER"];

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_hover;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = v_uv;
  vec2 asp = vec2(u_res.x / u_res.y, 1.0);
  vec2 p = uv * asp;
  float t = u_time * 0.12;

  // flowing two-axis noise field (the displacement map)
  float n1 = fbm(p * 3.2 + vec2(t, t * 0.6));
  float n2 = fbm(p * 3.2 - vec2(t * 0.8, t));
  vec2 disp = vec2(n1, n2) - 0.5;

  // cursor ripple — distortion swells near the pointer
  float d = distance(uv, u_mouse);
  float ripple = smoothstep(0.38, 0.0, d) * u_hover;

  float amp = 0.014 + ripple * 0.06;
  vec2 off = disp * amp;

  // chromatic aberration grows with the displacement
  float ca = 0.0035 + ripple * 0.014;
  float r = texture2D(u_tex, uv + off + vec2(ca, 0.0)).a;
  float g = texture2D(u_tex, uv + off).a;
  float b = texture2D(u_tex, uv + off - vec2(ca, 0.0)).a;

  vec3 col = vec3(0.92 * r, 0.92 * g, 0.92 * b);
  // green fringe in the warped edges, echoing the accent
  col += vec3(0.0, 0.78, 0.4) * ripple * g * 0.5;

  float alpha = max(max(r, g), b);
  gl_FragColor = vec4(col, alpha);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function FooterCanvas({ onFail }: { onFail: () => void }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const gl = (canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
    }) ||
      canvas.getContext("experimental-webgl", {
        alpha: true,
      })) as WebGLRenderingContext | null;
    if (!gl) {
      onFail();
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      onFail();
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      onFail();
      return;
    }
    gl.useProgram(prog);

    // full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTex = gl.getUniformLocation(prog, "u_tex");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uHover = gl.getUniformLocation(prog, "u_hover");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // text texture
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const textCanvas = document.createElement("canvas");
    const tctx = textCanvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const bebasFamily =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-bebas")
        .trim() || "sans-serif";

    let width = 0;
    let height = 0;

    const drawText = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width * dpr));
      height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
      textCanvas.width = width;
      textCanvas.height = height;

      tctx.clearRect(0, 0, width, height);
      tctx.fillStyle = "#ffffff";
      tctx.textAlign = "center";
      tctx.textBaseline = "middle";

      const lines = HEADLINE;
      // fit font size to width
      let fontSize = height / (lines.length + 0.4);
      const fit = (size: number) => {
        tctx.font = `${size}px ${bebasFamily}, "Arial Narrow", sans-serif`;
        let max = 0;
        for (const l of lines) max = Math.max(max, tctx.measureText(l).width);
        return max;
      };
      const maxW = width * 0.92;
      while (fit(fontSize) > maxW && fontSize > 8) fontSize *= 0.95;
      tctx.font = `${fontSize}px ${bebasFamily}, "Arial Narrow", sans-serif`;

      const lineH = fontSize * 0.92;
      const totalH = lineH * lines.length;
      const startY = height / 2 - totalH / 2 + lineH / 2;
      lines.forEach((l, i) => {
        tctx.fillText(l, width / 2, startY + i * lineH);
      });

      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        textCanvas
      );
      gl.viewport(0, 0, width, height);
    };

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // mouse state (uv space, top-left origin) with easing
    const target = { x: 0.5, y: 0.5, hover: 0 };
    const cur = { x: 0.5, y: 0.5, hover: 0 };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = (e.clientX - rect.left) / rect.width;
      target.y = (e.clientY - rect.top) / rect.height;
      target.hover = 1;
    };
    const onLeave = () => {
      target.hover = 0;
    };
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);

    let raf = 0;
    let start = 0;

    const render = (time: number) => {
      if (!start) start = time;
      const elapsed = prefersReduced ? 0 : (time - start) / 1000;

      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      cur.hover += (target.hover - cur.hover) * 0.06;

      gl.uniform1i(uTex, 0);
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uRes, width, height);
      gl.uniform2f(uMouse, cur.x, cur.y);
      gl.uniform1f(uHover, prefersReduced ? 0 : cur.hover);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!prefersReduced) raf = requestAnimationFrame(render);
    };

    const onResize = () => {
      drawText();
      if (prefersReduced) raf = requestAnimationFrame(render);
    };
    window.addEventListener("resize", onResize);

    let cancelled = false;
    const init = () => {
      if (cancelled) return;
      drawText();
      raf = requestAnimationFrame(render);
    };

    // wait for the display font so glyph metrics are correct
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(init);
    } else {
      init();
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
      gl.deleteTexture(tex);
    };
  }, [onFail]);

  return <canvas ref={ref} aria-hidden="true" />;
}

export default function Footer() {
  const [failed, setFailed] = useState(false);

  return (
    <footer>
      <div className="footer-canvas-wrap">
        {failed ? (
          <div className="footer-fallback">{HEADLINE.join(" ")}</div>
        ) : (
          <FooterCanvas onFail={() => setFailed(true)} />
        )}
      </div>

      <div className="footer-content">
        <div>
          <div className="footer-col-label">Navigate</div>
          <div className="footer-links">
            {navCategories.map((c) => (
              <a key={c.label} href={c.href}>
                {c.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="footer-col-label">Elsewhere</div>
          <div className="footer-links">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                {...(s.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-credit">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>{profile.email}</span>
      </div>
    </footer>
  );
}
