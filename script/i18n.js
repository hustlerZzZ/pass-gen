// i18n.js
(function () {
    const translations = {
        en: null, // English translations will be loaded dynamically
        es: null, // Spanish translations will be loaded dynamically
    };

    function setLanguage(lang) {
        const elements = document.querySelectorAll("[data-translate]");
        for (const el of elements) {
            const key = el.dataset.translate;
            el.textContent = translations[lang][key];
        }
    }

    function loadLanguage(lang) {
        fetch(`translations/${lang}.json`)
            .then((response) => response.json())
            .then((data) => {
                translations[lang] = data;
                setLanguage(lang);
            })
            .catch((error) => console.error(error));
    }

    // Detect user's selected language (e.g., from user preferences or browser settings)
    const userLanguage = navigator.language.slice(0, 2); // For this example, default to English (change this based on your logic)

    // Load translations for the selected language
    loadLanguage(userLanguage);
})();
