javascript: (function () {
    ytplayer = document.getElementById("movie_player");
    
    const btn = document.createElement('button');
    btn.style.position = 'fixed';
    btn.style.top = '100px';
    btn.style.background = '#e9967a';
    btn.style.color = 'white';
    btn.style.padding = '0.5rem';
    btn.style.left = '10px';
    btn.style.outline = 'none';
    btn.style.border = 'none';
    btn.style.cursor = 'pointer';
    btn.style.transition = 'all 0.5s ease';
    btn.className = 'checkTime';
    btn.appendChild(document.createTextNode("Check Time"));
    document.body.appendChild(btn);

    let clicked = 0; 
    const checkTimeBtn = document.querySelector('.checkTime');

    checkTimeBtn.addEventListener('click', (e) => {
        clicked = 1;
        if (ytplayer != null) { 
            var secs = ytplayer.getCurrentTime();
            var url = ytplayer.getVideoUrl();
            ytCheckTime(secs, url);
        }

        e.preventDefault();
    }); 
    checkTimeBtn.addEventListener('mousedown', (e) => {
        setTimeout(() => {
            e.target.style.background = '#b1664c';
            e.target.style.transform = 'scale(0.9)';
        }, 1);
        e.preventDefault();
    });
    checkTimeBtn.addEventListener('mouseup', (e) => {
        setTimeout(() => {
            e.target.style.background = '#e9967a';
            e.target.style.transform = 'none';
        }, 1);

        e.preventDefault();
    });
    function ytCheckTime(secs, url) {
        if (clicked === 1) { 
            var min = Math.floor(secs / 60);
            var sec = Math.floor(secs % 60);
            var newUrl = url.replace(/(.*t=)(\d+)(&v=.*)/, `$1${min}m${sec}s$3`);
            navigator.clipboard.writeText(newUrl);
            console.log("Link Added To Clipboard");
            clicked = 0; 
        }
    }

    if (ytplayer === null) { 

        function callPlayer(iframe, func, args) { 
            iframe = document.getElementById(iframe); 
            var event = "command"; 
            if (func.indexOf('get') > -1) { 
                event = "listening";
            }

            if (iframe && iframe.src.indexOf('youtube.com/embed') !== -1) { 
                iframe.contentWindow.postMessage(JSON.stringify({ 
                    'event': event,
                    'func': func,
                    'args': args || []
                }), '*');
            }
        }

        window.onmessage = function (e) {
            var data = JSON.parse(e.data); 
            data = data.info;
            if (data.currentTime && data.videoUrl && clicked === 1) {
                ytCheckTime(data.currentTime, data.videoUrl);
                console.log("The current time is " + data.currentTime + ", URL is " + data.videoUrl);
                clicked = 0; 
            }
        }
    }
})();
