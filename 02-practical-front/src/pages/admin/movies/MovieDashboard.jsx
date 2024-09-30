import axios from "axios";
import { useEffect ,  useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import './MovieDashBoard.css';



const MovieDashBoard = () => {
    const navigate = useNavigate();
    const [MovieList, setMovieList] = useState([]);
    useEffect(() => {
        getMovieList();
    }, []);

    const getMovieList = async () => {
        axios.get('http://localhost:3000/movies')
            .then(response => {
                setMovieList(response.data);
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    const onDeleteMovie = (id) => {
        const confirm = window.confirm('Are you sure you want to delete this movie?');
        if(!confirm) {
            return;
        }   
        axios.delete(`http://localhost:3000/movies/${id}`)
            .then(response => {
                console.log(response.data);
                getMovieList();
            }).catch(error => {
                console.log(error);
            }) 
    }

    return (
        <>
            <Header />
            <div className="banner">
                <h1>Movie Dashboard</h1>
                <Link className="btn btn-primary btn-lg" to="/admin/movies/create">New Movie</Link>
            </div>
            <Container className="fullscreen-container content-wrapper mt-3 mb-3">
                <Row>
                    {MovieList.map(movie => (
                        <Col sm={12} md={4} lg={3} key={movie.id} className="mb-3">
                            <Card className="card-movie-admin">
                                <Card.Img onClick={() => navigate("/admin/movies/" + movie.id +"/detail")} className="imgPhoto" variant="top" src={"http://localhost:3000/movies/" + movie.id + ".jpg"} alt="Poster de la película" />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <div className="container-controls">
                                        <Link className="btn-controllers" to={"/admin/movies/" + movie.id + "/photo"}>
                                            <i className="bi bi-image-fill"></i>
                                        </Link>
                                        <Link className="btn-controllers" to={"/admin/movies/" + movie.id}>
                                            <i className="bi bi-pencil"></i>
                                        </Link>
                                        <Button className="btn-controllers" variant="none" onClick={() => { onDeleteMovie(movie.id) }}>
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
 
export default MovieDashBoard;