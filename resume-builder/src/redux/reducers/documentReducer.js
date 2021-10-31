import { SET_SKIN, UPDATE_SKIN } from "../actions/ActionTypes";
import { initialState } from "./initialState";

export const documentReducer = (state = initialState.document, action) => {
    switch (action.type) {
        case SET_SKIN:
            return {
                ...state,
                id: action.payload.id,
                skinCode: action.payload.skinCode
            }
        case UPDATE_SKIN:
            return {
                ...state,
                skinCode: action.payload.skinCode
            }
        default:
            return state
    }
}