import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./userReducer";
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    user: reducer
})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export default store