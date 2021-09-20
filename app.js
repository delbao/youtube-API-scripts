javascript:(function(){
    ytplayer = document.getElementById("movie_player"); 
    if(ytplayer!=null){//Check if ytplayer exists, in which case, it's a youtube player
        ytplayer.addEventListener('onStateChange', (e)=>{//Whenever state changes, paused or played
            if(e === 2){//If video paused, do the following:
                var secs = ytplayer.getCurrentTime();
                var min = Math.floor(secs / 60); 
                var sec = Math.floor(secs % 60); 
                var url = ytplayer.getVideoUrl(); 
                var newUrl = url.replace(/(.*t=)(\d+)(&v=.*)/, `$1${min}m${sec}s$3`); 
                navigator.clipboard.writeText(newUrl);
                console.log("Link copied to clipboard");
            }
        }) 
    } 
    else{//If ytplayer doesn't exist, there should be an iframe in the page
        function onYouTubeIframeAPIReady(){
            var player = new YT.Player('widget2', {//The id of the div containing the iframe. Should be changed based on the page you're at and the i they gave their player
                events:{    
                    'onStateChange': onPlayerStateChange//Event listener, fires onPlayerStateChange function whenever the state of the video changes, paused or played 
                }   
            });     
        
        function onPlayerStateChange(){
            currentTime = player.playerInfo.currentTime;//Current Time saved
            if(player.playerInfo.playerState === 2){//If video paused, console.log the time
                console.log(currentTime);
            }
        }  
    }
    onYouTubeIframeAPIReady();//Initial call to the function

}

    

   

        
})();
