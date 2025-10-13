import "../styles/reset.scss";
import "../styles/styles.scss";
import "../styles/header.scss";
import LazyLoad from "vanilla-lazyload";
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { Pagination, Navigation, Autoplay, Thumbs } from 'swiper/modules';
import { SlidersInit } from "./sliders";
import { InitModals } from "./modals";
import IMask from 'imask';

Swiper.use([Pagination, Navigation, Autoplay, Thumbs]);

