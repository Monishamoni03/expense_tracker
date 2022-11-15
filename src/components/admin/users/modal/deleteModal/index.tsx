import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import successMessage from "../../../../../shared/utils/alertMessage";

const DeleteModal = (id: any): any => {

    console.log("MODAL DELETE:", id);
    
    const [deleteShow, setDeleteShow] = useState(false);
    const UserDeleteModalClose = () => setDeleteShow(false);
    const UserDeleteModalShow = () => setDeleteShow(true);
    const [success, setSuccess] = useState(false);

    const UserDeleteSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        // console.log("delete id  in usersubmit : ", values.id)
        // dispatchStore(deleteUser(values.id));
        setSuccess(true);
        UserDeleteModalClose();
        successMessage("User deleted successfully");
    }

    const UserDelete = () => {
        console.log("----User delete----");

        return (
            <>
                <Modal show={deleteShow} onHide={UserDeleteModalClose} onCancel={() => setDeleteShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this user?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={UserDeleteSubmit}>
                            Ok
                        </Button>
                        <Button variant="secondary" onClick={UserDeleteModalClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    return (
        <UserDelete />
    )

}

export default DeleteModal;