export function InitVideo() {
    document.addEventListener('DOMContentLoaded', function() {
        const videoContainers = document.querySelectorAll('.video-container');
        let currentlyPlaying = null;

        videoContainers.forEach(container => {
            const video = container.querySelector('video');
            const playBtn = container.querySelector('.play-button');


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


            playBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleVideo();
            });


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
                console.error('Ошибка загрузки видео:', video.querySelector('source').src);
            });
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