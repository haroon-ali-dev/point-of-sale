import Link from 'next/link';
import { Nav, Navbar, Container } from 'react-bootstrap';

import styles from "./NavBar.module.css";

export default function NavBar() {
    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link href="/" as={Link}>Register</Nav.Link>
                        <Nav.Link href="/login" as={Link}>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}