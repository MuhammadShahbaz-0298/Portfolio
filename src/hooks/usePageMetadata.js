// usePageMetadata: copies the values from src/data/site.js (which read them
// from .env) into the <title> and meta tags when the app starts.
// index.html already has the same values via %VITE_...% placeholders; this
// hook keeps everything consistent even if the env file changes later.
import { useEffect } from 'react';
import { site } from '../data/site';

function setMetaContent(selector, value) {
  const element = document.head.querySelector(selector);
  if (element && value) element.setAttribute('content', value);
}

export function usePageMetadata() {
  useEffect(() => {
    document.title = site.title;

    setMetaContent('meta[name="description"]', site.description);
    setMetaContent('meta[property="og:title"]', site.title);
    setMetaContent('meta[property="og:description"]', site.description);
    setMetaContent('meta[property="og:url"]', site.url);
    setMetaContent('meta[name="twitter:title"]', site.title);
    setMetaContent('meta[name="twitter:description"]', site.description);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical && site.url) canonical.setAttribute('href', site.url);
  }, []);
}
