import { useContext, useEffect } from 'react';
import { AppContext } from '@/pages/_app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { House } from 'react-bootstrap-icons';

import styles from "./NavBar.module.css";

export default function NavBar() {
    const { token, setToken } = useContext(AppContext);

    const router = useRouter();

    useEffect(() => {
        function getToken() {
            const token = localStorage.getItem("token");
            setToken(token);
        }

        getToken();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        router.push("/login");
    }

    return (
        <Navbar className={styles.navbar} expand="lg" bg='dark' data-bs-theme="dark">
            <Container className={styles.navBarContainer}>
                <Navbar.Brand href="/" as={Link}><House size={30} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className={styles.navBarCollapse}>
                    <Nav>
                        {!token &&
                            <>
                                <Nav.Link href="/" as={Link}>Register</Nav.Link>
                                <Nav.Link href="/login" as={Link}>Login</Nav.Link>
                            </>
                        }
                        {token && <Nav.Link href="#" onClick={logout}>Logout</Nav.Link>}
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}