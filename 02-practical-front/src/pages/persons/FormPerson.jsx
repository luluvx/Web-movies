import axios from "axios";
import {  useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row, CardHeader } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/Header";


const FormPerson = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [validated, setValidated] = useState(false);  

    useEffect(() => {
        if (!id) return;
        getPersonById();
    }, [id])


    const getPersonById = () => {
        axios.get(`http://localhost:3000/persons/${id}`)
            .then(response => {
                const person = response.data;
                setName(person.name);
                setLastName(person.lastName);
            }).catch(error => {
                console.log(error);
            });
    }

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const person = {
            name: name,
            lastName: lastName
        };
        console.log(person);
        if(id){
            editPerson(person);
        }else{
            insertPerson(person);
        }

    }
    const insertPerson = (person) => {
        axios.post('http://localhost:3000/persons', person)
            .then(response => {
                console.log(response.data);
                navigate('/admin/persons');
            }).catch(error => {
                console.log(error);
            });
    }
    const editPerson = (person) => {
        axios.put(`http://localhost:3000/persons/${id}`, person)
            .then(response => {
                console.log(response.data);
                navigate('/admin/persons');
            }).catch(error => {
                console.log(error);
            })
    }

    return ( 
        <>
            <Header />
            <Container>
                    <Row className="mt-3 mb-3">
                        <Col md={20}>
                            <Card className="card-create">
                                <Card.Body>
                                    <CardHeader>
                                        <h2>Form Movie</h2>
                                    </CardHeader>
                                    <Form noValidate validated={validated} onSubmit={onGuardarClick} className="form-create">
                                        <Form.Group >
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control required value={name} type="text" onChange={(e) => {
                                                setName(e.target.value);
                                            }} />
                                            <Form.Control.Feedback type="invalid">
                                                Por favor ingrese un nombre.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group >
                                            <Form.Label>Last name</Form.Label>
                                            <Form.Control required value={lastName} type="text" onChange={(e) => {
                                                setLastName(e.target.value);
                                            }} />
                                            <Form.Control.Feedback type="invalid">
                                                Por favor ingrese un apellido.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        
                                        <Form.Group className="mt-3">
                                            <Button type="submit">Guardar datos</Button>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
        </>
        

     );
}
 
export default FormPerson;