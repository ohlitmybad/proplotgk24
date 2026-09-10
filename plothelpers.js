function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    setupKeyboardNavigation();
    if (typeof initPlotApp === 'function') initPlotApp();
    applyLanguage(getPreferredLanguage());
});

function getPlayerUniqueId(d) {
    return d[0] + '\0' + d[1] + '\0' + d[3];
}

function getPlayerNameFromId(uniqueId) {
    return uniqueId.split('\0')[0];
}

function takeScreenshot() {
    const chartContainer = document.querySelector('.chart-container');
    const isDarkMode = document.body.classList.contains('dark-mode');
    html2canvas(chartContainer, {
        scale: 2,
        backgroundColor: isDarkMode ? '#2c2c2c' : '#FFFFFF',
        allowTaint: true,
        useCORS: true,
        logging: false
    }).then(function (renderedCanvas) {
        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = renderedCanvas.width;
        finalCanvas.height = renderedCanvas.height;
        const finalCtx = finalCanvas.getContext('2d');
        finalCtx.drawImage(renderedCanvas, 0, 0);
        const watermarkImg = new Image();
        watermarkImg.crossOrigin = 'Anonymous';
        watermarkImg.onload = function () {
            const watermarkWidth = finalCanvas.width * 0.3;
            const watermarkHeight = (watermarkWidth / watermarkImg.width) * watermarkImg.height;
            const x = (finalCanvas.width - watermarkWidth) / 2;
            const y = (finalCanvas.height - watermarkHeight) / 2;
            finalCtx.save();
            finalCtx.globalAlpha = 0.04;
            finalCtx.drawImage(watermarkImg, x, y, watermarkWidth, watermarkHeight);
            finalCtx.restore();
            const link = document.createElement('a');
            link.download = 'DataMB Screenshot.png';
            link.href = finalCanvas.toDataURL('image/png', 1.0);
            link.click();
        };
        watermarkImg.src = 'https://datamb.football/logo.png';
    }).catch(function () {});
}

function getPreferredLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam) return langParam;
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang) return storedLang;
    return (navigator.language || 'en').slice(0, 2);
}

function getTranslatedText(key, fallbackText) {
    if (!window.currentTranslations) return fallbackText;
    const keys = key.split('.');
    let value = window.currentTranslations;
    for (let i = 0; i < keys.length; i++) {
        if (value === undefined || value === null) break;
        value = value[keys[i]];
    }
    return value || fallbackText;
}

function metricDisplayText(metric) {
    if (!metric) return '';
    let text = isToggled ? metric.text.replace(' per 90', '') : metric.text;
    if (metric.text.startsWith('CATEGORY: ')) text = text.replace('CATEGORY: ', '');
    if (typeof getTranslatedText === 'function' && metric.i18n && window.currentTranslations) {
        const translated = getTranslatedText(metric.i18n, '');
        if (translated) {
            text = translated;
            if (!isToggled && metric.text.includes(' per 90')) {
                const per90 = getTranslatedText('common.per90', ' per 90');
                if (!text.includes(per90.trim())) text += per90;
            }
        }
    }
    return text;
}

function refreshTranslatedTriggers() {
    if (typeof updateMetricTrigger === 'function') {
        updateMetricTrigger('x');
        updateMetricTrigger('y');
        updateMetricTrigger('size');
    }
    if (typeof updateLeagueTrigger === 'function') updateLeagueTrigger();
    if (typeof updatePositionTrigger === 'function') updatePositionTrigger();
    if (typeof updateTemplateTrigger === 'function') updateTemplateTrigger();
    if (typeof updateThresholdTrigger === 'function') updateThresholdTrigger();
    if (typeof updateAgeTrigger === 'function') updateAgeTrigger();
    if (typeof rebuildMetricLists === 'function') rebuildMetricLists();
}

