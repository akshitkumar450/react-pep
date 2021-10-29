import { FETCH_USERS } from "./ActionsTypes"

const users = (userData) => {
    return {
        type: FETCH_USERS,
        payload: userData
    }
}


export const fetchUsers = () => {
    return async (dispatch) => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        // console.log(data);
        dispatch(users(data))
    }
}