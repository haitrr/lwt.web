import {combineReducers, Reducer} from "redux";
import UserReducer from "src/Reducers/UserReducer";

/**
 * root reducer
 */
export const rootReducer:Reducer = combineReducers({
    User: UserReducer
});