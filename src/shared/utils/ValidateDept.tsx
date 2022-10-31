import * as regex from "../constants/regex";
import { DeptInputField } from "../types/type";
import { initialStateDeptError } from "../types/types";

const ValidateDept: React.FC <DeptInputField> = (deptValues): any => {
    console.log("Entered dept validation");
    // const values = (initialState);
    const error = (initialStateDeptError);

    if (deptValues.deptName === "") {
        error.deptNameError = "Please enter the department name";
    } else if (!regex.NAME_REGEX.test(deptValues.deptName)) {
        error.deptNameError = "Department name field should not contain numbers or special characters";
    }

    console.log("Department validation error: ", error);

    if (error.deptNameError) {
        return false;
    }

    return true;
}

export default ValidateDept;