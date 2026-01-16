/**
 * Hero Slider Module
 * Управляет функциональностью слайдера героя с автоплеем, индикаторами и свайпом
 */

export class HeroSlider {
    constructor() {
        this.init();
    }

    init() {
        // Находим все слайдеры на странице
        document.querySelectorAll('.hero-slider').forEach((slider) => {
            this.setupSlider(slider);
        });
    }

    setupSlider(slider) {
        const container = slider.closest('.hero__visual');
        const slides = slider.querySelectorAll('.hero-slider__slide');
        const indicators = container.querySelectorAll('.hero__indicator');

        let currentIndex = 0;
        const autoplayDelay = parseInt(slider.dataset.autoplay) || 2000;
        let interval;
        let isTransitioning = false;

        // Обновление состояния слайдера
        const updateSlider = (index) => {
            if (isTransitioning) return; // Предотвращаем одновременные переходы
            isTransitioning = true;

            slides.forEach((slide, i) => {
                slide.classList.toggle('is-active', i === index);
            });
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('is-active', i === index);
            });

            // Снимаем блокировку после завершения transition
            setTimeout(() => {
                isTransitioning = false;
            }, 600); // 600ms - время transition в CSS
        };

        // Переход к следующему слайду
        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider(currentIndex);
        };

        // Управление автоплеем
        const pauseSlider = () => {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        };
        const resumeSlider = () => {
            pauseSlider(); // Сначала останавливаем существующий
            interval = setInterval(nextSlide, autoplayDelay);
        };

        // Инициализация
        updateSlider(0);
        interval = setInterval(nextSlide, autoplayDelay);

        // Обработчики событий для мыши
        slider.addEventListener('mouseenter', pauseSlider);
        slider.addEventListener('mouseleave', resumeSlider);

        // Обработчики для индикаторов
        indicators.forEach((indicator, i) => {
            indicator.addEventListener('click', () => {
                if (isTransitioning) return; // Не кликать во время перехода

                pauseSlider(); // Останавливаем автоплей при ручном переключении
                currentIndex = i;
                updateSlider(currentIndex);

                // Возобновляем автоплей через небольшую задержку
                setTimeout(() => {
                    resumeSlider();
                }, 1000);
            });
        });

        // Touch события для свайпа - передаем ссылки на функции
        this.setupTouchEvents(slider, () => currentIndex, (newIndex) => {
            currentIndex = newIndex;
            updateSlider(currentIndex);
        }, pauseSlider, resumeSlider, slides, () => isTransitioning);
    }

    setupTouchEvents(slider, getCurrentIndex, setCurrentIndex, pauseSlider, resumeSlider, slides, getIsTransitioning) {
        let startX = 0;
        let isDragging = false;

        slider.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            // При начале касания останавливаем автоплей
            pauseSlider();
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            if (!isDragging) return;

            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50 && !getIsTransitioning()) {
                const currentIndex = getCurrentIndex();
                let newIndex;

                if (diff > 0) {
                    // Свайп влево - следующий слайд
                    newIndex = (currentIndex + 1) % slides.length;
                } else {
                    // Свайп вправо - предыдущий слайд
                    newIndex = (currentIndex - 1 + slides.length) % slides.length;
                }

                pauseSlider(); // Останавливаем автоплей при свайпе
                setCurrentIndex(newIndex);

                // Возобновляем автоплей через задержку
                setTimeout(() => {
                    resumeSlider();
                }, 1500);
            }

            isDragging = false;
        });
    }
}