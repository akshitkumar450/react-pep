import { REMOVE_ERROR, SIGN_IN_FAILED, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_OUT_FAILED, SIGN_OUT_SUCCESS, SIGN_UP_FAILED, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from "./ActionTypes"

export const signUpReq = () => {
    return {
        type: SIGN_UP_REQUEST
    }
}

export const signUpFail = (err) => {
    return {
        type: SIGN_UP_FAILED,
        payload: err
    }
}

export const signUpSuccess = (user) => {
    return {
        type: SIGN_UP_SUCCESS,
        payload: user
    }
}

export const removeError = () => {
    return {
        type: REMOVE_ERROR,

    }
}

export const signInReq = () => {
    return {
        type: SIGN_IN_REQUEST
    }
}

export const signInFail = (err) => {
    return {
        type: SIGN_IN_FAILED,
        payload: err
    }
}

export const signInSuccess = (user) => {
    return {
        type: SIGN_IN_SUCCESS,
        payload: user
    }
}

export const signOutSuccess = () => {
    return {
        type: SIGN_OUT_SUCCESS
    }
}
export const signOutFail = (err) => {
    return {
        type: SIGN_OUT_FAILED,
        payload: err
    }
}
