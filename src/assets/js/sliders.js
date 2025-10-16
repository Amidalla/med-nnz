import Swiper from 'swiper';

export function SlidersInit() {
    let partnersSlider;
    let newsSlider;
    let projectsSlider;


    function initCustomProgressBar(swiper, sliderType = 'partners') {
        const sliderElement = swiper.el;
        const containerClass = sliderType === 'partners' ? 'custom-progress-container' :
            sliderType === 'events' ? 'events-progress-container' :
                'projects-progress-container';
        const barClass = sliderType === 'partners' ? 'custom-progress-bar' :
            sliderType === 'events' ? 'events-progress-bar' :
                'projects-progress-bar';

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
        const barClass = sliderType === 'partners' ? 'custom-progress-bar' :
            sliderType === 'events' ? 'events-progress-bar' :
                'projects-progress-bar';
        const progressBar = swiper.el.querySelector(`.${barClass}`);
        if (progressBar) {
            const progress = (swiper.progress * 100).toFixed(2);
            progressBar.style.width = progress + '%';
        }
    }

    function toggleProgressBar() {

        const partnersProgressContainer = document.querySelector('.custom-progress-container');
        const partnersControls = document.querySelector('.partners__controls');

        if (partnersProgressContainer && partnersControls && partnersSlider) {
            if (window.innerWidth <= 650) {
                partnersProgressContainer.style.display = 'block';
                partnersControls.style.display = 'none';
                partnersSlider.autoplay.stop();
            } else {
                partnersProgressContainer.style.display = 'none';
                partnersControls.style.display = 'flex';
                partnersSlider.autoplay.start();
            }
        }


        const eventsProgressContainer = document.querySelector('.events-progress-container');
        const eventsControls = document.querySelector('.events__controls');

        if (eventsProgressContainer && eventsControls) {
            if (window.innerWidth <= 600) {
                eventsProgressContainer.style.display = 'block';
                eventsControls.style.display = 'none';
            } else {
                eventsProgressContainer.style.display = 'none';
                eventsControls.style.display = 'flex';
            }
        }


        const projectsProgressContainer = document.querySelector('.projects-progress-container');
        const projectsControls = document.querySelector('.projects__controls');

        if (projectsProgressContainer && projectsControls) {
            if (window.innerWidth <= 600) {
                projectsProgressContainer.style.display = 'block';
                projectsControls.style.display = 'none';
            } else {
                projectsProgressContainer.style.display = 'none';
                projectsControls.style.display = 'flex';
            }
        }
    }


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
            0: {
                loop: false
            },
            651: {
                loop: true
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1360: {
                slidesPerView: 4.5,
                spaceBetween: 20
            },
            1500: {
                slidesPerView: 5,
                spaceBetween: 20
            }
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
            601: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            1000: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1300: {
                slidesPerView: 4,
                spaceBetween: 30
            }
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
            601: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            1000: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1300: {
                slidesPerView: 4,
                spaceBetween: 30
            }
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

    window.addEventListener('resize', toggleProgressBar);
    toggleProgressBar();
}