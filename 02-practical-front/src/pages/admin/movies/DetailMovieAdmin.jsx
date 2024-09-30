
import {  useParams,  } from "react-router-dom";
import {  Button, Container } from 'react-bootstrap';
import {  useNavigate } from "react-router-dom";
import Header from '../../../components/Header';
import './DetailMovieAdmin.css';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { Row, Col, Card, Alert } from 'react-bootstrap';

const DetailMovie = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [actorList, setActorList] = useState([]);



    useEffect(() => {
        getActorList();
    }, [id]);

    const getActorList = async () => {
        axios.get(`http://localhost:3000/movies/${id}/actors`)
            .then(response => {
                setActorList(response.data);
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            });
        
    }
    
    return ( 
        <>
            <Header />
            <div className="banner">
                <h1>Detail Movie</h1>
                <Button className="btn-controllers"  onClick={() => navigate(`/admin/movies/${id}/detail/actor`)}>
                        Agregar Actores
                </Button>
            </div>
            <Container>
                <Row>
                    {actorList.length === 0 && <Alert variant="info">No hay actores en esta pelicula</Alert>}
                    {actorList.map(actor => (
                        <Col sm={12} md={6} lg={3} key={actor.id} className="mb-3">
                            <Card className="card-actor">
                                <Card.Img 
                                        className="imgPhoto" 
                                        variant="top" 
                                        src={`http://localhost:3000/persons/${actor.id}.jpg`} 
                                        alt={`Imagen de ${actor.name}`} 
                                />
                                <Card.Body>
                                    <Card.Title>{actor.name + " " + actor.lastName}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

        </>
    );
}

export default DetailMovie;