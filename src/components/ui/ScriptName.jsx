// ScriptName: Muhammad's name in the handwritten signature style
// (Great Vibes — matches the logo artwork). The text itself lives in
// src/data/profile.js like everywhere else; only the styling is here.
// size: 'xs' (footer copyright) | 'sm' (navbar, footer brand) | 'lg' (hero greeting).
import { profile } from '../../data/profile';

const sizeClasses = {
  xs: 'text-base',
  sm: 'text-xl',
  lg: 'text-3xl sm:text-4xl',
};

export default function ScriptName({ size = 'sm', className = '' }) {
  return (
    <span className={`font-script font-normal leading-none ${sizeClasses[size]} ${className}`}>
      {profile.name}
    </span>
  );
}
