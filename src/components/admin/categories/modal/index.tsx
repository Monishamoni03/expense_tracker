//ADD DEPARTMENT - Modal

import React, { Dispatch, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addCategory, addDept, getAllCategory } from '../../../../action/action';
import { CategoryInputField, CategoryInputFieldError } from '../../../../shared/types/type';
import { initialStateCategory, initialStateCategoryError } from '../../../../shared/types/types';
import successMessage from '../../../../shared/utils/alertMessage';
import ValidateCategory from '../../../../shared/utils/ValidateCategory';
import { store } from '../../../../store';
import Buttons from '../../../common/button/index';

const AddModalCategory = () => {

    let [values, setValues] = useState<CategoryInputField>(initialStateCategory);
    const [error, setError] = useState<CategoryInputFieldError>(initialStateCategoryError);
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);

    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    const categoryModalClose = () => setShow(false);
    const categoryModalShow = () => setShow(true);

    useEffect(() => {
        dispatchStore(getAllCategory());
    }, [success]);

    const categoryModalSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        categoryModalClose();

        const isValid = ValidateCategory(values);
        console.log("Is valid", isValid);
        setError({
            ...error,
            [e.target.name]: error
        })
        console.log("hello err: ", error);
        if (isValid) {
            await dispatchStore(addCategory(values));
            setSuccess(true);
            console.log("Output values", values);       //printing result 
            successMessage("Successfully category added to the table");
            setValues(initialStateCategory);
        }
    };

    const CategoryForm = (): any => {
        [values, setValues] = useState<CategoryInputField>(initialStateCategory);
        const [error, setError] = useState<CategoryInputFieldError>(initialStateCategoryError);

        const onCategory = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setValues(
                {
                    ...values,
                    [e.target.name]: e.target.value
                }
            )
        }

        return (
            <form className="login">
                <div className='login-form'>
                    <label htmlFor="categoryName">Category Name <sup>*</sup></label>
                    <input onChange={(e) => onCategory(e)} name='categoryName' value={values.categoryName} placeholder="Enter the category name" required />
                    <div style={{ color: "red" }}>{error.categoryNameError}</div>
                </div>
            </form>
        )
    }

    return (
        <>
            <Buttons
                move="right"
                onClick={categoryModalShow}
                text="Add Category"
            />

            <Modal show={show} onHide={categoryModalClose} onCancel={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CategoryForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={categoryModalSubmit}>
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={categoryModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddModalCategory;