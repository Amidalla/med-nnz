import "../styles/reset.scss";
import "../styles/styles.scss";
import "../styles/header.scss";
import "../styles/footer.scss";
import "../styles/select.scss";
import "../styles/modals.scss";
import LazyLoad from "vanilla-lazyload";
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { Pagination, Navigation, Autoplay, Thumbs } from 'swiper/modules';
import { SlidersInit } from "./sliders";
import { InitModals } from "./modals";
import { InitSelect } from "./select";
import IMask from 'imask';

Swiper.use([Pagination, Navigation, Autoplay, Thumbs]);

document.addEventListener('DOMContentLoaded', function() {
    InitSelect();
    SlidersInit();
    InitModals();

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