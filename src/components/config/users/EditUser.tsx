//ADMIN ---> Available USERS with add btn in the top, edit, delete

import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { editUser, getAllUser } from "../../../action/action";
import { store } from "../../../store/store";
import { RowProps } from "../../../shared/types/type";
import { initialStateUser, initialStateError } from "../../../shared/types/types";
import { InputFieldError, InputFieldUser } from "../../../shared/types/type";
import ValidateLogin from "../../../shared/utils/ValidateLogin";
import { addUser } from "../../../action/action";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import 'react-toastify/dist/ReactToastify.css';
import successMessage from "../../../shared/utils/alertMessage";
import "../../../assets/css/Style";
import "../../login/index.css";

const EditUser = ({id, value}): any => {
    console.log("Editing");
    console.log("id & VALUE", id, value);

    let [values, setValues] = useState<InputFieldUser>(initialStateUser);
    const [error, setError] = useState<InputFieldError>(initialStateError);

    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    const HandleEdit = (): any => {
        console.log("hello edit");
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const onLoginSubmit = (e: React.MouseEvent) => {
            e.preventDefault();
            handleClose();
        };

        const handleSubmit = (e: React.MouseEvent) => {
            e.preventDefault();
            // handleClose();
            console.log("value in onsubmit", values);
            
            const isValid = ValidateLogin(values);
            console.log("Is valid", isValid);
            setError({
                ...error,
                [e.target.name]: error
            })
            console.log("hello err: ", error);
            if (isValid) {
                dispatchStore(editUser(id, value));
                dispatchStore(getAllUser());
                console.log("Output values", values);           //printing result 
                // navigate('/admin/users');
                successMessage("Successfully user added to the table");
                setValues(initialStateUser);
            }
        };

        return (
            <>
                <Modal show={show} onHide={handleClose} onCancel={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleShow}>
                            Update
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    return (
        <HandleEdit />
    )

    // return (
    //     HandleEdit()
    // )


}

export default EditUser;