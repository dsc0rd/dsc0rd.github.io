import React, { useState } from 'react';

function AddDataPage() {
  const [sourceLanguage, setSourceLanguage] = useState('kz');
  const [targetLanguage, setTargetLanguage] = useState('ru');
  const [sourceText, setSourceText] = useState('');
  const [translation, setTranslation] = useState('');
  const API_url = "http://localhost:4048";

  const handleLanguageChange = (event, targ) => {
    switch(targ){
        case "source":
            setSourceLanguage(event.target.value);
            setTargetLanguage(
                event.target.value === 'kz' ? 'ru' : 'kz'
            )
            break;
        case "target":
            setTargetLanguage(event.target.value);
            setSourceLanguage(
                event.target.value === 'kz' ? 'ru' : 'kz'
            )
            break;
        default:
            break;
    }
  };

  const handleTextChange = (event) => {
    setSourceText(event.target.value);
  };

  const handleTranslationChange = (event) => {
    setTranslation(event.target.value);
  };
  const handleAddTranslation = () => {

    fetch(`${API_url}/addTranslation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sourceLanguage: sourceLanguage,
        targetLanguage: targetLanguage,
        text: sourceText,
        translation: translation,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((data) => {
        console.log('Translation added successfully:', data);
        // Handle success, e.g., show a success message
      })
      .catch((error) => {
        console.error('Error during translation addition:', error);
        // Handle error, e.g., show an error message
      });
  };

  return (
    <div id="add-data-container">
      <h1>Add Translation Data</h1>
      <label htmlFor="language-selector">Source Language</label>
      <select name="language-selector" onChange={e=>handleLanguageChange(e, "source")} value={sourceLanguage}>
        <option value="kz">Казахский</option>
        <option value="ru">Русский</option>
        {/* Add more language options as needed */}
      </select>
      <label htmlFor="target-language-selector">Target Language</label>
      <select name="target-language-selector" onChange={(e)=>handleLanguageChange(e, 'target')} value={targetLanguage}>
        <option value="kz">Казахский</option>
        <option value="ru">Русский</option>
        {/* Add more language options as needed */}
      </select>
      <label htmlFor="source-text">Source Text</label>
      <input type="text" id="source-text" onChange={handleTextChange} value={sourceText} />
      <label htmlFor="translation">Translation</label>
      <input type="text" id="translation" onChange={handleTranslationChange} value={translation} />
      <button onClick={handleAddTranslation}>Add Translation</button>
    </div>
  );
}

export default AddDataPage;