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
import { addCategory } from "../../../action/action";
import { deleteCategory, getAllCategory } from "../../../action/action";
import { RowProps } from "../../../shared/types/type";
import "../../../assets/css/Style";
import "../../login/index.css";
import { Button, Modal } from "react-bootstrap";
import { columnCategory } from "../../config/category";

const AllCategory: React.FC = () => {
    const navigate = useNavigate();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
    const categories = useSelector((state: any) => state.categoryData.categories);
    const [success, setSuccess] = useState(false);

    let [values, setValues] = useState<CategoryInputField>(initialStateCategory);
    const [error, setError] = useState<CategoryInputFieldError>(initialStateCategoryError);

    // const columnsCategory: { title: string; key: string }[] = [
    //     { "title": "Id", "key": "id" },
    //     { "title": "Category Name", "key": "category name" },
    //     { "title": "Action", "key": "action" },
    //     { "title": "Action", "key": "action" }
    // ];

    useEffect(() => {
        dispatchStore(getAllCategory());
    }, [success]);

    const rowCategory: RowProps[] = [] as RowProps[];

    const handleEdit = (id: number) => {
        console.log("Handle edit");

    }

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this Category?')) {
            dispatchStore(deleteCategory(id));
            setSuccess(true);
        }
    }

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        const isValid = ValidateCategory(values);
        console.log("Is valid", isValid);
        setError({
            ...error,
            [e.target.name]: error
        })
        console.log("hello err: ", error);
        if (isValid) {
            dispatchStore(addCategory(values));
            dispatchStore(getAllCategory());
            console.log("Successfully Category Added to the table");
            console.log("Output values", values);    //printing result 
            navigate('/admin/categories');
            setValues(initialStateCategory);
        }
    };

    const CategoryForm = (): any => {
        [values, setValues] = useState<CategoryInputField>(initialStateCategory);
        const [error, setError] = useState<CategoryInputFieldError>(initialStateCategoryError);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
        }

        return (
            <form className="login">
                <div className='login-form'>
                    <label htmlFor="categoryName">Category Name <sup>*</sup></label>
                    <input onChange={(e) => handleChange(e)} name='categoryName' value={values.categoryName} placeholder="Enter the category name" required />
                    <div style={{ color: "red" }}>{error.categoryNameError}</div>
                </div>
                <div className='submit'>
                    <button className="login-button" onClick={handleSubmit} disabled={values === undefined ? true : false}>Submit</button>
                </div>
            </form>
        )
    }

    const HandleAdd = () => {
        console.log("hi add");
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const onLoginSubmit = (e: React.MouseEvent) => {
            e.preventDefault();
            handleClose();
        };

        return (
            <>
                <Buttons
                    move="right"
                    onClick={handleShow}
                    text="Add Category"
                />
                <Modal show={show} onHide={handleClose} onCancel={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CategoryForm />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    useEffect(() => {
        if (success) {
            alert("Category deleted successfully!")
        }
    }, [success])

    categories?.forEach((value: any) => {
        const object: RowProps = {
            key: value.id,
            categoryName: value.categoryName,
            actionButtons: [{
                children: "Update",
                onClick: () => handleEdit(value.id)
            },
            {
                children: "Delete",
                onClick: () => handleDelete(value.id)
            }]
        }
        rowCategory.push(object)
    })

    return (
        <>
            <NavBar />
            <div className="admin-page">
                <h1 style={{ textAlign: "center" }}>Available Categories</h1>
                <Buttons
                    move="left"
                    onClick={() => navigate('/admin')}
                    text="Go Back"
                />
                <HandleAdd />
            </div>

            <br /><br />
            <TableData columns={columnCategory} rows={rowCategory} />

        </>
    )
}

export default AllCategory;