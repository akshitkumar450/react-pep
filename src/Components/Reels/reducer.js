export const initailState = {
    user: null
}

export const reducer = (state = initailState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                user: action.payload
            }
        case 'SIGN_OUT':
            return {
                ...state,
                user: null
            }
        default:
            return {
                state
            }
    }
}