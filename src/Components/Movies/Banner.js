import React, { useEffect, useState } from 'react'
import requests from './requests'
import styles from './Banner.module.css'

function Banner() {
    const [banner, setBanner] = useState('')
    useEffect(() => {
        const getMovies = async () => {
            const response = await fetch(`https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`)
            const data = await response.json()
            // console.log(data.results);
            setBanner(data.results[Math.floor(Math.random() * data.results.length - 1)])
        }
        getMovies()
    }, [])
    // console.log(banner);
    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    }
    return (
        <>
            {
                banner
                    ?
                    <div className={styles.banner} style={{
                        backgroundImage: `url("https://image.tmdb.org/t/p/original/${banner?.backdrop_path}")`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                    }}>
                        <div className={styles.banner_text}>
                            <h1>{banner?.original_name}</h1>
                            <h4>
                                {
                                    truncate(banner?.overview, 150)
                                }
                            </h4>
                        </div>
                    </div>
                    :
                    <div className="spinner-border text-primary text-center" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
            }
        </>
    )
}

export default Banner
