import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Alert, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Instagram from './Assets/Instagram.JPG'
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from './stateProvider';
import { auth, db, storage } from './firebase'
import firebase from 'firebase';

function SignUp() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const [state, dispatch] = useStateValue()

    const onSignUp = (e) => {
        e.preventDefault()
        setLoading(true)
        if (image === null) {
            setError('please upload image')
            setTimeout(() => {
                setError('')
            }, 4000)
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                console.log('signuped');
                authUser.user.updateProfile({
                    // change the displayName
                    displayName: name,
                })
                    .then(() => {
                        dispatch({
                            // saving the object in reducer
                            type: 'SIGN_IN',
                            payload: {
                                uid: authUser.user.uid,
                                email: authUser.user.email,
                                name: name,
                            }
                        })
                    })
                handleUpload(authUser.user.uid)
                setLoading(false)
                history.push('/')

            })
            .catch((err) => {
                setError(err.message)
                setTimeout(() => {
                    setError('')
                }, 4000)
            })
    }
    // console.log(state.user?.uid);
    // console.log(state.user);

    const handleUpload = (id) => {
        // uploading image to storage in firebase 
        // images will be available in storage section the folder images (in firebase)
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        // progress
        uploadTask.on(
            "state_changed", (snapshot) => {
                // progress function
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                console.log(`progress ${progress} done`);
            },
            (err) => {
                // error
                setError(err.message)
                setTimeout(() => {
                    setError('')
                }, 4000)
                return;
            },
            () => {
                // complete fn
                // getting image from images folder in the storage section in firebase
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        // console.log(url);
                        db
                            .collection('users')
                            .add({
                                name: name,
                                email: email,
                                userId: id,
                                photo: url,
                                created: firebase.firestore.FieldValue.serverTimestamp()
                            })
                    })
            }
        )

    }
    return (
        <div className='signUp'>
            <div className="signUp__form">
                <img src={Instagram} alt="logo" />
                {
                    error &&
                    <Alert severity="error" className='signUp__alert'>{error}</Alert>
                }
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
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </Button>

                <Button variant="contained"
                    margin='dense'
                    type='submit'
                    onClick={(e) => onSignUp(e)}
                    fullWidth={true}
                    disabled={(!email || !password) || loading}
                >singup</Button>

                <p>Have an account?
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <strong>Log in</strong>
                    </Link>
                </p>
            </div>

        </div>
    )
}

export default SignUp
