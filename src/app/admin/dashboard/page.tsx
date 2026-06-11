import productsData from '@/data/products.json';
import ordersData from '@/data/orders.json';

export default function AdminDashboard() {
    const totalProducts = productsData.length;
    const totalOrders = ordersData.length;
    const totalRevenue = ordersData.reduce((acc: number, o: any) => acc + parseFloat(o.total_amount), 0);
    const formatPrice = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <div style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>Total Products</div>
                    <div style={{ fontSize: '28px', fontWeight: 600 }}>{totalProducts}</div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <div style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>Total Orders</div>
                    <div style={{ fontSize: '28px', fontWeight: 600 }}>{totalOrders}</div>
                </div>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <div style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>Total Revenue</div>
                    <div style={{ fontSize: '28px', fontWeight: 600, color: '#2e7d32' }}>{formatPrice(totalRevenue)}</div>
                </div>
            </div>

            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Recent Orders</h2>
            <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f9f9f9', borderBottom: '1px solid #eee' }}>
                        <tr>
                            <th style={{ padding: '16px', fontWeight: 600 }}>Order ID</th>
                            <th style={{ padding: '16px', fontWeight: 600 }}>Date</th>
                            <th style={{ padding: '16px', fontWeight: 600 }}>Total</th>
                            <th style={{ padding: '16px', fontWeight: 600 }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersData.slice(0, 5).map((order: any) => (
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
