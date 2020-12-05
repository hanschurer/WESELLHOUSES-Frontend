import { createStore, applyMiddleware } from "redux";
import { finalReducer } from "./reducer";
import thunk from "redux-thunk";
const store = createStore(finalReducer, applyMiddleware(thunk));

export default store;