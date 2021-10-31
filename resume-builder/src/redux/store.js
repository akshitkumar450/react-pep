import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import { documentReducer } from "./reducers/documentReducer";
import { educationReducer } from "./reducers/educationReducer";
import { contactReducer } from "./reducers/contactReducer";

const rootReducer = combineReducers({
    document: documentReducer,
    education: educationReducer,
    contact: contactReducer
})

export const store = createStore(rootReducer, composeWithDevTools())