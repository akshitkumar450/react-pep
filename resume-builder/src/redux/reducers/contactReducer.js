import { SET_CONTACT, UPDATE_CONTACT } from "../actions/ActionTypes";
import { initialState } from "./initialState";

export const contactReducer = (state = initialState.contact, action) => {
    switch (action.type) {
        case SET_CONTACT:
            return {
                ...state,
                contact: action.payload
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contact: action.payload
            }
        default:
            return state
    }
}