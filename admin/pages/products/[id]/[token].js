import Head from 'next/head';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Card, Form, Button, Spinner, Alert, InputGroup } from 'react-bootstrap';

export async function getServerSideProps({ params }) {
    const host = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://point-of-sale-tau.vercel.app"

    const req = await fetch(`${host}/api/products/${+params.id}`, {
        headers: { "x-auth-token": params.token }
    });
    const data = await req.json();

    return {
        props: { product: data, token: params.token }
    }
}

const schema = yup.object({
    name: yup.string().min(3).max(50).required().label("Name"),
    price: yup.number().typeError("Price must be a number.")
        .positive().min(0.01).max(9999.99)
        .test("Decimal digits", "Price cannot have more than two decimal digits.", (value) => {
            if (value.toString().includes(".")) {
                return value.toString().split(".")[1].length <= 2;
            }
            return true;
        })
        .required().label("Price"),
    quantity: yup.number().typeError("Quantity must be a number.").integer().min(1).required().label("Quantity"),
}).required();

export default function Product({ product, token }) {
    const [reqInProcess, setReqInProcess] = useState(false);
    const [alert, setAlert] = useState([false, "", ""]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: product.name,
            price: product.price,
            quantity: product.quantity
        }
    });

    const onSubmit = async (formData) => {
        setReqInProcess(true);
        setAlert([false, "", ""]);

        try {
            const res = await fetch(`/api/products/${product.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", "x-auth-token": token },
                body: JSON.stringify({ uId: product.u_id, ...formData })
            });

            const data = await res.json();

            if (res.status === 200) {
                setAlert([true, "success", "Product updated."]);
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
                <title>{product.name + " - POS Admin"}</title>
            </Head>

            <main>
                <Card className='card-form'>
                    <Card.Body>
                        <Card.Title>Edit Product</Card.Title>
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

                            <Button variant="warning" type="submit" disabled={reqInProcess}>
                                Save
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