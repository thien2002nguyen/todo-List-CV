import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { postCreateUser } from '../services/UserService';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUserList } from '../features/users/usersSlice';

const ModalAddNew = (props) => {
    const { show, handleClose } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const userList = useSelector((state) => state.users.userList);
    const dispatch = useDispatch();

    const handleSaveUser = async () => {
        const res = await postCreateUser(name, job);
        if (res && res.id) {
            dispatch(setUserList([{ id: res.id, first_name: name }, ...userList]));
            handleClose();
            setName("");
            setJob("");
            toast.success("A user is create success!");
        }
        else {
            toast.error("Error create user...");
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Job</Form.Label>
                                <Form.Control type="text"
                                    value={job}
                                    onChange={e => setJob(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveUser}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNew;