import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Alert, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Instagram from './Assets/Instagram.JPG'
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from './stateProvider';
import { auth } from './firebase'
function SignUp() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [state, dispatch] = useStateValue()

    const onSignUp = (e) => {
        e.preventDefault()

        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                console.log('signuped');
                authUser.user.updateProfile({
                    // change the displayName
                    displayName: name
                })
                    .then(() => {
                        dispatch({
                            // saving the object in reducer
                            type: 'SIGN_IN',
                            payload: {
                                uid: authUser.user.uid,
                                email: authUser.user.email,
                                name: name
                            }
                        })
                        history.push('/welcome')
                    })

            })
            .catch((err) => alert(err.message))
    }

    return (
        <div className='signUp'>
            <div className="signUp__form">
                <img src={Instagram} alt="logo" />
                <Alert severity="error" className='signUp__alert'>This is an error alert — check it out!</Alert>
                <TextField
                    id="outlined-email-input"
                    label="email"
                    type="email"
                    size='small'
                    margin='dense'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth={true}
                />
                <TextField
                    id="outlined-email-input"
                    label="password"
                    type="password"
                    size='small'
                    margin='dense'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth={true}
                />
                <TextField
                    id="outlined-email-input"
                    label="full name"
                    type="text"
                    size='small'
                    margin='dense'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth={true}
                />
                <Button type='file' variant="outlined" color='secondary'
                    margin='dense'
                    fullWidth={true}
                    component='label'
                >
                    <CloudUploadIcon style={{ marginRight: '10px' }} />
                    Upload profile image
                    <input type="file" accept="image/*" hidden onChange={(e) => setImage(e.target.files[0])} />
                </Button>

                <Button variant="contained"
                    margin='dense'
                    type='submit'
                    onClick={(e) => onSignUp(e)}
                    fullWidth={true}
                    c>singup</Button>

                <p>Have an account?
                    <Link to='/login' style={{ textDecoration: 'none' }}>
                        <strong>Log in</strong>
                    </Link>
                </p>
            </div>

        </div>
    )
}

export default SignUp
