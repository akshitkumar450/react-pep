import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Alert, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Instagram from './Assets/Instagram.JPG'
import { Link } from 'react-router-dom'

function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')
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
                    fullWidth={true}
                />
                <TextField
                    id="outlined-email-input"
                    label="password"
                    type="password"
                    size='small'
                    margin='dense'

                    fullWidth={true}
                />
                <TextField
                    id="outlined-email-input"
                    label="full name"
                    type="text"
                    size='small'
                    margin='dense'

                    fullWidth={true}
                />
                <Button variant="outlined" color='secondary'
                    margin='dense'
                    fullWidth={true}
                > <CloudUploadIcon style={{ marginRight: '10px' }} />Upload profile image</Button>
                <Button variant="contained"
                    margin='dense'
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
