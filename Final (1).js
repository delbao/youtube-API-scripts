javascript:(function(){
    ytplayer = document.getElementById("movie_player");//Check if such an element exists,used as an indication for wether we are on a youtube page or not.


    //Creation, styling, and addition onto the DOM of the button that would be used. This button will appear on any page the moment the script is run.
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


    let clicked = 0;//Flag used to check if the button has been clicked. It'll be set to 0 by default.
    const checkTimeBtn = document.querySelector('.checkTime');

    //an eventListener on the button to set the value of the flag to 1 once the button is pressed
    checkTimeBtn.addEventListener('click', (e)=>{
        clicked = 1;
        if(ytplayer!=null){//In case we're on a youtube page, the ytplayer variable defined above shuldn't be null, in which case ytCheckTIme() will run, which is the function in charge of the behavior you wanted on a youtube page.
            ytCheckTime();      
    }

    e.preventDefault();
    });

    //The following two event listeners are purely cosmetic. They are there to scale the button a bit smaller and change it's color when you click it, in order to make the button more user-friendly
    checkTimeBtn.addEventListener('mousedown', (e)=>{
    setTimeout(()=>{
        e.target.style.background = '#b1664c';
        e.target.style.transform = 'scale(0.9)';
    },1);
    e.preventDefault();
    });
    checkTimeBtn.addEventListener('mouseup', (e)=>{
    setTimeout(()=>{
        e.target.style.background = '#e9967a';
        e.target.style.transform = 'none';
    },1);

    e.preventDefault();
    });

    //Main function in charge of handling the case where the script detects that you're on a youtube page.
    function ytCheckTime(){
        if(clicked === 1){//IF button is clicked
            var secs = ytplayer.getCurrentTime();
            var min = Math.floor(secs / 60); 
            var sec = Math.floor(secs % 60); 
            var url = ytplayer.getVideoUrl(); 
            var newUrl = url.replace(/(.*t=)(\d+)(&v=.*)/, `$1${min}m${sec}s$3`); 
            navigator.clipboard.writeText(newUrl);
            console.log("Link Added To Clipboard");
            clicked = 0;//Set the flag back to 0
        }
    } 



    
    if(ytplayer===null)//If on a page that isn't youtube, ytplayer should be null, in which case:
    {
        //The following function is never called in the code, but, if in the future, if you ever need to call, say, the "playVideo" function, you just need to call the following function:
        //iframe: the id given to the iframe
        //func: the function you'd like to run, for instance "playVideo", or "getCurrentTime" . Make sure to pass the argument as a string
        //Some YoutubeIframeAPI functions take some arguments, which you will wnter here. This argument is optional 
        function callPlayer(iframe, func, args){ //handles the case where an iframe is embedded on the page
            iframe=document.getElementById(iframe); //This returns the id of the iframe
            var event = "command"; //The way youtubeIframeAPI is setup, there are two types of functions, some are commands, like "playVideo", "pauseVideo" etc 
            if(func.indexOf('get')>-1){//In case there is a "get" before, it's a listening function, in which case the function returns some value using postMessage, which has to be listened to.
                event = "listening";
            }
        
            if ( iframe&&iframe.src.indexOf('youtube.com/embed') !== -1) {//If the Iframe with the passed ID is found
              iframe.contentWindow.postMessage( JSON.stringify({//This is how a function is passed to the youtube API using postMessage
                  'event': event,
                  'func': func,
                  'args': args || []
              }), '*');
            }
        }

        
        
        window.onmessage = function(e){//THe callPlayer function is not called in the code because it isn't necessary for your getCurrentTime request. The youtubeAPI natively keeps sending the currentTime and the current State of the playback to the window object while the video is running, so we can just extract the current time from there
            var data = JSON.parse(e.data);//parse the data we get back
            data = data.info;
            if(data.currentTime && clicked === 1){//in case there is a currentTime in the data and the button is clicked, console.log it
                console.log("The current time is "+ data.currentTime);
                clicked = 0;//set the flag back to 0
            }
        }

}    
})();

