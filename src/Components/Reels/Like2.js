import React, { useState, useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { db } from './firebase';
function Like2({ user, post: { data, id } }) {
    const [like, setLike] = useState(null)
    // console.log(post.data);
    // console.log(data);
    // console.log(user);
    // console.log(id); posts id
    useEffect(() => {
        // we are adding the user id to likes array if user has liked a video
        let check = data.likes.includes(user.userId) ? true : false
        setLike(check)
    }, [data, user.userId])
    // console.log(like);
    const handleLike = () => {
        // if the video is already like and we want to unlike
        if (like === true) {
            // for doing unlike
            // if we unlike a video just remove the user id from likes array and then update the likes array in db
            let newLikes = data.likes.filter((el) => el !== user.userId)
            db
                .collection('posts')
                .doc(id)
                .update({
                    likes: newLikes
                })
        } else {
            // for doing like
            // if we like a video just add the user id to likes array and then update the likes array in db
            let newLikes =
                [...data.likes, user.userId]
            db
                .collection('posts')
                .doc(id)
                .update({
                    likes: newLikes
                })
        }
    }
    return (
        <div style={{ padding: '10px' }}>
            {
                like != null ?
                    <>
                        {
                            like === true
                                ?
                                <FavoriteIcon className={`like`}
                                    onClick={handleLike} />
                                :
                                <FavoriteIcon className={` unlike2`} onClick={handleLike} />
                        }
                    </> :
                    <></>
            }
        </div>
    )
}

export default Like2
