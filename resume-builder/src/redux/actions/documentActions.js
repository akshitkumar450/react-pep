import { SET_SKIN, UPDATE_SKIN } from "./ActionTypes"
import { v4 as uuidv4 } from 'uuid';

export const setDocument = (skinCode) => {
    return {
        type: SET_SKIN,
        payload: {
            id: uuidv4(),
            skinCode: skinCode
        }
    }
}
export const updateDocument = (skinCode) => {
    return {
        type: UPDATE_SKIN,
        payload: {
            skinCode: skinCode
        }
    }
}