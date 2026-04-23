import { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext';
import { apiEditMe } from '../../utils/api/users-api-utils';
import EditUserForm from '../../components/forms/EditUserForm';

const AccountSettingsPage = () => {
    const { user, setUser } = useContext(UserContext);
    const { callWithAuth } = useContext(AuthContext);

    const onSubmit = (firstName: string, lastName: string) =>
        callWithAuth(apiEditMe, {
            firstName,
            lastName,
        });

    return (
        <div>
            <h1>Account settings</h1>
            {user
                ? (
                    <EditUserForm
                        user={user}
                        onSubmit={onSubmit}
                        submitCallback={setUser}
                    />
                )
                : <Spinner className="d-block mx-auto" />}
        </div>
    );
};

export default AccountSettingsPage;
