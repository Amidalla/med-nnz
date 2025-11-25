export function InitVideo() {
    document.addEventListener('DOMContentLoaded', function() {
        const videoContainers = document.querySelectorAll('.video-container');
        let currentlyPlaying = null;

        videoContainers.forEach(container => {
            const video = container.querySelector('video');
            const playBtn = container.querySelector('.play-button');

            // Проверяем, что есть видео и кнопка воспроизведения
            if (!video || !playBtn) return;

            function toggleVideo() {
                if (currentlyPlaying && currentlyPlaying !== video) {
                    currentlyPlaying.pause();
                    currentlyPlaying.parentElement.classList.remove('video-playing');
                }

                if (video.paused) {
                    video.play().then(() => {
                        container.classList.add('video-playing');
                        currentlyPlaying = video;
                    }).catch(error => {
                        console.error('Ошибка воспроизведения видео:', error);
                    });
                } else {
                    video.pause();
                    container.classList.remove('video-playing');
                    currentlyPlaying = null;
                }
            }

            // Добавляем обработчики только если элементы существуют
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
                });

                video.addEventListener('pause', function() {
                    container.classList.remove('video-playing');
                    if (currentlyPlaying === video) {
                        currentlyPlaying = null;
                    }
                });

                video.addEventListener('error', function() {
                    const source = video.querySelector('source');
                    console.error('Ошибка загрузки видео:', source ? source.src : 'unknown source');
                });
            }
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.video-container') && currentlyPlaying) {
                currentlyPlaying.pause();
                currentlyPlaying.parentElement.classList.remove('video-playing');
                currentlyPlaying = null;
            }
        });
    });
}

InitVideo();