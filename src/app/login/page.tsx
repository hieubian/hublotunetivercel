"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.success) {
                // In a real app we'd set cookies. For now, just redirect
                if (data.role === 'admin') {
                    router.push('/admin/dashboard');
                } else {
                    router.push('/');
                }
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-card__title">Sign In</h1>
                {error && <div className="auth-card__error">{error}</div>}
                
                <form onSubmit={handleSubmit} id="loginForm">
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-input" required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-input" required value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className={`btn btn--primary btn--full ${loading ? 'btn--loading' : ''}`} disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-card__footer">
                    <Link href="#">Forgot password?</Link>
                    <br /><br />
                    Don't have an account? <Link href="/register">Register</Link>
                </div>
            </div>
        </div>
    );
}
