import Head from 'next/head'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Card, Spinner, Table, Stack } from 'react-bootstrap';
import { CardList } from 'react-bootstrap-icons';
import jwt from "jwt-decode";
import moment from 'moment';

import AuthOnly from '@/components/AuthOnly';

export default function Orders() {
    return (
        <AuthOnly><OrdersContent /></AuthOnly>
    );
}

export function OrdersContent() {
    const [tokenData, setTokenData] = useState(["", ""]);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function getOrders() {
            const token = localStorage.getItem("token");
            const { uId } = jwt(token);

            try {
                const res = await fetch(`/api/orders/user/${uId}`, {
                    headers: { "x-auth-token": token }
                });

                const data = await res.json();

                if (res.status === 200) {
                    setLoading(false);
                    setOrders(data);
                    setTokenData([token, uId]);
                } else {
                    console.log(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        getOrders();
    }, []);

    return (
        <>
            <Head>
                <title>Orders - POS Admin</title>
            </Head>

            <main>
                <h1 className='heading'>Orders</h1>

                <Card className='card-list'>
                    <Card.Body>
                        {loading && (
                            <Spinner className="ms-auto me-auto" style={{ display: 'block' }} animation="border" role="status" size="sm">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        )}
                        {(!loading && orders.length <= 0) && (
                            <p style={{ textAlign: 'center', margin: '0px' }}>No orders.</p>
                        )}
                        {(!loading && orders.length > 0) && (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, i) => (
                                        <tr key={i}>
                                            <td>{order.id}</td>
                                            <td>{moment(order["date"]).utcOffset("+0100").format("DD-MM-YYYY")}</td>
                                            <td>{order.cart.length}</td>
                                            <td>£{order["total"]}</td>
                                            <td>
                                                <Stack direction="horizontal" gap={3}>
                                                    <Link className='table-btns' href={`orders/${order.id}/${tokenData[0]}`}><CardList /></Link>
                                                </Stack>
                                            </td>
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