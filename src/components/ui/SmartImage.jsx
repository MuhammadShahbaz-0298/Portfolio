// SmartImage: the safe <img> wrapper used for the photo and screenshots.
// - Below-the-fold images load lazily; pass priority for the hero photo.
// - Responsive sizes: pass srcSetWidths (variants produced by
//   `npm run optimize-images`, named file-<width>.ext) plus a `sizes`
//   string describing how wide the image displays. The browser then
//   downloads only the variant it needs — phones get the small file,
//   retina screens get the sharp one.
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

  // width/height props must be the real file dimensions — they are
  // declared as the largest srcset candidate (the base src itself).
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
