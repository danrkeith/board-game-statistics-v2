import { Container, Nav, Navbar } from 'react-bootstrap';
import { HOME_PATH, LOGIN_PATH } from './App';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { UserContext } from './context/UserContext';

const Header = () => {
    const { logout } = useContext(AuthContext);
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    return (
        <Navbar>
            <Container>
                <Navbar.Brand>Board Game Statistics</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Item>
                        <Nav.Link as={Link} to={HOME_PATH}>Home</Nav.Link>
                    </Nav.Item>
                    {user === null
                        ? (
                            <Nav.Item>
                                <Nav.Link as={Link} to={LOGIN_PATH}>Login</Nav.Link>
                            </Nav.Item>
                        )
                        : (
                            <Nav.Item>
                                <Nav.Link onClick={() => {
                                    logout();
                                    void navigate(HOME_PATH);
                                }}
                                >
                                    Logout
                                </Nav.Link>
                            </Nav.Item>
                        )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
