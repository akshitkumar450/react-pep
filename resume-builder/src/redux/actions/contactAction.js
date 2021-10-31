import { SET_CONTACT, UPDATE_CONTACT } from "./ActionTypes"

export const setContact = (contact) => {
    return {
        type: SET_CONTACT,
        payload: contact //contact will be an object
    }
}

export const updateContact = (contact) => {
    return {
        type: UPDATE_CONTACT,
        payload: contact //contact will be an object
    }
}