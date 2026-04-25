import type { Authority, User } from '../../utils/types';
import { possessive } from '../../utils/string-utils';
import { title } from '../../utils/user-utils';
import ManageAuthoritiesForm from '../../components/forms/ManageAuthoritiesForm';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { apiEditUserAuthorities } from '../../utils/api/users-api-utils';

interface ManageAuthoritiesModalProps {
    show: boolean;
    user?: User;
    submitCallback?: (user: User) => void;
    handleClose: () => void;
}

const ManageAuthoritiesModal = ({ show, user, submitCallback, handleClose }: ManageAuthoritiesModalProps) => {
    const { callWithAuth } = useContext(AuthContext);
    
    const onSubmit = (authorities: Set<Authority>) =>
        callWithAuth(apiEditUserAuthorities, {
            id: user!.id,
            authorities: authorities,
        });

    return (
        <ManageAuthoritiesForm
            as="modal"
            title={`Manage ${user && `${possessive(title(user))} `}authorities`}
            user={user}
            show={show}
            onSubmit={onSubmit}
            submitCallback={submitCallback}
            handleClose={handleClose}
        />
    );
};

export default ManageAuthoritiesModal;
