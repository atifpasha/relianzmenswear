import { useEffect, useRef } from 'react';

/**
 * Ambient canvas background for the Hero section — animated gold "threads"
 * that gently sway like fabric being stitched, with a needle travelling
 * along one strand and a faint scattered stitch-mark texture. Threads bend
 * toward the cursor for a subtle interactive, tactile feel while staying
 * out of the way of clicks (canvas is pointer-events-none).
 */

type Thread = {
  amplitude: number;
  frequency: number;
  phase: number;
  yBase: number; // 0-1 relative vertical position
  speed: number; // phase drift per second
  dash: [number, number];
  dashSpeed: number;
  width: number;
  color: string;
  opacity: number;
};

type StitchMark = {
  x: number;
  y: number;
  angle: number;
  length: number;
  opacity: number;
};

const THREAD_COLORS = ['#c9a15a', '#e6c987', '#f4e2b8'];

export default function ThreadBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let isCompact = window.innerWidth < 640;

    const mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999 };

    const buildThreads = (): Thread[] => {
      const count = isCompact ? 7 : 8;
      return Array.from({ length: count }, (_, i) => ({
        amplitude: (isCompact ? 20 : 26) + Math.random() * (isCompact ? 28 : 36),
        frequency: 0.7 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        yBase: 0.1 + (i / count) * 0.85 + (Math.random() - 0.5) * 0.05,
        speed: 0.04 + Math.random() * 0.05,
        dash: [10 + Math.random() * 6, 6 + Math.random() * 5],
        dashSpeed: 9 + Math.random() * 7,
        width: 1.1 + Math.random() * 1,
        color: THREAD_COLORS[i % THREAD_COLORS.length],
        opacity: (isCompact ? 0.16 : 0.16) + Math.random() * (isCompact ? 0.14 : 0.12),
      }));
    };

    let threads: Thread[] = buildThreads();

    let stitchMarks: StitchMark[] = [];
    const buildStitchMarks = () => {
      const count = Math.round((width * height) / 26000);
      stitchMarks = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        angle: Math.random() * Math.PI,
        length: 5 + Math.random() * 7,
        opacity: 0.04 + Math.random() * 0.06,
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStitchMarks();

      const nowCompact = window.innerWidth < 640;
      if (nowCompact !== isCompact) {
        isCompact = nowCompact;
        threads = buildThreads();
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };
    const handlePointerLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    const drawThread = (thread: Thread, t: number, needleIndex: number, i: number) => {
      const segments = 56;
      const points: { x: number; y: number }[] = [];

      for (let s = 0; s <= segments; s++) {
        const x = (s / segments) * width;
        const wave =
          Math.sin(x * 0.006 * thread.frequency + thread.phase + t * thread.speed) *
          thread.amplitude;
        let y = thread.yBase * height + wave;

        // Magnetic pull toward the cursor, stronger for nearby points, smoothly falling off.
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pull = Math.max(0, 1 - dist / 230);
        if (pull > 0) {
          y -= (dy / (dist || 1)) * pull * pull * 58;
        }
        points.push({ x, y });
      }

      ctx.strokeStyle = thread.color;
      ctx.globalAlpha = thread.opacity;
      ctx.lineWidth = thread.width;
      ctx.setLineDash(thread.dash);
      ctx.lineDashOffset = -t * thread.dashSpeed;

      // Snip a small gap in the thread right where the cursor (scissors) is hovering.
      const cutRadius = 22;
      let pathOpen = false;
      for (let s = 0; s < points.length - 1; s++) {
        const p1 = points[s];
        const p2 = points[s + 1];
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;
        const cut = Math.hypot(mx - mouse.x, my - mouse.y) < cutRadius;

        if (cut) {
          if (pathOpen) {
            ctx.stroke();
            pathOpen = false;
          }
          continue;
        }
        if (!pathOpen) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          pathOpen = true;
        }
        ctx.quadraticCurveTo(p1.x, p1.y, mx, my);
      }
      if (pathOpen) ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.setLineDash([]);

      // Travelling needle on one chosen thread.
      if (i === needleIndex) {
        const progress = (Math.sin(t * 0.35) + 1) / 2; // 0-1 yoyo
        const idx = Math.min(points.length - 2, Math.floor(progress * (points.length - 2)));
        const p1 = points[idx];
        const p2 = points[idx + 1];
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);

        ctx.save();
        ctx.translate(p1.x, p1.y);
        ctx.rotate(angle);
        ctx.globalAlpha = 0.65;

        // Needle body
        const needleLen = 30;
        const grad = ctx.createLinearGradient(-needleLen / 2, 0, needleLen / 2, 0);
        grad.addColorStop(0, 'rgba(230,201,135,0.1)');
        grad.addColorStop(0.5, 'rgba(255,244,214,0.95)');
        grad.addColorStop(1, 'rgba(230,201,135,0.1)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(-needleLen / 2, 0);
        ctx.lineTo(needleLen / 2, 0);
        ctx.stroke();

        // Eye of the needle
        ctx.beginPath();
        ctx.ellipse(needleLen / 2 - 4, 0, 2.2, 1.3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,244,214,0.9)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
        ctx.globalAlpha = 1;
      }
    };

    const drawStitchMarks = () => {
      ctx.save();
      for (const m of stitchMarks) {
        const dx = Math.cos(m.angle) * m.length;
        const dy = Math.sin(m.angle) * m.length;
        ctx.beginPath();
        ctx.moveTo(m.x - dx / 2, m.y - dy / 2);
        ctx.lineTo(m.x + dx / 2, m.y + dy / 2);
        ctx.strokeStyle = '#e6c987';
        ctx.globalAlpha = m.opacity;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
      ctx.globalAlpha = 1;
    };

    const drawCursorGlow = () => {
      if (mouse.x < -100 || mouse.y < -100) return;
      const radius = 46;
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, radius);
      grad.addColorStop(0, 'rgba(230,201,135,0.22)');
      grad.addColorStop(1, 'rgba(230,201,135,0)');
      ctx.save();
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    let raf = 0;
    let start = performance.now();
    const needleIndex = 3;

    const render = (now: number) => {
      const t = (now - start) / 1000;

      // Ease the tracked mouse position for smooth, non-jittery pull.
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      ctx.clearRect(0, 0, width, height);
      drawStitchMarks();
      threads.forEach((thread, i) => drawThread(thread, t, needleIndex, i));
      drawCursorGlow();

      raf = requestAnimationFrame(render);
    };

    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, width, height);
      drawStitchMarks();
      threads.forEach((thread, i) => drawThread(thread, 0, -1, i));
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
