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
    let mainPictureSlider;

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
                slider: newsSlider,
                maxWidth: 600,
                autoplay: false
            },
            {
                container: '.projects-progress-container',
                controls: '.projects__controls',
                slider: projectsSlider,
                maxWidth: 600,
                autoplay: false
            },
            {
                container: '.recommended-progress-container',
                controls: '.recommended__controls',
                slider: recommendedSlider,
                maxWidth: 600,
                autoplay: false
            },
            {
                container: '.schedule-progress-container',
                controls: '.schedule__controls',
                slider: scheduleSlider,
                maxWidth: 600,
                autoplay: false
            },
            {
                container: '.products-sale-progress-container',
                controls: '.products-sale__controls',
                slider: productsSaleSlider,
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

                    if (slider && slider.autoplay && autoplay) {
                        slider.autoplay.stop();
                    }
                } else {
                    progressContainer.style.display = 'none';
                    controlsElement.style.display = 'flex';

                    if (slider && slider.autoplay && autoplay) {
                        slider.autoplay.start();
                    }
                }
            }
        });
    }
    function initMainPictureSlider() {
        const sliderElement = document.querySelector(".main-picture__slider");
        if (!sliderElement) return;

        mainPictureSlider = new Swiper(".main-picture__slider", {
            autoplay: true,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            pagination: {
                el: '.main-picture__pagination',
                clickable: true
            },
            on: {
                init: function () {
                    setTimeout(() => {
                        playVideoOnActiveSlide(this);
                    }, 300);
                    initMainPictureVideo();
                },
                slideChange: function () {
                    stopAllVideos();
                    setTimeout(() => {
                        playVideoOnActiveSlide(this);
                    }, 50);
                },
                slideChangeTransitionStart: function() {
                    stopAllVideos();
                }
            }
        });
    }

    function initMainPictureVideo() {
        const videoSlides = document.querySelectorAll('.main-picture__slider .video-slide');

        videoSlides.forEach(slide => {
            const video = slide.querySelector('.video-media');
            const playBtn = slide.querySelector('.main-video-btn');

            if (!video || !playBtn) return;

            video.muted = true;
            video.playsInline = true;
            video.loop = true;

            playBtn.style.display = 'none';

            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                playBtn.style.display = 'none';
                video.play().then(() => {
                }).catch(() => {
                    playBtn.style.display = 'flex';
                });
            });

            video.addEventListener('ended', function() {
                playBtn.style.display = 'flex';
            });

            video.addEventListener('pause', function() {
                if (!slide.classList.contains('swiper-slide-active')) {
                    playBtn.style.display = 'flex';
                }
            });

            video.addEventListener('click', function(e) {
                e.stopPropagation();
                if (this.paused) {
                    this.play();
                    playBtn.style.display = 'none';
                } else {
                    this.pause();
                    playBtn.style.display = 'flex';
                }
            });

            video.addEventListener('play', function() {
                playBtn.style.display = 'none';
            });
        });
    }

    function stopAllVideos() {
        const allVideos = document.querySelectorAll('.main-picture__slider .video-media');
        allVideos.forEach(video => {
            if (!video.paused) {
                video.pause();
            }
        });
    }

    function playVideoOnActiveSlide(swiperInstance) {
        const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];

        if (activeSlide.classList.contains('video-slide')) {
            const video = activeSlide.querySelector('.video-media');
            const playBtn = activeSlide.querySelector('.main-video-btn');

            if (video) {
                const playPromise = video.play();

                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        if (playBtn) playBtn.style.display = 'none';
                    }).catch(() => {
                        if (playBtn) playBtn.style.display = 'flex';
                    });
                }
            }
        }
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
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
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
            slidesPerView: 'auto',
            freeMode: true,
            watchSlidesProgress: true,
            resistance: false,
            watchOverflow: false,
            simulateTouch: true,
            grabCursor: true,
            navigation: {
                nextEl: '.product-card__slider .thumbnail-swiper .swiper-button-next',
                prevEl: '.product-card__slider .thumbnail-swiper .swiper-button-prev',
                disabledClass: 'swiper-button-disabled',
            },
            breakpoints: {
                0: {
                    slidesPerView: 'auto',
                    spaceBetween: 8
                },
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 10
                },
                1024: {
                    slidesPerView: 'auto',
                    spaceBetween: 25
                }
            }
        });


        const updateThumbnailNavigation = () => {
            if (!thumbnailSwiper.navigation.nextEl || !thumbnailSwiper.navigation.prevEl) return;

            thumbnailSwiper.navigation.nextEl.classList.remove('swiper-button-lock');
            thumbnailSwiper.navigation.prevEl.classList.remove('swiper-button-lock');

            const isBeginning = thumbnailSwiper.isBeginning;
            const isEnd = thumbnailSwiper.isEnd;

            thumbnailSwiper.navigation.prevEl.classList.toggle('swiper-button-disabled', isBeginning);
            thumbnailSwiper.navigation.nextEl.classList.toggle('swiper-button-disabled', isEnd);
        };


        const originalIsEnd = thumbnailSwiper.isEnd;
        thumbnailSwiper.isEnd = function() {
            if (this.slides.length <= this.params.slidesPerView) {
                return true;
            }
            return originalIsEnd.call(this);
        };


        thumbnailSwiper.on('init', updateThumbnailNavigation);
        thumbnailSwiper.on('slideChange', updateThumbnailNavigation);
        thumbnailSwiper.on('transitionEnd', updateThumbnailNavigation);
        thumbnailSwiper.on('fromEdge', updateThumbnailNavigation);
        thumbnailSwiper.on('resize', function() {
            setTimeout(updateThumbnailNavigation, 50);
        });


        setTimeout(() => {
            thumbnailSwiper.update();
            updateThumbnailNavigation();
        }, 300);


        const productCardSlider = new Swiper(".product-card__slider .main-swiper", {
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


                    initFancyboxForMainSlider(this);
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


        function initFancyboxForMainSlider(swiperInstance) {
            const sliderContainer = swiperInstance.el;
            const slides = sliderContainer.querySelectorAll('.swiper-slide');
            const galleryItems = [];


            slides.forEach((slide, index) => {
                const img = slide.querySelector('img');
                if (!img) return;


                const originalSrc = img.dataset.original || img.dataset.large || img.dataset.src || img.src;
                const thumbSrc = img.src;
                const altText = img.alt || `Изображение ${index + 1}`;

                galleryItems.push({
                    src: originalSrc,
                    thumb: thumbSrc,
                    alt: altText
                });


                const imageElement = slide.querySelector('img');
                if (imageElement) {
                    imageElement.style.cursor = 'zoom-in';
                    imageElement.addEventListener('click', (e) => {
                        e.stopPropagation();


                        Fancybox.show(galleryItems, {
                            startIndex: swiperInstance.activeIndex,
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
                                type: 'modern'
                            },
                            Images: {
                                zoom: true,
                                wheel: false,
                            },
                            on: {

                                change: (fancybox, carousel, slide) => {
                                    const currentIndex = slide.index;
                                    if (swiperInstance && !swiperInstance.destroyed) {
                                        swiperInstance.slideTo(currentIndex);
                                    }
                                },

                                close: () => {
                                    if (swiperInstance && !swiperInstance.destroyed) {
                                        const fancybox = Fancybox.getInstance();
                                        const lastIndex = fancybox ? fancybox.getSlide().index : swiperInstance.activeIndex;
                                        swiperInstance.slideTo(lastIndex);
                                    }
                                }
                            }
                        });
                    });
                }
            });


        }

        return productCardSlider;
    }
    function initNewsDetailSlider() {

        function shouldShowThumbnails() {
            const thumbSlides = document.querySelectorAll('.video-slider .thumbnail-swiper .swiper-slide');
            return thumbSlides.length > 1; // Показываем миниатюры только если больше 1 слайда
        }


        const thumbSlidesCount = document.querySelectorAll('.video-slider .thumbnail-swiper .swiper-slide').length;
        const shouldEnableThumbs = thumbSlidesCount > 1;


        const thumbnailSwiper = new Swiper(".video-slider .thumbnail-swiper", {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
            navigation: {
                nextEl: '.video-slider .thumbnail-swiper .swiper-button-next',
                prevEl: '.video-slider .thumbnail-swiper .swiper-button-prev',
            },
            slideToClickedSlide: true,
            enabled: shouldEnableThumbs, // Полностью отключаем Swiper при одном слайде
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
                swiper: shouldEnableThumbs ? thumbnailSwiper : null // Передаем null если слайд один
            },
            breakpoints: {
                0: {
                    thumbs: { swiper: false }
                },
                1001: {
                    thumbs: { swiper: shouldEnableThumbs ? thumbnailSwiper : null }
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

            if (mainVideoButtons.length === 0 && thumbnailVideoButtons.length === 0) return;

            videos.forEach(video => {
                if (video) {
                    video.style.display = 'none';
                    video.controls = true;
                    video.preload = 'metadata';
                }
            });

            mainVideoButtons.forEach((button, index) => {
                if (button) {
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
                }
            });

            thumbnailVideoButtons.forEach((button, index) => {
                if (button) {
                    button.addEventListener('click', function(e) {
                        e.stopPropagation();
                        if (newsDetailSlider && typeof newsDetailSlider.slideTo === 'function') {
                            newsDetailSlider.slideTo(index);
                        }
                    });
                }
            });

            videos.forEach((video, index) => {
                if (video) {
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
                }
            });
        }

        function resetAllVideos() {
            const videos = document.querySelectorAll('.video-slider .video-media');
            const videoPosters = document.querySelectorAll('.video-slider .video-poster');
            const mainVideoButtons = document.querySelectorAll('.video-slider .main-video-btn');

            if (videos.length === 0) return;

            videos.forEach((video, index) => {
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                    video.style.display = 'none';

                    const poster = videoPosters[index];
                    const button = mainVideoButtons[index];

                    if (poster) poster.style.display = 'block';
                    if (button) button.style.display = 'flex';
                }
            });
        }

        function hideAllVideoButtons() {
            const mainVideoButtons = document.querySelectorAll('.video-slider .main-video-btn');
            const videos = document.querySelectorAll('.video-slider .video-media');
            const videoPosters = document.querySelectorAll('.video-slider .video-poster');

            if (mainVideoButtons.length === 0) return;

            mainVideoButtons.forEach(button => {
                if (button) button.style.display = 'flex';
            });

            videos.forEach((video, index) => {
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                    video.style.display = 'none';

                    const poster = videoPosters[index];
                    if (poster) poster.style.display = 'block';
                }
            });
        }

        function initVideoSliderThumbnails() {
            const thumbnailSlides = document.querySelectorAll('.video-slider .thumbnail-slide');

            if (thumbnailSlides.length === 0) return;

            thumbnailSlides.forEach((slide, index) => {
                if (slide) {
                    slide.addEventListener('click', function() {
                        if (newsDetailSlider && typeof newsDetailSlider.slideTo === 'function') {
                            newsDetailSlider.slideTo(index);
                        }
                    });

                    if (newsDetailSlider && index === newsDetailSlider.activeIndex) {
                        slide.classList.add('thumbnail-active');
                    }
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
            const thumbWrapper = thumbnails ? thumbnails.querySelector('.swiper-wrapper') : null;

            const showThumbnails = shouldShowThumbnails();

            if (!showThumbnails) {

                if (thumbnails) {
                    thumbnails.style.display = 'none';
                    thumbnails.style.opacity = '0';
                    thumbnails.style.visibility = 'hidden';
                    thumbnails.style.height = '0';
                    thumbnails.style.overflow = 'hidden';
                    thumbnails.style.margin = '0';
                    thumbnails.style.padding = '0';
                }


                const nextBtn = document.querySelector('.video-slider .thumbnail-swiper .swiper-button-next');
                const prevBtn = document.querySelector('.video-slider .thumbnail-swiper .swiper-button-prev');
                if (nextBtn) nextBtn.style.display = 'none';
                if (prevBtn) prevBtn.style.display = 'none';


                if (pagination) pagination.style.display = 'none';

            } else {

                if (window.innerWidth <= 1000) {
                    if (thumbnails) {
                        thumbnails.style.display = 'none';
                        thumbnails.style.opacity = '0';
                        thumbnails.style.visibility = 'hidden';
                        thumbnails.style.height = '0';
                    }
                    if (pagination) pagination.style.display = 'block';
                } else {
                    if (thumbnails) {
                        thumbnails.style.display = 'block';
                        thumbnails.style.opacity = '1';
                        thumbnails.style.visibility = 'visible';
                        thumbnails.style.height = 'auto';
                    }
                    if (pagination) pagination.style.display = 'none';
                }
            }
        }


        toggleVideoSliderElements();


        window.addEventListener('resize', function() {
            toggleVideoSliderElements();
        });
    }

    function initAllSliders() {
        if (document.querySelector(".main-picture__slider")) {
            initMainPictureSlider();
        }

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