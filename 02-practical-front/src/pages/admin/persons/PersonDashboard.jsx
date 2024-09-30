import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './PersonDashboard.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from "../../../components/Header";




const PersonDashboard = () => {
    const [PersonList, setPersonList] = useState([])
    useEffect(() => {
        getPersonList();
    }, []);


    const getPersonList = async () => {
        axios.get('http://localhost:3000/persons')
            .then(response => {
                setPersonList(response.data);
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            });
    }
    const onDeletePerson = (id) => {
        const confirm = window.confirm('Are you sure you want to delete this person?');
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/persons/${id}`)
            .then(response => {
                console.log(response.data);
                getPersonList();
            }).catch(error => {
                console.log(error);
            })
    }
    return (
        <>
        <Header />
            <div className="banner">
                <h1>Person DashBoard</h1>
                <Link className="btn btn-primary btn-lg" to="/admin/persons/create">New Person</Link>
            </div>
            <Container className="fullscreen-container content-wrapper mt-3 mb-3">
                <Row>
                    {PersonList.map(person => (
                        <Col sm={12} md={6} lg={3} key={person.id} className="mb-3">
                            <Card className="card-person">
                                <Card.Img className="imgPhoto" variant="top" src={"http://localhost:3000/persons/" + person.id + ".jpg"} alt="Foto de perfil" />
                                <Card.Body>
                                    <Card.Title>{person.name} {person.lastName}</Card.Title>
                                    
                                    <div className="container-controls">
                                        <Link className="btn-controllers" to={"/admin/persons/" + person.id + "/photo"}>
                                            <i className="bi bi-image-fill"></i>
                                        </Link>
                                        <Link className="btn-controllers" to={"/admin/persons/" + person.id}>
                                            <i className="bi bi-pencil"></i>
                                        </Link>
                                        <Button className="btn-controllers" variant="none"  onClick={() => { onDeletePerson(person.id) }}>
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </div>

                                    
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
    
}
 
export default PersonDashboard;