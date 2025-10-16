import Swiper from 'swiper';

export function SlidersInit() {
    const partnersSlider = new Swiper(".partners-slider", {
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
        scrollbar: {
            el: '.partners-scrollbar',
            draggable: true,
            dragClass: 'partners-scrollbar-drag',
            hide: false,
            snapOnRelease: true
        },
        breakpoints: {
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

                // Инициализируем видимость элементов
                updateControlsVisibility();
            },
            resize: function () {
                updateControlsVisibility();
            }
        }
    });

// Функция для управления видимостью элементов
    function updateControlsVisibility() {
        const controls = document.querySelector('.partners__controls');
        const scrollbar = document.querySelector('.partners-scrollbar');

        if (!controls || !scrollbar) return;

        if (window.innerWidth <= 650) {
            // Мобильные - скрываем стрелки, показываем прогресс-бар
            controls.style.display = 'none';
            scrollbar.style.display = 'block';
        } else {
            // Десктоп - показываем стрелки, скрываем прогресс-бар
            controls.style.display = 'flex';
            scrollbar.style.display = 'none';
        }
    }

// Слушаем изменение размера окна
    window.addEventListener('resize', updateControlsVisibility);

// Инициализируем при загрузке
    document.addEventListener('DOMContentLoaded', updateControlsVisibility);
    const newsSlider = new Swiper(".events-slider", {
        autoplay: false,
        speed: 1000,
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.events__controls .swiper-button-next',
            prevEl: '.events__controls .swiper-button-prev'
        },
        breakpoints: {

            600: {
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
        }
    });
}

