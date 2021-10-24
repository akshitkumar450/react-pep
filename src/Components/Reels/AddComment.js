import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { db } from './firebase'

function AddComment({ user, post: { data, id } }) {
    // console.log(user, post.data);
    const [comment, setComment] = useState('')
    const handleClick = () => {
        let obj = {
            comment: comment,
            name: user.name,
            photo: user.photo
        }
        // we will add the comment in the comments collection and after adding it will give us the comment id that we will store is the posts comments array in the current post
        db
            .collection('comments')
            .add(obj)
            .then((ref) => {
                db
                    .collection('posts')
                    .doc(id)
                    .update({
                        comment: [...data.comment, ref.id]
                    })
            })
        setComment('')
    }
    return (
        <div style={{ width: '100%' }}>
            <TextField id="outlined-basic" label="Comment" variant="outlined" size="small" sx={{ width: '80%' }} value={comment} onChange={(e) => setComment(e.target.value)} />
            <Button variant="contained" onClick={handleClick}>Post</Button>
        </div>
    )
}

export default AddComment
