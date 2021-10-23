import { Alert, Button } from '@mui/material'
import React, { useState } from 'react'
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import { v4 as uuidv4 } from 'uuid'
import { db, storage } from './firebase';
import firebase from 'firebase';

function UploadFile(props) {
    // console.log(props);
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const uploadVideo = (file) => {
        // console.log(file);
        if (file == null) {
            setError("Please select a file first");
            setTimeout(() => {
                setError('')
            }, 2000)
            return;
        }

        // files size is in bytes
        if (file.size / (1024 * 1024) > 100) {
            setError('This video is very big! Please select less than 100 MBs');
            setTimeout(() => {
                setError('')
            }, 2000);
            return;
        }
        // console.log(name, email, userId, photo);

        // upload videos/images
        let uid = uuidv4()
        setLoading(true)
        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file)
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
                uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then((url) => {
                        // console.log(url);
                        setLoading(false)
                        let obj = {
                            likes: [],
                            comment: [],
                            postId: uid,
                            postUrl: url,
                            // these data are from current logged in user fetched from database
                            name: props.user.name,
                            email: props.user.email,
                            userId: props.user.userId,
                            photo: props.user.photo,
                            created: firebase.firestore.FieldValue.serverTimestamp()
                        }
                        // saving all the data to database
                        db
                            .collection('posts')
                            .add(obj)
                            // after the object is added to posts collection
                            // it will return the id of that current post
                            // that we will set in user as postId array to specific logged in user
                            // when we add the object on collection,then it will generate the id(ref object)  
                            .then(async (ref) => {
                                let response =
                                    await
                                        db
                                            .collection('users')
                                            // after saving the post in db we set the id of the post in the users db
                                            .doc(props.user.userId)
                                            .update({
                                                // here we adding the id of the posts in the user db
                                                postIds: props.user?.postIds != null ? [...props.user?.postIds, ref.id] : [ref.id]
                                            })
                            })
                            .then(() => {
                                setLoading(false)
                            })
                            .catch((err) => {
                                setError(err)
                                setTimeout(() => {
                                    setError('')
                                }, 2000)
                                setLoading(false)
                            })
                    })
            }
        )
    }
    return (
        <div className='uploadFile'>
            {
                error ?
                    <div className='uploadFile__alert'>
                        <Alert severity="error">{error}</Alert>
                    </div>
                    :
                    <>
                        <div
                            className='uploadFile__uploadBtn'
                        >
                            <Button
                                color='secondary'
                                variant="outlined"
                                margin='dense'
                                component='label'
                                disabled={loading}
                            >
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => uploadVideo(e.target.files[0])}
                                />
                                <MovieIcon />
                                &nbsp; Upload video
                            </Button>
                        </div>
                        <div className="upload__progress">
                            {loading && <LinearProgress color="secondary" />}
                        </div>
                    </>
            }
        </div>
    )
}

export default UploadFile
