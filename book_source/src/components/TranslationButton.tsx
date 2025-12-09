import React, { useState } from 'react';
import styles from './translation-button.module.css';

interface TranslationButtonProps {
  onTranslate: (content: string) => Promise<string>;
}

const TranslationButton: React.FC<TranslationButtonProps> = ({ onTranslate }) => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [isUrdu, setIsUrdu] = useState(false);
  const [originalContent, setOriginalContent] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (isTranslating) return;

    setIsTranslating(true);

    try {
      if (isUrdu) {
        // Switch back to original English content
        if (originalContent) {
          // Restore original content
          const contentElement = document.querySelector('.theme-doc-markdown, .markdown');
          if (contentElement) {
            contentElement.innerHTML = originalContent;
          }
          setIsUrdu(false);
        }
      } else {
        // Get current page content and translate it
        const contentElement = document.querySelector('.theme-doc-markdown, .markdown');
        if (contentElement) {
          const content = contentElement.innerHTML;
          // Save original content for switching back
          setOriginalContent(content);

          // Send to translation API
          const translatedContent = await onTranslate(content);

          // Update the page content with translated version
          contentElement.innerHTML = translatedContent;
          setIsUrdu(true);
        }
      }
    } catch (error) {
      console.error('Translation failed:', error);
      alert('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <button
      className={`${styles.translateButton} ${isTranslating ? styles.translating : ''} ${isUrdu ? styles.urduMode : ''}`}
      onClick={handleTranslate}
      disabled={isTranslating}
      title={isUrdu ? 'Switch back to English' : 'Translate to Urdu'}
    >
      {isTranslating ? (
        <span className={styles.spinner}>Translating...</span>
      ) : (
        <span>{isUrdu ? '🌐 English' : '🇵🇰 Urdu'}</span>
      )}
    </button>
  );
};

export default TranslationButton;