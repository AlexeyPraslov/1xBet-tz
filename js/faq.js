/**
 * Facts Carousel Module
 * Управляет плавной анимацией карусели фактов
 */

export class FactsCarousel {
    constructor() {
        this.init();
    }

    init() {
        // Находим все карусели фактов на странице
        document.querySelectorAll('.facts__carousel-track').forEach(track => {
            this.setupCarousel(track);
        });
    }

    setupCarousel(track) {
        const container = track.closest('.facts__carousel-container');
        let position = 0;
        let lastTime = 0;
        const speed = 0.5; // пикселей в кадр

        const animate = (currentTime) => {
            if (currentTime - lastTime >= 16) { // ~60fps
                position -= speed;
                const trackWidth = track.scrollWidth / 2; // половина ширины (для дублированных элементов)

                // Когда позиция ушла за пределы половины ширины, сбрасываем
                if (Math.abs(position) >= trackWidth) {
                    position = 0;
                }

                track.style.transform = `translateX(${position}px)`;
                lastTime = currentTime;
            }

            requestAnimationFrame(animate);
        };

        // Останавливаем анимацию при наведении
        container.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });

        container.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });

        // Запускаем анимацию
        requestAnimationFrame(animate);
    }
}

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