// SmartImage: the safe <img> wrapper used for the photo and screenshots.
// - Below-the-fold images load lazily; pass priority for the hero photo.
// - If the file is missing (before you add your real photo/screenshots),
//   it shows a neutral placeholder instead of a broken image icon.
import { useState } from 'react';
import Icon from './Icon';

export default function SmartImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fallbackLabel = 'Image',
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-surface ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="flex flex-col items-center gap-2 text-muted">
          <Icon name="image" className="size-8" />
          <span className="text-xs font-medium">{fallbackLabel}</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
