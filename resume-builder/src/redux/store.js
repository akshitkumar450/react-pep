import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import { documentReducer } from "./reducers/documentReducer";
import { educationReducer } from "./reducers/educationReducer";
import { contactReducer } from "./reducers/contactReducer";
import thunk from 'redux-thunk'
import { authReducer } from "./reducers/authReducer";

const rootReducer = combineReducers({
    document: documentReducer,
    education: educationReducer,
    contact: contactReducer,
    auth: authReducer
})

export const store =
    createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))