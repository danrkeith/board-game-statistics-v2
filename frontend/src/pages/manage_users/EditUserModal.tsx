import type { User } from '../../utils/types';
import { title } from '../../utils/user-utils';
import { useContext, } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { apiEditUser } from '../../utils/api/users-api-utils';
import EditUserForm from '../../components/forms/EditUserForm';

interface EditUserModalProps {
    show: boolean;
    user?: User;
    submitCallback: (user: User) => void;
    handleClose: () => void;
}

const EditUserModal = ({ show, user, submitCallback, handleClose }: EditUserModalProps) => {
    const { callWithAuth } = useContext(AuthContext);

    const onSubmit = (firstName: string, lastName: string) =>
        callWithAuth(apiEditUser, {
            id: user!.id,
            firstName,
            lastName,
        });

    return (
        <EditUserForm
            as="modal"
            title={user ? (`Edit ${title(user)}`) : 'Edit User'}
            user={user}
            show={show}
            onSubmit={onSubmit}
            submitCallback={submitCallback}
            handleClose={handleClose}
        />
    )
};

export default EditUserModal;
