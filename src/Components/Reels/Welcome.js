import { Button } from '@mui/material'
import React from 'react'
import { auth } from './firebase'
import { useStateValue } from './stateProvider'
import { Link, useHistory } from 'react-router-dom'

function Welcome() {
    const [state, dispatch] = useStateValue()
    const history = useHistory()

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
            .catch((err) => alert(err.message))

    }
    return (
        <div>
            <h1>{state.user.name}</h1>
            <Button variant="contained"
                margin='dense'
                onClick={signOut}

            >logout</Button>
        </div>
    )
}

export default Welcome
