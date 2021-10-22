export const initialState = {
    user: null
}

export const reducer = (state = initialState, action) => {
    console.log(action);
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