import "../styles/reset.scss";
import "../styles/styles.scss";
import "../styles/header.scss";
import "../styles/footer.scss";
import "../styles/select.scss";
import "../styles/modals.scss";
import "../styles/filter.scss";
import "../styles/header-animation.scss";
import "../styles/animations.scss";

import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui";

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
import { InitMobileCards } from "./cards-mobile";
import IMask from 'imask';

Swiper.use([Pagination, Navigation, Autoplay, Thumbs, EffectFade]);

window.Fancybox = Fancybox;

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

function initSectionPadding() {
    function adjustSectionPadding() {
        // 1. Логика для catalog-directory, catalog-section
        const sections = document.querySelectorAll('.catalog-directory, .catalog-section');

        sections.forEach(section => {
            let nextElement = section.nextElementSibling;

            while (nextElement && nextElement.nodeType === 3 && nextElement.textContent.trim() === '') {
                nextElement = nextElement.nextElementSibling;
            }

            const isNextContentSection = nextElement &&
                nextElement.classList &&
                nextElement.classList.contains('content') &&
                nextElement.classList.contains('name-left');

            if (isNextContentSection) {
                section.style.paddingBottom = '0';
            } else {
                section.style.paddingBottom = '';
            }
        });


        const newsDetailSections = document.querySelectorAll('.news-detail');

        newsDetailSections.forEach(newsDetail => {
            let nextElement = newsDetail.nextElementSibling;


            while (nextElement && nextElement.nodeType === 3 && nextElement.textContent.trim() === '') {
                nextElement = nextElement.nextElementSibling;
            }


            const isNextContentNews = nextElement &&
                nextElement.classList &&
                nextElement.classList.contains('content') &&
                nextElement.classList.contains('news');

            if (isNextContentNews) {

                newsDetail.style.paddingBottom = '0';
                newsDetail.style.marginBottom = '0';


                nextElement.style.paddingTop = '0';
                nextElement.style.marginTop = '0';
            } else {

                newsDetail.style.paddingBottom = '';
                newsDetail.style.marginBottom = '';


                const contentNewsSections = document.querySelectorAll('.content.news');
                contentNewsSections.forEach(section => {
                    section.style.paddingTop = '';
                    section.style.marginTop = '';
                });
            }
        });


        const pageNameElements = document.querySelectorAll('.page-name');

        pageNameElements.forEach(pageName => {
            let nextElement = pageName.nextElementSibling;

            while (nextElement && nextElement.nodeType === 3 && nextElement.textContent.trim() === '') {
                nextElement = nextElement.nextElementSibling;
            }

            const isNextProductCard = nextElement &&
                nextElement.classList &&
                nextElement.classList.contains('product-card');

            if (isNextProductCard) {
                const hasTagsInside = nextElement.querySelector('.tags') !== null;

                if (!hasTagsInside) {
                    if (window.innerWidth > 1400) {
                        pageName.style.marginBottom = '46px';
                    } else {
                        pageName.style.marginBottom = '24px';
                    }
                } else {
                    pageName.style.marginBottom = '';
                }
            } else {
                pageName.style.marginBottom = '';
            }
        });
    }

    adjustSectionPadding();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(adjustSectionPadding, 100);
    });

    const lazyLoadInstance = new LazyLoad({
        callback_loaded: adjustSectionPadding
    });
}

document.addEventListener('DOMContentLoaded', function() {
    Fancybox.bind("[data-fancybox]", {
        infinite: false,
        autoFocus: false,
        trapFocus: false,
        placeFocusBack: false,
        hideScrollbar: false,
        parentEl: document.body,
        Toolbar: {
            display: {
                left: ["infobar"],
                middle: [],
                right: ["close"],
            },
        },
        Thumbs: {
            autoStart: true,
        },
    });

    SlidersInit();

    InitSelect();
    InitModals();
    InitSideMenu();
    InitFilter();
    InitTabs();
    InitVideo();
    InitAccordion();
    InitHeaderAnimation();
    InitScrollAnimations();
    InitMobileCards();

    setTimeout(() => {
        initMobileSearch();
        initSpecsDots();
        initSectionPadding();
        preventIconWrap();
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

function preventIconWrap() {
    document.querySelectorAll('.marking__link').forEach(link => {

        if (link.classList.contains('icon-wrap-fixed')) return;

        const svg = link.querySelector('svg');
        if (!svg) return;


        let fullText = '';
        const allTextNodes = [];

        Array.from(link.childNodes).forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                fullText += node.textContent;
                allTextNodes.push(node);
            }
        });


        const trimmedText = fullText.trim();


        const words = trimmedText.split(/\s+/);
        if (words.length === 0) return;

        const lastWord = words[words.length - 1];
        const lastWordIndex = trimmedText.lastIndexOf(lastWord);

        if (lastWordIndex === -1) return;


        const span = document.createElement('span');
        span.style.whiteSpace = 'nowrap';
        span.style.display = 'inline-flex';
        span.style.alignItems = 'center';
        span.style.gap = '2px';


        span.appendChild(document.createTextNode(lastWord));


        const nbspNode = document.createTextNode('\u00A0');
        span.appendChild(nbspNode);


        link.removeChild(svg);
        span.appendChild(svg);


        link.innerHTML = '';


        if (words.length > 1) {
            const textBeforeLastWord = trimmedText.substring(0, lastWordIndex).trim();
            if (textBeforeLastWord) {
                link.appendChild(document.createTextNode(textBeforeLastWord + ' '));
            }
        }


        link.appendChild(span);


        link.classList.add('icon-wrap-fixed');
    });
}

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