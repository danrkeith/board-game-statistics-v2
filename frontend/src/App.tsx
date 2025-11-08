import { Col, Container, Row } from 'react-bootstrap'
import LoginPage from './LoginPage'

const App = () => {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <LoginPage />
                </Col>
            </Row>
        </Container>
    )
}

export default App
