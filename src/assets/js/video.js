export function InitVideo() {
    document.addEventListener('DOMContentLoaded', function() {
        // Обработка обычных видео
        const videoContainers = document.querySelectorAll('.video-container:not(.rutube-container)');
        let currentlyPlaying = null;

        videoContainers.forEach(container => {
            const video = container.querySelector('video');
            const playBtn = container.querySelector('.play-button');

            if (!video || !playBtn) return;

            function toggleVideo() {
                if (currentlyPlaying && currentlyPlaying !== video) {
                    currentlyPlaying.pause();
                    currentlyPlaying.parentElement.classList.remove('video-playing');

                    // Показываем кнопку воспроизведения у остановленного видео
                    const stoppedPlayBtn = currentlyPlaying.parentElement.querySelector('.play-button');
                    if (stoppedPlayBtn) {
                        stoppedPlayBtn.style.display = 'flex';
                    }
                }

                if (video.paused) {
                    video.play().then(() => {
                        container.classList.add('video-playing');
                        currentlyPlaying = video;
                        // Скрываем кнопку воспроизведения при воспроизведении
                        playBtn.style.display = 'none';
                    }).catch(error => {
                        console.error('Ошибка воспроизведения видео:', error);
                    });
                } else {
                    video.pause();
                    container.classList.remove('video-playing');
                    currentlyPlaying = null;
                    // Показываем кнопку воспроизведения при паузе
                    playBtn.style.display = 'flex';
                }
            }

            if (playBtn) {
                playBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    toggleVideo();
                });
            }

            if (video) {
                video.addEventListener('click', function(e) {
                    e.stopPropagation();
                    toggleVideo();
                });

                video.addEventListener('ended', function() {
                    container.classList.remove('video-playing');
                    currentlyPlaying = null;
                    // Показываем кнопку воспроизведения при окончании
                    playBtn.style.display = 'flex';
                });

                video.addEventListener('pause', function() {
                    container.classList.remove('video-playing');
                    if (currentlyPlaying === video) {
                        currentlyPlaying = null;
                    }
                    // Показываем кнопку воспроизведения при паузе
                    playBtn.style.display = 'flex';
                });

                video.addEventListener('error', function() {
                    const source = video.querySelector('source');
                    console.error('Ошибка загрузки видео:', source ? source.src : 'unknown source');
                });
            }
        });

        // Обработка видео в слайдерах
        const videoSliders = document.querySelectorAll('.video-slider');
        videoSliders.forEach(slider => {
            const videos = slider.querySelectorAll('video');
            const playBtns = slider.querySelectorAll('.main-video-btn, .thumbnail-video-btn');

            videos.forEach(video => {
                const parentSlide = video.closest('.swiper-slide');
                const poster = parentSlide.querySelector('.video-poster');
                const playBtn = parentSlide.querySelector('.main-video-btn');

                if (video && playBtn) {
                    video.addEventListener('click', function(e) {
                        e.stopPropagation();

                        if (video.paused) {
                            video.play().then(() => {
                                if (poster) poster.style.display = 'none';
                                if (playBtn) playBtn.style.display = 'none';
                                video.style.display = 'block';
                            });
                        } else {
                            video.pause();
                            if (poster) poster.style.display = 'block';
                            if (playBtn) playBtn.style.display = 'flex';
                            video.style.display = 'none';
                        }
                    });

                    video.addEventListener('ended', function() {
                        if (poster) poster.style.display = 'block';
                        if (playBtn) playBtn.style.display = 'flex';
                        video.style.display = 'none';
                    });

                    video.addEventListener('pause', function() {
                        if (poster) poster.style.display = 'block';
                        if (playBtn) playBtn.style.display = 'flex';
                        video.style.display = 'none';
                    });

                    // Инициализация - скрываем видео, показываем постер и кнопку
                    video.style.display = 'none';
                    if (poster) poster.style.display = 'block';
                    if (playBtn) playBtn.style.display = 'flex';
                }
            });

            // Обработка кнопок воспроизведения в слайдерах
            playBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const parentSlide = this.closest('.swiper-slide');
                    const video = parentSlide.querySelector('video');
                    const poster = parentSlide.querySelector('.video-poster');

                    if (video) {
                        video.play().then(() => {
                            if (poster) poster.style.display = 'none';
                            this.style.display = 'none';
                            video.style.display = 'block';
                        });
                    }
                });
            });
        });

        // Обработка Rutube видео - ИСПРАВЛЕННЫЙ ВАРИАНТ
        document.querySelectorAll('.rutube-container').forEach(container => {
            const playBtn = container.querySelector('.play-button');
            const videoId = container.getAttribute('data-video-id');
            const videoPoster = container.querySelector('.video-poster');

            if (playBtn && videoId) {
                playBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    e.preventDefault();

                    // Сохраняем стили контейнера перед заменой
                    const originalWidth = container.style.width || getComputedStyle(container).width;
                    const originalHeight = container.style.height || getComputedStyle(container).height;
                    const originalDisplay = container.style.display || getComputedStyle(container).display;

                    // Создаем iframe с сохраненными размерами
                    const iframe = document.createElement('iframe');
                    iframe.width = originalWidth || '753.5';
                    iframe.height = originalHeight || '423.84';
                    iframe.src = `https://rutube.ru/play/embed/${videoId}/`;
                    iframe.frameBorder = '0';
                    iframe.allow = 'clipboard-write; autoplay';
                    iframe.setAttribute('webkitAllowFullScreen', '');
                    iframe.setAttribute('mozallowfullscreen', '');
                    iframe.setAttribute('allowFullScreen', '');
                    iframe.style.cssText = 'border: none; width: 100%; height: 100%; display: block;';

                    // Сохраняем структуру и стили контейнера
                    container.style.width = originalWidth;
                    container.style.height = originalHeight;
                    container.style.display = originalDisplay;

                    // Заменяем содержимое контейнера на iframe
                    container.innerHTML = '';
                    container.appendChild(iframe);
                    container.classList.remove('rutube-container');

                    // Восстанавливаем класс контейнера для единообразия
                    container.classList.add('video-container');
                });
            }
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.video-container') && currentlyPlaying) {
                currentlyPlaying.pause();
                currentlyPlaying.parentElement.classList.remove('video-playing');
                currentlyPlaying = null;

                // Показываем кнопку воспроизведения при клике вне видео
                const stoppedPlayBtn = currentlyPlaying?.parentElement?.querySelector('.play-button');
                if (stoppedPlayBtn) {
                    stoppedPlayBtn.style.display = 'flex';
                }
            }
        });
    });
}

InitVideo();