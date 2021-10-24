import { Avatar, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { db } from './firebase'

// data and id is for selected post
function Comments({ post: { data, id } }) {
    // console.log(data, id);
    const [comments, setComments] = useState(null)

    useEffect(() => {
        // fetching the comments for the current post on which we click
        const fetchComments = async () => {
            let narr = []
            // we are lopping in the comment array in the posts collection for a current post, where we have stored the comment ids
            for (let i = 0; i < data?.comment?.length; i++) {
                // console.log(data.comment[i]);
                // fetching the comments from comments collection for ids stored in post comments array
                let commentFromDb = await db
                    .collection('comments')
                    .doc(data.comment[i])
                    .get()
                // .onSnapshot((snapshot) => {
                //     // console.log(snapshot.data(), snapshot.id)
                //     return (snapshot.data(), snapshot.id)
                // })
                // console.log(commentFromDb.data());
                narr.push(commentFromDb.data())
                // console.log(narr);
            }
            setComments(narr)
        }
        fetchComments()

    }, [data])
    // console.log(comments);
    return (
        <div>
            {
                comments === null ?
                    <CircularProgress />
                    :
                    <>
                        {
                            comments.map((comment, idx) => {
                                // console.log(comment);
                                return (
                                    <div style={{ display: 'flex', padding: '10px', alignItems: 'center' }}>
                                        <Avatar src={comment.photo} />
                                        &nbsp;
                                        &nbsp;
                                        <p>{comment.name} &nbsp;   &nbsp;{comment.comment}</p>
                                    </div>
                                )
                            })
                        }
                    </>
            }
        </div>
    )
}

export default Comments
