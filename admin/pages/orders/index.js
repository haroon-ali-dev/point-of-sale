import Head from 'next/head'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Card, Spinner, Table, Stack } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

import AuthOnly from '@/components/AuthOnly';

export default function Orders() {
    return (
        <AuthOnly><OrdersContent /></AuthOnly>
    );
}

export function OrdersContent() {
    

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