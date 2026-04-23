import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { HOME_PATH } from '../../App';
import { apiCreateUser } from '../../utils/api/users-api-utils';
import CreateUserForm from '../../components/forms/CreateUserForm';

const RegisterPage = () => {
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const onSubmit = (firstName: string, lastName: string, email: string, password: string) =>
        apiCreateUser({ firstName, lastName, email, password })
            .then(() => login({ email, password }))
            .then(() => void navigate(HOME_PATH));

    return (
        <>
            <h1 className="mb-3">Register</h1>
            <CreateUserForm submitButtonText="Register" onSubmit={onSubmit} />
        </>
    );
};

export default RegisterPage;
