import * as types from "../action/actionType";
import { UserActionsTypes, UserState } from "../shared/types/type";

const initialState: UserState = {
    users: [{}],
    user: {
        email: '',
        password: '',
        role: '',
    },
    // addUserSuccess: {
    //     email: "",
    //     password: "",
    // },
    // editUserSuccess: {
    //     email: "",
    //     password: ""
    // },
    // deleteUserSuccess: {
    //     email: "",
    //     password: "",
    // },
}

const userReducer = (state: UserState = initialState, action: UserActionsTypes): UserState => {
    switch (action.type) {
        case types.LOGIN_USER:
            return {
                ...state,
                user: action.payload
            }
        case types.ADD_USER_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case types.EDIT_USER_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case types.DELETE_USER_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case types.SINGLE_USER:
            return {
                ...state,
                user: action.payload
            }
        case types.GET_ALL_USER:
            return {
                ...state,
                users: action.payload
            }
        case types.ADD_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;