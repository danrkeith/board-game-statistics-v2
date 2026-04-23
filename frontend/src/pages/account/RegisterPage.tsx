import { useContext, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { HOME_PATH } from '../../App';
import { apiCreateUser } from '../../utils/api/users-api-utils';

const RegisterPage = () => {
    const { login } = useContext(AuthContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordConfirmationError, setPasswordConfirmationError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const formIsValid = email !== '' && password !== '' && passwordConfirmation !== '' && password === passwordConfirmation;

    const navigate = useNavigate();

    const checkPasswordConfirmation = () => {
        setPasswordConfirmationError(passwordConfirmation !== '' && password !== passwordConfirmation ? 'Passwords do not match' : null);
    };

    const handleSubmission = (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        apiCreateUser({ firstName, lastName, email, password })
            .then(() => login({ email, password }))
            .then(() => void navigate(HOME_PATH))
            .catch(({ message }: Error) => {
                setError(message);
                setPassword('');
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            <h1 className="mb-3">Register</h1>
            <Form onSubmit={handleSubmission}>
                <Form.Group className="mb-3">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Jane"
                        value={firstName}
                        onChange={(e) => {
                            setError(null);
                            setFirstName(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => {
                            setError(null);
                            setLastName(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>
                        Email address
                        {' '}
                        <span className="text-info">*</span>
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="jane@citizen.com"
                        value={email}
                        onChange={(e) => {
                            setError(null);
                            setEmail(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>
                        Password
                        {' '}
                        <span className="text-info">*</span>
                    </Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setError(null);
                            setPasswordConfirmationError(null);
                            setPassword(e.target.value);
                        }}
                        onBlur={checkPasswordConfirmation}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>
                        Confirm password
                        {' '}
                        <span className="text-info">*</span>
                    </Form.Label>
                    <Form.Control
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => {
                            setError(null);
                            setPasswordConfirmationError(null);
                            setPasswordConfirmation(e.target.value);
                        }}
                        onBlur={checkPasswordConfirmation}
                    />
                    {passwordConfirmationError && (
                        <p className="text-danger mt-2">{passwordConfirmationError}</p>
                    )}
                </Form.Group>
                <Form.Group>
                    <p className="text-info">* Required fields</p>
                </Form.Group>
                {error && (
                    <Form.Group>
                        <p className="text-danger">{error}</p>
                    </Form.Group>
                )}
                <Form.Group className="d-flex align-items-center">
                    <Button variant="primary" type="submit" disabled={isLoading || !formIsValid}>
                        Register
                    </Button>
                    {isLoading && (
                        <Spinner as="span" className="ms-3" />
                    )}
                </Form.Group>
            </Form>
        </>
    );
};

export default RegisterPage;
