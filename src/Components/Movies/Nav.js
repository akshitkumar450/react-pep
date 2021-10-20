import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Nav.module.css'


function Nav() {
    return (
        <div className={styles.nav}>
            <Link to='/'>
                <h1>Movies App</h1>
            </Link>
            <Link to='/favourites'>
                <h2>Favourites</h2>
            </Link>
        </div>
    )
}

export default Nav
