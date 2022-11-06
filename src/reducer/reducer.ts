import * as types from "../action/actionType";
import { UserActionsTypes, UserState } from "../shared/types/type";

const initialState: UserState = {
    users: [],
    user: {
        email: "",
        password: ""
    },
    addUserSuccess: {
        email: "",
        password: "",
    },
    editUserSuccess: {
        email: "",
        password: ""
    },
    deleteUserSuccess: {
        email: "",
        password: "",
    },
    addDeptSuccess: {
        deptName: ""
    },
    deleteDeptSuccess: {
        deptName: ""
    },
    depts: [],
    addCategorySuccess: {
        categoryName: ""
    },
    deleteCategorySuccess: {
        categoryName: ""
    },
    categories: []
}

const userReducer = (state: UserState = initialState, action: UserActionsTypes): UserState => {
    switch (action.type) {
        case types.LOGIN_USER:
            return {
                ...state,
                user: action.payload
                // users: [
                //     action.payload
                // ]
            }
        case types.GET_ALL_USER:
            return {
                ...state,
                users: [action.payload]
            }
        case types.ADD_USER_SUCCESS:
            return {
                ...state,
                addUserSuccess: action.payload
            }
        case types.EDIT_USER_SUCCESS:
            return {
                ...state,
                editUserSuccess: action.payload
            }
        case types.DELETE_USER_SUCCESS:
            return {
                ...state,
                deleteUserSuccess: action.payload
            }
        case types.ADD_DEPT_SUCCESS:
            return {
                ...state,
                addDeptSuccess: action.payload
            }
        case types.DELETE_DEPT_SUCCESS:
            return {
                ...state,
                deleteDeptSuccess: action.payload
            }
        case types.GET_ALL_DEPT:
            return {
                ...state,
                depts: [action.payload]

            }
        case types.ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                addCategorySuccess: action.payload
            }
        case types.DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                deleteCategorySuccess: action.payload
            }
        case types.GET_ALL_CATEGORY:
            return {
                ...state,
                categories: [action.payload]

            }
        default:
            return state;
    }
}

export default userReducer;