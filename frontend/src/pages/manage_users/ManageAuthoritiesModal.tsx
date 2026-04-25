import type { User } from '../../utils/types';
import { possessive } from '../../utils/string-utils';
import { title } from '../../utils/user-utils';
import ManageAuthoritiesForm from '../../components/forms/ManageAuthoritiesForm';

interface ManageAuthoritiesModalProps {
    show: boolean;
    user?: User;
    handleClose: () => void;
}

const ManageAuthoritiesModal = ({ show, user, handleClose }: ManageAuthoritiesModalProps) => {
    return (
        <ManageAuthoritiesForm
            as="modal"
            title={`Manage ${user && `${possessive(title(user)) }`}authorities`}
            user={user}
            show={show}
            onSubmit={() => Promise.resolve(user!)}
            handleClose={handleClose}
        />
    );
};

export default ManageAuthoritiesModal;
