import { useEffect, useId, useRef, useState } from 'react';
import { ArrowUpLeft, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

type ExitPhase = 'intro' | 'visible' | 'hidden';
type ExitHint = 'corner' | 'close' | null;

export default function GameExitControl({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<ExitPhase>('intro');
  const [hint, setHint] = useState<ExitHint>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isKeyboardFocused, setIsKeyboardFocused] = useState(false);
  const pointerPressedRef = useRef(false);
  const revealOnlyRef = useRef(false);
  const revealedAtRef = useRef(-Infinity);
  const hintId = useId();
  const prefersReducedMotion = useReducedMotion();
  const isHidden = phase === 'hidden';

  useEffect(() => {
    if (isHidden || isHovered || isKeyboardFocused) return;

    const timeout = window.setTimeout(() => {
      setPhase('hidden');
      setHint('corner');
    }, phase === 'intro' ? 2000 : 2600);

    return () => window.clearTimeout(timeout);
  }, [phase, isHidden, isHovered, isKeyboardFocused]);

  useEffect(() => {
    if (!hint) return;

    const timeout = window.setTimeout(() => setHint(null), 1500);
    return () => window.clearTimeout(timeout);
  }, [hint]);

  const reveal = () => {
    setPhase('visible');
    setHint(null);
  };

  return (
    <div className="absolute left-6 top-6 z-50 md:left-8 md:top-8">
      <button
        type="button"
        aria-label={isHidden ? 'Show game exit button' : 'Close game'}
        aria-describedby={hint ? hintId : undefined}
        title={isHidden ? 'Show game exit button' : 'Close game'}
        onPointerEnter={(event) => {
          if (event.pointerType !== 'mouse') return;
          if (isHidden) revealedAtRef.current = performance.now();
          setIsHovered(true);
          reveal();
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') {
            revealedAtRef.current = -Infinity;
            setIsHovered(false);
          }
        }}
        onPointerDown={(event) => {
          pointerPressedRef.current = true;
          revealOnlyRef.current = isHidden ||
            (event.pointerType === 'mouse' && performance.now() - revealedAtRef.current < 700);
          setIsKeyboardFocused(false);
          if (isHidden) reveal();
        }}
        onPointerUp={() => { pointerPressedRef.current = false; }}
        onPointerCancel={() => {
          pointerPressedRef.current = false;
          revealOnlyRef.current = false;
        }}
        onFocus={() => {
          if (pointerPressedRef.current) return;
          setIsKeyboardFocused(true);
          reveal();
        }}
        onBlur={() => setIsKeyboardFocused(false)}
        onClick={() => {
          if (revealOnlyRef.current || isHidden) {
            revealOnlyRef.current = false;
            setPhase('visible');
            setHint('close');
            return;
          }
          onClose();
        }}
        className="group relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      >
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{
            opacity: isHidden ? 0 : 1,
            scale: prefersReducedMotion ? 1 : phase === 'intro' ? 1.25 : isHidden ? 0.55 : 1,
            x: prefersReducedMotion || !isHidden ? 0 : -8,
            y: prefersReducedMotion || !isHidden ? 0 : -8,
          }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.4, ease: 'easeInOut' }}
          className="pointer-events-none flex h-full w-full items-center justify-center rounded-full border border-white/20 bg-black/50 shadow-xl backdrop-blur-xl transition-colors group-hover:bg-black/70"
        >
          <X className="h-6 w-6 text-white" strokeWidth={2.5} />
        </motion.span>
      </button>

      <AnimatePresence>
        {hint && (
          <motion.div
            key={hint}
            id={hintId}
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -8 }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.3, ease: 'easeOut' }}
            className="pointer-events-none absolute left-16 top-1 flex w-max max-w-[calc(100vw-7rem)] items-center gap-2 rounded-xl border border-white/15 bg-black/75 px-3 py-2 text-xs font-medium leading-5 text-white shadow-lg backdrop-blur-md"
          >
            <ArrowUpLeft aria-hidden="true" className="h-5 w-5 shrink-0" strokeWidth={2} />
            <span>{hint === 'corner' ? 'Hover or tap here to exit' : 'Press again to exit'}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
