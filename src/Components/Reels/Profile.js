import { Card, CircularProgress, Dialog, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { db } from './firebase'
import Like from './Like'
import Navbar from './Navbar'
import Like2 from './Like2';
import AddComment from './AddComment';
import Comments from './Comments';

function Profile() {
    // fetching the id of user from url
    const { id } = useParams()
    const [user, setUser] = useState('')
    const [posts, setPosts] = useState([])
    const [open, setOpen] = useState(null)

    useEffect(() => {
        // fetching the user with id
        // we have fetched the id to get the data of the user from db to show in navbar
        // and to show the user info in profile page
        const fetchUser = async () => {
            await db
                .collection('users')
                .doc(id)
                .onSnapshot((snapshot) => {
                    return setUser(snapshot.data())
                })

        }
        fetchUser()
    }, [id])

    // fetching the posts for the current user
    // every user has postIds array having ids of all the posts created by a user
    // we are looping through the postIds array and fetching the posts with corresponding id from posts collection
    // after that we are showing the posts (videos) by user
    useEffect(() => {
        const fetchPosts = async () => {
            let postArr = []
            for (let i = 0; i < user?.postIds?.length; i++) {
                await db
                    .collection('posts')
                    .doc(user.postIds[i])
                    .get()
                    .then((data) => {
                        // console.log(data.data(), data.id);
                        // postArr.push([...postArr, data.data()])
                        postArr.push({ ...data.data() })
                    }).catch((err) => {
                        console.log(err.message);
                    })
                // postArr.push(postData.data())
                // console.log(postData.data());
            }
            // console.log(postArr);
            setPosts(postArr)
        }
        fetchPosts()
        // setPosts(postArr)
    }, [user])
    // console.log(user.postIds);
    // console.log(posts);
    // console.log(open);
    return (
        <div>
            {
                user === ''
                    ?
                    <CircularProgress />
                    :
                    <>
                        <Navbar user={user} />
                        <div className='profile__container'>
                            <div className='profile__image'>
                                <img src={user.photo} height='200' alt="" />
                            </div>
                            <div className='profile__info'>
                                <p>
                                    Total posts: {user.postIds.length}
                                </p>
                                <p>
                                    name:  {user.name}
                                </p>

                                <p>
                                    email: {user.email}
                                </p>
                            </div>
                        </div>

                        <div className='profile__videos' style={{ margin: '20px 0' }}>
                            {posts?.map((post) => {
                                console.log(post);
                                return (
                                    <React.Fragment key={post.postId}>
                                        <div onClick={() => setOpen(post.postId)}>
                                            <video style={{ cursor: 'pointer' }} src={post.postUrl} muted />
                                        </div>

                                        {/**it will open only when the open is equal to current post id */}
                                        <Dialog
                                            open={open === post.postId}
                                            onClose={() => setOpen(null)}
                                            fullWidth={true}
                                            maxWidth='md'
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <div className="modal__container">
                                                <div className="modal__videoContainer">
                                                    <div className='modal__video'>
                                                        <video src={post.postUrl} controls autoPlay muted />
                                                    </div>
                                                </div>
                                                <div className="modal__commentsContainer" >
                                                    <Card variant='outlined' style={{ width: '450px', height: '60vh' }} >
                                                        <Comments post={post} />
                                                    </Card>

                                                    <Card
                                                        variant='outlined' style={{ padding: '20px', width: '450px', height: '20vh' }}
                                                    >
                                                        <Typography
                                                            style={{ textAlign: 'center' }}
                                                        >
                                                            {
                                                                post.likes.length === 0 ? 'liked by 0 users' : `liked by ${post.likes.length} users`
                                                            }
                                                        </Typography>
                                                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }} >
                                                            <AddComment user={user} post={post} />
                                                        </div>
                                                    </Card>
                                                </div>
                                            </div>
                                        </Dialog>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    </>
            }
        </div>
    )
}

export default Profile
