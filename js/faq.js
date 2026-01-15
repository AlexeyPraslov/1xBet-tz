/**
 * FAQ Module
 * Управляет функциональностью аккордеона FAQ - открытие/закрытие вопросов
 */

export class FAQ {
    constructor() {
        this.init();
    }

    init() {
        // Находим все вопросы FAQ и добавляем обработчики
        document.querySelectorAll('.faq__question').forEach(question => {
            this.setupQuestion(question);
        });
    }

    setupQuestion(question) {
        question.addEventListener('click', () => {
            // Находим родительский элемент (faq__item) и переключаем класс is-open
            const faqItem = question.parentElement;
            faqItem.classList.toggle('is-open');
        });
    }
}