import productsData from '@/data/products.json';
import imagesData from '@/data/product_images.json';
import ProductDetailClient from './ProductDetailClient';
import ProductHeroClient from './ProductHeroClient';

export default async function ProductDetails({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
    const sp = await searchParams;
    const id = parseInt(sp.id || '0');
    const product = productsData.find(p => p.id === id);

    if (!product) {
        return <div style={{textAlign: 'center', padding: '100px 20px', fontSize: '1.2rem'}}>Product not found</div>;
    }

    const pImages = imagesData.filter(img => img.product_id === product.id).map(img => img.url);
    const offerPerc = parseFloat(product.product_offer_percentage as any) || 0;
    const price = parseFloat(product.product_price as any) || 0;
    const dp = offerPerc > 0 ? (price * (1 - offerPerc / 100)) : price;

    const hasModel3d = !!product.product_model_3d;
    const hbModel3dSrc = hasModel3d ? `/${product.product_model_3d}` : '';

    const displayDetail = product.product_detail_content || product.product_detail_content_vi || '';

    const formatPrice = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);

    return (
        <>
            {hasModel3d && (
                <>
                    <link rel="preconnect" href="https://ajax.googleapis.com" crossOrigin="anonymous" />
                    <link rel="dns-prefetch" href="https://ajax.googleapis.com" />
                    <link rel="modulepreload" href="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js" crossOrigin="anonymous" />
                    <link rel="preload" href={hbModel3dSrc} as="fetch" crossOrigin="anonymous" fetchPriority="high" />
                </>
            )}

            <main className="hb-product-shell">
                <ProductHeroClient 
                    images={pImages} 
                    productName={product.product_name} 
                    hasModel3d={hasModel3d} 
                    model3dSrc={hbModel3dSrc} 
                />

                <div className="hb-info">
                    <div className="hb-info__inner">
                        <div className="hb-info__left">
                            {product.product_reference && (
                                <div className="hb-info__ref">Reference. {product.product_reference}</div>
                            )}
                            <div className="hb-info__brand">HUBLOT</div>
                            <h1 className="hb-info__name">{product.product_name}</h1>
                        </div>
                        <div className="hb-info__center">
                            <p className="hb-info__desc">{product.product_description}</p>
                        </div>
                        <div className="hb-info__right">
                            <div className="hb-info__price-group">
                                {dp > 0 && dp < price ? (
                                    <>
                                        <span className="hb-info__old-price">{formatPrice(price)}</span>
                                        <span className="hb-info__price">{formatPrice(dp)}</span>
                                    </>
                                ) : (
                                    <span className="hb-info__price">{formatPrice(price)}</span>
                                )}
                            </div>
                            {product.product_stock > 0 ? (
                                <span className="hb-info__stock hb-info__stock--in">In Stock: {product.product_stock}</span>
                            ) : (
                                <span className="hb-info__stock hb-info__stock--out">Sold Out</span>
                            )}
                            <div className="hb-info__actions">
                                <button id="hbAddToCart" className={`btn btn--primary ${product.product_stock <= 0 ? 'btn--disabled' : ''}`} disabled={product.product_stock <= 0}>
                                    {product.product_stock > 0 ? 'Add to Bag' : 'Sold Out'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* WATCH SPECS GRID */}
                <section className="hb-sec hb-sec--watch-specs">
                    <div className="hb-watch-specs">
                        <h2 className="hb-watch-specs__title">Thông số kỹ thuật</h2>
                        <div className="hb-watch-specs__grid">
                            {product.collection_name && (
                                <div className="hb-watch-specs__item">
                                    <div className="hb-watch-specs__label">
                                        <span className="hb-watch-specs__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="1"/><path d="M6 7V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2M9 11h6"/></svg></span>
                                        <span className="hb-watch-specs__label-text">Bộ sưu tập</span>
                                    </div>
                                    <div className="hb-watch-specs__value">{product.collection_name}</div>
                                </div>
                            )}
                            {product.product_movement && (
                                <div className="hb-watch-specs__item">
                                    <div className="hb-watch-specs__label">
                                        <span className="hb-watch-specs__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg></span>
                                        <span className="hb-watch-specs__label-text">Bộ máy</span>
                                    </div>
                                    <div className="hb-watch-specs__value">{product.product_movement}</div>
                                </div>
                            )}
                            {product.product_case_material && (
                                <div className="hb-watch-specs__item">
                                    <div className="hb-watch-specs__label">
                                        <span className="hb-watch-specs__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 5v7c0 5 3.5 9 8 10 4.5-1 8-5 8-10V5l-8-3z"/></svg></span>
                                        <span className="hb-watch-specs__label-text">Chất liệu vỏ</span>
                                    </div>
                                    <div className="hb-watch-specs__value">{product.product_case_material}</div>
                                </div>
                            )}
                            {product.product_case_size && (
                                <div className="hb-watch-specs__item">
                                    <div className="hb-watch-specs__label">
                                        <span className="hb-watch-specs__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="9" width="19" height="6" rx="0.6"/><path d="M7 9v3M11 9v4M15 9v3M19 9v4"/></svg></span>
                                        <span className="hb-watch-specs__label-text">Kích thước vỏ</span>
                                    </div>
                                    <div className="hb-watch-specs__value">{product.product_case_size}</div>
                                </div>
                            )}
                            {product.product_dial_color && (
                                <div className="hb-watch-specs__item">
                                    <div className="hb-watch-specs__label">
                                        <span className="hb-watch-specs__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span>
                                        <span className="hb-watch-specs__label-text">Mặt số</span>
                                    </div>
                                    <div className="hb-watch-specs__value">{product.product_dial_color}</div>
                                </div>
                            )}
                            {product.product_crystal && (
                                <div className="hb-watch-specs__item">
                                    <div className="hb-watch-specs__label">
                                        <span className="hb-watch-specs__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l3 6-9 12L3 9z"/><path d="M3 9h18M9 9l3 12 3-12M9 9l3-6 3 6"/></svg></span>
                                        <span className="hb-watch-specs__label-text">Kính</span>
                                    </div>
                                    <div className="hb-watch-specs__value">{product.product_crystal}</div>
                                </div>
                            )}
                            {product.product_water_resistance && (
                                <div className="hb-watch-specs__item">
                                    <div className="hb-watch-specs__label">
                                        <span className="hb-watch-specs__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5c-4 4.5-7 8.5-7 12.5a7 7 0 0 0 14 0c0-4-3-8-7-12.5z"/><path d="M9.5 14.5A2.5 2.5 0 0 0 12 17" opacity="0.55"/></svg></span>
                                        <span className="hb-watch-specs__label-text">Chống nước</span>
                                    </div>
                                    <div className="hb-watch-specs__value">{product.product_water_resistance}</div>
                                </div>
                            )}
                            {product.product_strap_material && (
                                <div className="hb-watch-specs__item">
                                    <div className="hb-watch-specs__label">
                                        <span className="hb-watch-specs__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M10 14a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1.5 1.5"/><path d="M14 10a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1.5-1.5"/></svg></span>
                                        <span className="hb-watch-specs__label-text">Dây</span>
                                    </div>
                                    <div className="hb-watch-specs__value">{product.product_strap_material}</div>
                                </div>
                            )}
                            {product.product_power_reserve && (
                                <div className="hb-watch-specs__item">
                                    <div className="hb-watch-specs__label">
                                        <span className="hb-watch-specs__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M13 3 4 14h7l-1 7 9-11h-7l1-7z"/></svg></span>
                                        <span className="hb-watch-specs__label-text">Trữ cót</span>
                                    </div>
                                    <div className="hb-watch-specs__value">{product.product_power_reserve}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <div className="hb-sections">
                    {displayDetail && (
                        <div className="hb-products-header__lead" style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: displayDetail }}></div>
                    )}
                    <div id="hb-sections-container"></div>
                </div>

                <ProductDetailClient sectionsJson={product.product_sections || "[]"} />

            </main>
        </>
    );
}
