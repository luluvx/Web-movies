import './Header.css';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = ({ isPublic }) => {
    return (
        <Navbar className="nav-bar" expand="lg">
            <Container className='container-header'>
                <Navbar.Brand href="">Reverie</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        {isPublic ? (
                            <>
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
                            </>
                        ) : (
                            <>
                                <NavDropdown title="Persons" id="basic-nav-dropdown">
                                    <Link className="dropdown-item" to={"/admin/persons"}>Person list</Link>
                                    <Link className="dropdown-item" to="/admin/persons/create">
                                        Create person
                                    </Link>
                                </NavDropdown>
                                <NavDropdown title="Movies" id="basic-nav-dropdown">
                                    <Link className="dropdown-item" to={"/admin/movies"}>Movies</Link>
                                    <Link className="dropdown-item" to="/admin/movies/create">
                                        Create movie
                                    </Link>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
