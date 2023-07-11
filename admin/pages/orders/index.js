import Head from 'next/head'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Card, Spinner, Table, Stack } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import jwt from "jwt-decode";

import AuthOnly from '@/components/AuthOnly';

export default function Orders() {
    return (
        <AuthOnly><OrdersContent /></AuthOnly>
    );
}

export function OrdersContent() {
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
                    console.log(data);
                    setLoading(false);
                    setOrders(data);
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

            </main>
        </>
    );
}