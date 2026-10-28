// Entry point: self-hosted font, theme CSS, then the App.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// One variable font file replaces five separate weight files (smaller,
// faster: the browser downloads a single font for every weight).
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource/great-vibes/400.css';
import './styles/index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
