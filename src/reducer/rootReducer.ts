import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import departmentReducer from "./departmentReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    userData: userReducer,
    departmentData: departmentReducer,
    categoryData: categoryReducer
});

export default rootReducer;