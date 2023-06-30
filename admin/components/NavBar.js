import Link from 'next/link';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { House } from 'react-bootstrap-icons';

import styles from "./NavBar.module.css";

export default function NavBar() {
    return (
        <Navbar className={styles.navbar} expand="lg" bg='dark' data-bs-theme="dark">
            <Container className={styles.navBarContainer}>
                <Navbar.Brand href="/" as={Link}><House size={30} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className={styles.navBarCollapse}>
                    <Nav>
                        <Nav.Link href="/" as={Link}>Register</Nav.Link>
                        <Nav.Link href="/login" as={Link}>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}