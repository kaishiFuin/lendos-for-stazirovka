import React, { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { readVariant, type Variant } from './lib/ab';
import { trackPageView } from './lib/analytics';
import './index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container not found');
}

function Root() {
  const [variant, setVariant] = useState<Variant>('control');

  useEffect(() => {
    const selected = readVariant();
    setVariant(selected);
    trackPageView(selected);
  }, []);

  return <App variant={variant} />;
}

createRoot(container).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
