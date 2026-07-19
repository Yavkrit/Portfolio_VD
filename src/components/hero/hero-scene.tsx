"use client";

import { useEffect, useRef } from "react";

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// A 2D canvas replacement for what used to be a Three.js/React Three Fiber
// scene — same schematic-grid + pointer glow + sweep-band effect, without
// the ~860KB WebGL dependency for what is a purely decorative background.
export function HeroScene({
  lineColor,
  sweepColor,
}: {
  lineColor: string;
  sweepColor: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let rafId = 0;
    const pointer = { x: 0.5, y: 0.5 };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    function onPointerMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", onPointerMove);

    const spacing = 48;
    const start = performance.now();

    function drawGrid() {
      ctx!.strokeStyle = lineColor;
      ctx!.globalAlpha = 0.12;
      ctx!.lineWidth = 1;
      for (let x = 0; x < width; x += spacing) {
        ctx!.beginPath();
        ctx!.moveTo(x + 0.5, 0);
        ctx!.lineTo(x + 0.5, height);
        ctx!.stroke();
      }
      for (let y = 0; y < height; y += spacing) {
        ctx!.beginPath();
        ctx!.moveTo(0, y + 0.5);
        ctx!.lineTo(width, y + 0.5);
        ctx!.stroke();
      }
      ctx!.globalAlpha = 1;
    }

    function frame(now: number) {
      const t = (now - start) / 1000;
      ctx!.clearRect(0, 0, width, height);
      drawGrid();

      const px = pointer.x * width;
      const py = pointer.y * height;
      const glowRadius = Math.max(width, height) * 0.4;
      const glow = ctx!.createRadialGradient(px, py, 0, px, py, glowRadius);
      glow.addColorStop(0, hexToRgba(lineColor, 0.14));
      glow.addColorStop(1, hexToRgba(lineColor, 0));
      ctx!.fillStyle = glow;
      ctx!.fillRect(0, 0, width, height);

      const sweepY = ((t * 0.04) % 1) * (height + 160) - 80;
      const band = ctx!.createLinearGradient(0, sweepY - 60, 0, sweepY + 60);
      band.addColorStop(0, hexToRgba(sweepColor, 0));
      band.addColorStop(0.5, hexToRgba(sweepColor, 0.22));
      band.addColorStop(1, hexToRgba(sweepColor, 0));
      ctx!.fillStyle = band;
      ctx!.fillRect(0, sweepY - 60, width, 120);

      rafId = requestAnimationFrame(frame);
    }

    if (reduceMotion) {
      drawGrid();
    } else {
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [lineColor, sweepColor]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
