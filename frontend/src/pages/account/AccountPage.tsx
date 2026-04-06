import { useContext, useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext';
import { apiEditMe } from '../../utils/api/users-api-utils';

const AccountSettingsPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const { user, setUser } = useContext(UserContext);
    const { callWithAuth } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
    }, [user]);

    const hasChanges = firstName !== user?.firstName || lastName !== user?.lastName;

    const onInputChange = () => {
        setError(null);
        setShowSuccess(false);
    };

    const handleSubmission = (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        callWithAuth(apiEditMe, {
            firstName,
            lastName,
        })
            .then((user) => {
                setUser(user);
                setShowSuccess(true);
                setError(null);
            })
            .catch(({ message }: Error) => setError(message))
            .finally(() => setIsLoading(false));
    };

    return (
        <div>
            <h1>Account settings</h1>
            {user
                ? (
                    <Form onSubmit={handleSubmission}>
                        <Form.Group className="mb-3">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstName}
                                onChange={(e) => {
                                    onInputChange();
                                    setFirstName(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastName}
                                onChange={(e) => {
                                    onInputChange();
                                    setLastName(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Email address
                            </Form.Label>
                            <Form.Control
                                type="email"
                                disabled
                                value={user.email}
                            />
                        </Form.Group>
                        {error && (
                            <Form.Group>
                                <p className="text-danger">{error}</p>
                            </Form.Group>
                        )}
                        {showSuccess && (
                            <Form.Group>
                                <p className="text-success">Account updated successfully</p>
                            </Form.Group>
                        )}
                        <Form.Group className="d-flex align-items-center">
                            <Button variant="primary" type="submit" disabled={isLoading || !hasChanges}>
                                Save changes
                            </Button>
                            {isLoading && (
                                <Spinner as="span" className="ms-3" />
                            )}
                        </Form.Group>
                    </Form>
                )
                : <Spinner className="d-block mx-auto" />}
        </div>
    );
};

export default AccountSettingsPage;
