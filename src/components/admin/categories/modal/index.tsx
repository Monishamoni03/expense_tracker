//ADD CATEGORY - Modal

import React, { Dispatch, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { addCategory, getAllCategory } from '../../../../action/action';
import { CategoryInputField, CategoryInputFieldError } from '../../../../shared/types/type';
import { initialStateCategory, initialStateCategoryError } from '../../../../shared/types/types';
import { store } from '../../../../store';
import Buttons from '../../../common/button/index';
import ModalType from '../../../common/modal';
import AddModalCategory from '../../../config/category';

const AddCategoryModalData = () => {

    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);

    let [values, setValues] = useState<CategoryInputField>(initialStateCategory);
    const [error, setError] = useState<CategoryInputFieldError>(initialStateCategoryError);

    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    useEffect(() => {
        dispatchStore(getAllCategory());
    }, [success]);

    return (
        <>
            <div className="addModal">

                <Buttons
                    move="right"
                    onClick={() => setShow(true)}
                    text="Add Category"
                />

                <ModalType
                    show={show}
                    handleClose={() => setShow(false)}
                    handleShow={() => setShow(true)}
                    modalTitle="Add Category"
                    config={<AddModalCategory />}
                >

                    {/* FOOTER */}

                {/*<Button variant="primary" onClick={UserModalSubmit}>
                        Submit
                    </Button> */}
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                </ModalType>

            </div>
        </>
    );
}

export default AddCategoryModalData;