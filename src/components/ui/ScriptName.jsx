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
