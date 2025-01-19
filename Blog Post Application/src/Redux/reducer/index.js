import blogReducer from "./reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    blogReducer,
});

export default rootReducer;