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
  srcSetWidths = [],
  sizes,
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

  const srcSet =
    srcSetWidths.length > 0
      ? [
          ...srcSetWidths.map(
            (w) => `${src.replace(/(\.\w+)$/, `-${w}$1`)} ${w}w`
          ),
          `${src} ${width}w`,
        ].join(', ')
      : undefined;

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
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
