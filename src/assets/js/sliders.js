import Swiper from 'swiper';
import 'swiper/css';

export function SlidersInit() {
    let partnersSlider;
    let newsSlider;
    let projectsSlider;
    let productCardSlider;
    let recommendedSlider;


    function initCustomProgressBar(swiper, sliderType = 'partners') {
        const sliderElement = swiper.el;
        const containerClass = getProgressContainerClass(sliderType);
        const barClass = getProgressBarClass(sliderType);

        if (!sliderElement.querySelector(`.${containerClass}`)) {
            const progressHTML = `
                <div class="${containerClass}">
                    <div class="${barClass}"></div>
                </div>
            `;
            sliderElement.insertAdjacentHTML('beforeend', progressHTML);
        }

        toggleProgressBar();
    }


    function updateCustomProgressBar(swiper, sliderType = 'partners') {
        const barClass = getProgressBarClass(sliderType);
        const progressBar = swiper.el.querySelector(`.${barClass}`);
        if (progressBar) {
            const progress = (swiper.progress * 100).toFixed(2);
            progressBar.style.width = progress + '%';
        }
    }


    function getProgressContainerClass(sliderType) {
        const classes = {
            partners: 'custom-progress-container',
            events: 'events-progress-container',
            projects: 'projects-progress-container',
            recommended: 'recommended-progress-container'
        };
        return classes[sliderType] || 'custom-progress-container';
    }

    function getProgressBarClass(sliderType) {
        const classes = {
            partners: 'custom-progress-bar',
            events: 'events-progress-bar',
            projects: 'projects-progress-bar',
            recommended: 'recommended-progress-bar'
        };
        return classes[sliderType] || 'custom-progress-bar';
    }


    function toggleProgressBar() {
        const breakpoints = [
            {
                container: '.custom-progress-container',
                controls: '.partners__controls',
                slider: partnersSlider,
                maxWidth: 650,
                autoplay: true
            },
            {
                container: '.events-progress-container',
                controls: '.events__controls',
                slider: null,
                maxWidth: 600,
                autoplay: false
            },
            {
                container: '.projects-progress-container',
                controls: '.projects__controls',
                slider: null,
                maxWidth: 600,
                autoplay: false
            },
            {
                container: '.recommended-progress-container',
                controls: '.recommended__controls',
                slider: null,
                maxWidth: 600,
                autoplay: false
            }
        ];

        breakpoints.forEach(({ container, controls, slider, maxWidth, autoplay }) => {
            const progressContainer = document.querySelector(container);
            const controlsElement = document.querySelector(controls);

            if (progressContainer && controlsElement) {
                if (window.innerWidth <= maxWidth) {
                    progressContainer.style.display = 'block';
                    controlsElement.style.display = 'none';
                    if (slider && autoplay) {
                        slider.autoplay.stop();
                    }
                } else {
                    progressContainer.style.display = 'none';
                    controlsElement.style.display = 'flex';
                    if (slider && autoplay) {
                        slider.autoplay.start();
                    }
                }
            }
        });
    }


    function initPartnersSlider() {
        partnersSlider = new Swiper(".partners-slider", {
            autoplay: {
                delay: 3000
            },
            slidesPerView: 2.2,
            loop: true,
            speed: 500,
            spaceBetween: 20,
            centeredSlides: false,
            initialSlide: 0,
            navigation: {
                nextEl: '.partners__controls .swiper-button-next',
                prevEl: '.partners__controls .swiper-button-prev'
            },
            breakpoints: {
                0: { loop: false },
                651: { loop: true },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1360: { slidesPerView: 4.5, spaceBetween: 20 },
                1500: { slidesPerView: 5, spaceBetween: 20 }
            },
            on: {
                init: function () {
                    const sliderElement = this.el;

                    sliderElement.addEventListener('mouseenter', () => {
                        this.autoplay.stop();
                    });

                    sliderElement.addEventListener('mouseleave', () => {
                        this.autoplay.start();
                    });

                    initCustomProgressBar(this, 'partners');
                },
                slideChange: function () {
                    updateCustomProgressBar(this, 'partners');
                },
                scroll: function () {
                    updateCustomProgressBar(this, 'partners');
                },
                resize: function () {
                    toggleProgressBar();
                }
            }
        });
    }


    function initNewsSlider() {
        newsSlider = new Swiper(".events-slider", {
            autoplay: false,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 10,
            navigation: {
                nextEl: '.events__controls .swiper-button-next',
                prevEl: '.events__controls .swiper-button-prev'
            },
            breakpoints: {
                601: { slidesPerView: 2, spaceBetween: 15 },
                1000: { slidesPerView: 3, spaceBetween: 20 },
                1300: { slidesPerView: 4, spaceBetween: 30 }
            },
            on: {
                init: function () {
                    initCustomProgressBar(this, 'events');
                },
                slideChange: function () {
                    updateCustomProgressBar(this, 'events');
                },
                scroll: function () {
                    updateCustomProgressBar(this, 'events');
                },
                resize: function () {
                    toggleProgressBar();
                }
            }
        });
    }


    function initProjectsSlider() {
        projectsSlider = new Swiper(".projects-slider", {
            autoplay: false,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 10,
            navigation: {
                nextEl: '.projects__controls .swiper-button-next',
                prevEl: '.projects__controls .swiper-button-prev'
            },
            breakpoints: {
                601: { slidesPerView: 2, spaceBetween: 15 },
                1000: { slidesPerView: 3, spaceBetween: 20 },
                1300: { slidesPerView: 4, spaceBetween: 30 }
            },
            on: {
                init: function () {
                    initCustomProgressBar(this, 'projects');
                },
                slideChange: function () {
                    updateCustomProgressBar(this, 'projects');
                },
                scroll: function () {
                    updateCustomProgressBar(this, 'projects');
                },
                resize: function () {
                    toggleProgressBar();
                }
            }
        });
    }


    function initRecommendedSlider() {
        recommendedSlider = new Swiper(".recommended__slider", {
            autoplay: false,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 10,
            navigation: {
                nextEl: '.recommended__controls .swiper-button-next',
                prevEl: '.recommended__controls .swiper-button-prev'
            },
            breakpoints: {
                601: { slidesPerView: 2, spaceBetween: 15 },
                1000: { slidesPerView: 3, spaceBetween: 20 },
                1300: { slidesPerView: 4, spaceBetween: 30 }
            },
            on: {
                init: function () {
                    initCustomProgressBar(this, 'recommended');
                },
                slideChange: function () {
                    updateCustomProgressBar(this, 'recommended');
                },
                scroll: function () {
                    updateCustomProgressBar(this, 'recommended');
                },
                resize: function () {
                    toggleProgressBar();
                }
            }
        });
    }


    function initProductCardSlider() {
        const thumbnailSwiper = new Swiper(".product-card__slider .thumbnail-swiper", {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
            breakpoints: {
                0: { slidesPerView: 3, spaceBetween: 8 },
                768: { slidesPerView: 4, spaceBetween: 10 },
                1024: { slidesPerView: 5, spaceBetween: 25 }
            }
        });

        productCardSlider = new Swiper(".product-card__slider .main-swiper", {
            speed: 300,
            spaceBetween: 10,
            slidesPerView: 1,
            navigation: {
                nextEl: '.product-card__slider .swiper-button-next',
                prevEl: '.product-card__slider .swiper-button-prev',
            },
            pagination: {
                el: '.product-card__slider .swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            thumbs: {
                swiper: thumbnailSwiper
            },
            breakpoints: {
                0: {
                    navigation: false,
                    thumbs: { swiper: false }
                },
                1001: {
                    navigation: {
                        nextEl: '.product-card__slider .swiper-button-next',
                        prevEl: '.product-card__slider .swiper-button-prev',
                    },
                    thumbs: { swiper: thumbnailSwiper }
                }
            },
            on: {
                init: function () {
                    // Ленивая загрузка изображений
                    const lazyImages = this.el.querySelectorAll('.lazy');
                    lazyImages.forEach(img => {
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                        }
                    });

                    toggleProductCardElements();
                },
                resize: function () {
                    toggleProductCardElements();
                }
            }
        });

        function toggleProductCardElements() {
            const thumbnails = document.querySelector('.product-card__slider .thumbnail-swiper');
            const navigation = document.querySelector('.product-card__slider .swiper-navigation');
            const pagination = document.querySelector('.product-card__slider .swiper-pagination');

            if (window.innerWidth <= 1000) {

                if (thumbnails) thumbnails.style.display = 'none';
                if (navigation) navigation.style.display = 'none';
                if (pagination) pagination.style.display = 'block';
            } else {

                if (thumbnails) thumbnails.style.display = 'block';
                if (navigation) navigation.style.display = 'flex';
                if (pagination) pagination.style.display = 'none';
            }
        }
    }


    function initAllSliders() {
        if (document.querySelector(".partners-slider")) {
            initPartnersSlider();
        }

        if (document.querySelector(".events-slider")) {
            initNewsSlider();
        }

        if (document.querySelector(".projects-slider")) {
            initProjectsSlider();
        }

        if (document.querySelector(".recommended__slider")) {
            initRecommendedSlider();
        }

        if (document.querySelector('.product-card__slider')) {
            initProductCardSlider();
        }
    }


    window.addEventListener('resize', toggleProgressBar);


    initAllSliders();
    toggleProgressBar();
}