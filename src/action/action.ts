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

export const singleUser = (id): any => ({
    type: types.SINGLE_USER,
    payload: id
})

export const addUserSuccess = (values: InputField): any => ({
    type: types.ADD_USER_SUCCESS,
    payload: values
})

export const editUserSuccess = (values: InputField): any => ({
    type: types.EDIT_USER_SUCCESS,
    payload: values
})

export const deleteUserSuccess = (id): any => ({
    type: types.DELETE_USER_SUCCESS,
    payload: id
})

export const addDeptSuccess = (values: DeptInputField): any => ({
    type: types.ADD_DEPT_SUCCESS,
    payload: values
})

export const editDeptSuccess = (values: InputField): any => ({
    type: types.EDIT_DEPT_SUCCESS,
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

export const editCategorySuccess = (values: InputField): any => ({
    type: types.EDIT_CATEGORY_SUCCESS,
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

export const saveValue = (user): any => ({
    type: types.ADD_USER,
    payload: user
})

export const getSuccessMessage = (message) => ({
    type: types.GET_SUCCESS_MESSAGE,
    payload: message
})

export const getErrorMessage = (message) => ({
    type: types.GET_ERROR_MESSAGE,
    payload: message
})

export const loginData = (values: InputField) => (
    dispatch: Dispatch<any>
) => {
    axios.get("http://localhost:5000/user")
        .then((res) => {
            console.log("Login response : ", res.data);
            res.data.map(e => {
                // console.log("e in action",e);   //prints all the user data in db.json 
                if (e.email === values.email && e.password === values.password) {
                    dispatch(loginUser(e));
                    console.log("User exist in DB", e.email);
                    // toast.success("Successfully Logged In--------")
                    sessionStorage.setItem('email', e.email)
                    sessionStorage.setItem('role', e.role)
                    console.log("Item set");
                } else {
                    console.log("User does not exist in DB");
                }
            })
            console.log("Values from dispatch ; ", values)
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

// export const addUser = (values: InputField) => (
//     dispatch: Dispatch<any>
// ) => {   
//     // const users = useSelector((state: any) => state.userData.users);    
//     // const user = axios.get(`http://localhost:5000/user?email=${users.email}`)

//     // if (user) {
//     //     console.log("already exists----------");       
//     // } else {
//     axios.post("http://localhost:5000/user", values)
//         .then((res) => {
//             console.log("Add user response : ", res.data);
//             dispatch(addUserSuccess(res.data))
//         })
//         .catch((error) => {
//             console.log("Error in add user dispatch: ", error)
//         })
//     // }
// }

export const editUser = (id: any, values: InputField) => (
    dispatch: Dispatch<any>
) => {
    console.log("ENTERING EDIT")
    console.log("Edit user id : ", id)
    axios.put(`http://localhost:5000/user/${id}`, values)
        .then((res) => {
            dispatch(editUserSuccess(res.data))
            console.log("Response from edit user", res.data);

        })
        .catch((error) => {
            console.log("Error in edit user dispatch: ", error.response.data.error);
        })
}

export const getAllUser = () => (
    dispatch: Dispatch<any>
) => {
    axios.get("http://localhost:5000/user")
        .then((res) => {
            if (res.status === 200) {
                dispatch(allUser(res.data));
                console.log("Action all user: ", res.data);
            }
            // dispatch(allUser(res.data));
            // console.log("Action all user: ", res.data);

        })
        .catch((error) => {
            console.log("Error in all user dispatch: ", error.response.data.error);
        })
}

export const getSingleUser = (id: any) => (
    dispatch: Dispatch<any>
) => {
    axios.get(`http://localhost:5000/user/${id}`, id)
        .then((res) => {
            dispatch(singleUser(res.data));
            console.log("Action single user: ", res.data);

        })
        .catch((error) => {
            console.log("Error in get single user dispatch: ", error.response.data.error);
        })
}

export const deleteUser = (id: any) => (
    dispatch: Dispatch<any>
) => {
    console.log("DELETE ID : ", id);

    axios.delete(`http://localhost:5000/user/${id}`, id)
        .then((res) => {
            if (res.status === 200) {
                dispatch(deleteUserSuccess(res.data))
                dispatch(getSuccessMessage(`User ID: ${id}, deleted successfully`))
                console.log("delete response : ", res.data)
                console.log("res.status", res.status);   //prints 200
                console.log("res.message", res.data.message);    //undefined
                
                return { status: res.data.status }
            }

        })
        .catch((error) => {
            console.log("Error in delete user dispatch: ", error)
            dispatch(getErrorMessage(`This user ID: ${id} have not deleted`))
            return { status: false}
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

export const editDepartment = (id: any, values: InputField) => (
    dispatch: Dispatch<any>
) => {
    console.log("ENTERING EDIT")
    console.log("Edit department id : ", id)
    axios.put(`http://localhost:5000/departments/${id}`, values)
        .then((res) => {
            dispatch(editDeptSuccess(res.data))
            console.log("Response from edit department", res.data);

        })
        .catch((error) => {
            console.log("Error in edit department dispatch: ", error.response.data.error);
        })
}

export const deleteDept = (id: any) => (
    dispatch: Dispatch<any>
) => {
    console.log("DELTER ID : ", id);
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

export const editCategory = (id: any, values: InputField) => (
    dispatch: Dispatch<any>
) => {
    console.log("Edit category id : ", id)
    axios.put(`http://localhost:5000/categories/${id}`, values)
        .then((res) => {
            dispatch(editCategorySuccess(res.data))
            console.log("Response from edit category", res.data);

        })
        .catch((error) => {
            console.log("Error in edit department dispatch: ", error.response.data.error);
        })
}

export const deleteCategory = (id: any) => (
    dispatch: Dispatch<any>
) => {
    console.log("DELTER ID : ", id);
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

export const saveUser = (user) => (
    dispatch: Dispatch<any>
) => {
    dispatch(saveValue(user));
}