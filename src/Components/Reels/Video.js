import React from 'react'
import ReactDom from 'react-dom'

function Video({ src }) {
    // to mute and unmute video on video click (not working)
    // default behaviour is top play and pause on clicking on the video
    const handleClick = (e) => {
        e.preventDefault()
        e.target.muted = !e.target.muted
    }

    // with next when the video ends it will go to next video automatically
    const handleScroll = (e) => {
        // find the next node 
        let nextVideo = ReactDom.findDOMNode(e.target).parentNode.nextSibling
        if (nextVideo) {
            nextVideo.scrollIntoView()
            // when we scroll to next video the above video should be paused
            e.target.muted = true
        }
    }

    return (
        // muted by default
        <video src={src} onEnded={handleScroll} className='videos' muted onClick={handleClick}></video>
    )
}

export default Video
