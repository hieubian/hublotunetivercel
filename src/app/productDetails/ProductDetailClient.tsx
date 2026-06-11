"use client";

import { useEffect } from 'react';

export default function ProductDetailClient({ sectionsJson }: { sectionsJson: string }) {
    useEffect(() => {
        document.body.classList.add('hb-product-detail');
        let lastY = window.scrollY || 0;
        const scrollHandler = () => {
            const y = window.scrollY || document.documentElement.scrollTop;
            if (y < 8) {
                document.body.classList.remove('hb-nav-hidden');
            } else if (y > lastY && y > 48) {
                document.body.classList.add('hb-nav-hidden');
            } else if (y < lastY) {
                document.body.classList.remove('hb-nav-hidden');
            }
            lastY = y;
        };
        window.addEventListener('scroll', scrollHandler, { passive: true });

        // Thumbnails logic
        const thumbs = document.querySelectorAll('.hb-hero__thumb');
        const mainImg = document.getElementById('heroMainImg') as HTMLImageElement;
        thumbs.forEach(t => {
            t.addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLElement;
                if(mainImg) mainImg.src = '/' + target.getAttribute('data-image-path');
                thumbs.forEach(th => th.classList.remove('hb-hero__thumb--active'));
                target.classList.add('hb-hero__thumb--active');
            });
        });

        // Add to cart logic
        const btnCart = document.getElementById('hbAddToCart');
        if (btnCart) {
            btnCart.addEventListener('click', () => {
                alert('Add to Bag');
            });
        }

        // Hero 3D logic
        const MV_MODULE = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';
        const btnPhoto = document.getElementById('hbHeroBtnPhoto');
        const btn3d = document.getElementById('hbHeroBtn3d');
        const heroRoot = document.getElementById('hbHero');
        const panelPhoto = document.getElementById('hbHeroPhotoPanel');
        const panelModel = document.getElementById('hbHeroModelWrap');
        const host = document.getElementById('hbModelHost');
        const loadHint = document.getElementById('hbModelLoadingHint');
        const tipEl = document.getElementById('hbModelTip');
        const actionsEl = document.getElementById('hbModelActions');
        const resetBtn = document.getElementById('hbModelReset');
        const scrollHint = document.getElementById('hbScrollHint');

        let modelSrc = host ? host.getAttribute('data-model-src') : '';
        let mvPending = false;
        let mvEl: any = null;

        function setView(mode: string) {
            const is3d = mode === 'model3d';
            if (btnPhoto) {
                btnPhoto.setAttribute('aria-pressed', is3d ? 'false' : 'true');
                btnPhoto.classList.toggle('hb-hero__rail-choice--active', !is3d);
            }
            if (btn3d) {
                btn3d.setAttribute('aria-pressed', is3d ? 'true' : 'false');
                btn3d.classList.toggle('hb-hero__rail-choice--active', is3d);
            }
            if (panelPhoto) {
                panelPhoto.classList.remove('hb-hero__media-pop');
                panelPhoto.hidden = is3d;
                panelPhoto.setAttribute('aria-hidden', is3d ? 'true' : 'false');
            }
            if (panelModel) {
                panelModel.classList.remove('hb-hero__media-pop');
                panelModel.hidden = !is3d;
                panelModel.setAttribute('aria-hidden', is3d ? 'false' : 'true');
            }
            if (heroRoot) heroRoot.classList.toggle('hb-hero--view-3d', is3d);
            if (scrollHint) scrollHint.style.display = is3d ? 'none' : '';

            if (is3d && modelSrc) initModelViewerOnce();

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (is3d && panelModel) panelModel.classList.add('hb-hero__media-pop');
                    else if (!is3d && panelPhoto) panelPhoto.classList.add('hb-hero__media-pop');
                });
            });
        }

        function initModelViewerOnce() {
            if (!host || host.querySelector('model-viewer') || !modelSrc || mvPending) return;
            mvPending = true;
            if (loadHint) loadHint.hidden = false;
            if (tipEl) tipEl.hidden = true;
            if (actionsEl) actionsEl.hidden = true;

            const script = document.createElement('script');
            script.type = 'module';
            script.src = MV_MODULE;
            script.onload = () => {
                try {
                    const mv = document.createElement('model-viewer') as any;
                    mv.setAttribute('src', modelSrc || '');
                    mv.setAttribute('alt', host.getAttribute('data-model-alt') || '3D');
                    mv.setAttribute('camera-controls', '');
                    mv.setAttribute('touch-action', 'none');
                    mv.setAttribute('shadow-intensity', '0.72');
                    mv.setAttribute('environment-intensity', '0.88');
                    mv.setAttribute('exposure', '1.04');
                    mv.setAttribute('camera-orbit', '0deg 75deg 105%');
                    mv.className = 'hb-hero__model-viewer';
                    
                    mv.addEventListener('load', () => {
                        mvPending = false;
                        if (loadHint) loadHint.hidden = true;
                        if (tipEl) tipEl.hidden = false;
                        if (actionsEl) actionsEl.hidden = false;
                    }, { once: true });

                    host.appendChild(mv);
                    mvEl = mv;
                    
                    if (resetBtn) resetBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (mvEl) mvEl.cameraOrbit = '0deg 75deg 105%';
                    });
                } catch(e) {}
            };
            script.onerror = () => {
                mvPending = false;
                if (loadHint) loadHint.textContent = host.getAttribute('data-model-err') || 'Error loading model';
            };
            document.head.appendChild(script);
        }

        if (btnPhoto) btnPhoto.addEventListener('click', () => setView('photo'));
        if (btn3d) btn3d.addEventListener('click', () => setView('model3d'));


        // JSON sections
        const container = document.getElementById('hb-sections-container');
        if (container && sectionsJson) {
            try {
                const SECTIONS = JSON.parse(sectionsJson);
                let html = '';
                SECTIONS.forEach((sec: any) => {
                    const secTitle = sec.titleEn || sec.titleVi || '';
                    if (sec.type === 'specs' && sec.data && sec.data.length) {
                        html += '<section class="hb-sec hb-sec--specs">';
                        if (secTitle) html += '<h2 class="hb-sec__title">' + secTitle + '</h2>';
                        html += '<div class="hb-specs">';
                        sec.data.forEach((row: any) => {
                            html += '<div class="hb-specs__row"><div class="hb-specs__key">' + (row.key || row.keyVi || '') + '</div>';
                            html += '<div class="hb-specs__val">' + (row.valueEn || row.valueVi || '') + '</div></div>';
                        });
                        html += '</div></section>';
                    } else if (sec.type === 'feature' && sec.data) {
                        const hasImg = !!sec.data.image;
                        const layoutClass = hasImg ? ('hb-sec--feature-' + (sec.data.layout || 'left')) : 'hb-sec--feature--no-media';
                        html += '<section class="hb-sec hb-sec--feature ' + layoutClass + '">';
                        if (hasImg) {
                            html += '<div class="hb-feature__media"><img src="/' + String(sec.data.image).replace(/^\//, '') + '" alt="' + secTitle + '" loading="lazy"></div>';
                        }
                        html += '<div class="hb-feature__content">';
                        if (secTitle) html += '<h2 class="hb-sec__title">' + secTitle + '</h2>';
                        html += '<div class="hb-feature__text">' + (sec.data.textEn || sec.data.textVi || '') + '</div>';
                        html += '</div></section>';
                    } else if (sec.type === 'gallery' && sec.data && sec.data.length) {
                        html += '<section class="hb-sec hb-sec--gallery">';
                        if (secTitle) html += '<h2 class="hb-sec__title" style="text-align:center;">' + secTitle + '</h2>';
                        html += '<div class="hb-gallery">';
                        sec.data.forEach((img: any) => {
                            const gSrc = (img && String(img).indexOf('data:') === 0) ? img : ('/' + String(img || '').replace(/^\//, ''));
                            html += '<div class="hb-gallery__item"><img src="' + gSrc + '" alt="" loading="lazy"></div>';
                        });
                        html += '</div></section>';
                    } else if (sec.type === 'video' && sec.data && sec.data.url) {
                        const toEmbedVideoUrl = (raw: string) => {
                            if (!raw || typeof raw !== 'string') return '';
                            let u = raw.trim();
                            if (!u) return '';
                            if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
                            let m = u.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i);
                            if (m) return 'https://www.youtube.com/embed/' + m[1];
                            m = u.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/i);
                            if (m) return 'https://www.youtube.com/embed/' + m[1];
                            m = u.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
                            if (/(?:m\.)?youtube\.com\//i.test(u) && m) return 'https://www.youtube.com/embed/' + m[1];
                            m = u.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/i);
                            if (m) return 'https://www.youtube.com/embed/' + m[1];
                            m = u.match(/youtube\.com\/live\/([a-zA-Z0-9_-]{11})/i);
                            if (m) return 'https://www.youtube.com/embed/' + m[1];
                            return u;
                        };
                        const embedSrc = toEmbedVideoUrl(sec.data.url);
                        html += '<section class="hb-sec hb-sec--video">';
                        if (secTitle) html += '<h2 class="hb-sec__title" style="text-align:center;">' + secTitle + '</h2>';
                        html += '<div class="hb-video"><iframe src="' + String(embedSrc).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;') + '" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe></div>';
                        html += '</section>';
                    }
                });
                // Append instead of replacing so we don't clear the legacy content if we kept it
                const frag = document.createRange().createContextualFragment(html);
                container.appendChild(frag);

                // Scroll-triggered fade-in for sections
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('hb-sec--visible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.15 });

                document.querySelectorAll('.hb-sec, .hb-sec--watch-specs').forEach((el) => {
                    observer.observe(el);
                });
            } catch(e) {}
        }

        return () => {
            window.removeEventListener('scroll', scrollHandler);
            document.body.classList.remove('hb-product-detail');
            document.body.classList.remove('hb-nav-hidden');
        };
    }, [sectionsJson]);

    return null;
}
