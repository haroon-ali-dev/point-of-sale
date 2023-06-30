import Head from 'next/head'
import { Card, Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from '@/styles/Home.module.css'

const schema = yup.object({
  email: yup.string().max(256).email().required().label("Email"),
  password: yup.string().min(3).max(15).required().label("Password"),
}).required();

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (formData) => {
    try {
      const res = await fetch(`/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Register - POS Admin</title>
      </Head>
      <main>
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

              <Button variant="success" type="submit">Register</Button>
            </Form>
          </Card.Body>
        </Card>
      </main>
    </>
  )
}