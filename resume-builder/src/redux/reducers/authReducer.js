import { REMOVE_ERROR, SIGN_IN_FAILED, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_OUT_FAILED, SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_UP_FAILED, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from "../actions/ActionTypes";
import { initialState } from "./initialState";

export const authReducer = (state = initialState.auth, action) => {
    switch (action.type) {
        case SIGN_UP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SIGN_UP_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                loading: false,
            }

        case SIGN_IN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SIGN_IN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
            }

        case SIGN_OUT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case REMOVE_ERROR:
            return {
                ...state,
                error: ''
            }
        default:
            return state
    }
}