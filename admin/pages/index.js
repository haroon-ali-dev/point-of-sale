import Head from 'next/head';
import { useState } from 'react';
import { Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import NoAuth from '@/components/NoAuth';

import styles from '@/styles/Home.module.css';

export default function Register() {
    return (
        <NoAuth><RegisterContent /></NoAuth>
    );
}

const schema = yup.object({
  email: yup.string().max(256).email().required().label("Email"),
  password: yup.string().min(3).max(15).required().label("Password"),
}).required();

export function RegisterContent() {
  const [reqInProcess, setReqInProcess] = useState(false);
  const [alert, setAlert] = useState([false, "", ""]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (formData) => {
    setReqInProcess(true);
    setAlert([false, "", ""]);

    try {
      const res = await fetch(`/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.status === 200) {
        setAlert([true, "success", data.message]);
      } else {
        setAlert([true, "danger", data.message]);
      }
    } catch (error) {
      setAlert([true, "danger", error.message]);
    } finally {
      setReqInProcess(false);
    }
  }

  return (
    <>
      <Head>
        <title>Register - POS Admin</title>
      </Head>
      <main>
        <Card className='card-form'>
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
  )
}