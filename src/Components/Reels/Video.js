import React from 'react'
import ReactDom from 'react-dom'

function Video({ src }) {
    // to mute and unmute video on video click
    const handleClick = (e) => {
        e.preventDefault()
        e.target.muted = !e.target.muted
    }

    // with next when the video ends it will go to next video automatically
    const handleScroll = (e) => {
        // find the next node 
        let next = ReactDom.findDOMNode(e.target).parentNode.nextSibling
        if (next) {
            next.scrollIntoView()
            e.target.muted = true
        }
    }

    return (
        // muted by default
        <video src={src} onEnded={handleScroll} className='videos' muted controls onClick={handleClick}></video>
    )
}

export default Video
