import * as types from "../action/actionType";

const initialState = {
    fields: [],
}

const userReducer = (state: InitialState = initialState, action: InitialAction): InitialState => {
    switch (action.type) {
        case types.LOGIN_USER: 
            return {
                ...state,
                fields: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;