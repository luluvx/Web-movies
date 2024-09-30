import { Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header';


const AdminDashboard = () => {
    const navigate = useNavigate();
    return ( 
        <>
            <Header isPublic={false} />
            <Container className="mt-5">
                <h1>Admin Dashboard</h1>
                <Row className="justify-content-center mt-4">
                    <Col md= {8} >
                        <Card  onClick={() => navigate('/admin/movies')}>
                            <Card.Body>
                                <Card.Title>
                                    Movies
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md= {8} >
                        <Card onClick={() => navigate('/admin/persons')}>
                            <Card.Body>
                                <Card.Title>
                                    Persons
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
        
     );
}
 
export default AdminDashboard;