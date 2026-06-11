import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
        }

        // In a real Vercel app, you would insert this into your database (Postgres, MongoDB, etc.)
        // For this static mock, we just return success.
        return NextResponse.json({ success: true, message: 'Registration successful' });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}
