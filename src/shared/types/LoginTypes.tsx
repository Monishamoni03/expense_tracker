export interface InputField {   //props
    email: string,
    password: string
}

export interface InputFieldError {
    emailError: string, 
    passwordError: string
}

export const initialStates = {
    email: '',
    password: ''
}

export const initialStateError = {
    emailError: '',
    passwordError: '',
}