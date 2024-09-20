import React, { useState } from 'react';
import { useStore } from 'react-context-hook'
import { localize } from './languages';
import './App.css';

function App() {
  const [lang, setLang] = useStore('lang');

  const [sourceLanguage, setSourceLanguage] = useState('kz');
  const [targetLanguage, setTargetLanguage] = useState('ru');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState({ translation: '', additionals: [] });

  const API_url = "http://localhost:4048";
  const setLanguage = (lang) => {
    if (lang === 'kz') {
      setSourceLanguage('kz');
      setTargetLanguage('ru');
    } else if (lang === 'ru') {
      setSourceLanguage('ru');
      setTargetLanguage('kz');
    }
  }

  const handleTextChange = (event) => {
    setSourceText(event.target.value);
  };

  const handleTranslate = () => {
    fetch(`${API_url}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: sourceText,
        sourceLanguage: sourceLanguage,
        targetLanguage: targetLanguage,
      }),
    })
      .then((response) => {
        if (response.status === 204) {
          console.log('Translation not found in the database');
          setTranslatedText({ translation: 'Перевод не найден', additionals: [] });
        } else if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((data) => {
        if (data) {
          setTranslatedText(data);
          let temp = data.translation;
          if (data.translation.src !== sourceText.trim().toLowerCase()) {
            data.translation.target = `Перевод не найден. Возможно вы имели ввиду ${temp.src}? Перевод: ${temp.target}`;
          }
        }
      })
      .catch((error) => {
        console.error('Error during translation request:', error);
      });
  };

  const handleSwapLanguage = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  return (
    <div id="app-container">
      <div id="sectors">
        <h4>
          {localize(lang, "sectors")}
        </h4>
        <a href="">{localize(lang, "legislation")}</a>
        <a href="">{localize(lang, "record_keeping")}</a>
        <a href="">{localize(lang, "economics")}</a>
        <a href="">{localize(lang, "culture_art")}</a>
        <a href="">{localize(lang, "medical")}</a>
        <a href="">{localize(lang, "ecology")}</a>
        <a href="">{localize(lang, "light_industrial")}</a>
        <a href="">{localize(lang, "heavy_industrial")}</a>
        <a href="">{localize(lang, "philosophy_politology")}</a>

      </div>
      <div id="translator-container">
        <span>
          <span>
            <a className="lang-button" href="#ru-kz" id="ru-kz" onClick={() => setLanguage('ru')} data-active={sourceLanguage !== 'ru'}>{localize(lang, "ru_kz")}</a>
            <a className="lang-button" href="#kz-ru" id="kz-ru" onClick={() => setLanguage('kz')} data-active={sourceLanguage !== 'kz'}>{localize(lang, "kz_ru")}</a>
          </span>
          <a className="switch-button" href="#switch-button" id="switch-button" onClick={() => handleSwapLanguage()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5" />
          </svg></a>
          <span className="empty-space"></span>
        </span>
        <div className="text-fields">
          <textarea id="source-text" name="source-text" cols="30" rows="10" value={sourceText} onChange={handleTextChange}></textarea>
          <textarea id="target-text" name="target-text" cols="30" rows="10" readOnly value={translatedText.translation.target || ''}></textarea>
        </div>
        <a id="search-button" href="#" onClick={() => { handleTranslate() }}>
          {localize(lang, "translate")}
        </a>
      </div>
      <div id="similar-results">
        <h4>
          {localize(lang, "similar_words")}
        </h4>
        {translatedText.additionals.map((item, index) => (
          <span key={index}>
            <p>{item.src}</p>
            <p>{item.target}</p>
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
