import { SET_EDUCATION, UPDATE_EDUCATION } from "./ActionTypes"

export const setEducation = (education) => {
    return {
        type: SET_EDUCATION,
        payload: education //Education will be an object
    }
}

export const updateEducation = (education) => {
    return {
        type: UPDATE_EDUCATION,
        payload: education //Education will be an object
    }
}