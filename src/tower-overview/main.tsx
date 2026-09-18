import React from 'react';
import { createRoot } from 'react-dom/client';
import '../shared/base.css';
import TowerOverview from './tower-overview';
// Imported after the component so these overrides win over tower-overview.css in the bundle.
import './site-layout.css';

createRoot(document.getElementById('root')!).render(<TowerOverview />);
