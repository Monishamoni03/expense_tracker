import * as types from "../action/actionType";
import { UserActionsTypes, UserState } from "../shared/types/type";

const initialState: UserState = {
    users: [],
    user: {
        email: "",
        password: ""
    },
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
                users: [
                    action.payload
                ]
            } 
        default:
            return state;
    }
}

export default userReducer;