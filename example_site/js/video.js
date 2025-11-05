function loadYouTubeIframeAPI() {
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        videoId: "ydPuoYlrs8c",
        width: '100%',
        height: '100%',
        playerVars: {
            controls: 0,
            rel: 0,
            fs: 0,
            modestbranding: 1,
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

function onPlayerReady(event) {
    event.target.setVolume(10);
}

function onPlayerStateChange(event) {
    if (event.data === 0) {
        closeVideo();
    }
}

window.onload = (event) => {
    /* Video in modal */
    const modal = document.getElementById("videoModal");
    const allPlayBtns = document.querySelectorAll('.btn-video');
    const closeBtn = document.getElementsByClassName("modal-close")[0];

    closeBtn.onclick = function () {
        closeVideo();
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape") {
            closeVideo();
        }
    });

    allPlayBtns.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            modal.style.display = "block";
            if (!player) {
                loadYouTubeIframeAPI();
                setTimeout(function() {
                    if (YT.loaded) { // Check if the API is ready
                        player.playVideo();
                    }
                }, 2000);
            } else {
                player.playVideo();
            }
        });
    });

    window.onclick = function (event) {
        if (event.target == modal) {
            closeVideo();
        }
    }

    const closeVideo = () => {
        if (player) {
            player.stopVideo();
        }
        modal.style.display = "none";
    }
};
