import sqlite3 from 'better-sqlite3';



import fs from 'fs';
import parseJson, { JSONError } from 'parse-json';




const db = new sqlite3('db.sqlite');

//load extension from project root/sqlean

db.loadExtension(
    __dirname + '/sqlean'
);

// Create a table if it doesn't exist
db.run(`
CREATE TABLE IF NOT EXISTS translations (
  sourceLanguage TEXT,
  targetLanguage TEXT,
  text TEXT,
  translation TEXT
)
`);


db.run(`
UPDATE translations
SET
  text = LOWER(text)
WHERE
  text IS NOT NULL
`);

db.run(`
UPDATE translations
SET
  translation = LOWER(translation)
WHERE
  translation IS NOT NULL
`);

// //parse json from file ./pre-dic.json
fs.readFile('.\\DICT_NEW.JSON', 'utf8', (err, data) => {

  console.log("parsing json");
  if (err) {
    console.error("error here", err);
    return;
  }
  //file is array of arrays, where inlaid arrays contain two strings - first is ru and second is kz
  //iterate over objects, add data to database (if data doesnt exist)
  const jsonData = parseJson(data);
  console.log("parsed json");
  jsonData.forEach((obj) => {
    //ensure data is new 
    let query = `SELECT EXISTS(SELECT 1 FROM translations WHERE text = ? OR translation = ?)`;

    db.get(query, [obj[0], obj[1]], (err, row) => {
      if (err) {
        console.error(err);
        return;
      }
      if (row[`EXISTS(SELECT 1 FROM translations WHERE text = ? OR translation = ?)`] == 0) {
        db.run(`
          INSERT INTO translations (sourceLanguage, targetLanguage, text, translation)
          VALUES (?, ?, ?, ?)
        `, ["ru", "kz", obj[0], obj[1]])
      }
    })
  })


})



// //parse json 
// fs.readFile('.\\dict_full.json', 'utf8', (err, data) => {

//   if (err) {
//     console.error("error here", err);
//     return;
//   }
//   //file is array of arrays, where inlaid arrays contain two strings - first is ru and second is kz
//   //iterate over objects, add data to database (if data doesnt exist)
//   const jsonData = parseJson(data);
//   let skipped = jsonData.length;
//   jsonData.forEach((obj) => {
//     const existsQuery = `
//     SELECT EXISTS(
//       SELECT 1
//       FROM translations
//       WHERE ru = ? AND kz = ?
//     ) AS doesExist
//   `;
  
//   const insertQuery = `
//     INSERT INTO translations (ru, kz)
//     VALUES (?, ?)
//   `;
  
//   // Assuming `obj` is an array with two elements [text, translation]
//   db.transaction(() => {
//     const existsRow = db.prepare(existsQuery).get([obj[0], obj[1]]);
  
//     // Use the new alias in the condition
//     if (existsRow.doesExist === 0) {
//       skipped--;
//       db.prepare(insertQuery).run([obj[0], obj[1]]);
//     }
//   })();
//   })
// })