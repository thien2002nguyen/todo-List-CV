import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../services/UserService';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUserList } from '../features/users/usersSlice';
import _ from 'lodash';

const ModalDeleteUser = (props) => {
    const { show, handleClose, dataUserDelete } = props;
    const userList = useSelector((state) => state.users.userList);
    const dispatch = useDispatch();

    const handleDeleteUser = async () => {
        const res = await deleteUser(dataUserDelete.id);
        if (res && res.statusCode === 204) {
            let cloneListUser = _.cloneDeep(userList);
            cloneListUser = cloneListUser.filter(item => item.id !== dataUserDelete.id)
            dispatch(setUserList(cloneListUser));
            handleClose();
            toast.success("A user is delete success!")
        }
        else {
            toast.error("Error delete user...")
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <span>This action can't be undone!</span>
                        <span>Do want to delete this user?</span>
                        <p><b>Email: {dataUserDelete.email}</b></p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeleteUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteUser;