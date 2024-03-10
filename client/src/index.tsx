import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Context } from './Context';

import App from './App';
import Store from './store/store';

const store = new Store();
export type StoreT = Store;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Context.Provider value={store}>
      <App />
    </Context.Provider>
  </StrictMode>
);
