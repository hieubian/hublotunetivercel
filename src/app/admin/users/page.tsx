import usersData from '@/data/users.json';

export default function AdminUsers() {
    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 600 }}>Users</h1>
            </div>

            <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f9f9f9', borderBottom: '1px solid #eee' }}>
                        <tr>
                            <th style={{ padding: '16px', fontWeight: 600 }}>ID</th>
                            <th style={{ padding: '16px', fontWeight: 600 }}>Name</th>
                            <th style={{ padding: '16px', fontWeight: 600 }}>Email</th>
                            <th style={{ padding: '16px', fontWeight: 600 }}>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map((user: any) => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '16px' }}>{user.id}</td>
                                <td style={{ padding: '16px' }}>{user.first_name} {user.last_name}</td>
                                <td style={{ padding: '16px' }}>{user.email}</td>
                                <td style={{ padding: '16px' }}>
                                    <span style={{ 
                                        padding: '4px 8px', 
                                        borderRadius: '4px', 
                                        fontSize: '12px',
                                        backgroundColor: user.role === 'admin' ? '#e1bee7' : '#e0e0e0',
                                        color: user.role === 'admin' ? '#6a1b9a' : '#424242'
                                    }}>
                                        {user.role}
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
