// env.ts - Environment variable utility for Docusaurus
export const getEnvVar = (name: string, defaultValue: string = ''): string => {
  // Check for environment variable in browser (via Docusaurus config)
  if (typeof window !== 'undefined') {
    // First check window.env (set by our Root.js)
    if ((window as any).env && (window as any).env[name]) {
      return (window as any).env[name];
    }

    // Then check for global Docusaurus config
    if ((window as any).Docusaurus?.config?.customFields) {
      const customField = (window as any).Docusaurus.config.customFields[name];
      if (customField) {
        return customField;
      }
    }
  }

  // Check for process.env in Node.js environment during build
  if (typeof process !== 'undefined' && process.env) {
    return process.env[name] || defaultValue;
  }

  // Fallback to default value
  return defaultValue;
};

// Specific environment variables
export const AUTH_BASE_URL = getEnvVar('REACT_APP_AUTH_BASE_URL', 'https://unified-book-rag-server.vercel.app');
export const RAG_BASE_URL = getEnvVar('REACT_APP_RAG_BASE_URL', 'https://unified-book-rag.onrender.com');