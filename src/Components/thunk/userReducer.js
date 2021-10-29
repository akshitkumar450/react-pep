import { FETCH_DOG, FETCH_USERS } from "./ActionsTypes"

const initialState = {
    users: [],
    dog: {}
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case FETCH_DOG:
            return {
                ...state,
                dog: action.payload
            }
        default:
            return state
    }
}