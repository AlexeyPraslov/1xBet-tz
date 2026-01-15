/**
 * Main Application Module
 * Точка входа приложения - импортирует и инициализирует все модули
 */

import { HeroSlider } from './hero-slider.js';
import { FAQ } from './faq.js';

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем слайдер героя
    const heroSlider = new HeroSlider();

    // Инициализируем FAQ
    const faq = new FAQ();

    console.log('🎰 Casino application initialized successfully!');
});