function applyLanguage(language) {
    if (language === 'en') {
        window.currentTranslations = null;
        document.querySelectorAll('[data-i18n]').forEach(function (element) {
            const metric = typeof customMetricOrder !== 'undefined'
                ? customMetricOrder.find(function (item) { return item.i18n === element.getAttribute('data-i18n'); })
                : null;
            if (metric) {
                let text = isToggled ? metric.text.replace(' per 90', '') : metric.text;
                if (metric.text.startsWith('CATEGORY: ')) text = text.replace('CATEGORY: ', '');
                if (element.tagName === 'INPUT') element.setAttribute('placeholder', text);
                else element.textContent = text;
            }
        });
        refreshTranslatedTriggers();
        if (typeof updateChart === 'function') updateChart();
        return;
    }

    fetch('locales/' + language + '.json')
        .then(function (response) { return response.ok ? response.json() : null; })
        .then(function (translations) {
            if (!translations) return;
            window.currentTranslations = translations;
            document.querySelectorAll('[data-i18n]').forEach(function (element) {
                const keys = element.getAttribute('data-i18n').split('.');
                let value = translations;
                for (let i = 0; i < keys.length; i++) {
                    if (value === undefined || value === null) break;
                    value = value[keys[i]];
                }
                if (!value) return;
                if (element.tagName === 'INPUT') {
                    element.setAttribute('placeholder', value);
                    return;
                }
                const metric = customMetricOrder.find(function (item) { return item.i18n === element.getAttribute('data-i18n'); });
                if (metric && !isToggled && metric.text.includes(' per 90')) {
                    const per90 = translations.common && translations.common.per90 ? translations.common.per90 : ' per 90';
                    element.textContent = value + (value.includes(per90.trim()) ? '' : per90);
                } else {
                    element.textContent = value;
                }
            });
            refreshTranslatedTriggers();
            if (typeof updateChart === 'function') updateChart();
        })
        .catch(function () {});
}

document.addEventListener('click', function (e) {
    const triggers = document.querySelectorAll('.custom-select-trigger, .menu-trigger');
    let clickedInside = false;
    triggers.forEach(function (trigger) {
        const options = trigger.nextElementSibling && trigger.nextElementSibling.classList.contains('custom-select-options')
            ? trigger.nextElementSibling
            : (trigger.parentElement ? trigger.parentElement.querySelector('.custom-select-options') : null);
        if (trigger && options && (trigger.contains(e.target) || options.contains(e.target))) {
            clickedInside = true;
        }
    });
    if (!clickedInside) {
        document.querySelectorAll('.custom-select-trigger.open, .menu-trigger.open').forEach(function (trigger) {
            trigger.classList.remove('open');
            const options = trigger.nextElementSibling && trigger.nextElementSibling.classList.contains('custom-select-options')
                ? trigger.nextElementSibling
                : (trigger.parentElement ? trigger.parentElement.querySelector('.custom-select-options') : null);
            if (options) options.style.display = 'none';
        });
    }
});


function getOpenDropdownOptions(trigger) {
    if (!trigger) return null;
    if (typeof getDropdownOptions === 'function') return getDropdownOptions(trigger);
    const next = trigger.nextElementSibling;
    if (next && next.classList.contains('custom-select-options')) return next;
    const parent = trigger.parentElement;
    return parent ? parent.querySelector('.custom-select-options') : null;
}

function setupKeyboardNavigation() {
    document.addEventListener('keydown', function (e) {
        const openTrigger = document.querySelector('.custom-select-trigger.open, .menu-trigger.open');
        if (!openTrigger) return;
        const options = getOpenDropdownOptions(openTrigger);
        if (!options) return;

        const target = e.target;
        const isField = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');
        const fieldInDropdown = isField && options.contains(target);

        if (isField && !fieldInDropdown) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            openTrigger.classList.remove('open');
            options.style.display = 'none';
            return;
        }

        if (fieldInDropdown && e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Enter') {
            return;
        }

        const visible = Array.from(options.querySelectorAll('.custom-select-option:not([hidden]):not(.metric-category-header)'));
        if (!visible.length) return;
        const currentIndex = visible.findIndex(opt => opt.classList.contains('selected'));

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            let next = currentIndex;
            if (e.key === 'ArrowDown') next = currentIndex < visible.length - 1 ? currentIndex + 1 : 0;
            else next = currentIndex > 0 ? currentIndex - 1 : visible.length - 1;
            visible.forEach(opt => opt.classList.remove('selected'));
            visible[next].classList.add('selected');
            visible[next].scrollIntoView({ block: 'nearest' });
            return;
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            const selected = options.querySelector('.custom-select-option.selected:not([hidden])') || visible[0];
            if (selected) selected.click();
            return;
        }

        if (e.key.length === 1 && /[a-zA-Z0-9%\s\-\+\(\)]/.test(e.key)) {
            const letter = e.key.toLowerCase();
            const start = currentIndex + 1;
            const match = visible.slice(start).concat(visible.slice(0, start)).find(opt => {
                const text = (opt.textContent || '').trim().toLowerCase();
                return text.charAt(0) === letter;
            });
            if (match) {
                visible.forEach(opt => opt.classList.remove('selected'));
                match.classList.add('selected');
                match.scrollIntoView({ block: 'nearest' });
            }
        }
    });
}
