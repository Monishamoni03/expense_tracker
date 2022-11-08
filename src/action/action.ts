import axios from "axios";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { CategoryInputField, DeptInputField, InputField, UserState } from "../shared/types/type";
import * as types from "./actionType";

export const loginUser = (values: InputField): any => ({
    type: types.LOGIN_USER,
    payload: values
})

export const allUser = (users: UserState): any => ({
    type: types.GET_ALL_USER,
    payload: users
})

export const addUserSuccess = (values: InputField): any => ({
    type: types.ADD_USER_SUCCESS,
    payload: values
})

export const editUserSuccess = (id): any => ({
    type: types.EDIT_USER_SUCCESS,
    payload: id
})

export const deleteUserSuccess = (id): any => ({
    type: types.DELETE_USER_SUCCESS,
    payload: id
})

export const addDeptSuccess = (values: DeptInputField): any => ({
    type: types.ADD_DEPT_SUCCESS,
    payload: values
})

export const deleteDeptSuccess = (id): any => ({
    type: types.DELETE_DEPT_SUCCESS,
    payload: id
})

export const allDept = (users: UserState): any => ({
    type: types.GET_ALL_DEPT,
    payload: users
})

export const addCategorySuccess = (values: CategoryInputField): any => ({
    type: types.ADD_CATEGORY_SUCCESS,
    payload: values
})

export const deleteCategorySuccess = (id): any => ({
    type: types.DELETE_CATEGORY_SUCCESS,
    payload: id
})

export const allCategory = (users: UserState): any => ({
    type: types.GET_ALL_CATEGORY,
    payload: users
})

export const loginData = (values: InputField) => (
    dispatch: Dispatch<any>
) => {
    axios.get("http://localhost:5000/user")
        .then((res) => {
            console.log("Login response : ", res.data);
            let result: string
            res.data.map(e => {
                // console.log("e in action",e);   //prints all the user data in db.json 
                if (e.email === values.email && e.password === values.password) {
                    dispatch(loginUser(e));
                    console.log("user exist", e.email);
                    // toast.success("Successfully Logged In--------")
                    sessionStorage.setItem('email', e.email)
                    sessionStorage.setItem('role', e.role)
                    console.log("item set");
                    
                    result = "User exist in DB"
                } else {
                    console.log("user does not exist");
                    result = "User does not exist in DB"
                }
            })
            //console.log("Login action result: ",result);    //prints -> user exist in db or not
            console.log("values from dispatch ; ", values)
        })
        .catch((error) => {
            console.log("Error in dispatch: ", error)
        })
}

export const addUser = (values: InputField) => (
    dispatch: Dispatch<any>
) => {
    axios.post("http://localhost:5000/user", values)
        .then((res) => {
            dispatch(addUserSuccess(res.data));
            console.log("Action add user: ", res.data);
            
        })
        .catch((error) => {
            console.log("Error in add user dispatch: ", error)
        })
}

export const editUser = (id: any, values: InputField) => (
    dispatch: Dispatch<any>
) => {
    axios.put(`http://localhost:5000/user/${id}`, id)
        .then((res) => {
            dispatch(editUserSuccess(res.data))
        })
        .catch((error) => {
            console.log("Error in edit user dispatch: ", error)
        })
}

export const getAllUser = () => (
    dispatch: Dispatch<any>
) => {
    axios.get("http://localhost:5000/user")
        .then((res) => {
            dispatch(allUser(res.data));
            console.log("Action all user: ", res.data);
            
        })
}

export const deleteUser = (id: any) => (
    dispatch: Dispatch<any>
) => {
    axios.delete(`http://localhost:5000/user/${id}`, id)
        .then((res) => {
            dispatch(deleteUserSuccess(res.data))
        })
        .catch((error) => {
            console.log("Error in delete user dispatch: ", error)
        })
}

export const addDept = (values: DeptInputField) => (
    dispatch: Dispatch<any>
) => {
    axios.post("http://localhost:5000/departments", values)
        .then((res) => {
            dispatch(addDeptSuccess(res.data));
            console.log("Action add department: ", res.data);
            
        })
        .catch((error) => {
            console.log("Error in add department dispatch: ", error)
        })
}

export const deleteDept = (id: any) => (
    dispatch: Dispatch<any>
) => {
    axios.delete(`http://localhost:5000/departments/${id}`, id)
        .then((res) => {
            dispatch(deleteDeptSuccess(res.data))
        })
        .catch((error) => {
            console.log("Error in delete department dispatch: ", error)
        })
}

export const getAllDept = () => (
    dispatch: Dispatch<any>
) => {
    axios.get("http://localhost:5000/departments")
        .then((res) => {
            dispatch(allDept(res.data));
            console.log("Action all dept: ", res.data);
            
        })
}

export const addCategory = (values: CategoryInputField) => (
    dispatch: Dispatch<any>
) => {
    axios.post("http://localhost:5000/categories", values)
        .then((res) => {
            dispatch(addCategorySuccess(res.data));
            console.log("Action add categories: ", res.data);
            
        })
        .catch((error) => {
            console.log("Error in add categories dispatch: ", error)
        })
}

export const deleteCategory = (id: any) => (
    dispatch: Dispatch<any>
) => {
    axios.delete(`http://localhost:5000/categories/${id}`, id)
        .then((res) => {
            dispatch(deleteCategorySuccess(res.data))
        })
        .catch((error) => {
            console.log("Error in delete categories dispatch: ", error)
        })
}

export const getAllCategory = () => (
    dispatch: Dispatch<any>
) => {
    axios.get("http://localhost:5000/categories")
        .then((res) => {
            dispatch(allCategory(res.data));
            console.log("Action all categories: ", res.data);
            
        })
}