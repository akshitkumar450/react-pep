import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from './actions'

function AppThunk({ users, fetchUser }) {
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
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.user.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: () => dispatch(fetchUsers())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppThunk)