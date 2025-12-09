// book_source/src/services/translationService.ts
const API_BASE_URL = 'http://localhost:5000/api/translate';

export const translateToUrdu = async (content: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/translate-to-urdu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.translatedContent;
  } catch (error) {
    console.error('Translation request failed:', error);
    // In case of error, return original content to avoid breaking the page
    return content;
  }
};