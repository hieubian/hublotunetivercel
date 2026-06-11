'use client';

import React, { useState } from 'react';

interface ProductHeroClientProps {
    images: string[];
    productName: string;
    hasModel3d: boolean;
    model3dSrc: string;
}

export default function ProductHeroClient({ images, productName, hasModel3d, model3dSrc }: ProductHeroClientProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className={`hb-hero${hasModel3d ? ' hb-hero--has-rail' : ''}`} id="hbHero">
            <div className="hb-hero__media-row">
                <div className="hb-hero__media-cell">
                    <div className="hb-hero__media-visual">
                        <div className={`hb-hero__media-stage${!hasModel3d ? ' hb-hero__media-stage--photo-only' : ''}`}>
                            
                            {/* PHOTO VIEW */}
                            <div className="hb-hero__photo-stack" id="hbHeroPhotoPanel">
                                <div className="hb-hero__gallery">
                                    {images.length > 0 && (
                                        <img 
                                            id="heroMainImg"
                                            src={`/${images[activeIndex]}`} 
                                            alt={productName} 
                                            className="hb-hero__img" 
                                            loading="eager" 
                                            draggable={false} 
                                        />
                                    )}
                                </div>
                                {images.length > 1 && (
                                    <div className="hb-hero__thumbs">
                                        {images.map((img, idx) => (
                                            <div 
                                                key={idx} 
                                                className={`hb-hero__thumb ${idx === activeIndex ? 'hb-hero__thumb--active' : ''}`} 
                                                data-image-path={img}
                                                onClick={() => setActiveIndex(idx)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <img src={`/${img}`} alt="" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* 3D VIEW */}
                            {hasModel3d && (
                                <div className="hb-hero__model-wrap" id="hbHeroModelWrap" hidden>
                                    <div className="hb-hero__model-frame">
                                        <div 
                                            className="hb-hero__model-host" 
                                            id="hbModelHost"
                                            data-model-src={model3dSrc}
                                            data-model-alt={`${productName} — 3D`}
                                            data-model-err="Could not load 3D model"
                                        >
                                            <div className="hb-hero__model-hint" id="hbModelLoadingHint" hidden>
                                                Loading 3D model…
                                            </div>
                                        </div>
                                        <div className="hb-hero__model-tip" id="hbModelTip" hidden>
                                            Drag to rotate · Scroll to zoom
                                        </div>
                                        <div className="hb-hero__model-actions" id="hbModelActions" hidden>
                                            <button type="button" className="hb-hero__model-reset" id="hbModelReset">
                                                Reset View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                        
                        {/* VIEW MODE TOGGLE */}
                        {hasModel3d && (
                            <aside className="hb-hero__rail" aria-label="View mode">
                                <div className="hb-hero__rail-inner">
                                    <span className="hb-hero__rail-line" aria-hidden="true"></span>
                                    <div className="hb-hero__rail-choices">
                                        <button 
                                            type="button" 
                                            id="hbHeroBtnPhoto"
                                            className="hb-hero__rail-choice hb-hero__rail-choice--photo hb-hero__rail-choice--active" 
                                            aria-pressed="true"
                                        >
                                            <svg className="hb-hero__rail-choice-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35">
                                                <rect x="3.5" y="5" width="17" height="14" rx="1" />
                                                <path d="M3.5 14.5 8.5 10l4 4 3.5-3.5L20.5 15" strokeLinecap="round" strokeLinejoin="round"/>
                                                <circle cx="8" cy="8.5" r="1.25" fill="currentColor"/>
                                            </svg>
                                        </button>
                                        <button 
                                            type="button" 
                                            id="hbHeroBtn3d"
                                            className="hb-hero__rail-choice hb-hero__rail-choice--3d" 
                                            aria-pressed="false"
                                        >
                                            <svg className="hb-hero__rail-cube" viewBox="0 0 40 36" fill="none" stroke="currentColor" strokeWidth="1.35">
                                                <path d="M20 2L36 10.5v15L20 34L4 25.5v-15L20 2z" strokeLinejoin="miter"/>
                                                <path d="M20 2v16" />
                                                <path d="M4 10.5 20 18.5 36 10.5" />
                                                <path d="M20 18v16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </aside>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="hb-hero__scroll-hint" id="hbScrollHint">
                <span>Scroll down for details</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            </div>
        </div>
    );
}
