import { FETCH_USERS } from "./ActionsTypes"

const initialState = {
    users: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        default:
            return state
    }
}