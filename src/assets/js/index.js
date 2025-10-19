import "../styles/reset.scss";
import "../styles/styles.scss";
import "../styles/header.scss";
import "../styles/footer.scss";
import "../styles/select.scss";
import "../styles/modals.scss";
import "../styles/filter.scss";
import LazyLoad from "vanilla-lazyload";
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { Pagination, Navigation, Autoplay, Thumbs } from 'swiper/modules';
import { SlidersInit } from "./sliders";
import { InitModals } from "./modals";
import { InitSelect } from "./select";
import { InitSideMenu } from "./side-menu";
import { InitFilter } from "./filter";
import IMask from 'imask';

Swiper.use([Pagination, Navigation, Autoplay, Thumbs]);

// Функция для инициализации мобильного поиска
function initMobileSearch() {
    // Ищем элементы только в мобильном контейнере
    const mobileContainer = document.querySelector('.container.mobile');
    if (!mobileContainer) return;

    const searchToggle = mobileContainer.querySelector('.search__toggle');
    const searchForm = mobileContainer.querySelector('.search__form');
    const searchClose = mobileContainer.querySelector('.search__close');
    const searchInput = mobileContainer.querySelector('.search__input');

    // Если элементы не найдены в мобильном контейнере, выходим
    if (!searchToggle || !searchForm || !searchClose || !searchInput) {
        console.log('Mobile search elements not found');
        return;
    }

    console.log('Mobile search initialized'); // Для отладки

    // Открытие поиска
    searchToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        searchForm.classList.add('active');
        setTimeout(() => searchInput.focus(), 300);
    });

    // Закрытие поиска
    searchClose.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        searchForm.classList.remove('active');
        searchInput.blur();
    });

    // Закрытие при клике вне поиска
    document.addEventListener('click', function(e) {
        if (searchForm.classList.contains('active') &&
            !searchForm.contains(e.target) &&
            !searchToggle.contains(e.target)) {
            searchForm.classList.remove('active');
            searchInput.blur();
        }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchForm.classList.contains('active')) {
            searchForm.classList.remove('active');
            searchInput.blur();
        }
    });

    // Предотвращаем закрытие при клике внутри формы
    searchForm.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Закрытие поиска при отправке формы
    searchForm.addEventListener('submit', function(e) {
        if (window.innerWidth <= 1300) {
            setTimeout(() => {
                searchForm.classList.remove('active');
            }, 1000);
        }
    });

    // Дополнительно: закрытие при изменении ориентации или resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1300 && searchForm.classList.contains('active')) {
            searchForm.classList.remove('active');
            searchInput.blur();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    InitSelect();
    SlidersInit();
    InitModals();
    InitSideMenu();
    InitFilter();


    setTimeout(() => {
        initMobileSearch();
    }, 100);

    const lazyLoadInstance = new LazyLoad();

    // Маска для телефона
    const phoneInputs = document.querySelectorAll(`
        input[type="tel"][name="tel"],
        input[type="tel"][data-phone-input]
    `);

    phoneInputs.forEach(input => {
        let mask = null;

        input.addEventListener('focus', () => {
            if (!mask) {
                input.classList.add('phone-mask-active');
                mask = IMask(input, {
                    mask: '+{7} (000) 000-00-00',
                    lazy: false
                });

                if (!input.value) {
                    input.value = '+7 (';
                }
            }
        });

        input.addEventListener('blur', () => {
            if (mask) {
                const phoneNumber = input.value.replace(/\D/g, '');
                if (phoneNumber.length < 11 || phoneNumber === '7') {
                    input.value = '';
                }
                input.classList.remove('phone-mask-active');
                mask.destroy();
                mask = null;
            }
        });

        input.addEventListener('input', (e) => {
            if (mask && input.value === '+7 (' && e.inputType === 'deleteContentBackward') {
                input.value = '';
                input.classList.remove('phone-mask-active');
                mask.destroy();
                mask = null;
            }
        });
    });

    const submitButton = document.querySelector('.submit-btn');
    const checkbox = document.querySelector('input[name="checkbox"]');

    if (checkbox) {
        checkbox.checked = true;
    }

    submitButton?.addEventListener('click', function() {
        if (checkbox && !checkbox.checked) {
            checkbox.checked = true;
        }
    });
});