import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sqlite3 from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

import fs from 'fs';
import parseJson, { JSONError } from 'parse-json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 4048;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3('db.sqlite');
db.loadExtension(
  path.resolve(__dirname, 'sqlean', 'unicode')
);
db.loadExtension(
  path.resolve(__dirname,'sqlean', 'fuzzy')
);


// Create a table if it doesn't exist
db.exec(`
CREATE TABLE IF NOT EXISTS translations (
  kz TEXT,
  ru TEXT
)
`);

db.exec(`
UPDATE translations
SET
  kz = LOWER(kz)
WHERE
  kz IS NOT NULL
`);

db.exec(`
UPDATE translations
SET
  ru = LOWER(ru)
WHERE
  ru IS NOT NULL
`);



// Middleware to serve static files from the Vite-based React frontend
const frontendDistPath = path.resolve(__dirname, '..','frontend');
app.use(express.static(frontendDistPath));

// Middleware to parse incoming JSON
app.use(bodyParser.json());

// API endpoint for finding translations in the database
app.post('/translate', (req, res) => {
  const { sourceLanguage, targetLanguage, text } = req.body;

  if (!sourceLanguage || !targetLanguage || !text) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const query = `
  SELECT ${sourceLanguage} as src, ${targetLanguage} as target
  FROM translations
  ORDER BY dlevenshtein(translit(src), translit(?))
  LIMIT 25;
`;


  // Lowercase and trim text
  const clearText = text.toLowerCase().trim();
  const rows = db.prepare(query).all([ clearText]);
  console.log(rows);
  if (rows.length > 0) {
    const [mostAccurate, ...additionalTranslations] = rows;
    const result = {
      translation: mostAccurate,
      additionals: additionalTranslations.map((row) => row),
    };

    return res.json(result);
  } else {
    return res.status(204).json({ error: 'Translation not found in the database' });
  }
});

// API endpoint for adding data to the database
app.post('/addTranslation', (req, res) => {
  const { sourceLanguage, targetLanguage, text, translation } = req.body;

  if (!sourceLanguage || !targetLanguage || !text || !translation) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Check if the translation already exists in the database
  const existsQuery = `
  SELECT EXISTS(
    SELECT 1
    FROM translations
    WHERE (${sourceLanguage} = ? AND ${targetLanguage} = ?)
  ) AS doesExist
`;
const existsRow = db.prepare(existsQuery).get([text, translation]);
  
// Use the new alias in the condition
if (existsRow.doesExist !== 0) {
  return res.status(400).json({ error: 'Translation already exists in the database' });

}

  // Add the new translation to the database
  const insertQuery = `
    INSERT INTO translations (ru, kz)
    VALUES (?, ?)
  `;

  db.prepare(insertQuery).run(sourceLanguage=="ru"?text:translation, targetLanguage=="ru"?translation:text);

  return res.json({ success: true, message: 'Translation added to the database' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});