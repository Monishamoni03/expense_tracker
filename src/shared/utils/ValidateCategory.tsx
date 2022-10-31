import * as regex from "../constants/regex";
import { CategoryInputField } from "../types/type";
import { initialStateCategoryError } from "../types/types";

const ValidateCategory: React.FC <CategoryInputField> = (categoryValues): any => {
    console.log("Entered category validation");
    const error = (initialStateCategoryError);

    if (categoryValues.categoryName === "") {
        error.categoryNameError = "Please enter the category name";
    } else if (!regex.NAME_REGEX.test(categoryValues.categoryName)) {
        error.categoryNameError = "Category name field should not contain numbers or special characters";
    }

    console.log("Category validation error: ", error);

    if (error.categoryNameError) {
        return false;
    }

    return true;
}

export default ValidateCategory;