import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Define the system instruction for the translation
const systemInstruction = "You are a technical translator. Convert the following text to Urdu. Preserve ALL Markdown formatting exactly. Do NOT translate code blocks, variable names, or technical path parameters. Output ONLY the translated string.";

async function translateToUrdu(text) {
  try {
    const prompt = `${systemInstruction}\n\nTranslate the following text to Urdu:\n\n${text}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const translatedText = response.text();
    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error(`Translation failed: ${error.message}`);
  }
}

async function translateAllMarkdownFiles() {
  console.log("Starting translation of all Markdown files...");

  const docsDir = path.join(process.cwd(), 'book_source', 'docs');
  const outputDir = path.join(process.cwd(), 'book_source', 'src', 'data');

  try {
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Read all files in the docs directory recursively
    const files = await getAllMarkdownFiles(docsDir);

    console.log(`Found ${files.length} Markdown files to translate`);

    const translations = {};

    for (const file of files) {
      console.log(`Translating: ${file}`);

      try {
        const content = await fs.readFile(file, 'utf8');
        const translatedContent = await translateToUrdu(content);

        // Create a relative path key for the translation
        const relativePath = path.relative(docsDir, file).replace(/\\/g, '/');
        translations[relativePath] = {
          original: content,
          translated: translatedContent,
          lastModified: new Date().toISOString()
        };

        console.log(`✓ Translated: ${relativePath}`);
      } catch (error) {
        console.error(`✗ Failed to translate: ${file}`, error.message);
      }
    }

    // Write all translations to a JSON file
    const outputPath = path.join(outputDir, 'urduTranslations.json');
    await fs.writeFile(outputPath, JSON.stringify(translations, null, 2));

    console.log(`\nTranslation completed! ${Object.keys(translations).length} files translated.`);
    console.log(`Translations saved to: ${outputPath}`);
  } catch (error) {
    console.error('Error during translation process:', error);
    throw error;
  }
}

async function getAllMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files = files.concat(await getAllMarkdownFiles(fullPath));
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.md') {
      files.push(fullPath);
    }
  }

  return files;
}

// Run the translation process
if (process.env.GEMINI_API_KEY) {
  translateAllMarkdownFiles().catch(console.error);
} else {
  console.error("GEMINI_API_KEY environment variable is not set. Please set it before running this script.");
}