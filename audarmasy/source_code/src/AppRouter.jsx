import React from 'react';
import { withStore} from 'react-context-hook'
import { useStore } from 'react-context-hook'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import App from './App';
import Logo from './assets/logo.png';
import AddDataPage from './AddDataPage';

import { localize } from './languages';
const initialState = { lang: 'ru' }
function Navigation() {

  const [lang, setLang] = useStore('lang');
  return (
    <>
      <span className="pre-header">
        <Link to="/"><img src={Logo} alt="Audarmasy" /></Link>
        <span className="page-language-selector">
          <a href="#" onClick={() => setLang('kz')}>Қаз</a>/<a href="#" onClick={() => setLang('ru')}>Рус</a>
        </span>
        <span className="empty-space">&nbsp;</span>
      </span>
      <nav>
        <ul>
          <li>
            <Link to="/">{localize(lang, "termins")}</Link>
          </li>
          <li>
            <Link to="/">{localize(lang, "community")}</Link>
          </li>
          <li>
            <Link to="/">{localize(lang, "faq")}</Link>
          </li>
          <li>
            <Link to="/add">{localize(lang, "new_word")}</Link>
          </li>
          <li>
            <Link to="/">{localize(lang, "settings")}</Link>
          </li>
          <li>
            <Link to="/">{localize(lang, "support")}</Link>
          </li>
        </ul>
      </nav>
    </>

  );
}

function Main() {
  return (
    <Routes>
      <Route path="/" exact element={<App />} />
      <Route path="/add" element={<AddDataPage />} />
    </Routes>
  );
}

function AppRouter() {
  return (
    <Router>
      <div>
        <Navigation />
        <Main />
      </div>
    </Router>
  );
}

export default withStore(AppRouter, initialState);