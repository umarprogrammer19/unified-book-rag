// Mock translation service for Urdu translation
export const translateToUrdu = async (text) => {
  // In a real implementation, this would call an LLM API
  // For now, we'll return a mock translation with some Urdu characters
  // This is just for demonstration purposes

  console.log('Translating to Urdu:', text.substring(0, 50) + '...');

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock translation - in a real app, this would connect to an actual translation API
  // For demonstration, we'll return the original text with some "Urdu-like" placeholder text
  const mockTranslations = {
    "Hello": "ہیلو",
    "Welcome": "خوش آمدید",
    "Documentation": "دستاویزات",
    "Introduction": "تعارف",
    "Chapter": "باب",
    "Section": "حصہ",
    "Content": "مواد",
    "Text": "متن",
    "Translation": "ترجمہ",
    "Page": "صفحہ",
    "Book": "کتاب",
    "AI": "مصنوعی ذہانت",
    "Robotics": "روبوٹکس"
  };

  // Simple word replacement for demo purposes
  let translated = text;
  for (const [english, urdu] of Object.entries(mockTranslations)) {
    const regex = new RegExp(english, 'gi');
    translated = translated.replace(regex, urdu);
  }

  // If the text is mostly unchanged, add a note that it's a mock translation
  if (translated === text) {
    translated = ` mock_urdu_start ${text} mock_urdu_end `;
  }

  return translated;
};