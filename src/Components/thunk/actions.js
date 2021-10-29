import { FETCH_DOG, FETCH_USERS } from "./ActionsTypes"

const users = (userData) => {
    return {
        type: FETCH_USERS,
        payload: userData
    }
}

const dog = (dogData) => {
    return {
        type: FETCH_DOG,
        payload: dogData
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

export const fetchDog = () => {
    return async (dispatch) => {
        const response = await fetch('https://dog.ceo/api/breeds/image/random')
        const data = await response.json()
        dispatch(dog(data))
    }
}