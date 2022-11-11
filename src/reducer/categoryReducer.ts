import * as types from "../action/actionType";
import { UserActionsTypes, UserState } from "../shared/types/type";

const initialState: UserState = {
    categories: [{}],
    category: {
        categoryName: ''
    }
}

const categoryReducer = (state: UserState = initialState, action: UserActionsTypes): UserState => {
    switch (action.type) {
        case types.ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                category: action.payload
            }
        case types.EDIT_CATEGORY_SUCCESS:
            return {
                ...state,
                category: action.payload
            }
        case types.DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                category: action.payload
            }
        case types.GET_ALL_CATEGORY:
            return {
                ...state,
                categories: action.payload

            }
        default:
            return state;
    }
}

export default categoryReducer;