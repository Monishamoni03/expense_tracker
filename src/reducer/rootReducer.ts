import { combineReducers } from "redux";
import userReducer from "./reducer";

const rootReducer = combineReducers({
    userData: userReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;