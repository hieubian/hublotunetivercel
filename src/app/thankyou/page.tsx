import Link from 'next/link';

export default function ThankYou() {
    return (
        <div className="container" style={{ textAlign: 'center', padding: '120px 20px', minHeight: '60vh' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#e8f5e9', color: '#2e7d32', marginBottom: '24px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            <h1 style={{ fontSize: '24px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>Thank you for your order!</h1>
            <p style={{ color: '#666', marginBottom: '32px', fontSize: '15px' }}>
                We've received your order and will contact you shortly to confirm the details.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <Link href="/productView" className="btn btn--outline">Continue Shopping</Link>
                <Link href="/" className="btn btn--primary">Return Home</Link>
            </div>
        </div>
    );
}
