import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export const translateToUrdu = async (text) => {
  console.log('Translating to Urdu:', text.substring(0, 50) + '...');

  try {
    // Define the system instruction for the translation
    const systemInstruction = "You are a technical translator. Convert the following text to Urdu. Preserve ALL Markdown formatting exactly. Do NOT translate code blocks, variable names, or technical path parameters. Output ONLY the translated string.";

    // Create the full prompt with the system instruction
    const prompt = `${systemInstruction}\n\nTranslate the following text to Urdu:\n\n${text}`;

    // Generate content using the Gemini API
    const result = await model.generateContent(prompt);
    const response = result.response;
    const translatedText = response.text();

    console.log('Translation completed successfully');
    return translatedText;
  } catch (error) {
    console.error('Error during translation:', error);
    throw new Error(`Translation failed: ${error.message}`);
  }
};