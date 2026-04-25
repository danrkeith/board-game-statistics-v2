import { useEffect, useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import AuthoritiesTable from './AuthoritiesTable';
import type { Authority, User } from '../../../utils/types';
import { possessive } from '../../../utils/string-utils';
import { title } from '../../../utils/user-utils';
import FlexibleForm from '../../../components/forms/FlexibleForm';
import { equal } from '../../../utils/collection-utils';

interface ManageAuthoritiesModalProps {
    show: boolean;
    user?: User;
    handleClose: () => void;
}

const ManageAuthoritiesModal = ({ show, user, handleClose }: ManageAuthoritiesModalProps) => {
    const [initialAuthorities, setInitialAuthorities] = useState<Set<Authority>>();
    const [authorities, setAuthorities] = useState<Set<Authority>>();
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setIsValid(authorities !== undefined && initialAuthorities !== undefined && !equal(authorities, initialAuthorities));
    }, [authorities, initialAuthorities]);

    useEffect(() => {
        if (user) {
            setAuthorities(new Set(user.authorities));
            setInitialAuthorities(new Set(user.authorities));
        }
    }, [user]);

    return (
        <FlexibleForm
            as="modal"
            title={`Manage ${user && `${possessive(title(user)) }`}authorities`}
            submitButtonText='Save authorities'
            isLoading={isLoading}
            isValid={isValid}
            show={show}
            handleSubmission={() => {}}
            handleClose={handleClose}
        >
            {authorities ? (
                <AuthoritiesTable selected={authorities} />
            ) : (
                <Spinner className="d-block mx-auto" />
            )}
        </FlexibleForm>
    );
};

export default ManageAuthoritiesModal;
