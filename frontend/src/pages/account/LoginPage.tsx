import { useContext, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { HOME_PATH } from '../../App';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const { isLoading, login } = useContext(AuthContext);

    const handleSubmission = (event: React.FormEvent) => {
        event.preventDefault();
        login({ email, password })
            .then(() => navigate(HOME_PATH))
            .catch((err: Error) => {
                setError(err.message);
                setPassword('');
            });
    };

    return (
        <>
            <h1 className="mb-3">Login</h1>
            <Form onSubmit={handleSubmission}>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
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
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setError(null);
                            setPassword(e.target.value);
                        }}
                    />
                </Form.Group>
                {error && (
                    <Form.Group>
                        <p className="text-danger">{error}</p>
                    </Form.Group>
                )}
                <Form.Group className="d-flex align-items-center">
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        Login
                    </Button>
                    {isLoading && (
                        <Spinner as="span" className="ms-3" />
                    )}
                </Form.Group>
            </Form>
        </>
    );
};

export default LoginPage;
