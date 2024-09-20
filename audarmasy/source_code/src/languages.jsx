export const Kazakh = {
    termins: "Шарттар",
    community: "Қауымдастық",
    faq: "Жиі қойылатын сұрақтар",
    new_word: "Сөз қосу",
    settings: "Баптаулар",
    support: "Қолдау",
    sectors: "Салаларының тізімі",
    legislation: "Заңнама",
    record_keeping: "Кеңсе жұмыстары",
    economics: "Экономика",
    culture_art: "Мәдениет пен өнер",
    medical: "Дәрі",
    ecology: "Экология",
    light_industrial: "Жеңіл өнеркәсіп",
    heavy_industrial: "Ауыр өнеркәсіп",
    philosophy_politology: "Философия және саяси ғылым",
    translate: "Аудару",
    similar_words: "Ұқсас сөздер",
    ru_kz: "орысша-қазақша",
    kz_ru: "қазақша-орысша",

}

export const Russian = {
    termins: "Термины",
    community: "Сообщество",
    faq: "Часто задаваемые вопросы",
    new_word: "Добавить слово",
    settings: "Настройки",
    support: "Поддержка",
    sectors: "Список отраслей",
    legislation: "Законодательство",
    record_keeping:"Делопроизводство",
    economics: "Экономика",
    culture_art: "Культура и Искусство",
    medical: "Медицина",
    ecology: "Экология",
    light_industrial: "Лёгкая промышленность",
    heavy_industrial: "Тяжелая промышленность",
    philosophy_politology: "Философия и политология",
    translate: "Перевести",
    similar_words: "Схожие слова",
    ru_kz: "Русско-Казахский",
    kz_ru: "Казахско-Русский",
}


const Default = Russian;

export const getTranslations = (langCode) => {
    if (langCode === 'kz') return Kazakh;
    if (langCode === 'ru') return Russian;
    // === add conditionals here for additional languages here === //
  };
  

export const localize = (langCode, phraseKey) => {
    const lang = getTranslations(langCode);
    return lang[phraseKey] ? lang[phraseKey] : Default[phraseKey];
};