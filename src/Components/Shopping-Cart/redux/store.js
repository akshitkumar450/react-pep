import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./reducer";

const rootReducer = combineReducers({
    cart: reducer
})
const store = createStore(rootReducer, composeWithDevTools())

export default store