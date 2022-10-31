import { IconButtonProps } from "@mui/material"
import { TableProps } from "@mui/material";

interface InputField {
    email: string,
    password: string
}

interface InputFieldError {
    emailError: string, 
    passwordError: string
}

interface InputFieldUser {
    email: string,
    password: string,
    category: string,
    department: string
}

interface DeptInputField {
    deptName: string
}

interface DeptInputFieldError {
    deptNameError: string
}

interface CategoryInputField {
    categoryName: string
}
interface CategoryInputFieldError {
    categoryNameError: string
}

interface InitialLoginAction {
    type: string,
    payload: InputField
}

interface UserState {
    users: InputField[];
    user: InputField
}

export type UserActionsTypes = InitialLoginAction
// type DispatchType = (args: InitialAction) => InitialAction

interface ColumnProps {
    title: string,
    key: string
}

interface RowProps {
    key: number,
    actionButtons?: IconButtonProps[]
}

interface MUITableProps extends TableProps {
    rows?: RowProps[],
    columns: ColumnProps[]
}

// interface InitialState {
//     fields: InputField[]
// }

// export interface loginPayload {
//     message: string
// }