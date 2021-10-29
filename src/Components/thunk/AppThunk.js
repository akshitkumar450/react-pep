import React from 'react'
import { connect } from 'react-redux'
import { fetchDog, fetchUsers } from './actions'

function AppThunk({ users, fetchUser, dog, fetchDog }) {
    return (
        <div>
            <h1>length:{users[0]?.length}</h1>
            <button onClick={fetchUser}>Fetch Users</button>
            <ul>
                {
                    users[0]?.map((user) => (
                        <li key={user.id} >{user.name}</li>
                    ))
                }
            </ul>

            <button onClick={fetchDog}>Fetch Dog</button>
            <p>{dog.status}</p>
            <img src={dog.message} width='200' alt="dog-img" />

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.user.users,
        dog: state.user.dog
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: () => dispatch(fetchUsers()),
        fetchDog: () => dispatch(fetchDog())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppThunk)