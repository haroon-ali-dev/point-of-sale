import AuthOnly from '@/components/AuthOnly';
import Head from 'next/head'

export default function Products() {
    return (
        <AuthOnly><ProductsContent /></AuthOnly>
    );
}

export function ProductsContent() {
    return (
        <>
            <Head>
                <title>Products - POS Admin</title>
            </Head>
            <main>
                <h1>Products</h1>
            </main>
        </>
    );
}