import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { SETTINGS_PATH, HOME_PATH, LOGIN_PATH, MANAGE_USERS_PATH } from '../App';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import PersonDropdownToggle from './dropdowns/PersonDropdownToggle';

const Header = () => {
    const { logout } = useContext(AuthContext);
    const { isLoading, user } = useContext(UserContext);

    return (
        <Navbar>
            <Container>
                <Navbar.Brand>Board Game Statistics</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Item>
                        <Nav.Link as={Link} to={HOME_PATH}>Home</Nav.Link>
                    </Nav.Item>
                    {isLoading || (user === null
                        ? (
                            <Nav.Item>
                                <Nav.Link as={Link} to={LOGIN_PATH}>Login</Nav.Link>
                            </Nav.Item>
                        )
                        : user.authorities.includes('MANAGE_USERS') && (
                            <Nav.Item>
                                <Nav.Link as={Link} to={MANAGE_USERS_PATH}>
                                    Manage users
                                </Nav.Link>
                            </Nav.Item>
                        )
                    )}
                </Nav>
                {user !== null && (
                    <Nav>
                        <Nav.Item>
                            <Dropdown align="end">
                                <Dropdown.Toggle as={PersonDropdownToggle} />
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={SETTINGS_PATH}>
                                        Settings
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="LOGOUT" className="text-warning" onClick={logout}>
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav.Item>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
};

export default Header;
