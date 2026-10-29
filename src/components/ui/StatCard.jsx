import Card from './Card';
import { useCountUp } from '../../hooks/useCountUp';

export default function StatCard({ value, label }) {
  const { ref, display } = useCountUp(value);

  return (
    <Card hover className="relative h-full overflow-hidden">
      <span
        className="gradient-bg absolute inset-x-0 top-0 h-0.5 opacity-70"
        aria-hidden="true"
      />
      <p ref={ref} className="gradient-text text-3xl font-extrabold tracking-tight">
        <span aria-hidden="true">{display}</span>
        <span className="sr-only">{value}</span>
      </p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </Card>
  );
}
