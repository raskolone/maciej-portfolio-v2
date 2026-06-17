/* =============================================================
   DESIGN: Dark Constellation — Animated Canvas Background
   3D depth with Z-axis, parallax mouse effect, perspective projection
   Stars have z-depth: far stars = smaller/dimmer, near = larger/brighter
   ============================================================= */

import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface Star {
  x: number;  // base x (0..1 normalized)
  y: number;  // base y (0..1 normalized)
  z: number;  // depth 0..1 (0=far, 1=near)
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  opacity: number;
}

const CONNECTION_DIST = 160;
const PARALLAX_STRENGTH = 0.0; // no mouse parallax — calm autonomous movement

export default function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 }); // normalized 0..1
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = theme !== "light";

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const isMobile = canvas.width < 768;
      const starCount = isMobile ? 55 : 110;
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),           // depth layer
        vx: (Math.random() - 0.5) * 0.0003,
        vy: (Math.random() - 0.5) * 0.0003,
        vz: (Math.random() - 0.5) * 0.0008, // slow z drift
        radius: Math.random() * 1.4 + 0.5,
        opacity: Math.random() * 0.3 + 0.7,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    // No mouse interaction — stars drift autonomously

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const stars = starsRef.current;
      const mx = mouseRef.current.x - 0.5; // -0.5..0.5
      const my = mouseRef.current.y - 0.5;

      // Project star to screen coords with parallax
      const project = (s: Star) => {
        // Parallax: near stars (z≈1) shift more, far stars (z≈0) shift less
        const px = (s.x + mx * PARALLAX_STRENGTH * s.z) * W;
        const py = (s.y + my * PARALLAX_STRENGTH * s.z) * H;
        // Perspective scale: near stars appear larger
        const scale = 0.4 + s.z * 0.6;
        const r = s.radius * scale;
        const alpha = (0.3 + s.z * 0.7) * s.opacity;
        return { px, py, r, alpha, scale };
      };

      // Draw connections
      for (let i = 0; i < stars.length; i++) {
        const pi = project(stars[i]);
        for (let j = i + 1; j < stars.length; j++) {
          const pj = project(stars[j]);
          const dx = pi.px - pj.px;
          const dy = pi.py - pj.py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            // Only connect stars at similar depth (within 0.4 z-range)
            const zDiff = Math.abs(stars[i].z - stars[j].z);
            if (zDiff > 0.4) continue;
            const depthAlpha = 1 - zDiff / 0.4;
            const distAlpha = (1 - dist / CONNECTION_DIST);
            const alpha = isDark
              ? distAlpha * depthAlpha * 0.5
              : distAlpha * depthAlpha * 0.35;
            ctx.beginPath();
            ctx.moveTo(pi.px, pi.py);
            ctx.lineTo(pj.px, pj.py);
            ctx.strokeStyle = isDark
              ? `rgba(80, 200, 120, ${alpha})`
              : `rgba(20, 110, 50, ${alpha})`;
            ctx.lineWidth = isDark ? 0.7 * Math.min(pi.scale, pj.scale) : 0.6;
            ctx.stroke();
          }
        }

        // No mouse connections — calm autonomous drift only
      }

      // Draw stars
      for (const star of stars) {
        const { px, py, r, alpha } = project(star);

        if (isDark) {
          // Glow halo — soft white, scaled by depth
          const glowR = r * 4;
          const grd = ctx.createRadialGradient(px, py, 0, px, py, glowR);
          grd.addColorStop(0, `rgba(255,255,255,${alpha * 0.55})`);
          grd.addColorStop(1, `rgba(255,255,255,0)`);
          ctx.beginPath();
          ctx.arc(px, py, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // Bright core
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(px, py, r * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(10,40,20,${alpha * 0.7})`;
          ctx.fill();
        }

        // Move (normalized space)
        star.x += star.vx;
        star.y += star.vy;
        star.z += star.vz;

        // Wrap x/y
        if (star.x < 0) star.x = 1;
        if (star.x > 1) star.x = 0;
        if (star.y < 0) star.y = 1;
        if (star.y > 1) star.y = 0;
        // Bounce z
        if (star.z < 0) { star.z = 0; star.vz *= -1; }
        if (star.z > 1) { star.z = 1; star.vz *= -1; }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      // no mousemove listener to remove
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
