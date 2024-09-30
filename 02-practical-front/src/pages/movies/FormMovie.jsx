import axios from "axios";
import {  useState,useEffect } from "react";
import { Button, Card, CardHeader, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import moment from "moment";
import './FormMovie.css';
const FormMovie = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [rating, setRating] = useState("");
    const [trailer, setTrailer] = useState("");
    const [directorId, setDirectorId] = useState("");

    const [validated, setValidated] = useState(false);
    const [personList, setPersonList] = useState([])

    useEffect(() => {
        if (!id) return;
        getMovieById();
    }, [id])

    useEffect(() => {
        getPersonList();
    }, []);

    const getMovieById = () => {
        axios.get(`http://localhost:3000/movies/${id}`)
            .then(response => {
                const movie = response.data;
                setTitle(movie.title);
                setSinopsis(movie.sinopsis);
                setReleaseDate(moment(movie.releaseDate).format('YYYY-MM-DD'));
                setRating(movie.rating);
                setTrailer(movie.trailer);
                setDirectorId(movie.directorId);
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
        const movie = {
            title: title,
            sinopsis: sinopsis,
            releaseDate: releaseDate,
            rating: rating,
            trailer: trailer,
            directorId: directorId
        };
        console.log(movie);
        if(id){
            editMovie(movie);
        }else{
            insertMovie(movie);
        }
    }
    const insertMovie = (movie) => {
        axios.post('http://localhost:3000/movies', movie)
            .then(response => {
                console.log(response.data);
                navigate('/admin/movies');
            }).catch(error => {
                console.log(error);
            });
    }
    const editMovie = (movie) => {
        axios.put(`http://localhost:3000/movies/${id}`, movie)
            .then(response => {
                console.log(response.data);
                navigate('/admin/movies');
            }).catch(error => {
                console.log(error);
            })
    }
    

    const getPersonList = async () => {
        axios.get('http://localhost:3000/persons')
            .then(response => {
                setPersonList(response.data);
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            });
    }

    return ( 
        <>
            <Header isPublic={false}/>
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={20}>
                        <Card className="card-create">
                            <CardHeader>
                            <h2>Form Movie</h2>
                            </CardHeader>
                            <Card.Body>
                                
                                <Form noValidate validated={validated} onSubmit={onGuardarClick} className="form-create">
                                    <Form.Group >
                                        <Form.Label>Tittle</Form.Label>
                                        <Form.Control required value={title} type="text" onChange={(e) => {
                                            setTitle(e.target.value);
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un Titulo.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Sinopsis</Form.Label>
                                        <Form.Control required value={sinopsis} type="textarea" onChange={(e) => {
                                            setSinopsis(e.target.value);
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese la sinopsis.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Release Date</Form.Label>
                                        <Form.Control required value={releaseDate} type="date" onChange={(e) => {
                                            setReleaseDate(e.target.value);
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese una fecha válida.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control required value={rating} type="number" onChange={(e) => {
                                            setRating(e.target.value);
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese la calificacion.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Trailer</Form.Label>
                                        <Form.Control required value={trailer} type="text" onChange={(e) => {
                                            setTrailer(e.target.value);
                                        }} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese la url del trailer.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Director:</Form.Label>
                                        <Form.Select required value={directorId} onChange={(e) => {
                                            setDirectorId(e.target.value);
                                        }} >
                                            <option value="">Seleccione un Director...</option>
                                            {personList.map(person =>
                                                <option key={"person-" + person.id} value={person.id}>{person.name + " "+ person.lastName}</option>
                                            )}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un director.
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
 
export default FormMovie;