import React from 'react';
import { createRoot } from 'react-dom/client';
import '../shared/base.css';
import Roadmap from './roadmap';

createRoot(document.getElementById('root')!).render(<Roadmap />);
