import React, { useState, useEffect } from 'react';
import Content from '@theme-original/DocItem/Content';

export default function ContentWrapper(props) {
  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState('');
  const [showUrdu, setShowUrdu] = useState(false);
  const [translations, setTranslations] = useState({});

  // Load translations from the JSON file
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch('/src/data/urduTranslations.json');
        if (response.ok) {
          const data = await response.json();
          setTranslations(data);
        } else {
          console.warn('Translations file not found, translation feature will be limited');
        }
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };

    loadTranslations();
  }, []);

  const handleTranslate = () => {
    setLoading(true);
    try {
      // Get the current document's relative path
      // This uses the Docusaurus route to identify the document
      const currentPath = window.location.pathname;
      const pathParts = currentPath.split('/');
      // Remove 'docs' and any trailing slash or index
      let docPath = pathParts.slice(2).join('/'); // Skip /docs/

      // Handle index files
      if (docPath.endsWith('/')) {
        docPath = docPath + 'index.md';
      } else if (docPath && !docPath.endsWith('.md')) {
        docPath = docPath + '.md';
      }

      if (!docPath) {
        docPath = 'index.md';
      }

      // Look up the pre-translated content
      const translatedContent = translations[docPath]?.translated;

      if (translatedContent) {
        setTranslation(translatedContent);
        setShowUrdu(true);
      } else {
        setTranslation('Translation not available for this document.');
        setShowUrdu(true);
        console.warn(`Translation not found for: ${docPath}`);
      }
    } catch (error) {
      console.error('Error getting translation:', error);
      setTranslation('Translation not available for this document.');
      setShowUrdu(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setShowUrdu(false);
    setTranslation('');
  };

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        {!showUrdu ? (
          <button
            onClick={handleTranslate}
            disabled={loading}
            className="translate-button"
          >
            {loading ? 'Loading...' : '.Translate to Urdu'}
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="reset-button"
          >
            Show Original
          </button>
        )}

        {loading && <div className="loading-spinner"></div>}
      </div>

      {showUrdu ? (
        <div className="urdu-translation-container">
          {translation ? (
            <div className="urdu-text" dangerouslySetInnerHTML={{ __html: translation.replace(/\n/g, '<br />') }} />
          ) : (
            <p>Loading translation...</p>
          )}
        </div>
      ) : (
        <Content {...props} />
      )}
    </>
  );
}
