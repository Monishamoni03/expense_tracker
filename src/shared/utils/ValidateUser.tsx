import * as regex from "../constants/regex";
import { InputField } from "../types/type";
import { initialStateError } from "../types/types";

const ValidateUser: React.FC <InputField> = (values): any => {
    console.log("Entered login validation");
    const error = (initialStateError);
    console.log("initial State login validation: ", error);
    
    if (values.email === "") {
        error.emailError = "Please enter your email";
    } else if (!regex.EMAIL_REGEX.test(values.email)) {
        error.emailError = "Invalid email address";
    }

    if (values.password === "") {
        error.passwordError = "Please enter your password";
    } else if (!regex.PASSWORD_REGEX.test(values.password)) {
        error.passwordError = "Should contain a minimum of 6 characters with special character and numbers";
    } 

    console.log("Login validation error: ", error);

    if (error.emailError || error.passwordError) {
        return false;
    }

    return true;
}

export default ValidateUser;