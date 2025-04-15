document.addEventListener('DOMContentLoaded', function() {
    const languageModal = document.getElementById('languageModal');
    const languageOptions = document.querySelectorAll('.language-option');
    const langButtons = document.querySelectorAll('.lang-btn');
    const elements = document.querySelectorAll('[data-ru], [data-en], [data-tt]');
    
    // Проверяем, был ли уже выбран язык
    const selectedLang = localStorage.getItem('selectedLanguage');
    if (selectedLang) {
        languageModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        updateLanguage(selectedLang);
    } else {
        document.body.style.overflow = 'hidden';
    }

    // Обработчики для модального окна
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.dataset.lang;
            localStorage.setItem('selectedLanguage', lang);
            languageModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            updateLanguage(lang);
        });
    });

    // Обработчики для кнопок переключения языка
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.dataset.lang;
            localStorage.setItem('selectedLanguage', lang);
            updateLanguage(lang);
        });
    });

    function updateLanguage(lang) {
        // Обновляем активные кнопки
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Обновляем активные опции в модальном окне
        languageOptions.forEach(opt => {
            opt.classList.toggle('active', opt.dataset.lang === lang);
        });

        // Обновляем контент
        elements.forEach(element => {
            if (element.dataset[lang]) {
                if (element.tagName === 'INPUT') {
                    element.value = element.dataset[lang];
                } else {
                    element.textContent = element.dataset[lang];
                }
            }
        });

        // Обновляем атрибуты lang для доступности
        document.documentElement.lang = lang;
    }
}); 