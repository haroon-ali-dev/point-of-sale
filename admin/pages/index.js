import Head from 'next/head'
import { Card, Form, Button } from 'react-bootstrap';

import styles from '@/styles/Home.module.css'

export default function Register() {
  return (
    <>
      <Head>
        <title>Register - POS Admin</title>
      </Head>
      <main>
        <Card>
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <Form>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                />
              </Form.Group>

              <Button variant="success" type="submit">Login</Button>
            </Form>
          </Card.Body>
        </Card>
      </main>
    </>
  )
}
