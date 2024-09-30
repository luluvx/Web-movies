
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col , Card, Alert} from 'react-bootstrap';
import { useEffect, useState } from 'react';

import axios from 'axios';
import Header from '../../components/Header';
import './DetailPerson.css';


const DetailPerson  = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [moviesLikeDirector, setMoviesLikeDirector] = useState([]);
    const [moviesLikeActor, setMoviesLikeActor] = useState([]);
    const [personDetail, setPersonDetail] = useState({});

    useEffect(() => {
        getMoviesLikeDirector();
        getMoviesLikeActor();
        getPersonDetail();
    }, [id]);

    const getMoviesLikeDirector = async () => {
        axios.get(`http://localhost:3000/movies/director/${id}`)
            .then(response => {
                setMoviesLikeDirector(response.data);
            }).catch(error => {
                console.log(error);
            });
    }

    const getMoviesLikeActor = async () => {
        axios.get(`http://localhost:3000/movies/actor/${id}`)
            .then(response => {
                setMoviesLikeActor(response.data);
            }).catch(error => {
                console.log(error);
            });
    }
    const getPersonDetail = async () => {
        axios.get(`http://localhost:3000/persons/${id}`)
            .then(response => {
                setPersonDetail(response.data);
            }).catch(error => {
                console.log(error);
            });
    }
    return (
        <>
            <Header isPublic={true} />
            <Container className="mt-3 mb-3">
                <Row>
                    <Col md={12}>
                        <h1 className='person-info' >{personDetail.name + " " + personDetail.lastName}</h1>
                    </Col>
                </Row>
                <h2 className='movies-section' >Peliculas como Director</h2>
                <Row>
                    {moviesLikeDirector.length === 0 && <Alert variant="info">No participa en niguna pelicula com directo</Alert>}
                    {moviesLikeDirector.map(movie => (
                        <Col sm={12} md={6} lg={3} key={movie.id} className="mb-3">
                            <Card className="card-movie-admin" onClick={() => navigate("/movies/" + movie.id + "/detail")}>
                                <Card.Img className="imgPhoto" variant="top" src={"http://localhost:3000/movies/" + movie.id + ".jpg"} alt="Poster de la película" />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <h2 className='movies-section actors'>Peliculas como Actor</h2>
                <Row>
                    {moviesLikeActor.length === 0 && <Alert variant="info">No participa en niguna pelicula como actor</Alert>}
                    {moviesLikeActor.map(movie => (
                        <Col sm={12} md={6} lg={3} key={movie.id} className="mb-3">
                            <Card className="card-movie" onClick={() => navigate("/movies/" + movie.id + "/detail")}>
                                <Card.Img className="imgPhoto" variant="top" src={"http://localhost:3000/movies/" + movie.id + ".jpg"} alt="Poster de la película" />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default DetailPerson;