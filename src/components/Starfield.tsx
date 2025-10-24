// src/components/Starfield.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Star + Comet background canvas (no grey trails)
 *
 * Keeps your original props + adds:
 *  - frameFade: 0..1. Set 1 for hard clear (no persistence).
 *  - tailBrightAtHead: whether the tail is brightest near the head (default false).
 *  - trailOpacity, trailWidth, headOpacity, glowOpacity, trailBlend.
 */

export type StarfieldProps = {
  className?: string;
  density?: number;
  starColor?: string;
  accentColor?: string;
  maxTwinkle?: number;
  cometEverySec?: [number, number];
  parallax?: number;
  cometTrail?: number;
  cometHeadRadius?: number;
  cometHeadGlow?: number;

  // NEW
  frameFade?: number;
  tailBrightAtHead?: boolean;
  trailOpacity?: number;
  trailWidth?: number;
  headOpacity?: number;
  glowOpacity?: number;
  trailBlend?: GlobalCompositeOperation;
};

export default function Starfield({
  className,
  density = 0.2,
  starColor = "#e5e7eb",
  accentColor = "#9ae6ff",
  maxTwinkle = 0.55,
  cometEverySec = [4, 10],
  parallax = 0.05,
  cometTrail = 160,
  cometHeadRadius = 4.5,
  cometHeadGlow = 14,

  // Subtle + clean defaults
  frameFade = 1,                 // 1 = hard clear (no persistent trail)
  tailBrightAtHead = false,      // far end brighter by default
  trailOpacity = 0.22,
  trailWidth = 1.2,
  headOpacity = 0.6,
  glowOpacity = 0.22,
  trailBlend = "source-over",
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);
  const cometsRef = useRef<Comet[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    let last = performance.now();

    const initStars = () => {
      const { innerWidth: w, innerHeight: h } = window;
      const area = (w * h) / 10000;
      const count = Math.max(140, Math.floor(area * density));
      starsRef.current = Array.from({ length: count }, () => makeStar(w, h));
    };

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
      hardClear(ctx, canvas);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    // First comet quickly, then cadence
    let nextCometAt = scheduleComet([1, 3], performance.now());

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      // Clear/fade in device pixels to prevent grey ghosts
      if (frameFade >= 1) hardClear(ctx, canvas);
      else if (frameFade > 0) fadePreviousFrame(ctx, canvas, frameFade);

      // stars (no mutation — pass maxTwinkle in)
      for (const s of starsRef.current) {
        s.twinkle(now, maxTwinkle);
        s.draw(ctx, starColor, accentColor, mouseRef.current, parallax, reduceMotion);
      }

      // spawn comets
      if (!reduceMotion && now > nextCometAt) {
        const { innerWidth: w, innerHeight: h } = window;
        cometsRef.current.push(makeComet(w, h, cometTrail));
        nextCometAt = scheduleComet(cometEverySec, now);
      }

      // update + draw comets
      const alive: Comet[] = [];
      for (const c of cometsRef.current) {
        c.update(dt);
        c.draw(ctx, accentColor, cometHeadRadius, cometHeadGlow, {
          blend: trailBlend,
          trailOpacity,
          trailWidth,
          headOpacity,
          glowOpacity,
          tailBrightAtHead,
        });
        if (!c.dead) alive.push(c);
      }
      cometsRef.current = alive;

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [
    density,
    starColor,
    accentColor,
    maxTwinkle,
    cometEverySec,
    parallax,
    reduceMotion,
    cometTrail,
    cometHeadRadius,
    cometHeadGlow,
    frameFade,
    tailBrightAtHead,
    trailOpacity,
    trailWidth,
    headOpacity,
    glowOpacity,
    trailBlend,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 -z-10 block h-full w-full ${className ?? ""}`}
      aria-hidden
    />
  );
}

/* ===== Canvas clear/fade helpers ===== */

function hardClear(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0); // device pixels
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function fadePreviousFrame(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  fade: number
) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const prevOp = ctx.globalCompositeOperation;
  const prevAlpha = ctx.globalAlpha;
  ctx.globalCompositeOperation = "destination-out";
  ctx.globalAlpha = Math.max(0, Math.min(1, fade));
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = prevOp;
  ctx.globalAlpha = prevAlpha;
  ctx.restore();
}

/* ===== Helpers ===== */

function scheduleComet([minS, maxS]: [number, number], baseMs = performance.now()) {
  const delta = (minS + Math.random() * (maxS - minS)) * 1000;
  return baseMs + delta;
}

function usePrefersReducedMotion() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setEnabled(!!m.matches);
    onChange();
    if (m.addEventListener) m.addEventListener("change", onChange);
    else (m as unknown as { addListener: (cb: () => void) => void }).addListener?.(onChange);
    return () => {
      if (m.removeEventListener) m.removeEventListener("change", onChange);
      else (m as unknown as { removeListener: (cb: () => void) => void }).removeListener?.(onChange);
    };
  }, []);
  return enabled;
}

/* ===== Stars ===== */

class Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  jitter: number;
  depth: number;
  halo: number;

  constructor(
    x: number,
    y: number,
    r: number,
    baseAlpha: number,
    depth: number,
    halo: number,
    twinkleSpeed: number
  ) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.baseAlpha = baseAlpha;
    this.twinkleSpeed = twinkleSpeed;
    this.twinklePhase = Math.random() * Math.PI * 2;
    this.jitter = Math.random() * 0.1;
    this.depth = depth;
    this.halo = halo;
  }

  twinkle(nowMs: number, maxTwinkle: number) {
    const t = nowMs / 1000;
    const s1 = Math.sin(t * this.twinkleSpeed + this.twinklePhase);
    const s2 = Math.sin(t * (this.twinkleSpeed * 0.47) + this.twinklePhase * 1.3);
    const s3 = Math.sin(t * (this.twinkleSpeed * 1.12) + this.twinklePhase * 0.73);
    const v = (s1 + 0.45 * s2 + 0.25 * s3) / 1.7;
    this.baseAlpha = 0.22 + (v * 0.5 + 0.5 + this.jitter) * maxTwinkle;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    starColor: string,
    accentColor: string,
    mouse: { x: number; y: number },
    parallax: number,
    reduceMotion: boolean
  ) {
    let px = 0, py = 0;
    if (!reduceMotion && parallax > 0) {
      const { innerWidth: w, innerHeight: h } = window;
      const dx = (mouse.x - w / 2) / w;
      const dy = (mouse.y - h / 2) / h;
      const scale = (this.depth * parallax * 40) | 0;
      px = -dx * scale;
      py = -dy * scale;
    }

    const core = Math.max(0.2, this.r);
    const haloR = core * (2.4 * this.halo);
    const g = ctx.createRadialGradient(this.x + px, this.y + py, 0, this.x + px, this.y + py, haloR);
    g.addColorStop(0, withAlpha(starColor, Math.min(1, this.baseAlpha + 0.28)));
    g.addColorStop(0.5, withAlpha(starColor, this.baseAlpha));
    g.addColorStop(1, withAlpha(accentColor, 0));

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(this.x + px, this.y + py, core * 1.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function makeStar(w: number, h: number) {
  const x = Math.random() * w;
  const y = Math.random() * h;
  const depth = Math.random();
  const r = 0.18 + Math.pow(depth, 2) * 0.5;
  const baseAlpha = 0.2 + Math.random() * 0.35;
  const halo = 1 + Math.random() * Math.random() * 1.3;
  const twinkleSpeed = 0.35 + Math.random() * 0.9;
  return new Star(x, y, r, baseAlpha, depth, halo, twinkleSpeed);
}

/* ===== Comets ===== */

type Pt = { x: number; y: number };

type CometStyle = {
  blend: GlobalCompositeOperation;
  trailOpacity: number;
  trailWidth: number;
  headOpacity: number;
  glowOpacity: number;
  tailBrightAtHead: boolean;
};

class Comet {
  p: Pt;
  v: Pt;
  a: Pt;
  trail: Pt[];
  dead: boolean;
  maxTrail: number;

  constructor(p: Pt, v: Pt, a: Pt, maxTrail: number) {
    this.p = p;
    this.v = v;
    this.a = a;
    this.trail = [];
    this.dead = false;
    this.maxTrail = Math.max(1, Math.floor(maxTrail));
  }

  update(dt: number) {
    if (this.dead) return;
    this.v.x += this.a.x * dt;
    this.v.y += this.a.y * dt;
    this.p.x += this.v.x * dt;
    this.p.y += this.v.y * dt;

    // geometric tail (cleared each frame when frameFade=1)
    this.trail.push({ x: this.p.x, y: this.p.y });
    if (this.trail.length > this.maxTrail) this.trail.shift();

    const { innerWidth: w, innerHeight: h } = window;
    const margin = 50;
    const onScreen = (pt: Pt) =>
      pt.x > -margin && pt.x < w + margin && pt.y > -margin && pt.y < h + margin;

    if (!onScreen(this.p)) {
      const anyTrailOn = this.trail.some(onScreen);
      if (!anyTrailOn) this.dead = true;
    }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    accent: string,
    headRadius: number,
    headGlow: number,
    style: CometStyle
  ) {
    if (this.trail.length < 2) return;

    ctx.save();
    ctx.globalCompositeOperation = style.blend;
    ctx.lineCap = "round";
    ctx.shadowBlur = 0;
    ctx.filter = "none";

    // Tail segments
    for (let i = 0; i < this.trail.length - 1; i++) {
      const p1 = this.trail[i];
      const p2 = this.trail[i + 1];
      const t = i / (this.trail.length - 1); // 0 oldest → 1 newest (near head)
      const progress = style.tailBrightAtHead ? t : 1 - t; // flip direction
      const alpha = style.trailOpacity * Math.pow(progress, 1.0);
      if (alpha <= 0.002) continue;
      ctx.lineWidth = 0.6 + (style.tailBrightAtHead ? t : 1 - t) * style.trailWidth;
      ctx.strokeStyle = withAlpha(accent, alpha);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }

    // Head glow
    const head = this.trail[this.trail.length - 1];
    const g = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, headGlow);
    g.addColorStop(0, withAlpha(accent, clamp01(style.headOpacity)));
    g.addColorStop(0.7, withAlpha(accent, clamp01(style.glowOpacity)));
    g.addColorStop(1, withAlpha(accent, 0));

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(head.x, head.y, headRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

function makeComet(w: number, h: number, maxTrail: number) {
  const edge = Math.floor(Math.random() * 4);
  let x = 0, y = 0, vx = 0, vy = 0;

  const speed = 90 + Math.random() * 70;
  const j = (Math.random() - 0.5) * 0.5;

  if (edge === 0) {
    x = -50; y = Math.random() * h;
    const a = 0.05 + j;            vx = Math.cos(a) * speed; vy = Math.sin(a) * speed;
  } else if (edge === 1) {
    x = w + 50; y = Math.random() * h;
    const a = Math.PI - 0.05 + j;  vx = Math.cos(a) * speed; vy = Math.sin(a) * speed;
  } else if (edge === 2) {
    x = Math.random() * w; y = -50;
    const a = Math.PI / 2 + j;     vx = Math.cos(a) * speed; vy = Math.sin(a) * speed;
  } else {
    x = Math.random() * w; y = h + 50;
    const a = -Math.PI / 2 + j;    vx = Math.cos(a) * speed; vy = Math.sin(a) * speed;
  }

  const aMag = 6 + Math.random() * 12;
  const perp = Math.atan2(vy, vx) + (Math.random() < 0.5 ? Math.PI / 2 : -Math.PI / 2);
  const ax = Math.cos(perp) * aMag;
  const ay = Math.sin(perp) * aMag;

  return new Comet({ x, y }, { x: vx, y: vy }, { x: ax, y: ay }, maxTrail);
}

/* ===== Color utils ===== */

function withAlpha(hex: string, a: number) {
  const c = parseHex(hex) || { r: 255, g: 255, b: 255 };
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${clamp01(a)})`;
}

function parseHex(h: string): { r: number; g: number; b: number } | null {
  const s = h.replace("#", "");
  if (s.length === 3) {
    const r = parseInt(s[0] + s[0], 16);
    const g = parseInt(s[1] + s[1], 16);
    const b = parseInt(s[2] + s[2], 16);
    return { r, g, b };
  }
  if (s.length === 6) {
    const r = parseInt(s.slice(0, 2), 16);
    const g = parseInt(s.slice(2, 4), 16);
    const b = parseInt(s.slice(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}
