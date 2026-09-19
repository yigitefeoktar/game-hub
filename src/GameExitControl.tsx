import { useEffect, useId, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

type ExitPhase = 'intro' | 'visible' | 'hidden';

export default function GameExitControl({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<ExitPhase>('intro');
  const [showHint, setShowHint] = useState(false);
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
      setShowHint(true);
    }, phase === 'intro' ? 2000 : 2600);

    return () => window.clearTimeout(timeout);
  }, [phase, isHidden, isHovered, isKeyboardFocused]);

  useEffect(() => {
    if (!showHint) return;

    const timeout = window.setTimeout(() => setShowHint(false), 1500);
    return () => window.clearTimeout(timeout);
  }, [showHint]);

  const reveal = () => {
    setPhase('visible');
    setShowHint(false);
  };

  return (
    <div className="absolute left-6 top-6 z-50 md:left-8 md:top-8">
      <button
        type="button"
        aria-label={isHidden ? 'Show game exit button' : 'Close game'}
        aria-describedby={showHint ? hintId : undefined}
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
            reveal();
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
            scale: prefersReducedMotion ? 1 : phase === 'intro' ? 1.25 : isHidden ? 0.9 : 1,
          }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.4, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full border border-white/20 bg-black/50 shadow-xl backdrop-blur-xl transition-colors group-hover:bg-black/70"
        >
          <X className="h-6 w-6 text-white" strokeWidth={2.5} />
        </motion.span>

        <AnimatePresence>
          {showHint && (
            <motion.span
              id={hintId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.3, delay: prefersReducedMotion ? 0 : 0.2 }}
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center text-xs font-medium leading-tight text-white"
            >
              <span>Hover</span>
              <span>or tap</span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
