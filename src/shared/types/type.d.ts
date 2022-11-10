import { IconButtonProps } from "@mui/material";
import { TableProps } from "@mui/material";

interface InputField {
    email?: string,
    password?: string,
    category?: string,
    department?: string,
    role?: string,
    deptName?: string,
    categoryName?: string
}

interface InputFieldError {
    emailError: string, 
    passwordError: string
}

interface InputFieldUser {
    id?: any;
    email?: string,
    password?: string,
    role?: string,
    deptName?: string,
    categoryName?: string
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
    payload: InputFieldUser[]
}

interface InitialLoginSingleAction {
    type: string,
    payload: InputFieldUser
}

interface UserState {
    users?: Array<InputFieldUser>;
    user?: InputFieldUser;
    depts?: Array<InputFieldUser>;
    dept?: InputFieldUser;
    categories?: Array<InputFieldUser>;
    category?: InputFieldUser;
}


export type UserActionsTypes = InitialLoginAction & InitialLoginSingleAction

// For Table Component

interface ColumnProps {
    title: string,
    key: string
}

interface RowProps {
    key?: string,
    email?: string,
    password?: string,
    role?: string,
    deptName?: string,
    categoryName?: string,
    id?: string,
    actionButtons?: IconButtonProps[],
    selector?: any
}

interface MUITableProps extends TableProps {
    rows?: RowProps[],
    columns: ColumnProps[]
}