export function InitScrollAnimations() {

    function isElementInViewport(el) {
        if (!el) return false;

        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        return (
            rect.top <= windowHeight * 0.85 &&
            rect.bottom >= 0
        );
    }


    function checkAnimations() {

        const markingItems = document.querySelectorAll('.marking__wrapper');
        markingItems.forEach((item, index) => {
            if (isElementInViewport(item) && !item.classList.contains('animated')) {
                item.classList.add('marking-animate', 'animated');
                item.style.transitionDelay = `${index * 0.15}s`;
            }
        });


        const cardsItems = document.querySelectorAll('.cards__item');
        cardsItems.forEach((item, index) => {
            if (isElementInViewport(item) && !item.classList.contains('animated')) {
                item.classList.add('cards-animate', 'animated');
                item.style.transitionDelay = `${index * 0.1}s`;
            }
        });


        const advantagesItems = document.querySelectorAll('.advantages__item');
        advantagesItems.forEach((item, index) => {
            if (isElementInViewport(item) && !item.classList.contains('animated')) {
                item.classList.add('advantages-animate', 'animated');
                item.style.transitionDelay = `${index * 0.1}s`;
            }
        });


        const sliders = document.querySelectorAll('.partners-slider, .events-slider');
        sliders.forEach((slider, index) => {
            if (isElementInViewport(slider) && !slider.classList.contains('animated')) {
                slider.classList.add('slider-animate', 'animated');
                slider.style.transitionDelay = `${index * 0.2}s`;
            }
        });


        const forms = document.querySelectorAll('.main-form');
        forms.forEach((form, index) => {
            if (isElementInViewport(form) && !form.classList.contains('animated')) {
                form.classList.add('form-animate', 'animated');
                form.style.transitionDelay = `${index * 0.3}s`;
            }
        });


        const scrollAnimateElements = document.querySelectorAll('.scroll-animate');
        scrollAnimateElements.forEach((element, index) => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');

                const delayClass = Array.from(element.classList).find(cls => cls.startsWith('delay-'));
                if (!delayClass) {
                    element.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }


    function init() {

        setTimeout(checkAnimations, 100);

        let isScrolling = false;
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(() => {
                    checkAnimations();
                    isScrolling = false;
                });
            }
        });


        window.addEventListener('resize', checkAnimations);


        window.addEventListener('load', checkAnimations);
    }


    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }


    window.checkAnimations = checkAnimations;
}