import {combineReducers, Reducer} from "redux";
import { userReducer } from './Reducers/UserReducer';

/**
 * root reducer
 */
export const rootReducer:Reducer = combineReducers({
    User: userReducer
});