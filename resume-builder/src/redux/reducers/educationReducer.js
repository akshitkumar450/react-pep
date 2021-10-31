import { SET_EDUCATION, UPDATE_EDUCATION } from "../actions/ActionTypes";
import { initialState } from "./initialState";

export const educationReducer = (state = initialState.education, action) => {
    switch (action.type) {
        case SET_EDUCATION:
            return {
                ...state,
                education: action.payload
            }
        case UPDATE_EDUCATION:
            return {
                ...state,
                education: action.payload
            }
        default:
            return state
    }
}