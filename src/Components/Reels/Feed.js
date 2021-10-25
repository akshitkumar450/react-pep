import React, { useEffect, useState } from 'react'
import { auth, db } from './firebase'
import { useStateValue } from './stateProvider'
import Navbar from './Navbar'
import UploadFile from './UploadFile'
import Posts from './Posts'

function Feed() {
    const [state, dispatch] = useStateValue()
    const [data, setData] = useState([])

    // getting the data of the current logged in user
    useEffect(() => {
        const unsubscribe = db
            .collection('users')
            .doc(state.user?.uid)
            .onSnapshot((snapshot) => {
                return setData(snapshot.data())
            })
        return () => {
            unsubscribe()
        }
    }, [state.user])

    // console.log(state.user);
    // getting the data for the current logged in user
    // console.log(data);
    return (
        <div className='feed'>
            <Navbar user={data} />
            <UploadFile
                user={data}
            />
            <Posts user={data} />
        </div>
    )
}

export default Feed
