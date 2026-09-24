import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

/**
 * A pair of scissors that follows the visitor's pointer (mouse OR touch drag)
 * across the Hero section, snipping the animated threads as it goes — the
 * site's main "we stitch things" interaction beat. Built as a custom SVG
 * (two rigid rods rotating around a shared pivot) rather than an icon-font
 * glyph so it reads unambiguously as an open/close pair of scissors, never
 * a "hand" gesture. Purely decorative — pointer-events disabled throughout.
 */

type Snip = { id: number; x: number; y: number };

const OPEN_ANGLE = 17;
const CLOSED_ANGLE = 2;

function ScissorBlade({ angle }: { angle: number }) {
  return (
    <motion.g
      style={{ transformOrigin: '20px 20px' }}
      animate={{ rotate: angle }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      {/* neck connecting pivot to the finger loop */}
      <line x1="20" y1="20" x2="20" y2="27" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      {/* finger loop (handle) */}
      <circle cx="20" cy="32.5" r="5" fill="none" stroke="currentColor" strokeWidth="2.4" />
      {/* blade */}
      <path d="M20 3 L22 17.5 L20 20 L18 17.5 Z" fill="currentColor" />
    </motion.g>
  );
}

function ScissorsIcon({ snipping }: { snipping: boolean }) {
  const angle = snipping ? CLOSED_ANGLE : OPEN_ANGLE;
  return (
    <svg viewBox="0 0 40 40" width="1em" height="1em" className="overflow-visible">
      <ScissorBlade angle={angle} />
      <ScissorBlade angle={-angle} />
      {/* pivot screw */}
      <circle cx="20" cy="20" r="1.8" fill="currentColor" />
    </svg>
  );
}

export default function ScissorsCursor() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 300, damping: 24, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 24, mass: 0.4 });

  const [visible, setVisible] = useState(false);
  const [overInteractive, setOverInteractive] = useState(false);
  const [snipping, setSnipping] = useState(false);
  const [snips, setSnips] = useState<Snip[]>([]);
  const snipIdRef = useRef(0);
  const lastAutoSnip = useRef(0);
  const hideTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const section = wrapperRef.current?.closest('section');
    if (!section) return;

    const doSnip = (px: number, py: number) => {
      setSnipping(true);
      window.setTimeout(() => setSnipping(false), 180);
      const id = snipIdRef.current++;
      setSnips((prev) => [...prev, { id, x: px, y: py }]);
      window.setTimeout(() => {
        setSnips((prev) => prev.filter((s) => s.id !== id));
      }, 650);
    };

    const scheduleHide = (delay: number) => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setVisible(false), delay);
    };

    const reveal = (clientX: number, clientY: number) => {
      const rect = section.getBoundingClientRect();
      const inside =
        clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
      if (!inside) {
        setVisible(false);
        return null;
      }
      setVisible(true);
      scheduleHide(1600);
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      x.set(px);
      y.set(py);
      return { px, py };
    };

    const isInteractive = (target: EventTarget | null) =>
      !!(target as HTMLElement | null)?.closest?.(
        'a, button, input, textarea, select, label, [role="button"]'
      );

    const handleMove = (e: PointerEvent) => {
      const overUi = isInteractive(e.target);
      setOverInteractive(overUi);
      const pos = reveal(e.clientX, e.clientY);
      if (!pos || overUi) return;
      const now = performance.now();
      if (now - lastAutoSnip.current > 1000) {
        lastAutoSnip.current = now;
        doSnip(pos.px, pos.py);
      }
    };

    const handleDown = (e: PointerEvent) => {
      const overUi = isInteractive(e.target);
      setOverInteractive(overUi);
      const pos = reveal(e.clientX, e.clientY);
      if (!pos || overUi) return;
      lastAutoSnip.current = performance.now();
      doSnip(pos.px, pos.py);
    };

    const handleUp = () => scheduleHide(700);
    const handleLeave = () => setVisible(false);

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerdown', handleDown, { passive: true });
    window.addEventListener('pointerup', handleUp, { passive: true });
    window.addEventListener('pointercancel', handleUp, { passive: true });
    window.addEventListener('pointerleave', handleLeave);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', handleUp);
      window.removeEventListener('pointerleave', handleLeave);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, [x, y]);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none absolute inset-0 z-20 overflow-visible"
      aria-hidden="true"
    >
      <AnimatePresence>
        {visible && !overInteractive && (
          <motion.div
            key="scissors"
            style={{ left: springX, top: springY }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="absolute text-4xl text-gold-light drop-shadow-[0_0_8px_rgba(230,201,135,0.55)]"
          >
            {/* Rotated diagonally, tip anchored near the actual pointer point —
                reads as a natural angled cursor rather than a floating vertical/
                horizontal icon centered on the point. */}
            <div className="-translate-x-[15%] -translate-y-[80%] rotate-[38deg]">
              <ScissorsIcon snipping={snipping} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {snips.map((snip) => (
        <motion.span
          key={snip.id}
          initial={{ opacity: 0.9, scale: 0.3 }}
          animate={{ opacity: 0, scale: 1.6 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          style={{ left: snip.x, top: snip.y }}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-gold-light"
        >
          <span className="absolute h-px w-5 -translate-x-1/2 -translate-y-1/2 rotate-[20deg] bg-gold-light" />
          <span className="absolute h-px w-5 -translate-x-1/2 -translate-y-1/2 -rotate-[20deg] bg-gold-light" />
        </motion.span>
      ))}
    </div>
  );
}
