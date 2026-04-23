import CreateUserForm from '../../components/forms/CreateUserForm';
import { apiCreateUser } from '../../utils/api/users-api-utils';
import type { User } from '../../utils/types';

interface CreateUserModalProps {
    show: boolean;
    submitCallback: (user: User) => void;
    handleClose: () => void;
}

const CreateUserModal = ({ show, submitCallback, handleClose }: CreateUserModalProps) => {
    const onSubmit = (firstName: string, lastName: string, email: string, password: string) =>
        apiCreateUser({ firstName, lastName, email, password })
            .then(submitCallback);

    return <CreateUserForm
        as="modal"
        title="Create User"
        submitButtonText="Create"
        show={show}
        onSubmit={onSubmit}
        handleClose={handleClose}
    />;
}

export default CreateUserModal;
