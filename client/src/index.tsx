import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { userStore, StoreContext } from './store/userStore';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={userStore}>
      <App />
    </StoreContext.Provider>
  </StrictMode>
);
