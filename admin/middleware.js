import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

export async function middleware(req) {
    const token = req.headers.get('x-auth-token');
    if (!token) return NextResponse.json({ message: 'Access denied. No token provided.' }, { status: 401 });

    try {
        await jwtVerify(token, new TextEncoder().encode(process.env.jwtPrivateKey));
        return NextResponse.next();
    }
    catch(ex) {
        return NextResponse.json({ message: 'Invalid token.' }, { status: 400 });
    }
}

export const config = {
    matcher: ['/api/products/:path*', '/api/orders/:path*']
}