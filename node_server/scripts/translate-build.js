import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Define the system instruction for the translation
const systemInstruction = "You are a technical translator. Convert the following text to Urdu. Preserve ALL Markdown formatting exactly. Do NOT translate code blocks, variable names, or technical path parameters. Output ONLY the translated string.";

// API rate limiting: 5 requests per minute (12 seconds delay between requests to stay under limit)
const RATE_LIMIT_DELAY = 12000; // 12 seconds delay to respect 5 RPM limit (60 sec / 5 req = 12 sec)

async function translateToUrdu(text) {
  const maxRetries = 3;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const prompt = `${systemInstruction}\n\nTranslate the following text to Urdu:\n\n${text}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const translatedText = response.text();
      return translatedText;
    } catch (error) {
      console.error(`Translation attempt ${attempts + 1} failed:`, error.message);

      if (error.status === 429) { // Rate limit error
        // Extract retry delay from error if available, otherwise use exponential backoff
        const retryAfter = error.errorDetails?.find(detail => detail['@type'] === 'type.googleapis.com/google.rpc.RetryInfo')?.retryDelay || '4s';
        const delaySeconds = parseInt(retryAfter.replace('s', '')) || 4;
        const delayMs = delaySeconds * 1000;

        console.log(`Rate limited. Waiting ${delayMs}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
        attempts++;
      } else {
        // For other errors, don't retry
        throw new Error(`Translation failed: ${error.message}`);
      }
    }
  }

  throw new Error(`Translation failed after ${maxRetries} attempts`);
}

async function translateAllMarkdownFiles() {
  console.log("Starting translation of all Markdown files...");
  console.log("Rate limiting: 5 requests per minute (12 second delay between requests)");

  const docsDir = path.join(process.cwd(), '..', 'book_source', 'docs');
  const outputDir = path.join(process.cwd(), '..', 'book_source', 'src', 'data');

  try {
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Read all files in the docs directory recursively
    const files = await getAllMarkdownFiles(docsDir);

    console.log(`Found ${files.length} Markdown files to translate`);

    const translations = {};

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`Translating (${i+1}/${files.length}): ${file}`);

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

      // Implement rate limiting - delay between requests to respect 10 RPM limit
      if (i < files.length - 1) { // Don't delay after the last request
        console.log(`Waiting ${RATE_LIMIT_DELAY/1000} seconds to respect API rate limits...`);
        await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY));
      }
    }

    // Write all translations to a JSON file
    const outputPath = path.join(outputDir, 'urduTranslations.json');
    await fs.writeFile(outputPath, JSON.stringify(translations, null, 2));

    // Also copy the file to the Docusaurus static directory so it's accessible at /urduTranslations.json
    const staticPath = path.join(process.cwd(), '..', 'book_source', 'static', 'urduTranslations.json');
    await fs.writeFile(staticPath, JSON.stringify(translations, null, 2));

    console.log(`\nTranslation completed! ${Object.keys(translations).length} files translated.`);
    console.log(`Translations saved to: ${outputPath}`);
    console.log(`Translations also copied to: ${staticPath}`);
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