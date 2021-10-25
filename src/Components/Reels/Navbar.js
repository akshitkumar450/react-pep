import React, { useState } from 'react'
import Instagram from './Assets/Instagram.JPG'
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar } from '@mui/material';
import { auth } from './firebase';
import { useStateValue } from './stateProvider';
import { useHistory } from 'react-router';
function Navbar({ user }) {
    const [state, dispatch] = useStateValue()
    const history = useHistory()
    const [error, setError] = useState('')
    const signOut = () => {
        auth.signOut()
            .then((user) => {
                // console.log('logged out');
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
    // console.log(user);
    const handleProfile = () => {
        history.push(`/profile/${user.userId}`)
    }
    return (
        <div className='navbar'>
            <div className="navbar__left" onClick={() => history.push('/')}>
                <img src={Instagram} alt="logo" />
            </div>
            <div className='navbar__right'>
                <div>
                    <HomeIcon />
                </div>
                <div onClick={handleProfile}>
                    <AccountCircleIcon />
                </div>
                <div onClick={signOut}>
                    <Avatar alt={user.name} src={user.photo} />
                </div>

            </div>
        </div>
    )
}

export default Navbar
