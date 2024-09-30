import { Button, Col, Container, Row , Form} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../../components/Header";
import './CastForm.css';

const CastForm  = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [personList, setPersonList] = useState([]);
    const [actors , setActors  ] = useState([]);

    useEffect(() => {
        getPersonList();
        getActors();
    }, [id]);

    const getPersonList = async () => {
        axios.get("http://localhost:3000/persons")
            .then(response => {
                setPersonList(response.data);
            }).catch(error => {
                console.log(error);
            });
    }

    const getActors = async () => {
        axios.get(`http://localhost:3000/movies/${id}/actors`)
            .then(response => {
                const actorsIds = response.data.map(actor => actor.id);
                setActors(actorsIds);
            }).catch(error => {
                console.log(error);
            });
    }
    const cambiarActorSeleccionado = (actorId) => {
        if (actors.includes(actorId)) {
            setActors(actors.filter(id => id !== actorId));
        } else {
            setActors(actors.concat(actorId));
        }
    }
    const saveActors = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3000/movies/${id}/actors`, { actors }) 
            .then(response => {
                console.log(response.data);
                navigate(`/admin/movies/${id}/detail`);
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <Header />
            <Container className="mt-3 mb-3">
            <div className="banner">
                <h1>Formulario de Actores</h1>
            </div>
                <form onSubmit={saveActors}>
                    <Row>
                        {personList.map(person => (
                            <Col sm={12} md={6} lg={3} key={person.id} className="mb-7">
                                <Form.Check 
                                    className="person-checkbox-card"
                                    type="checkbox"
                                    label={`${person.name} ${person.lastName}`}
                                    id={`person-${person.id}`}
                                    checked={actors.includes(person.id)}
                                    onChange={() => cambiarActorSeleccionado(person.id)}
                                
                                />
                            </Col>
                        ))}
                    </Row>
                    <Button type="submit" className="btn btn-primary mt-3">Guardar</Button>
                </form>
            </Container>
        </>
        
    );
};

export default CastForm ;
