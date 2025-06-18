import { NextResponse } from 'next/server'
import { BASE_URL } from './utils/api'

export async function middleware(request) {
    let isAuth = false

    const token = request.cookies.get('token')?.value;
    if (token) {
        try {
            const res = await fetch(`${BASE_URL}/check_session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ token: token }),
            });
            if (res.ok) {
                isAuth = true;
            }
        } catch (error) {
            isAuth = false;
        }
    }

    const pathname = request.nextUrl.pathname;
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
        if (isAuth) {
            return NextResponse.redirect(new URL('/', request.url));
        } else {
            return NextResponse.next();
        }
    }

    if (!isAuth) {
        console.log('masuk sini');
        return NextResponse.redirect(new URL('/login', request.url));
    } else {
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/register',
        '/beranda',
    ],
}