import axios from "axios";
import { useEffect, useState} from "react";
import {  Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import '../../styles/global.css';
import './MovieList.css';
import { Alert } from 'react-bootstrap';


const Movielist = () => {
    const navigate = useNavigate();
    const [movieList, setMovieList] = useState([]);

    useEffect ( () => {
        getMovieList()
    }, [])

    const getMovieList = async () =>{
        axios.get('http://localhost:3000/movies')
        .then(response => {
            const moviesOrdenadas = response.data.sort((a, b) => b.rating - a.rating);
            setMovieList(moviesOrdenadas);
            console.log(moviesOrdenadas);
        }).catch(error => {
            console.log(error);
        })
    }
    return ( 
        <>
            <Header isPublic={true} />
            <div className="banner">
                <h2 className="banner-title">Películas</h2>
            </div>
            <Container className="fullscreen-container content-wrapper mt-3 mb-3">
                
                <Row>
                    {movieList.length === 0 && <Alert variant="info">No hay películas disponibles</Alert>}
                    {movieList.map(movie => (
                        <Col sm={12} md={6} lg={3} key={movie.id} className="mb-3">
                            <Card className="card-movie" onClick={() => navigate("/movies/" + movie.id +"/detail")}>
                                <Card.Img className="imgPhoto" variant="top" src={"http://localhost:3000/movies/" + movie.id + ".jpg" || "http://localhost:3000/movies/default.jpg" } alt="Poster de la película"  />
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

export default Movielist;