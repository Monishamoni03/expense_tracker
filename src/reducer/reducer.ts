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
            return state
    }
}

export default userReducer;


// import * as types from "../action/actionType";

// const initialState: InitialState = {
//     fields: [],
// }

// const userReducer = (state: InitialState = initialState, action: InitialAction): InitialState => {
//     switch (action.type) {
//         case types.LOGIN_USER:
//             // const newField: InputField = {

//             // }
//             return {
//                 ...state,
//                 fields: action
//             }
//         default:
//             return state;
//     }
// }

// export default userReducer;


// import * as types from "../action/actionType";

// const initialState = {
//     users: [],
// }

// const userReducer = (state = initialState, action: { type: any; payload: any; }) => {
//     switch (action.type) {
//         case types.LOGIN_USER:
//             return {
//                 ...state,
//                 users: action.payload
//             }
//         default:
//             return state;
//     }
// }

// export default userReducer;