//ADD USER - MODAL [New]

import React, { Dispatch, useEffect, useState } from "react";
import { InputFieldError, InputFieldUser } from "../../../../shared/types/type";
import { initialStateError, initialStateUser } from "../../../../shared/types/types";
import ConfirmModal from "../../../common/modal";
import { store } from "../../../../store";
import { addUser, getAllUser } from "../../../../action/action";
import ValidateUser from "../../../../shared/utils/ValidateUser";
import successMessage from "../../../../shared/utils/alertMessage";
import { Button } from "react-bootstrap";
import Buttons from "../../../common/button";
import { AddUserModal } from "../../../config/users";

const AddUserModalData = () => {

    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);

    let [values, setValues] = useState<InputFieldUser>(initialStateUser);
    const [error, setError] = useState<InputFieldError>(initialStateError);

    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    useEffect(() => {
        dispatchStore(getAllUser());
    }, [success]);

    const UserModalSubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        const isValid = ValidateUser(values);
        console.log("Is valid", isValid);
        setError({
            ...error,
            [e.target.name]: error
        })
        console.log("hello err: ", error);
        if (isValid) {
            dispatchStore(addUser(values));
            setSuccess(true);
            successMessage("Successfully user added to the table");
            setShow(false);         // modal close
            setValues(initialStateUser);
        }
    };

    return (
        <div className="addModal">

            <Buttons
                move="right"
                onClick={() => setShow(true)}
                text="Add User"
            />

            <ConfirmModal
                show={show}
                handleClose={() => setShow(false)}
                handleShow={() => setShow(true)}
                modalTitle="Add User"
                config={AddUserModal()}
            >

                {/* FOOTER */}
                
                {/* <Button variant="primary" onClick={UserModalSubmit}>
                    Submit
                </Button> */}
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
            </ConfirmModal>

        </div>
    );
}

export default AddUserModalData;