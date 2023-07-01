import Head from 'next/head'
import { useState, useContext } from 'react';
import { AppContext } from './_app';
import { useRouter } from 'next/router';
import { Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import jwt from "jwt-decode";

const schema = yup.object({
  email: yup.string().max(256).email().required().label("Email"),
  password: yup.string().min(3).max(15).required().label("Password"),
}).required();

export default function Login() {
  const { setToken, setUId } = useContext(AppContext);
  const [reqInProcess, setReqInProcess] = useState(false);
  const [alert, setAlert] = useState([false, "", ""]);

  const router = useRouter();

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
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem("token", data.token);
        const { uId } = jwt(data.token);
        setToken(data.token);
        setUId(uId);
        
        router.push('/products');
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
        <title>Login - POS Admin</title>
      </Head>
      <main>
        <Card>
          <Card.Body>
            <Card.Title>Login</Card.Title>
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

              <Button variant="danger" type="submit" disabled={reqInProcess}>
                Login
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