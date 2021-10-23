import React, { useState } from 'react'
import Instagram from './Assets/Instagram.JPG'
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import { Avatar } from '@mui/material';
import { auth } from './firebase';
import { useStateValue } from './stateProvider';
import { useHistory } from 'react-router';
function Navbar() {
    const [state, dispatch] = useStateValue()
    const history = useHistory()
    const [error, setError] = useState('')
    const signOut = () => {
        auth.signOut()
            .then((user) => {
                console.log('logged in');
                dispatch({
                    type: 'SIGN_OUT',
                    payload: null
                })
                history.push('/')
            })
            .catch((err) => {
                setError(err.message)
                setTimeout(() => {
                    setError('')
                }, 4000)
            })
    }
    return (
        <div className='navbar'>
            <div className="navbar__left">
                <img src={Instagram} alt="logo" />
            </div>
            <div className='navbar__right'>
                <div>
                    <HomeIcon />
                </div>
                <div>
                    <ExploreIcon />
                </div>
                <div onClick={signOut}>
                    <Avatar alt="Remy Sharp" src="" />
                </div>

            </div>
        </div>
    )
}

export default Navbar
