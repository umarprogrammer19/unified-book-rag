import React, { useState, useEffect } from 'react';
import Content from '@theme-original/DocItem/Content';

export default function ContentWrapper(props) {
  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState('');
  const [showUrdu, setShowUrdu] = useState(false);
  const [translations, setTranslations] = useState({});
  const [currentDocPath, setCurrentDocPath] = useState('');

  // Load translations from the JSON file
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // Fetch the translations file from the public directory
        // The file is located at /urduTranslations.json as it's in the static directory
        const response = await fetch('/urduTranslations.json');
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

  // Get the current document path when component mounts
  useEffect(() => {
    // Decode the entire path first to handle any encoded characters
    const currentPath = decodeURIComponent(window.location.pathname);
    // Extract document path from URL
    // Format: /docs/module-number/chapter-number-title
    const pathParts = currentPath.split('/').filter(part => part !== '');

    if (pathParts[0] === 'docs' && pathParts.length > 1) {
      // The JSON keys have format like "Module 01 Hardware-Lab/1.1-physical-ai-foundations-basics.md"
      // But the URL path is like "module-01-hardware-lab/1.1-physical-ai-foundations-basics"
      // We need to transform the URL format to match the JSON key format

      let docPath = pathParts.slice(1).join('/');
      if (!docPath.endsWith('.md')) {
        docPath += '.md';
      }

      // Transform the path to match JSON key format
      const pathSegments = docPath.split('/');
      let transformedPath = docPath;

      if (pathSegments.length >= 2) {
        // Transform the module directory part: "module-01-hardware-lab" -> "Module 01 Hardware-Lab"
        const modulePart = pathSegments[0];
        let transformedModulePart = modulePart;

        // Transform "module-XX-" to "Module XX "
        transformedModulePart = transformedModulePart.replace(/^module-(\d+)-/, (_, num) => `Module ${num} `);

        // Split the remaining part by hyphens, capitalize each word, then join with hyphens
        // This preserves the original structure like "Hardware-Lab"
        const remainingPart = transformedModulePart.substring(transformedModulePart.indexOf(' ') + 1);
        const parts = remainingPart.split('-');
        const capitalizedParts = parts.map(part =>
          part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        );

        // Join with hyphens to preserve the original structure like "Hardware-Lab"
        const capitalizedModule = capitalizedParts.join('-');

        // Combine with the Module XX prefix
        const moduleNumber = modulePart.match(/module-(\d+)-/)?.[1];
        if (moduleNumber) {
          transformedModulePart = `Module ${moduleNumber} ${capitalizedModule}`;
        }

        // Combine with the file part
        const filePart = pathSegments[1];
        transformedPath = `${transformedModulePart}/${filePart}`;
      }

      setCurrentDocPath(transformedPath);
    }
  }, []);

  const handleTranslate = () => {
    if (Object.keys(translations).length === 0) {
      alert('Translations are still loading. Please wait a moment and try again.');
      return;
    }

    setLoading(true);
    try {
      // Decode the currentDocPath in case it got encoded somewhere
      const decodedPath = decodeURIComponent(currentDocPath);

      // currentDocPath is already transformed to match JSON key format
      let translatedContent = null;
      let matchedPath = null;

      // Try the decoded path first
      if (translations[decodedPath]) {
        translatedContent = translations[decodedPath]?.translated;
        matchedPath = decodedPath;
      }

      // If not found, also try the original path in case
      if (!translatedContent && translations[currentDocPath]) {
        translatedContent = translations[currentDocPath]?.translated;
        matchedPath = currentDocPath;
      }

      if (translatedContent && translatedContent !== 'Translation not available for this document.') {
        setTranslation(translatedContent);
        setShowUrdu(true);
        console.log(`Translation found for: ${matchedPath}`);
      } else {
        // Try to find a similar path if exact match not found
        const availableKeys = Object.keys(translations);
        let foundSimilar = false;

        for (const key of availableKeys) {
          // Check if the key contains the file part of the decoded path or vice versa
          const keyFilePart = key.split('/')[1];
          const decodedFilePart = decodedPath.split('/')[1];

          if (keyFilePart === decodedFilePart || key.includes(decodedFilePart) || decodedPath.includes(keyFilePart)) {
            const possibleTranslation = translations[key]?.translated;
            if (possibleTranslation && possibleTranslation !== 'Translation not available for this document.') {
              setTranslation(possibleTranslation);
              setShowUrdu(true);
              console.log(`Translation found with similar key: ${key}`);
              foundSimilar = true;
              break;
            }
          }
        }

        if (!foundSimilar) {
          setTranslation('Translation not available for this document.');
          setShowUrdu(true);
          console.warn(`Translation not found for: ${currentDocPath}`);
          console.warn(`Decoded path attempted: ${decodedPath}`);
          console.warn('Available paths (first 5):', Object.keys(translations).slice(0, 5)); // Log first 5 for debugging
        }
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
      <div style={{ marginBottom: '20px', textAlign: 'left' }}>
        {!showUrdu ? (
          <button
            onClick={handleTranslate}
            disabled={loading}
            className="translation-button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "var(--spacing-sm) var(--spacing-md)",
              fontSize: "0.9rem",
              fontWeight: "500",
              color: "var(--color-primary)",
              border: "1px solid rgba(0, 212, 170, 0.4)",
              borderRadius: "var(--radius-md)",
              transition: "all var(--transition-fast)",
            }}
          >
            {loading ? 'Loading Translation...' : 'Translate to Urdu'}
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="translation-button"
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              padding: '8px 20px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'inline-block',
              fontSize: '14px',
              margin: '4px 2px',
              cursor: 'pointer',
              borderRadius: "var(--radius-md)",
              fontWeight: 'bold'
            }}
          >
            Show Original
          </button>
        )}

        {loading && (
          <div style={{
            display: 'inline-block',
            marginLeft: '10px',
            width: '20px',
            height: '20px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
        )}
      </div >

      {
        showUrdu ? (
          <div
            className="urdu-translation-container"
            style={{
              direction: 'rtl',
              fontFamily: 'Noto Nastaliq Urdu, serif',
              fontSize: '18px',
              lineHeight: '1.8',
              padding: '20px',
              backgroundColor: 'var(--ifm-background-color, #f9f9f9)',
              borderRadius: '8px',
              border: '1px solid var(--ifm-color-emphasis-300, #ddd)',
              minHeight: '200px' // Ensure there's space even if loading
            }}
          >
            {
              translation ? (
                <div
                  className="urdu-text"
                  dangerouslySetInnerHTML={{ __html: translation }}
                  style={{
                    color: 'var(--ifm-font-color-base, #222)'
                  }
                  }
                />
              ) : (
                <p>Loading translation...</p>
              )}
          </div >
        ) : (
          <Content {...props} />
        )}
    </>
  );
}
