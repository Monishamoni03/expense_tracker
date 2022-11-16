//ADMIN ---> Available Categories with add btn in the top, edit, delete

import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../../common/navbar";
import Buttons from "../../common/button";
import TableData from "../../common/table";
import { store } from "../../../store";
import { initialStateCategory, initialStateCategoryError } from "../../../shared/types/types";
import { CategoryInputFieldError, CategoryInputField } from "../../../shared/types/type";
import ValidateCategory from "../../../shared/utils/ValidateCategory";
import { editCategory } from "../../../action/action";
import { deleteCategory, getAllCategory } from "../../../action/action";
import { RowProps } from "../../../shared/types/type";
import "../../../assets/css/Style";
import "../../login/index.css";
import { Button } from "react-bootstrap";
import { columnCategory } from "../../config/category";
import successMessage from "../../../shared/utils/alertMessage";
import AddModalCategory from "./modal";
import ModalType from "../../common/modal";
import ValidateFields from "../../../shared/utils/ValidateFields";

const AllCategory: React.FC = () => {

    const navigate = useNavigate();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
    const categories = useSelector((state: any) => state.categoryData.categories);
    const [success, setSuccess] = useState(false);

    let [values, setValues] = useState<CategoryInputField>(initialStateCategory);
    const [error, setError] = useState<CategoryInputFieldError>(initialStateCategoryError);

    const [show, setShow] = useState(false);
    const [editShow, setEditShow] = useState(false);


    const rowCategory: RowProps[] = [] as RowProps[];

    useEffect(() => {
        dispatchStore(getAllCategory());
    }, [success]);

    // const categoryDelete = async (id: number) => {
    //     if (window.confirm('Are you sure you want to delete this Category?')) {
    //         await dispatchStore(deleteCategory(id));
    //         setSuccess(true);
    //         successMessage("Category deleted successfully")
    //     }
    // }

    const handleOnCategoryDeleteSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        // dispatchStore(deleteCategory(values.id));
        setSuccess(true);
        setShow(false);
        successMessage("Category deleted successfully");
    }

    const CategoryDelete = () => {
        console.log("----Category delete----");

        return (
            <>
                <ModalType
                    show={show}
                    handleClose={() => setShow(false)}
                    handleShow={() => setShow(true)}
                    modalTitle="Delete Category"
                >
                    Are you sure you want to delete this category?

                    {/* FOOTER */}

                    <Button variant="primary" onClick={handleOnCategoryDeleteSubmit}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Cancel
                    </Button>
                </ModalType>
            </>
        )
    }

    const categoryDelete = (id: number) => {
        setShow(true);
        dispatchStore(deleteCategory(id));
    }

    // const handleOnCategoryEditSubmit = (e: React.MouseEvent) => {
    //     e.preventDefault();

    //     console.log("value in onsubmit", values);

    //     const isValid = ValidateCategory(values);
    //     console.log("Is valid", isValid);
    //     setError({
    //         ...error,
    //         [e.target.name]: error
    //     })
    //     console.log("hello err: ", error);
    //     if (isValid) {
    //         dispatchStore(editCategory(values.id, values));
    //         setSuccess(true);
    //         successMessage("Successfully category name updated to the table");
    //         setEditShow(false);
    //         console.log("Output values", values);       //printing result
    //     }
    // };

    const handleOnCategoryEditSubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        dispatchStore(editCategory(values.id, values));
        if (!error.categoryName) {
            successMessage("Successfully category name updated to the table");
        }
        setSuccess(true);
        setEditShow(false);
    };

    const CategoryForm = (): any => {
        [values, setValues] = useState<CategoryInputField>(values);
        const [error, setError] = useState<CategoryInputFieldError>(initialStateCategoryError);

        const onCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
            const errorMsg = ValidateFields(e.target.name, e.target.value);
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
            setError({
                ...error,
                [e.target.name]: errorMsg
            })
    
            console.log("Login error: ", error)
        }

        return (
            <form className="login">
                <div className='login-form'>
                    <label htmlFor="categoryName">Category Name <sup>*</sup></label>
                    <input onChange={(e) => onCategory(e)} name='categoryName' value={values.categoryName} placeholder="Enter the category name" required />
                    <div style={{ color: "red" }}>{error.categoryName}</div>
                </div>
            </form>
        )
    }

    const CategoryEdit = () => {
        console.log("----Hi category edit-----");
        console.log("Value in edit fn", values);

        return (
            <>
                <ModalType
                    show={editShow}
                    handleClose={() => setEditShow(false)}
                    handleShow={() => setEditShow(true)}
                    modalTitle="Edit User"
                >
                    <CategoryForm />

                    {/* FOOTER */}

                    <Button variant="primary" onClick={handleOnCategoryEditSubmit}>
                        Update
                    </Button>
                    <Button variant="secondary" onClick={() => setEditShow(false)}>
                        Close
                    </Button>
                </ModalType>
            </>
        )
    }

    const handleOnCategoryEdit = (id, value) => {
        console.log("id", id);
        console.log("value", value);
        //retrieving old values
        setValues(value);
        setEditShow(true);
    }

    categories?.forEach((value: any) => {
        const object: RowProps = {
            key: value.id,
            categoryName: value.categoryName,
            actionButtons: [{
                children: "Update",
                onClick: () => handleOnCategoryEdit(value.id, value)
            },
            {
                children: "Delete",
                onClick: () => categoryDelete(value.id)
            }]
        }
        rowCategory.push(object)
    })

    return (
        <>
            <NavBar />
            <div className="admin-page">
                <h1 style={{ textAlign: "center" }}>Categories</h1>
                <Buttons
                    move="left"
                    onClick={() => navigate('/admin')}
                    text="Go Back"
                />
                <AddModalCategory />
                <CategoryEdit />
                <CategoryDelete />
            </div>

            <br /><br />
            <TableData columns={columnCategory} rows={rowCategory} />

        </>
    )
}

export default AllCategory;