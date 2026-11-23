import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { preloadRouteForPath } from './AppRoutes.tsx';
import './index.css';

const container = document.getElementById('root')!;
const hasPrerenderedContent =
  container.hasChildNodes() && !container.innerHTML.trim().startsWith('<!--app-html-->');

preloadRouteForPath(window.location.pathname).finally(() => {
  if (hasPrerenderedContent) {
    hydrateRoot(container, <App />);
  } else {
    createRoot(container).render(<App />);
  }
});
