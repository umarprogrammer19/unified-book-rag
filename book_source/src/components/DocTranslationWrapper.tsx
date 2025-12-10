import React from 'react';
import TranslationButton from '@site/src/components/TranslationButton';
import { translateToUrdu } from '@site/src/services/translationService';
import styles from './doc-translation-wrapper.module.css';

interface DocTranslationWrapperProps {
  children: React.ReactNode;
}

const DocTranslationWrapper: React.FC<DocTranslationWrapperProps> = ({ children }) => {
  return (
    <div className={styles.docWrapper}>
      <div className={styles.translationToolbar}>
        <TranslationButton onTranslate={translateToUrdu} />
      </div>
      <div className={styles.docContent}>
        {children}
      </div>
    </div>
  );
};

export default DocTranslationWrapper;