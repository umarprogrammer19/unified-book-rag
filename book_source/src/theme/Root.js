import React from 'react';
import ChatWidget from '@site/src/components/ChatWidget';
import { AuthProvider } from '@site/src/contexts/AuthContext';

// Make environment variables available in browser
if (typeof window !== 'undefined') {
  // These will be populated by Docusaurus during build time
  window.env = window.env || {};
  if (typeof window.Docusaurus !== 'undefined' && window.Docusaurus.config) {
    Object.assign(window.env, {
      REACT_APP_AUTH_BASE_URL: window.Docusaurus.config.customFields?.REACT_APP_AUTH_BASE_URL,
      REACT_APP_RAG_BASE_URL: window.Docusaurus.config.customFields?.REACT_APP_RAG_BASE_URL,
    });
  }
}

export default function Root({children}) {
  return (
    <AuthProvider>
      {children}
      <ChatWidget />
    </AuthProvider>
  );
}