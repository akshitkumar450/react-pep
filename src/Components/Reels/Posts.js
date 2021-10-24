import React, { useEffect, useState } from 'react'
import { db } from './firebase'
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import { Avatar } from '@mui/material';
import Like from './Like'
function Posts({ user }) {
    const [posts, setPosts] = useState([])

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
                            console.log(post);
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
