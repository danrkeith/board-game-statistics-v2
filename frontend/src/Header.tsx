import { Container, Nav, Navbar } from 'react-bootstrap';
import { HOME_PATH, LOGIN_PATH } from './App';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const Header = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);

    return (
        <Navbar>
            <Container>
                <Navbar.Brand>Board Game Statistics</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Item>
                        <Nav.Link as={Link} to={HOME_PATH}>Home</Nav.Link>
                    </Nav.Item>
                    {isLoggedIn ? (
                        <Nav.Item>
                            <Nav.Link onClick={() => logout(HOME_PATH)}>Logout</Nav.Link>
                        </Nav.Item>
                    ) : (
                        <Nav.Item>
                            <Nav.Link as={Link} to={LOGIN_PATH}>Login</Nav.Link>
                        </Nav.Item>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
