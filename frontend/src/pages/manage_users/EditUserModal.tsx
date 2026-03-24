import { Modal, Spinner } from 'react-bootstrap';
import type { User } from '../../utils/types';
import { fullName } from '../../utils/user-utils';

interface EditUserModalProps {
    show: boolean;
    onHide: () => void;
    user: User | null;
}

const EditUserModal = ({ show, onHide, user }: EditUserModalProps) => {
    return (
        <Modal show={show} onHide={onHide}>
            {user
                ? (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Edit
                                {user.firstName ? ` ${fullName(user)}` : ` User ${user.id}`}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {fullName(user)}
                        </Modal.Body>
                    </>
                )
                : <Spinner />}
        </Modal>
    );
};

export default EditUserModal;
