import axios from "axios";
import { Dispatch } from "redux";
import { InputField, UserState } from "../shared/types/type";
import * as types from "./actionType";

export const loginUser = (values: InputField): any => ({
    type: types.LOGIN_USER,
    payload: values
})

export const allUser = (users: UserState): any => ({
    type: types.GET_ALL_USER,
    payload: users
})

export const loginData = (values: InputField) => (
    dispatch: Dispatch<any>
) => {
    axios.get("http://localhost:5000/user")
        .then((res) => {
            console.log("Login response : ", res.data);
            let result
            res.data.map(e => {
                console.log("e in action",e);   //prints all the user data in db.json 
                if (e.email === values.email && e.password === values.password) {
                    dispatch(loginUser(values));
                    console.log("user exist");
                    result = "User exist in DB"
                } else {
                    result = "User does not exist in DB"
                }
            })
            console.log("Login action result: ",result);    //prints -> user exist in db or not
            console.log("values from dispatch ; ", values)
        })
        .catch((error) => {
            console.log("Error in dispatch: ", error)
        })
}

export const getAllUser = (users: UserState) => (
    dispatch: Dispatch<any>
) => {
    axios.get("http://localhost:5000/user")
        .then((res) => {
            dispatch(allUser(res.data));
            console.log("Action all user: ", res.data);
            
        })
}