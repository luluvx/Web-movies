import {  useParams, useNavigate } from "react-router-dom";
import {  Button, Card, Modal } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import moment from 'moment';


import axios from "axios";
import Header from "../../components/Header";
import { convertVideo } from "../../../utils/convertVideo";
import './DetailMovie.css';
import '../../styles/fonts.css';
import ReactStars from 'react-stars';
import { Alert } from 'react-bootstrap';



const DetailMovie = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [movieDetail, setMovieDetail] = useState({});
    const [actorList, setActorList] = useState([])
    const [director, setDirector] = useState('')

    console.log("Rating:", movieDetail.rating); 

    useEffect(() => {
        getMovieDetail();
        getActorList();
        
    }, [id]);


    useEffect(() => {
        if (movieDetail) {
            getDirector();
        }
    }, [movieDetail]);



    const getMovieDetail = async () => {
        axios.get(`http://localhost:3000/movies/${id}`)
            .then(response => {
                setMovieDetail(response.data);

                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    const getActorList = async () => {
        axios.get(`http://localhost:3000/movies/${id}/actors`)
            .then(response => {
                setActorList(response.data);
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            });
    }
    const getDirector = async () => {
        axios.get(`http://localhost:3000/persons/${movieDetail.directorId}`)
            .then(response => {
                setDirector(response.data);
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            });
    }

    return ( 
        <>
        <Header isPublic={true} />
        <Container fluid className="detail-movie">
        <div className="bg-image">
            <div className="overlay"></div>
            <Container className="content">
                <Row>
                    <Col md={6} className="text-left">
                        <h1 className="movie-title">{movieDetail.title}</h1>
                        <p className="movie-sinopsis">{movieDetail.sinopsis}</p>
                        <p className="movie-info">Se estrenó el {moment(movieDetail.releaseDate).format('YYYY-MM-DD')}</p>
                        <ReactStars
                            className="rating"
                            count={5}
                            value={movieDetail.rating} 
                            size={24}
                            edit={false}
                            color2="#FFFFFF"
                            color1="#5D5D5D"
                        />
                        <p className="movie-info">Rating {movieDetail.rating + "%"}</p>
                        <Button variant="danger" className="me-2" onClick={handleShow}>Ver Trailer</Button>
                    </Col>
                    <Col md={6} className="text-right">
                        <img 
                            className="movie-poster-right" 
                            src={`http://localhost:3000/movies/${id}.jpg`} 
                            alt={`Poster de ${movieDetail.title}`} 
                        />
                    </Col>
                </Row>
            </Container>
        </div>
        </Container>

        <Container className="director">
            <Row>

                <Col md={3}>
                    <h2 className="title-cast">Director</h2>
                    {director === '' && <Alert variant="dark">No hay director</Alert>}
                    <Card className="card-cast" onClick={() => navigate("/movies/detailPerson/" + movieDetail.directorId)}>
                        <Card.Img 
                            className="imgPhoto" 
                            variant="top" 
                            src={`http://localhost:3000/persons/${director.id}.jpg`} 
                            alt={`Imagen de ${director.name}`} 
                        />
                        <Card.Body>
                            <Card.Title>{director.name + " " + director.lastName}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
    </Container>
    <Container fluid className="cast">
        <h2 className="title-cast">Cast</h2>
        {actorList.length === 0 && <Alert variant="dark">No hay actores</Alert>}
        <Row>
        {actorList.map(actor => (
            <Col sm={12} md={6} lg={3} key={actor.id} className="mb-3">
                <Card className="card-cast" onClick={() => navigate("/movies/detailPerson/" + actor.id )}>
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
    <Modal show={show} onHide={handleClose} className="modal-trailer">
        <Modal.Header closeButton>
            <Modal.Title>{movieDetail.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {movieDetail.trailer ? (
                <iframe
                    width="100%"
                    height="100%"
                    src={convertVideo(movieDetail.trailer)}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
  
            ) : (
                <Alert variant="dark">No hay trailer</Alert>
            )}
            
            
        </Modal.Body>

            
    </Modal> 
    </>
    );
}

export default DetailMovie;