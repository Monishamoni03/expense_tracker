import axios from "axios";
import * as types from "./actionType";

const loginUser = (user: string) => ({
    type: types.LOGIN_USER,
    payload: user,
});

export function loginData(action: InitialAction) {
    return async function (dispatch: DispatchType) {
        axios.post("http://localhost:5000/users", action)
            .then((res) => {
                if (res) {
                    console.log("Response Login: ", res);
                    dispatch(loginUser(res.data))
                }
            })
            .catch((error) => {
                console.log("Error Response Login", error);
            })
    }

// export function loginUser(field: InputField) {
//     const action: InitialAction = {
//         type: types.LOGIN_USER,
//         payload: field,
//     }
//     return loginData(action)
// }


// export function loginData(action: InitialAction) {
//     return async function (dispatch: DispatchType) {
//         axios.post("http://localhost:5000/users", action)
//             .then((res) => {
//                 if (res) {
//                     console.log("Response Login: ", res);
//                     dispatch(action)
//                 }
//             })
//             .catch((error) => {
//                 console.log("Error Response Login", error);
//             })
//     }
// }

// import axios from "axios";
// import * as types from "./actionType";
// // import axiosInstance from "../api/axios";

// const loginUser = (user: any) => ({
//     type: types.LOGIN_USER,
//     payload: user,
// });

// export const loginData = (user) => {
//     return async function (dispatch: (arg0: { type: string; payload: any; }) => void) {
//         axios.post("http://localhost:5000/users", user)
//             .then((res) => {
//                 if (res) {
//                     console.log("Response Login: ", res);                    
//                     dispatch(loginUser(res.data))
//                 }
//             })
//             .catch ((error) => {
//                 console.log("Error Response Login",error);
//             })
//     }
// }