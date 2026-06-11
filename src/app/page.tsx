import productsData from '@/data/products.json';
import imagesData from '@/data/product_images.json';
import lookbookSections from '@/data/collections.json';
import HomeClient from './HomeClient';

export default function Home() {
  const products = productsData.map(p => {
    const pImages = imagesData.filter(img => img.product_id === p.id).map(img => img.url);
    const offerPerc = parseFloat(p.product_offer_percentage as any) || 0;
    const price = parseFloat(p.product_price as any) || 0;
    const dp = offerPerc > 0 ? (price * (1 - offerPerc / 100)) : price;
    return {
      id: p.id,
      name: p.product_name,
      image: pImages.length > 0 ? pImages[0] : "",
      images: pImages,
      price: price,
      dp: dp,
      stock: p.product_stock,
      brand: "HUBLOT"
    };
  });

  return (
    <>
      {/* Lookbook Sections */}
      {lookbookSections.reduce((acc: any[], sec: any, idx) => {
        if (sec.home_kind === 'feature') {
          const lastGroup = acc[acc.length - 1];
          if (lastGroup && lastGroup.type === 'feature-group') {
            lastGroup.items.push(sec);
          } else {
            acc.push({ type: 'feature-group', items: [sec], id: `group-${sec.id}` });
          }
        } else {
          acc.push({ type: 'single', sec, idx, id: `single-${sec.id}` });
        }
        return acc;
      }, []).map((group: any) => {
        if (group.type === 'feature-group') {
          return (
            <div key={group.id} className="hub-lb-features">
              <header className="hub-lb-features__header">
                <p className="hub-lb-features__eyebrow">Bộ sưu tập</p>
                <h2 className="hub-lb-features__title">Khám phá theo từng dòng</h2>
              </header>
              <div className="hub-lb-features__grid">
                {group.items.map((sec: any) => {
                  const showVid = sec.home_media_type === 'video' && !!sec.home_video_url;
                  const hImg = sec.home_image_url;
                  const hVid = sec.home_video_url;
                  const hTitle = sec.home_title || sec.collection_name;
                  const hSubtitle = sec.home_subtitle || sec.collection_description;
                  const hEyebrow = sec.home_eyebrow;
                  const hCtaLabel = sec.home_cta_label || 'Khám phá';
                  const hCtaUrl = sec.home_cta_url || `/collection/${sec.collection_name}`;

                  return (
                    <a key={sec.id} className={`hub-lb-feat hub-lb-feat--align-${sec.home_text_align}${sec.home_overlay === 'light' ? ' hub-lb-feat--light-overlay' : ''}`} href={hCtaUrl}>
                      <div className="hub-lb-feat__media">
                        {showVid ? (
                          <video autoPlay muted loop playsInline preload="none" aria-label={hTitle}>
                            <source src={`/${hVid}`} type="video/mp4" />
                          </video>
                        ) : hImg ? (
                          <img src={`/${hImg}`} alt={hTitle} loading="lazy" decoding="async" />
                        ) : (
                          <div className="hub-lb-feat__placeholder" aria-hidden="true"></div>
                        )}
                        <span className={`hub-lb-feat__scrim hub-lb-feat__scrim--${sec.home_overlay}`} aria-hidden="true"></span>
                      </div>
                      <div className="hub-lb-feat__inner">
                        {hEyebrow && <p className="hub-lb-feat__eyebrow">{hEyebrow}</p>}
                        <h3 className="hub-lb-feat__title">{hTitle}</h3>
                        {hSubtitle && <p className="hub-lb-feat__subtitle">{hSubtitle}</p>}
                        <span className="hub-lb-feat__cta">
                          <span>{hCtaLabel}</span>
                          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h14M14 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          );
        }

        const sec = group.sec;
        const idx = group.idx;
        const isHero = sec.home_kind === 'hero';
        const isStory = sec.home_kind === 'story';
        const isSpotlight = sec.home_kind === 'spotlight';
        
        const showVid = sec.home_media_type === 'video' && !!sec.home_video_url;
        const hImg = sec.home_image_url;
        const hVid = sec.home_video_url;
        const hTitle = sec.home_title || sec.collection_name;
        const hSubtitle = sec.home_subtitle || sec.collection_description;
        const hEyebrow = sec.home_eyebrow;
        const hCtaLabel = sec.home_cta_label || 'Khám phá';
        const hCtaUrl = sec.home_cta_url || `/collection/${sec.collection_name}`;

        if (isHero) {
          return (
            <section key={sec.id} className={`hub-lb-hero hub-lb-hero--${sec.home_overlay} hub-lb-hero--align-${sec.home_text_align}`}>
              <div className="hub-lb-hero__media">
                {showVid ? (
                  <video className="hub-lb-hero__video" autoPlay muted loop playsInline preload="metadata" poster={hImg ? `/${hImg}` : undefined}>
                    <source src={`/${hVid}`} type="video/mp4" />
                  </video>
                ) : hImg ? (
                  <img className="hub-lb-hero__img" src={`/${hImg}`} alt={hTitle} decoding="async" />
                ) : (
                  <div className="hub-lb-hero__placeholder" aria-hidden="true"></div>
                )}
                <span className="hub-lb-hero__scrim" aria-hidden="true"></span>
              </div>
              <div className="hub-lb-hero__inner">
                {hEyebrow && <p className="hub-lb-hero__eyebrow">{hEyebrow}</p>}
                <h1 className="hub-lb-hero__title">{hTitle}</h1>
                {hSubtitle && <p className="hub-lb-hero__subtitle">{hSubtitle}</p>}
                <a className="hub-lb-hero__cta" href={hCtaUrl}>
                  <span>{hCtaLabel}</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h14M14 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
              <a className="hub-lb-hero__scroll" href="#hub-products" aria-label="Scroll"><span></span></a>
            </section>
          );
        }

        if (isStory) {
          return (
            <section key={sec.id} className={`hub-lb-story hub-lb-story--align-${sec.home_text_align} ${idx % 2 === 0 ? 'hub-lb-story--media-left' : 'hub-lb-story--media-right'}`}>
              <div className="hub-lb-story__media">
                {showVid ? (
                  <video autoPlay muted loop playsInline preload="none" aria-label={hTitle}>
                    <source src={`/${hVid}`} type="video/mp4" />
                  </video>
                ) : hImg ? (
                  <img src={`/${hImg}`} alt={hTitle} loading="lazy" decoding="async" />
                ) : (
                  <div className="hub-lb-story__placeholder" aria-hidden="true"></div>
                )}
              </div>
              <div className="hub-lb-story__inner">
                {hEyebrow && <p className="hub-lb-story__eyebrow">{hEyebrow}</p>}
                <h2 className="hub-lb-story__title">{hTitle}</h2>
                {hSubtitle && <p className="hub-lb-story__subtitle">{hSubtitle}</p>}
                <a className="hub-lb-story__cta" href={hCtaUrl}>
                  <span>{hCtaLabel}</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h14M14 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </section>
          );
        }

        if (isSpotlight) {
          return (
            <section key={sec.id} className={`hub-lb-spot hub-lb-spot--${sec.home_overlay} hub-lb-spot--align-${sec.home_text_align}`}>
              <div className="hub-lb-spot__media">
                {showVid ? (
                  <video autoPlay muted loop playsInline preload="none" aria-label={hTitle}>
                    <source src={`/${hVid}`} type="video/mp4" />
                  </video>
                ) : hImg ? (
                  <img src={`/${hImg}`} alt={hTitle} loading="lazy" decoding="async" />
                ) : (
                  <div className="hub-lb-spot__placeholder" aria-hidden="true"></div>
                )}
                <span className="hub-lb-spot__scrim" aria-hidden="true"></span>
              </div>
              <div className="hub-lb-spot__inner">
                {hEyebrow && <p className="hub-lb-spot__eyebrow">{hEyebrow}</p>}
                <h2 className="hub-lb-spot__title">{hTitle}</h2>
                {hSubtitle && <p className="hub-lb-spot__subtitle">{hSubtitle}</p>}
                <a className="hub-lb-spot__cta" href={hCtaUrl}>
                  <span>{hCtaLabel}</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h14M14 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </section>
          );
        }

        return null;
      })}

      <header className="hub-products-header" id="hub-products">
        <p className="hub-products-header__eyebrow">Tất cả sản phẩm</p>
        <h2 className="hub-products-header__title">Toàn bộ HUBLOT</h2>
        <p className="hub-products-header__lead">Bộ sưu tập đầy đủ — kéo, chạm để mở</p>
      </header>

      <div id="yz-grid-view">
        <div className="yz-grid">
          {products.length > 0 ? (
            products.map((item, idx) => (
              <div className="yz-item" data-index={idx} key={item.id}>
                <div className="yz-item__img" id={`yz-img-${idx}`}>
                  {item.image && (
                    <img src={`/${item.image}`} alt={item.name} draggable="false" />
                  )}
                </div>
                <div className="yz-item__code">{item.name}</div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '120px 20px' }}>
              <p style={{ fontSize: 'clamp(12px,.85rem,.95rem)', textTransform: 'none', letterSpacing: '.04em', color: 'var(--text-light)', fontFamily: 'var(--font-main)' }}>No products yet</p>
            </div>
          )}
        </div>
      </div>

      <div id="yz-detail-view" className="yz-detail-view yz-detail-view--home" aria-hidden="true" style={{display: 'none'}}>
        <div className="yz-detail yz-detail--home">
          <div className="yz-detail__panel" id="yzdPanel">
            <div className="yz-detail__stage" id="yzdStage">
              <button type="button" className="yz-detail__nav yz-detail__nav--img yz-detail__nav--side-left" id="yzdImgPrev" aria-label="Previous image" hidden>
                <svg width="14" height="24" viewBox="0 0 20 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="miter"><polyline points="11 4 2 16 11 28"></polyline></svg>
              </button>
              <div className="yz-detail__vclip" id="yzdVclip">
                <div className="yz-detail__vtrack" id="yzdVTrack">
                  <div className="yz-detail__vmove">
                    <div className="yz-detail__media" id="yzdMedia">
                      <div className="yz-detail__img-frame">
                        <div className="yz-detail__hclip" id="yzdHclip">
                          <div className="yz-detail__htrack" id="yzdHTrack">
                            <div className="yz-detail__hmove">
                              <img id="yzdImg" className="yz-detail__img-main" alt="" draggable="false" />
                            </div>
                            <div className="yz-detail__hmove" aria-hidden="true">
                              <img id="yzdImgH1" className="yz-detail__img-main" alt="" draggable="false" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="yz-detail__dots" id="yzdDots" role="tablist" aria-label="Product photos"></div>
                    </div>
                  </div>
                  <div className="yz-detail__vmove" aria-hidden="true">
                    <div className="yz-detail__media yz-detail__media--peek">
                      <div className="yz-detail__img-frame">
                        <img id="yzdImg1" className="yz-detail__img-main" alt="" draggable="false" />
                      </div>
                      <div className="yz-detail__dots yz-detail__dots--peek" id="yzdDots1" role="tablist" aria-label=""></div>
                    </div>
                  </div>
                </div>
              </div>
              <button type="button" className="yz-detail__nav yz-detail__nav--img yz-detail__nav--side-right" id="yzdImgNext" aria-label="Next image" hidden>
                <svg width="14" height="24" viewBox="0 0 20 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="miter"><polyline points="9 4 18 16 9 28"></polyline></svg>
              </button>
            </div>
            <div className="yz-detail__info" id="yzdInfo">
              <div className="yz-detail__name" id="yzdName"></div>
              <div className="yz-detail__price-row" id="yzdPrice"></div>
              <div className="yz-detail__actions">
                <button type="button" className="yz-detail__plus" id="yzdPlus" title="Add to Bag">+</button>
              </div>
              <a className="yz-detail__link" id="yzdLink" href="#">View Details &rarr;</a>
            </div>
          </div>
        </div>
      </div>
      
      <HomeClient products={products} />
    </>
  );
}
