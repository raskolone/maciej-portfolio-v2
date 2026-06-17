/* =============================================================
   GridCanvas — animated grid blocks background
   Dark blocks materialize on a grid, symbolizing building/structure.
   Replaces constellation in Hero Section.
   ============================================================= */

import { useEffect, useRef } from "react";

interface Block {
  col: number;
  row: number;
  opacity: number;
  targetOpacity: number;
  speed: number;
  delay: number;
  elapsed: number;
  phase: "in" | "hold" | "out" | "wait";
  holdTime: number;
  waitTime: number;
}

export default function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const blocksRef = useRef<Block[]>([]);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const BLOCK_SIZE = 52;
    const GAP = 4;
    const CELL = BLOCK_SIZE + GAP;
    const MAX_OPACITY = 0.055;
    const ACCENT_OPACITY = 0.13;

    let cols = 0;
    let rows = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cols = Math.ceil(canvas.width / CELL) + 1;
      rows = Math.ceil(canvas.height / CELL) + 1;
      initBlocks();
    }

    function initBlocks() {
      const blocks: Block[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const isAccent = Math.random() < 0.04;
          blocks.push({
            col: c,
            row: r,
            opacity: 0,
            targetOpacity: isAccent ? ACCENT_OPACITY : MAX_OPACITY,
              speed: 0.15 + Math.random() * 0.25,
            delay: Math.random() * 8000,
            elapsed: Math.random() * 12000,
            phase: "wait",
            holdTime: 3000 + Math.random() * 6000,
            waitTime: 3000 + Math.random() * 9000,
          });
        }
      }
      blocksRef.current = blocks;
    }

    function update(dt: number) {
      for (const b of blocksRef.current) {
        b.elapsed += dt;

        if (b.phase === "wait") {
          if (b.elapsed >= b.waitTime) {
            b.elapsed = 0;
            b.phase = "in";
          }
        } else if (b.phase === "in") {
          b.opacity = Math.min(b.opacity + b.speed * dt * 0.001, b.targetOpacity);
          if (b.opacity >= b.targetOpacity) {
            b.opacity = b.targetOpacity;
            b.elapsed = 0;
            b.phase = "hold";
          }
        } else if (b.phase === "hold") {
          if (b.elapsed >= b.holdTime) {
            b.elapsed = 0;
            b.phase = "out";
          }
        } else if (b.phase === "out") {
          b.opacity = Math.max(b.opacity - b.speed * dt * 0.0005, 0);
          if (b.opacity <= 0) {
            b.opacity = 0;
            b.elapsed = 0;
            b.waitTime = 2000 + Math.random() * 6000;
            b.phase = "wait";
          }
        }
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const b of blocksRef.current) {
        if (b.opacity <= 0.005) continue;
        const x = b.col * CELL;
        const y = b.row * CELL;

        // Block fill
        ctx.fillStyle = `rgba(74, 222, 128, ${b.opacity})`;
        ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);

        // Subtle border only
        ctx.strokeStyle = `rgba(74, 222, 128, ${b.opacity * 2})`;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x + 0.5, y + 0.5, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
      }
    }

    function loop(time: number) {
      const dt = Math.min(time - lastTimeRef.current, 50);
      lastTimeRef.current = time;
      update(dt);
      draw();
      animRef.current = requestAnimationFrame(loop);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    lastTimeRef.current = performance.now();
    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
