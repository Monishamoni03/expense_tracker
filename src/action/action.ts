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
}