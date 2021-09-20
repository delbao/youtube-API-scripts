# youtubeIframeAPIScript
A script that adds a button onto the DOM in order to let the user check the time of a youtube video or an iframe embedded in a site.


The whole code is commented heavily, so you will not have any problems, but here are the main parts of the file:
# ytCheckTime()
This function is called by the script in case it confirms that you are on a youtube page. It handles all you requires on a youtube page.

# callPlayer()
This function is not necessary in your particular case, where all you need is the current time, and it's never run, but if in the future, you ever need to call, say, the "playVideo" function, you just need to call the following function: callPlayer('id_of_the_iframe', 'playVideo'); See the code comments for more details of how it works

# window.onmessage 
THe callPlayer function is not called in the code because it isn't necessary for your getCurrentTime request. The youtubeAPI natively keeps sending the currentTime and the current State of the playback to the window object while the video is running, so we can just extract the current time from there.
