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

        // Обновление состояния слайдера
        const updateSlider = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('is-active', i === index);
            });
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('is-active', i === index);
            });
        };

        // Переход к следующему слайду
        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider(currentIndex);
        };

        // Управление автоплеем
        const pauseSlider = () => clearInterval(interval);
        const resumeSlider = () => {
            clearInterval(interval);
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
                currentIndex = i;
                updateSlider(currentIndex);
                resumeSlider();
            });
        });

        // Touch события для свайпа
        this.setupTouchEvents(slider, currentIndex, updateSlider, resumeSlider, slides);
    }

    setupTouchEvents(slider, currentIndex, updateSlider, resumeSlider, slides) {
        let startX = 0;
        let isDragging = false;

        slider.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            // При начале касания останавливаем автоплей
            clearInterval(window.heroSliderInterval);
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            if (!isDragging) return;

            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Свайп влево - следующий слайд
                    currentIndex = (currentIndex + 1) % slides.length;
                } else {
                    // Свайп вправо - предыдущий слайд
                    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                }
                updateSlider(currentIndex);
            }

            isDragging = false;
            resumeSlider();
        });
    }
}