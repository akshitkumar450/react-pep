import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { auth, db } from './firebase'
import { useStateValue } from './stateProvider'
import { Link, useHistory } from 'react-router-dom'

function Welcome() {
    const [state, dispatch] = useStateValue()
    const history = useHistory()
    const [error, setError] = useState('')
    const [data, setData] = useState([])

    useEffect(() => {
        db.collection('users').onSnapshot((snapshot) => (
            setData(snapshot.docs.map((doc) => doc.data()))
        ))
    }, [])
    // console.log(data);
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
    // console.log(data);
    return (
        <div>
            <h1>{state.user.name}</h1>
            <Button variant="contained"
                margin='dense'
                onClick={signOut}

            >logout</Button>
            {
                data.map(({ name, email, photo }) => {
                    return (<div>
                        <h1>{name}</h1>
                        <h1>{email}</h1>
                        <img src={photo} alt="" width="250" />
                    </div>)
                })
            }
        </div>
    )
}

export default Welcome
