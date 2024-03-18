import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from './contexts/UseContext';

function Header(props) {
    const navigate = useNavigate();
    const { logout, user } = useContext(UserContext);

    const handleLogout = () => {
        logout();
        navigate("/");
        toast.success("Logout success");
    }
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink to="/" className="navbar-brand">
                        <img
                            src={logoApp}
                            width="30px"
                            height="30px"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />
                        <span className="ms-2">Zeno's App</span>
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {((user && user.auth) || window.location.pathname === '/') && <>
                            <Nav className="me-auto">
                                <NavLink to="/" className="nav-link">Home</NavLink>
                                <NavLink to="/users" className="nav-link">Manage Users</NavLink>
                            </Nav>
                            <Nav>
                                {user && user.email && <span className="nav-link">Welcome {user.email}</span>}
                                <NavDropdown title="Setting" id="basic-nav-dropdown">
                                    {user && user.auth
                                        ? <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                        : <NavLink to="/login" className="dropdown-item">Login</NavLink>
                                    }
                                </NavDropdown>
                            </Nav>
                        </>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;