import { REMOVE_ERROR, SIGN_IN_FAILED, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_OUT_FAILED, SIGN_OUT_SUCCESS, SIGN_UP_FAILED, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from "./ActionTypes"

const signUpReq = () => {
    return {
        type: SIGN_UP_REQUEST
    }
}

const signUpFail = (err) => {
    return {
        type: SIGN_UP_FAILED,
        payload: err.message
    }
}

const signUpSuccess = () => {
    return {
        type: SIGN_UP_SUCCESS
    }
}

const removeError = () => {
    return {
        type: REMOVE_ERROR,

    }
}

export const signUp = (userData) => {
    return (dispatch, getState, { getFirebase, getFireStore }) => {
        dispatch(signUpReq())
        const firebase = getFirebase()
        const firestore = getFireStore()
        firebase
            .auth()
            .createUserWithEmailAndPassword(userData.email, userData.password)
            .then(async (data) => {
                const res =
                    await firestore
                        .collection('users')
                        .doc(data.user.uid)
                        .set({
                            email: userData.email,
                            resumeId: []
                        })
            })
            .catch((err) => {
                dispatch(signUpFail(err))
                setTimeout(() => {
                    dispatch(removeError())
                }, 2000)
            })
        dispatch(signUpSuccess())
    }
}


const signInReq = () => {
    return {
        type: SIGN_IN_REQUEST
    }
}

const signInFail = (err) => {
    return {
        type: SIGN_IN_FAILED,
        payload: err.message
    }
}

const signInSuccess = () => {
    return {
        type: SIGN_IN_SUCCESS
    }
}


export const signIn = (userData) => {
    return async (dispatch, getState, { getFirebase, getFireStore }) => {
        dispatch(signInReq())
        const firebase = getFirebase()
        try {
            const response =
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(userData.email, userData.password)
            dispatch(signInSuccess())
        }
        catch (err) {
            dispatch(signInFail(err))
            setTimeout(() => {
                dispatch(removeError())
            }, 2000)
        }
    }
}

const signOutSuccess = () => {
    return {
        type: SIGN_OUT_SUCCESS
    }
}
const signOutFail = (err) => {
    return {
        type: SIGN_OUT_FAILED,
        payload: err.message
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase, getFireStore }) => {
        const firebase = getFireStore()
        firebase
            .auth()
            .singOut()
            .then((user) => {
                dispatch(signOutSuccess())
            })
            .catch((err) => {
                dispatch(signOutFail())
                setTimeout(() => {
                    dispatch(removeError())
                }, 2000)
            })
    }
}