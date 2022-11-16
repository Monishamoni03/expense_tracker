import * as regex from "../constants/regex";

const regexMap = {
    "email": regex.EMAIL_REGEX,
    "password": regex.PASSWORD_REGEX,
    "deptName": regex.NAME_REGEX,
    "categoryName": regex.NAME_REGEX
};

const error = {
    "emailError": "Invalid email address",
    "passwordError": "Should contain a minimum of 6 characters with special character and numbers",
    "deptNameError": "Department name should not contain numbers or special characters",
    "categoryNameError": "Category name should not contain numbers or special characters"
};

const ValidateFields = (name, value): any => {
    if (value === "") {
        return `Please enter your ${name}`;
    } else {
        if (!regexMap[name].test(value)) {
            return error[name+"Error"];
        }
    }
    return "";
}

export default ValidateFields;