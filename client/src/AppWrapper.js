import React from 'react';
import { UserProvider } from './components/UserContext';
import App from './App';

export default function AppWrapper() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}
