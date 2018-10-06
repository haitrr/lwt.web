import {combineReducers} from "redux";
import UserReducer from "./Reducers/UserReducer";

const RootReducer = combineReducers({
    User: UserReducer
});
export default RootReducer