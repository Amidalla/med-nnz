import "../styles/reset.scss";
import "../styles/styles.scss";
import "../styles/header.scss";
import "../styles/footer.scss";
import "../styles/select.scss";
import "../styles/modals.scss";
import "../styles/filter.scss";
import "../styles/header-animation.scss";
import "../styles/animations.scss";
import LazyLoad from "vanilla-lazyload";
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { Pagination, Navigation, Autoplay, Thumbs, EffectFade } from 'swiper/modules';
import { SlidersInit } from "./sliders";
import { InitModals } from "./modals";
import { InitSelect } from "./select";
import { InitSideMenu } from "./side-menu";
import { InitFilter } from "./filter";
import { InitTabs } from "./tabs";
import { InitVideo } from "./video";
import { InitAccordion } from "./accordion";
import { InitHeaderAnimation } from "./header-animation";
import { InitScrollAnimations } from "./scrollAnimations";
import IMask from 'imask';

Swiper.use([Pagination, Navigation, Autoplay, Thumbs, EffectFade]);


function initMobileSearch() {
    const mobileContainer = document.querySelector('.container.mobile');
    if (!mobileContainer) return;

    const searchToggle = mobileContainer.querySelector('.search__toggle');
    const searchForm = mobileContainer.querySelector('.search__form');
    const searchClose = mobileContainer.querySelector('.search__close');
    const searchInput = mobileContainer.querySelector('.search__input');

    if (!searchToggle || !searchForm || !searchClose || !searchInput) return;

    const toggleSearch = (isOpen) => {
        searchForm.classList.toggle('active', isOpen);
        if (isOpen) {
            setTimeout(() => searchInput.focus(), 300);
        } else {
            searchInput.blur();
        }
    };

    const handleDocumentClick = (e) => {
        if (searchForm.classList.contains('active') &&
            !searchForm.contains(e.target) &&
            !searchToggle.contains(e.target)) {
            toggleSearch(false);
        }
    };

    const handleEscape = (e) => {
        if (e.key === 'Escape' && searchForm.classList.contains('active')) {
            toggleSearch(false);
        }
    };

    const handleResize = () => {
        if (window.innerWidth > 1300 && searchForm.classList.contains('active')) {
            toggleSearch(false);
        }
    };


    searchToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleSearch(true);
    });

    searchClose.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleSearch(false);
    });

    searchForm.addEventListener('click', (e) => e.stopPropagation());

    searchForm.addEventListener('submit', () => {
        if (window.innerWidth <= 1300) {
            setTimeout(() => toggleSearch(false), 1000);
        }
    });

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);
}


function initSpecsDots() {
    function calculateDotsWidth() {
        const rows = document.querySelectorAll('.specs-row');

        rows.forEach(row => {
            const label = row.querySelector('.specs-label');
            const dots = row.querySelector('.specs-dots');
            const value = row.querySelector('.specs-value');

            if (!label || !dots || !value) return;

            try {
                const range = document.createRange();
                const textNode = label.firstChild;

                if (!textNode || !textNode.textContent) return;

                const textLength = textNode.textContent.length;
                if (textLength === 0) return;

                range.setStart(textNode, textLength - 1);
                range.setEnd(textNode, textLength);

                const lastCharRect = range.getBoundingClientRect();
                const valueRect = value.getBoundingClientRect();
                const rowRect = row.getBoundingClientRect();

                const startX = lastCharRect.right - rowRect.left;
                const endX = valueRect.left - rowRect.left;
                const dotsWidth = endX - startX - 8;

                if (dotsWidth > 0) {
                    dots.style.width = `${dotsWidth}px`;
                    dots.style.left = `${startX + 4}px`;
                } else {
                    dots.style.width = '0px';
                }
            } catch (error) {
                console.warn('Error calculating dots width:', error);
            }
        });
    }


    let resizeTimeout;
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(calculateDotsWidth, 100);
    };

    calculateDotsWidth();
    window.addEventListener('resize', handleResize);
}


function initPhoneMasks() {
    const phoneInputs = document.querySelectorAll(`
        input[type="tel"][name="tel"],
        input[type="tel"][data-phone-input]
    `);

    phoneInputs.forEach(input => {
        let mask = null;

        const initMask = () => {
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
        };

        const destroyMask = () => {
            if (mask) {
                const phoneNumber = input.value.replace(/\D/g, '');
                if (phoneNumber.length < 11 || phoneNumber === '7') {
                    input.value = '';
                }
                input.classList.remove('phone-mask-active');
                mask.destroy();
                mask = null;
            }
        };

        input.addEventListener('focus', initMask);
        input.addEventListener('blur', destroyMask);

        input.addEventListener('input', (e) => {
            if (mask && input.value === '+7 (' && e.inputType === 'deleteContentBackward') {
                destroyMask();
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', function() {
    InitSelect();
    SlidersInit();
    InitModals();
    InitSideMenu();
    InitFilter();
    InitTabs();
    InitVideo();
    InitAccordion();
    InitHeaderAnimation();
    InitScrollAnimations();

    setTimeout(() => {
        initMobileSearch();
        initSpecsDots();
    }, 100);


    const lazyLoadInstance = new LazyLoad();


    initPhoneMasks();


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

document.addEventListener('DOMContentLoaded', function() {
    const socialBlock = document.querySelector('.social');
    const footerElement = document.querySelector('footer');

    if (!socialBlock || !footerElement) return;

    function handleScroll() {
        const footerTop = footerElement.offsetTop;
        const scrollPosition = window.pageYOffset + window.innerHeight;


        const shouldHide = scrollPosition >= footerTop - 50;

        if (shouldHide) {
            socialBlock.style.opacity = '0';
            socialBlock.style.visibility = 'hidden';
            socialBlock.style.pointerEvents = 'none';
        } else {
            socialBlock.style.opacity = '1';
            socialBlock.style.visibility = 'visible';
            socialBlock.style.pointerEvents = 'auto';
        }
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
});