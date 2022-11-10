import * as types from "../action/actionType";
import { UserActionsTypes, UserState } from "../shared/types/type";

const initialState: UserState = {
    depts: [{}],
    dept: {
        deptName: '',
    }
}

const departmentReducer = (state: UserState = initialState, action: UserActionsTypes): UserState => {
    switch (action.type) {
        case types.ADD_DEPT_SUCCESS:
            return {
                ...state,
                dept: action.payload
            }
        case types.DELETE_DEPT_SUCCESS:
            return {
                ...state,
                dept: action.payload
            }
        case types.GET_ALL_DEPT:
            return {
                ...state,
                depts: action.payload

            }
        default:
            return state;
    }
}

export default departmentReducer;