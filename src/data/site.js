// Site-wide metadata (title, description, URL).
// The values come from the .env file: VITE_SITE_URL, VITE_SITE_TITLE,
// VITE_SITE_DESCRIPTION. To change the site URL, edit .env — not this file.
export const site = {
  url: import.meta.env.VITE_SITE_URL,
  title: import.meta.env.VITE_SITE_TITLE,
  description: import.meta.env.VITE_SITE_DESCRIPTION,
  // Shared social-preview image (replace the placeholder in public/).
  ogImagePath: '/og-image.png',
};
