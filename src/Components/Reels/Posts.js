import React, { useEffect, useState } from 'react'
import { db } from './firebase'
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import { Avatar, Dialog, Typography } from '@mui/material';
import Like from './Like'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Card from '@mui/material/Card';
import Like2 from './Like2';
import AddComment from './AddComment';
import Comments from './Comments';

function Posts({ user }) {
    const [posts, setPosts] = useState([])
    // we are storing the id of the post 
    const [open, setOpen] = useState(null)

    useEffect(() => {
        const unsubscribe =
            db
                .collection('posts')
                .orderBy('created', 'desc')
                .onSnapshot((snapshot) => {
                    return (
                        setPosts(snapshot.docs.map((doc) => {
                            return {
                                data: doc.data(),
                                id: doc.id
                            }
                        }))
                    )
                })

        return () => {
            unsubscribe()
        }
    }, [])
    // console.log(posts);

    return (
        <div>

            {
                posts.length === 0
                    ?
                    <div className="posts__loader">
                        <CircularProgress />
                    </div>
                    :
                    <div className="posts__videoContainer">
                        {posts?.map((post) => {
                            // console.log(post);
                            return (
                                <React.Fragment key={post.id}>
                                    <div className='posts__videos'>
                                        <Video src={post.data.postUrl} />
                                        <div className='posts__userInfo' style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <Avatar alt="Remy Sharp" src={user?.photo} />
                                            <h4>{user?.name}</h4>
                                        </div>
                                        <Like user={user} post={post} />
                                        <ChatBubbleIcon className='posts__commentIcon'
                                            onClick={() => setOpen(post.id)} />

                                        {/**it will open only when the open is equal to current post id */}
                                        <Dialog
                                            open={open === post.id}
                                            onClose={() => setOpen(null)}
                                            fullWidth={true}
                                            maxWidth='md'
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <div className="modal__container">
                                                <div className="modal__videoContainer">
                                                    <div className='modal__video'>
                                                        <video src={post.data.postUrl} controls autoPlay muted />
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
                                                                post.data.likes.length === 0 ? 'liked by 0 users' : `liked by ${post.data.likes.length} users`
                                                            }
                                                        </Typography>
                                                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }} >
                                                            <Like2 user={user} post={post} />
                                                            <AddComment user={user} post={post} />
                                                        </div>
                                                    </Card>
                                                </div>
                                            </div>
                                        </Dialog>
                                    </div>

                                </React.Fragment>
                            )
                        })}
                    </div>
            }

        </div >
    )
}

export default Posts
