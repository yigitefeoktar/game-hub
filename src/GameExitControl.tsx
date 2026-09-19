import { useEffect, useId, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

type ExitPhase = 'intro' | 'visible' | 'hidden';
type ExitHint = 'corner' | null;

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
  const isHintVisible = hint !== null;

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
      <motion.button
        type="button"
        initial={false}
        animate={{
          width: isHintVisible ? 104 : 56,
          height: isHintVisible ? 104 : 56,
          x: isHintVisible ? -16 : 0,
          y: isHintVisible ? -16 : 0,
        }}
        transition={{ duration: prefersReducedMotion ? 0.15 : 0.45, ease: 'easeInOut' }}
        aria-label={isHidden ? 'Show game exit button' : 'Close game'}
        aria-describedby={hint ? hintId : undefined}
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
            setHint(null);
            return;
          }
          onClose();
        }}
        className="group relative flex cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      >
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{
            opacity: isHintVisible || !isHidden ? 1 : 0,
            width: isHintVisible ? 104 : 56,
            height: isHintVisible ? 104 : 56,
            scale: prefersReducedMotion ? 1 : phase === 'intro' ? 1.25 : isHidden && !isHintVisible ? 0.55 : 1,
            x: isHintVisible ? 0 : prefersReducedMotion || !isHidden ? 0 : -8,
            y: isHintVisible ? 0 : prefersReducedMotion || !isHidden ? 0 : -8,
          }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.45, ease: 'easeInOut' }}
          className="pointer-events-none absolute left-0 top-0 flex items-center justify-center overflow-hidden rounded-full border border-white/25 bg-black/75 shadow-xl backdrop-blur-xl transition-colors group-hover:bg-black/80"
        >
          <motion.span
            initial={false}
            animate={{ opacity: isHintVisible ? 0 : 1, scale: isHintVisible ? 0.6 : 1 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
            className="absolute flex items-center justify-center"
          >
            <X className="h-6 w-6 text-white" strokeWidth={2.5} />
          </motion.span>
          <AnimatePresence mode="wait">
            {hint && (
              <motion.span
                key={hint}
                initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.85 }}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.25, delay: prefersReducedMotion ? 0 : 0.12 }}
                className="absolute flex flex-col items-center text-center text-xs font-semibold leading-tight text-white"
              >
                <span>Hover or tap</span>
                <span>to show X</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.span>
        {hint && <span id={hintId} className="sr-only">Hover or tap here to show the exit button</span>}
      </motion.button>

      <AnimatePresence>
        {hint && (
          <motion.span
            key={hint}
            aria-hidden="true"
            initial={{ opacity: 0.45, scale: 1, x: -16, y: -16 }}
            animate={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 1.2, ease: 'easeOut' }}
            className="pointer-events-none absolute left-0 top-0 h-[104px] w-[104px] rounded-full border border-white/50"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
