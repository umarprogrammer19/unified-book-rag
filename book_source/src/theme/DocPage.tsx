import DocTranslationWrapper from '@site/src/components/DocTranslationWrapper';
import DocPage from '@theme-original/DocPage';

export default function DocPageWrapper(props) {
  const { content } = props;
  const { metadata } = content;

  // Only add translation functionality to doc pages, not blog or other pages
  if (metadata.type === 'doc') {
    return (
      <DocTranslationWrapper>
        <DocPage {...props} />
      </DocTranslationWrapper>
    );
  }

  // For non-doc pages, render normally
  return <DocPage {...props} />;
}