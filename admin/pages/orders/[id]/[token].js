import Head from 'next/head';
import { Card, Form, Button, Spinner, Alert, InputGroup } from 'react-bootstrap';

export async function getServerSideProps({ params }) {
    const req = await fetch(`http://localhost:3000/api/orders/${+params.id}`, {
        headers: { "x-auth-token": params.token }
    });
    const data = await req.json();

    return {
        props: { order: data, token: params.token }
    }
}

export default function Order({ order }) {
    return (
        <>
            <Head>
                <title>{"Order #" + order.id + " - POS Admin"}</title>
            </Head>

            <main>
                <h1>{order.id}</h1>
            </main>
        </>
    );
}