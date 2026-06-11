import productsData from '@/data/products.json';
import imagesData from '@/data/product_images.json';
import Link from 'next/link';

export default async function ProductView({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const sp = await searchParams;
    const view = sp.view as string || '';
    const sortVal = sp.sort as string || '';
    const searchQ = sp.search as string || '';
    const category = sp.category as string || '';

    let products = productsData.map(p => {
        const pImages = imagesData.filter(img => img.product_id === p.id).map(img => img.url);
        const offerPerc = parseFloat(p.product_offer_percentage as any) || 0;
        const price = parseFloat(p.product_price as any) || 0;
        const dp = offerPerc > 0 ? (price * (1 - offerPerc / 100)) : price;
        return {
            id: p.id,
            name: p.product_name,
            image: pImages.length > 0 ? pImages[0] : "",
            price: price,
            dp: dp,
            stock: p.product_stock,
            offer: offerPerc,
            created_at: new Date(p.created_at).getTime()
        };
    });

    if (searchQ) {
        products = products.filter(p => p.name.toLowerCase().includes(searchQ.toLowerCase()));
    }
    if (view === 'new') {
        products.sort((a, b) => b.created_at - a.created_at);
    } else if (view === 'bestseller') {
        // Just mock bestseller by sorting by stock or something
        products.sort((a, b) => a.stock - b.stock);
    }
    if (sortVal === 'lowtohigh') {
        products.sort((a, b) => a.dp - b.dp);
    } else if (sortVal === 'hightolow') {
        products.sort((a, b) => b.dp - a.dp);
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="container" style={{ marginTop: '40px', minHeight: '60vh' }}>
            <div className="filter-bar">
                <div className="filter-bar__left">
                    <div className="filter-bar__shop">
                        <Link href="/productView" className={`filter-bar__link ${!view && !category ? 'filter-bar__link--active' : ''}`}>Watches</Link>
                        <Link href="/productView?view=new" className={`filter-bar__link ${view === 'new' ? 'filter-bar__link--active' : ''}`}>New Arrivals</Link>
                        <Link href="/productView?view=bestseller" className={`filter-bar__link ${view === 'bestseller' ? 'filter-bar__link--active' : ''}`}>Best Sellers</Link>
                    </div>
                </div>
                <div className="filter-bar__right">
                    <form method="GET" action="/productView" className="filter-bar__search">
                        {category && <input type="hidden" name="category" value={category} />}
                        {view && <input type="hidden" name="view" value={view} />}
                        <input type="hidden" name="sort" value={sortVal} />
                        <input type="text" name="search" defaultValue={searchQ} placeholder="Search..." className="filter-bar__search-input" />
                    </form>
                    <div className="filter-bar__sort">
                        {/* We will rely on native form submit or client component, but for SSR links are easier, 
                            here we just render a simple select that we'll attach an onChange event to via a client component later, 
                            but to keep it simple and static, we'll just output the HTML. */}
                        <form method="GET" action="/productView" style={{display: 'inline-block'}} onChange={(e) => (e.currentTarget as HTMLFormElement).submit()}>
                            {category && <input type="hidden" name="category" value={category} />}
                            {view && <input type="hidden" name="view" value={view} />}
                            {searchQ && <input type="hidden" name="search" value={searchQ} />}
                            <select name="sort" defaultValue={sortVal} className="filter-bar__sort-select" style={{padding: '5px'}}>
                                <option value="">Sort</option>
                                <option value="lowtohigh">Price: Low &rarr; High</option>
                                <option value="hightolow">Price: High &rarr; Low</option>
                            </select>
                        </form>
                    </div>
                </div>
            </div>

            <div className="container-fluid" style={{ padding: 0 }}>
                {products.length > 0 ? (
                    <div className="product-grid">
                        {products.map(item => (
                            <Link href={`/productDetails?id=${item.id}`} className="product-card" key={item.id}>
                                {item.offer > 0 && (
                                    <span className="product-card__badge">&minus;{Math.round(item.offer)}%</span>
                                )}
                                <div className="product-card__image">
                                    {item.image && <img src={`/${item.image}`} alt={item.name} />}
                                </div>
                                <div className="product-card__info">
                                    <div className="product-card__name">{item.name}</div>
                                    <div className="product-card__price">
                                        {item.dp > 0 && item.dp < item.price ? (
                                            <>
                                                <span className="product-card__original-price">{formatPrice(item.price)}</span>
                                                <span className="product-card__discount-price">{formatPrice(item.dp)}</span>
                                            </>
                                        ) : (
                                            <span>{formatPrice(item.price)}</span>
                                        )}
                                    </div>
                                    {item.stock === 0 && (
                                        <div className="product-card__out-of-stock">Sold out</div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '100px 20px', color: '#888' }}>
                        <p style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '3px' }}>No products found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
