import React, { useState } from 'react';
import Content from '@theme-original/DocItem/Content';

export default function ContentWrapper(props) {
  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState('');
  const [showUrdu, setShowUrdu] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    setShowUrdu(true);
    try {
      // Get the current content as text
      const contentElement = document.querySelector('[data-testid="doc-markdown"]');
      let content = '';

      if (contentElement) {
        content = contentElement.innerText || contentElement.textContent || '';
      } else {
        // Fallback: try to get content from the rendered markdown
        const markdownElements = document.querySelectorAll('.markdown');
        if (markdownElements.length > 0) {
          content = Array.from(markdownElements).map(el => el.innerText || el.textContent || '').join('\n');
        }
      }

      if (!content) {
        // If we can't get content from DOM, try to get it from props
        console.warn('Could not extract content from DOM, translation may be limited');
        content = 'Content could not be extracted from the page. Translation is limited to visible text.';
      }

      const response = await fetch('http://localhost:5000/api/translate/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: content,
          source_language: 'en',
          target_language: 'ur',
          preserve_formatting: true,
          preserve_code: true
        }),
      });

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }

      const data = await response.json();
      setTranslation(data.translated_text);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslation('Translation failed. Please try again later.');
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
            {loading ? 'Translating...' : '.Translate to Urdu'}
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
            <p>Translating content...</p>
          )}
        </div>
      ) : (
        <Content {...props} />
      )}
    </>
  );
}
