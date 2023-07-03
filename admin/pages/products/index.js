import Head from 'next/head'
import { useState, useEffect } from 'react';
import { Card, Form, Button, Spinner, Alert, InputGroup, Table } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import jwt from "jwt-decode";

import AuthOnly from '@/components/AuthOnly';

export default function Products() {
    return (
        <AuthOnly><ProductsContent /></AuthOnly>
    );
}

const schema = yup.object({
    name: yup.string().min(3).max(50).required().label("Name"),
    price: yup.number().typeError("Price must be a number.")
        .positive().min(0.01)
        .test("Decimal digits", "Price cannot have more than two decimal digits.", (value) => {
            if (value.toString().includes(".")) {
                return value.toString().split(".")[1].length <= 2;
            }
            return true;
        })
        .required().label("Price"),
    quantity: yup.number().typeError("Quantity must be a number.").integer().min(1).required().label("Quantity"),
}).required();

export function ProductsContent() {
    const [tokenData, setTokenData] = useState(["", ""]);
    const [reqInProcess, setReqInProcess] = useState(false);
    const [alert, setAlert] = useState([false, "", ""]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        async function getProducts() {
            const token = localStorage.getItem("token");
            const { uId } = jwt(token);

            try {
                const res = await fetch(`/api/products/user/${uId}`, {
                    headers: { "x-auth-token": token }
                });
    
                const data = await res.json();

                if (res.status === 200) {
                    setLoading(false);
                    setProducts(data);
                    setTokenData([token, uId]);
                } else {
                    console.log(data);
                }
    
            } catch (error) {
                console.log(error.message);
            }
        }

        getProducts();
    }, []);

    const onSubmit = async (formData) => {
        setReqInProcess(true);
        setAlert([false, "", ""]);

        try {
            const res = await fetch(`/api/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-auth-token": tokenData[0] },
                body: JSON.stringify({ uId: tokenData[1], ...formData })
            });

            const data = await res.json();

            if (res.status === 200) {
                setProducts([...products, data]);
                setAlert([true, "success", "Product created."]);
            } else {
                console.log(data.message);
                setAlert([true, "danger", "There was a problem."]);
            }
        } catch (error) {
            console.log(data.message);
            setAlert([true, "danger", "There was a problem."]);
        } finally {
            setReqInProcess(false);
        }
    }

    return (
        <>
            <Head>
                <title>Products - POS Admin</title>
            </Head>
            <main>
                <h1 className='heading'>Products</h1>
                <Card className='card-form'>
                    <Card.Body>
                        <Card.Title>Create Product</Card.Title>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register("name")}
                                    isInvalid={errors.name?.message}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="price">
                                <Form.Label>Price</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text id="inputGroupPrepend">£</InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder='0.00'
                                        aria-describedby="inputGroupPrepend"
                                        {...register("price")}
                                        isInvalid={errors.price?.message}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.price?.message}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="quantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder='0'
                                    {...register("quantity")}
                                    isInvalid={errors.quantity?.message}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.quantity?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="success" type="submit" disabled={reqInProcess}>
                                Create
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

                <Card className='card-list'>
                    <Card.Body>
                        {loading && (
                            <Spinner className="ms-auto me-auto" style={{ display: 'block' }} animation="border" role="status" size="sm">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        )}
                        {(!loading && products.length <= 0) && (
                            <p style={{ textAlign: 'center', margin: '0px' }}>No products.</p>
                        )}
                        {(!loading && products.length > 0) && (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Title</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, i) => (
                                        <tr key={i}>
                                            <td>{product["p_id"]}</td>
                                            <td>{product["name"]}</td>
                                            <td>{product["price"]}</td>
                                            <td>{product["quantity"]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Card.Body>
                </Card>
            </main>
        </>
    );
}