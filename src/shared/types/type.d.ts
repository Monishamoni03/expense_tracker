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
    email?: string,
    password?: string,
    emailError?: string, 
    passwordError?: string
}

interface InputFieldUser {
    id?: number;
    email?: string,
    password?: string,
    role?: string,
    deptName?: string,
    categoryName?: string,
    successMessage?: any;
    errorMessage?: string;
}

interface DeptInputField {
    id?: number,
    deptName: string
}

interface DeptInputFieldError {
    deptName?: string
    deptNameError: string
}

interface CategoryInputField {
    id?: number,
    categoryName: string
}
interface CategoryInputFieldError {
    categoryName?: string,
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
    successMessage?: any;
    errorMessage?: any;
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