import Head from 'next/head'
import AuthOnly from '@/components/AuthOnly';
import { Card, Form, Button, Spinner, Alert } from 'react-bootstrap';

export default function Products() {
    return (
        <AuthOnly><ProductsContent /></AuthOnly>
    );
}

export function ProductsContent() {
    return (
        <>
            <Head>
                <title>Products - POS Admin</title>
            </Head>
            <main>
                <h1 className='heading'>Products</h1>
                <Card>
                    <Card.Body>
                        <Card.Title>Register</Card.Title>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register("email")}
                                    isInvalid={errors.email?.message}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    {...register("password")}
                                    isInvalid={errors.password?.message}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="success" type="submit" disabled={reqInProcess}>
                                Register
                                {reqInProcess &&
                                    <Spinner className="ms-2" animation="border" role="status" size="sm">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>}
                            </Button>
                        </Form>

                        {alert[0] &&
                            <Alert className="mt-3" variant={alert[1]}>
                                {alert[2]}
                            </Alert>}
                    </Card.Body>
                </Card>
            </main>
        </>
    );
}