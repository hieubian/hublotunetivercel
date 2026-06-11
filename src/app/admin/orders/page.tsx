import ordersData from '@/data/orders.json';
import Link from 'next/link';

export default function AdminOrders() {
    const formatPrice = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>Orders</h1>

            <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f9f9f9', borderBottom: '1px solid #eee' }}>
                        <tr>
                            <th style={{ padding: '16px', fontWeight: 600 }}>Order ID</th>
                            <th style={{ padding: '16px', fontWeight: 600 }}>Date</th>
                            <th style={{ padding: '16px', fontWeight: 600 }}>Total</th>
                            <th style={{ padding: '16px', fontWeight: 600 }}>Status</th>
                            <th style={{ padding: '16px', fontWeight: 600 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersData.map((order: any) => (
                            <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '16px' }}>#{order.id}</td>
                                <td style={{ padding: '16px' }}>{new Date(order.order_date).toLocaleDateString()}</td>
                                <td style={{ padding: '16px' }}>{formatPrice(parseFloat(order.total_amount))}</td>
                                <td style={{ padding: '16px' }}>
                                    <span style={{ 
                                        padding: '4px 8px', 
                                        borderRadius: '4px', 
                                        fontSize: '12px',
                                        backgroundColor: order.status === 'Completed' ? '#e8f5e9' : '#fff3e0',
                                        color: order.status === 'Completed' ? '#2e7d32' : '#f57c00'
                                    }}>
                                        {order.status}
                                    </span>
                                </td>
                                <td style={{ padding: '16px' }}>
                                    <button className="btn btn--outline btn--small">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
