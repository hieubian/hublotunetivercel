import productsData from '@/data/products.json';
import Link from 'next/link';

export default function AdminProducts() {
    const formatPrice = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 600 }}>Products</h1>
                <button className="btn btn--primary btn--small">Add Product</button>
            </div>

            <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f9f9f9', borderBottom: '1px solid #eee' }}>
                        <tr>
                            <th style={{ padding: '16px', fontWeight: 600 }}>ID</th>
                            <th style={{ padding: '16px', fontWeight: 600 }}>Name</th>
                            <th style={{ padding: '16px', fontWeight: 600 }}>Price</th>
                            <th style={{ padding: '16px', fontWeight: 600 }}>Stock</th>
                            <th style={{ padding: '16px', fontWeight: 600 }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsData.map((product: any) => (
                            <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '16px' }}>{product.id}</td>
                                <td style={{ padding: '16px' }}>{product.product_name}</td>
                                <td style={{ padding: '16px' }}>{formatPrice(parseFloat(product.product_price))}</td>
                                <td style={{ padding: '16px' }}>{product.product_stock}</td>
                                <td style={{ padding: '16px' }}>
                                    <button className="btn btn--outline btn--small" style={{ marginRight: '8px' }}>Edit</button>
                                    <button className="btn btn--outline btn--small" style={{ color: 'red', borderColor: 'red' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
