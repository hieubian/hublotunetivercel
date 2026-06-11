import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-sidebar__logo">
                    <Link href="/admin/dashboard" className="admin-sidebar__logo-link">
                        <img src="/hublot-logo-upd.svg" alt="HUBLOT" className="admin-sidebar__logo-img" width="368" height="48" decoding="async" />
                    </Link>
                </div>

                <div className="admin-lang-switch">
                    <Link href="?lang=vi" className="admin-lang-switch__btn admin-lang-switch__btn--active">VI</Link>
                    <Link href="?lang=en" className="admin-lang-switch__btn">EN</Link>
                </div>

                <div className="admin-sidebar__section-label">Dashboard</div>
                <Link href="/admin/dashboard" className="admin-sidebar__link">
                    <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg>
                    Dashboard
                </Link>

                <div className="admin-sidebar__section-label">Products</div>
                <Link href="/admin/products" className="admin-sidebar__link">
                    <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                    Products
                </Link>
                <Link href="/admin/inventory" className="admin-sidebar__link">
                    <svg viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Inventory
                </Link>

                <div className="admin-sidebar__section-label">Orders</div>
                <Link href="/admin/orders" className="admin-sidebar__link">
                    <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line></svg>
                    Orders
                </Link>

                <div className="admin-sidebar__section-label">Users</div>
                <Link href="/admin/users" className="admin-sidebar__link">
                    <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    Users
                </Link>

                <Link href="/login" className="admin-sidebar__link" style={{marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px'}}>
                    <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    Logout
                </Link>
            </aside>

            {/* Main Content */}
            <main className="admin-content">
                {children}
            </main>
        </div>
    );
}
