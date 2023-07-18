import Head from 'next/head';
import { Card, Table } from 'react-bootstrap';
import moment from 'moment';

export async function getServerSideProps({ params }) {
    const host = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://point-of-sale-tau.vercel.app"

    const req = await fetch(`${host}/api/orders/${+params.id}`, {
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
                <h1 className='heading'>Order #{order.id}</h1>

                <Card className='card-list'>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{order.id}</td>
                                    <td>{moment(order["date"]).utcOffset("+0100").format("DD-MM-YYYY")}</td>
                                    <td>{order.cart.length}</td>
                                    <td>£{order["total"]}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <Card className='card-list'>
                    <Card.Body>
                        <Card.Title>Items</Card.Title>
                        <Table className='mt-3' striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.cart.map((order, i) => (
                                    <tr key={i}>
                                        <td>{order.pId}</td>
                                        <td>{order.name}</td>
                                        <td>£{order.price.toFixed(2)}</td>
                                        <td>{order.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </main>
        </>
    );
}