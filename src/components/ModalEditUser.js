import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { putUpdateUser } from '../services/UserService';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUserList } from '../features/users/usersSlice';
import _ from 'lodash';

const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const userList = useSelector((state) => state.users.userList);
    const dispatch = useDispatch();

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name);
        }
    }, [dataUserEdit, show])

    const handleEditUser = async () => {
        const res = await putUpdateUser(name, job);
        console.log(res);
        if (res && res.updatedAt) {
            const userEdit = {
                id: dataUserEdit.id,
                first_name: name,
            }
            const indexUserEdit = userList.findIndex(item => item.id === userEdit.id);
            let cloneListUser = _.cloneDeep(userList);
            cloneListUser[indexUserEdit].first_name = userEdit.first_name;
            dispatch(setUserList([...cloneListUser]));
            handleClose();
            toast.success("A user is update success!");
        }
        else {
            toast.error("Error update user...");
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
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
                    <Button variant="primary" onClick={handleEditUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditUser;