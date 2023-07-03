import Head from 'next/head'

export async function getServerSideProps({ params }) {
    const req = await fetch(`http://localhost:3000/api/products/${+params.id}`, {
        headers: { "x-auth-token": params.token }
    });
    const data = await req.json();

    return {
        props: { product: data }
    }
}

export default function Product({ product }) {
    return (
        <div>
            <Head>
                <title>{product.name + " - POS Admin"}</title>
            </Head>

            <ul>
                <li>{product.name}</li>
                <li>{product.price}</li>
                <li>{product.quantity}</li>
            </ul>
        </div>
    );
}