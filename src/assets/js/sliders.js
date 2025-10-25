import Swiper from 'swiper';
import 'swiper/css';

export function SlidersInit() {
    let partnersSlider;
    let newsSlider;
    let projectsSlider;
    let productCardSlider;
    let recommendedSlider;
    let excellenceSlider;
    let newsDetailSlider;
    let scheduleSlider;
    let productsSaleSlider;

    function initCustomProgressBar(swiper, sliderType = 'partners') {
        if (sliderType === 'excellence') return;

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
        if (sliderType === 'excellence') return;

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
            recommended: 'recommended-progress-container',
            excellence: 'excellence-progress-container',
            schedule: 'schedule-progress-container',
            productsSale: 'products-sale-progress-container'
        };
        return classes[sliderType] || 'custom-progress-container';
    }

    function getProgressBarClass(sliderType) {
        const classes = {
            partners: 'custom-progress-bar',
            events: 'events-progress-bar',
            projects: 'projects-progress-bar',
            recommended: 'recommended-progress-bar',
            excellence: 'excellence-progress-bar',
            schedule: 'schedule-progress-bar',
            productsSale: 'products-sale-progress-bar'
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
            },
            {
                container: '.schedule-progress-container',
                controls: '.schedule__controls',
                slider: null,
                maxWidth: 600,
                autoplay: false
            },
            {
                container: '.products-sale-progress-container',
                controls: '.products-sale__controls',
                slider: null,
                maxWidth: 600,
                autoplay: false
            },
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

    function initProductsSaleSlider() {
        productsSaleSlider = new Swiper(".products-sale__slider", {
            autoplay: false,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 10,
            navigation: {
                nextEl: '.products-sale__controls .swiper-button-next',
                prevEl: '.products-sale__controls .swiper-button-prev'
            },
            breakpoints: {
                601: { slidesPerView: 2, spaceBetween: 15 },
                1000: { slidesPerView: 3, spaceBetween: 20 },
                1300: { slidesPerView: 4, spaceBetween: 30 }
            },
            on: {
                init: function () {
                    initCustomProgressBar(this, 'productsSale');
                },
                slideChange: function () {
                    updateCustomProgressBar(this, 'productsSale');
                },
                scroll: function () {
                    updateCustomProgressBar(this, 'productsSale');
                },
                resize: function () {
                    toggleProgressBar();
                }
            }
        });
    }

    function initScheduleSlider() {
        scheduleSlider = new Swiper(".schedule__slider", {
            autoplay: false,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 10,
            navigation: {
                nextEl: '.schedule__controls .swiper-button-next',
                prevEl: '.schedule__controls .swiper-button-prev'
            },
            breakpoints: {
                0: { slidesPerView: 1, spaceBetween: 10 },
                601: { slidesPerView: 2, spaceBetween: 15 },
                1000: { slidesPerView: 3, spaceBetween: 20 },
                1500: { slidesPerView: 4, spaceBetween: 30 }
            },
            on: {
                init: function () {
                    initCustomProgressBar(this, 'schedule');
                },
                slideChange: function () {
                    updateCustomProgressBar(this, 'schedule');
                },
                scroll: function () {
                    updateCustomProgressBar(this, 'schedule');
                },
                resize: function () {
                    toggleProgressBar();
                }
            }
        });
    }

    function initExcellenceSlider() {
        excellenceSlider = new Swiper(".excellence-slider", {
            autoplay: false,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 0,
            navigation: {
                nextEl: '.excellence-slider__controls .swiper-button-next',
                prevEl: '.excellence-slider__controls .swiper-button-prev'
            },
            pagination: {
                el: '.excellence-slider .swiper-pagination',
                clickable: true
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                601: { slidesPerView: 1 },
                1000: { slidesPerView: 1 },
                1300: { slidesPerView: 1 }
            },
            on: {
                init: function () {
                },
                slideChange: function () {
                },
                scroll: function () {
                },
                resize: function () {
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
            navigation: {
                nextEl: '.product-card__slider .thumbnail-swiper .swiper-button-next',
                prevEl: '.product-card__slider .thumbnail-swiper .swiper-button-prev',
            },
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
                nextEl: '.product-card__slider .main-swiper .swiper-button-next',
                prevEl: '.product-card__slider .main-swiper .swiper-button-prev',
            },
            pagination: {
                el: '.product-card__slider .main-swiper .swiper-pagination',
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
                        nextEl: '.product-card__slider .main-swiper .swiper-button-next',
                        prevEl: '.product-card__slider .main-swiper .swiper-button-prev',
                    },
                    thumbs: { swiper: thumbnailSwiper }
                }
            },
            on: {
                init: function () {
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
            const navigation = document.querySelector('.product-card__slider .main-swiper .swiper-navigation');
            const pagination = document.querySelector('.product-card__slider .main-swiper .swiper-pagination');

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

    function initNewsDetailSlider() {

        const thumbnailSwiper = new Swiper(".video-slider .thumbnail-swiper", {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
            navigation: {
                nextEl: '.video-slider .thumbnail-swiper .swiper-button-next',
                prevEl: '.video-slider .thumbnail-swiper .swiper-button-prev',
            },
            breakpoints: {
                0: { slidesPerView: 3, spaceBetween: 8 },
                768: { slidesPerView: 4, spaceBetween: 10 },
                1024: { slidesPerView: 5, spaceBetween: 25 }
            }
        });


        newsDetailSlider = new Swiper(".video-slider .main-swiper", {
            speed: 300,
            spaceBetween: 10,
            slidesPerView: 1,
            pagination: {
                el: '.video-slider .main-swiper .swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            thumbs: {
                swiper: thumbnailSwiper
            },
            breakpoints: {
                0: {
                    thumbs: { swiper: false }
                },
                1001: {
                    thumbs: { swiper: thumbnailSwiper }
                }
            },
            on: {
                init: function () {

                    const lazyImages = this.el.querySelectorAll('.lazy');
                    lazyImages.forEach(img => {
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                        }
                    });


                    initVideoPlayButtons();


                    initVideoSliderThumbnails();


                    this.on('slideChange', function() {
                        pauseAllVideos();
                        hideAllVideoButtons();
                        resetAllVideos();
                        updateActiveThumbnail();
                    });

                    toggleVideoSliderElements();
                },
                resize: function () {
                    toggleVideoSliderElements();
                }
            }
        });


        function initVideoPlayButtons() {
            const mainVideoButtons = document.querySelectorAll('.video-slider .main-video-btn');
            const thumbnailVideoButtons = document.querySelectorAll('.video-slider .thumbnail-video-btn');
            const videos = document.querySelectorAll('.video-slider .video-media');
            const videoPosters = document.querySelectorAll('.video-slider .video-poster');


            videos.forEach(video => {
                video.style.display = 'none';
                video.controls = true;
                video.preload = 'metadata';
            });


            mainVideoButtons.forEach((button, index) => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const video = videos[index];
                    const poster = videoPosters[index];

                    if (video && typeof video.play === 'function') {

                        if (poster) poster.style.display = 'none';
                        video.style.display = 'block';
                        button.style.display = 'none';

                        video.play().then(() => {

                        }).catch(error => {
                            console.error('Error playing video:', error);
                        });
                    }
                });
            });


            thumbnailVideoButtons.forEach((button, index) => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation();
                    if (newsDetailSlider && typeof newsDetailSlider.slideTo === 'function') {
                        newsDetailSlider.slideTo(index);

                    }
                });
            });


            videos.forEach((video, index) => {

                video.addEventListener('pause', function() {

                });


                video.addEventListener('ended', function() {
                    const mainButton = mainVideoButtons[index];
                    const poster = videoPosters[index];

                    this.style.display = 'none';
                    if (poster) poster.style.display = 'block';
                    if (mainButton) mainButton.style.display = 'flex';
                });


                video.addEventListener('click', function(e) {
                    e.stopPropagation();
                    if (this.paused) {
                        this.play();
                    } else {
                        this.pause();
                    }
                });
            });
        }


        function resetAllVideos() {
            const videos = document.querySelectorAll('.video-slider .video-media');
            const videoPosters = document.querySelectorAll('.video-slider .video-poster');
            const mainVideoButtons = document.querySelectorAll('.video-slider .main-video-btn');

            videos.forEach((video, index) => {

                video.pause();
                video.currentTime = 0;
                video.style.display = 'none';


                const poster = videoPosters[index];
                const button = mainVideoButtons[index];

                if (poster) poster.style.display = 'block';
                if (button) button.style.display = 'flex';
            });
        }


        function hideAllVideoButtons() {
            const mainVideoButtons = document.querySelectorAll('.video-slider .main-video-btn');
            const videos = document.querySelectorAll('.video-slider .video-media');
            const videoPosters = document.querySelectorAll('.video-slider .video-poster');


            mainVideoButtons.forEach(button => {
                button.style.display = 'flex';
            });


            videos.forEach((video, index) => {
                video.pause();
                video.currentTime = 0;
                video.style.display = 'none';

                const poster = videoPosters[index];
                if (poster) poster.style.display = 'block';
            });
        }


        function initVideoSliderThumbnails() {
            const thumbnailSlides = document.querySelectorAll('.video-slider .thumbnail-slide');

            thumbnailSlides.forEach((slide, index) => {

                slide.addEventListener('click', function() {
                    if (newsDetailSlider && typeof newsDetailSlider.slideTo === 'function') {
                        newsDetailSlider.slideTo(index);
                    }
                });


                if (newsDetailSlider && index === newsDetailSlider.activeIndex) {
                    slide.classList.add('thumbnail-active');
                }
            });
        }


        function updateActiveThumbnail() {
            if (!newsDetailSlider) return;

            const thumbnailSlides = document.querySelectorAll('.video-slider .thumbnail-slide');
            thumbnailSlides.forEach(slide => {
                slide.classList.remove('thumbnail-active');
            });
            if (thumbnailSlides[newsDetailSlider.activeIndex]) {
                thumbnailSlides[newsDetailSlider.activeIndex].classList.add('thumbnail-active');
            }
        }


        function pauseAllVideos() {
            const videos = document.querySelectorAll('.video-slider .video-media');
            videos.forEach(video => {
                if (typeof video.pause === 'function') {
                    video.pause();
                }
            });
        }

        function toggleVideoSliderElements() {
            const thumbnails = document.querySelector('.video-slider .thumbnail-swiper');
            const pagination = document.querySelector('.video-slider .main-swiper .swiper-pagination');

            if (window.innerWidth <= 1000) {
                if (thumbnails) thumbnails.style.display = 'none';
                if (pagination) pagination.style.display = 'block';
            } else {
                if (thumbnails) thumbnails.style.display = 'block';
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

        if (document.querySelector(".products-sale__slider")) {
            initProductsSaleSlider();
        }

        if (document.querySelector(".schedule__slider")) {
            initScheduleSlider();
        }

        if (document.querySelector(".excellence-slider")) {
            initExcellenceSlider();
        }

        if (document.querySelector('.product-card__slider')) {
            initProductCardSlider();
        }

        if (document.querySelector('.video-slider')) {
            initNewsDetailSlider();
        }
    }

    window.addEventListener('resize', toggleProgressBar);

    initAllSliders();
    toggleProgressBar();
}

export default SlidersInit;