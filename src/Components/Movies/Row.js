import React, { useEffect, useState } from 'react'
import styles from './Row.module.css'
function Row({ fetchUrl, title }) {
    const [movies, setMovies] = useState([])
    const [curmovie, setCurmovie] = useState('')
    const [pageArr, setPageArr] = useState([1])
    const [currPage, setCurrPage] = useState(1)
    const [fav, setFav] = useState([])
    const [favMovies, setFavMovies] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            const response = await fetch(`https://api.themoviedb.org/3${fetchUrl}&page=${currPage}`)
            const data = await response.json()
            // console.log(data.results);
            setMovies(data.results)
        }
        getMovies()
    }, [fetchUrl, currPage])

    // for right navigation
    const rightPage = () => {
        let temp = []
        for (let i = 1; i <= pageArr.length + 1; i++) {
            temp.push(i);
        }
        setPageArr(temp)
        setCurrPage(currPage + 1)
    }

    // for left navigation
    const leftPage = () => {
        // for avoid error for first page
        if (currPage !== 1) {
            setCurrPage(currPage - 1)
        }
    }

    // for clicking any random page ,just change the page number
    const pageClick = (idx) => {
        // console.log(idx + 1);
        setCurrPage(idx + 1)
    }

    const saveToFav = (movie) => {
        let oldData = JSON.parse(localStorage.getItem('movies') || "[]")
        // if we click it again it will removed
        if (fav.includes(movie.id)) {
            oldData = oldData.filter((value) => value.id !== movie.id)
        } else {
            // else add it
            oldData.push(movie)
        }
        // saving the favourites to localstorage
        localStorage.setItem("movies", JSON.stringify(oldData))
        console.log(oldData);
        // setFavMovies(oldData) // saving the favourites to a state
        saveMovieIds()
    }
    const saveMovieIds = () => {
        let oldData = JSON.parse(localStorage.getItem('movies') || "[]")
        let temp = oldData.map((movie) => movie.id)
        setFav(temp) //temp/fav is having only id of all the movies in favourites
        // console.log(temp);
    }
    return (
        <div className={styles.row_container}>
            <h1>{title}</h1>
            <div className={styles.row}>
                {
                    movies.length !== 0 ?
                        (movies.map((movie, idx) => {
                            // console.log(movie);
                            return (
                                (movie.backdrop_path && movie.original_title) &&
                                (
                                    <div key={movie.id} className={styles.row_card} onMouseEnter={() => setCurmovie(movie.id)}
                                        onMouseLeave={() => setCurmovie('')}

                                    >
                                        <img src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt="" />
                                        <div className={styles.row_info}>
                                            <h6>{movie?.original_title}</h6>
                                            {
                                                (movie.id === curmovie) &&
                                                <button type="button" className=" d-flex justify-content-center btn btn-primary"
                                                    onClick={() => saveToFav(movie)}
                                                >
                                                    {
                                                        fav.includes(movie.id) ? 'Remove' : 'add'
                                                    }
                                                </button>
                                            }
                                        </div>
                                    </div>

                                )
                            )
                        }))
                        : <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                }
            </div>

            <div className='d-flex justify-content-center'>
                <nav aria-label="Page navigation example " >
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" href="#y" onClick={leftPage}>Previous</a>
                        </li>
                        {
                            pageArr.map((page, idx) => (
                                <li key={idx} className="page-item" onClick={() => pageClick(idx)}>
                                    <a className="page-link" href="#y">
                                        {page}
                                    </a>
                                </li>
                            ))
                        }
                        <li className="page-item"><a className="page-link" href="#y" onClick={rightPage}>Next</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Row
