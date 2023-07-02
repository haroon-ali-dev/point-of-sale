import { NextResponse } from "next/server";
const jwt = require('jsonwebtoken');

export async function middleware(req, event) {
    const token = req.headers.get('x-auth-token');
    if (!token) return NextResponse.json({ message: 'Access denied. No token provided.' }, { status: 401 });

    try {
        const decoded = jwt.verify(token, process.env.jwtPrivateKey);
        req.user = decoded;
        NextResponse.next();
    }
    catch(ex) {
        return NextResponse.json({ message: 'Invalid token.' }, { status: 400 });
    }

    
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/api/products',
}