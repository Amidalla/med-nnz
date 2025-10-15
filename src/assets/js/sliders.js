import Swiper from 'swiper';

export function SlidersInit() {
    const partnersSlider = new Swiper(".partners-slider", {
        autoplay: {
            delay: 3000
        },
        slidesPerView: 5,
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
            450: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 3
            },
            1365: {
                slidesPerView: 4
            },
            1640: {
                slidesPerView: 5
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
            }
        }
    });

    const newsSlider = new Swiper(".events-slider", {
        autoplay: false,
        speed: 1000,
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
            nextEl: '.events__controls .swiper-button-next',
            prevEl: '.events__controls .swiper-button-prev'
        }
    });
}

