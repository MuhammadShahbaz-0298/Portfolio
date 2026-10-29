import { useScrollProgress } from '../../hooks/useScrollProgress';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="scroll-progress fixed inset-x-0 top-0 z-[60] h-0.5"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div
        className="gradient-bg h-full origin-left"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
