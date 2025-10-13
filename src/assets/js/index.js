import "../styles/reset.scss";
import "../styles/styles.scss";
import "../styles/header.scss";
import "../styles/select.scss";
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

    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        IMask(input, {
            mask: '+{7} (000) 000-00-00'
        });
    });
});