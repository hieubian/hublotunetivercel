"use client";

import { useEffect } from 'react';

export default function HomeClient({ products }: { products: any[] }) {
  useEffect(() => {
    // Expose products to window if needed
    (window as any).YZ_PRODUCTS = products;
    const CTX = "";
    
    function wsFormatPrice(price: number) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }
    
    function yzImgUrl(path: string) {
      if (!path) return '';
      if (/^https?:\/\//i.test(path)) return path;
      return CTX + '/' + String(path).replace(/^\/+/, '');
    }
    function productImages(p: any) {
      if (p.images && p.images.length) return p.images;
      if (p.image) return [p.image];
      return [];
    }
    
    let curIdx = -1, savedScroll = 0, busy = false, curImgIdx = 0;
    const gridView = document.getElementById('yz-grid-view');
    const detailView = document.getElementById('yz-detail-view');
    const items = document.querySelectorAll('.yz-item') as NodeListOf<HTMLElement>;
    const yzdStage = document.getElementById('yzdStage');
    const yzdVclip = document.getElementById('yzdVclip');
    const yzdVTrack = document.getElementById('yzdVTrack');
    const yzdImg1 = document.getElementById('yzdImg1') as HTMLImageElement;
    const yzdHTrack = document.getElementById('yzdHTrack');
    const yzdImgH1 = document.getElementById('yzdImgH1') as HTMLImageElement;
    const V_DUR = 950;
    const H_DUR = 420;
    let wheelAcc = 0;
    let vTouch: any = null;
    let touchLastNavAt = 0;

    function getImgRect(idx: number) {
      const el = items[idx];
      const im = el ? el.querySelector('.yz-item__img img') : null;
      return im ? im.getBoundingClientRect() : null;
    }

    function clearImgAnimClasses(dImg: HTMLElement) {
      dImg.className = 'yz-detail__img-main';
    }

    function vTrackSetNoTrans(on: boolean) {
      if (!yzdVTrack) return;
      yzdVTrack.classList.toggle('yz-vtrack--no-trans', !!on);
    }

    function getSlideH() {
      return yzdVclip && yzdVclip.getBoundingClientRect ? yzdVclip.getBoundingClientRect().height : 0;
    }

    function onVTrackTransitionEndOnce(cb: Function) {
      if (!yzdVTrack) { if (cb) cb(); return; }
      let done = false;
      function fin() {
        if (done) return;
        done = true;
        yzdVTrack?.removeEventListener('transitionend', onEnd);
        if (tmo) clearTimeout(tmo);
        if (cb) cb();
      }
      function onEnd(e: any) {
        if (e.target !== yzdVTrack) return;
        if (e.propertyName && e.propertyName !== 'transform' && e.propertyName !== 'webkitTransform') return;
        fin();
      }
      let tmo = setTimeout(fin, V_DUR + 120);
      yzdVTrack.addEventListener('transitionend', onEnd);
    }

    function hTrackSetNoTrans(on: boolean) {
      if (!yzdHTrack) return;
      yzdHTrack.classList.toggle('yz-htrack--no-trans', !!on);
    }

    function onHTrackTransitionEndOnce(cb: Function) {
      if (!yzdHTrack) { if (cb) cb(); return; }
      let done = false;
      function fin() {
        if (done) return;
        done = true;
        yzdHTrack?.removeEventListener('transitionend', onEnd);
        if (tmo) clearTimeout(tmo);
        if (cb) cb();
      }
      function onEnd(e: any) {
        if (e.target !== yzdHTrack) return;
        if (e.propertyName && e.propertyName !== 'transform' && e.propertyName !== 'webkitTransform') return;
        fin();
      }
      let tmo = setTimeout(fin, H_DUR + 100);
      yzdHTrack.addEventListener('transitionend', onEnd);
    }

    function loadSlide(panel: number, pIdx: number, imgI: number) {
      const p = products[pIdx];
      if (!p) return;
      const imgs = productImages(p);
      if (imgI < 0 || (imgs.length && imgI >= imgs.length)) imgI = 0;
      const imgEl = panel === 0 ? document.getElementById('yzdImg') as HTMLImageElement : document.getElementById('yzdImg1') as HTMLImageElement;
      if (!imgEl) return;
      clearImgAnimClasses(imgEl);
      imgEl.removeAttribute('style');
      imgEl.src = yzImgUrl(imgs[imgI] || p.image);
      imgEl.alt = p.name || '';
      const host = panel === 0 ? document.getElementById('yzdDots') : document.getElementById('yzdDots1');
      if (host) buildDotsOn(host, p, imgI, panel === 0);
    }

    function buildDotsOn(host: HTMLElement, p: any, imgI: number, isPrimary: boolean) {
      if (!host) return;
      if (!p) { host.innerHTML = ''; return; }
      const imgs = productImages(p);
      const count = imgs.length;
      if (count <= 0) {
        host.innerHTML = '';
        host.hidden = true;
        return;
      }
      host.hidden = false;
      host.innerHTML = '';
      for (let i = 0; i < count; i++) {
        (function (ii) {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'yz-detail__dot' + (ii === imgI ? ' yz-detail__dot--active' : '');
          b.setAttribute('role', 'tab');
          b.setAttribute('aria-label', 'Photo ' + (ii + 1));
          b.addEventListener('click', function (e) {
            e.stopPropagation();
            if (!isPrimary) return;
            if (busy || ii === curImgIdx || imgs.length <= 1) return;
            goToImageIndex(ii, ii > curImgIdx ? 1 : -1);
          });
          host.appendChild(b);
        })(i);
      }
    }

    function replaceGalleryHash() {
      if (window.history && window.history.replaceState) {
        try { window.history.replaceState({ yz: curIdx, homeGallery: 1 }, '', CTX + '/#g' + curIdx); } catch (e) {}
      }
    }

    function applyProductToUI() {
      const p = products[curIdx];
      if (!p) return;
      const imgs = productImages(p);
      if (curImgIdx >= imgs.length) curImgIdx = 0;
      if (curImgIdx < 0) curImgIdx = 0;

      const dImg = document.getElementById('yzdImg') as HTMLImageElement;
      clearImgAnimClasses(dImg);
      dImg.removeAttribute('style');
      dImg.src = yzImgUrl(imgs[curImgIdx] || p.image);
      dImg.alt = p.name || '';
      if (yzdHTrack) {
        hTrackSetNoTrans(true);
        yzdHTrack.style.transform = 'translate3d(0,0,0)';
        void yzdHTrack.offsetWidth;
        hTrackSetNoTrans(false);
      }
      if (yzdImgH1) { yzdImgH1.removeAttribute('src'); yzdImgH1.alt = ''; yzdImgH1.removeAttribute('style'); clearImgAnimClasses(yzdImgH1); }

      const yzdName = document.getElementById('yzdName');
      if (yzdName) yzdName.textContent = p.name;
      const yzdPrice = document.getElementById('yzdPrice');
      if (yzdPrice) {
          const priceHtml = (p.dp && p.dp < p.price)
            ? '<span class="yz-detail__old" data-vnd="' + p.price + '">' + wsFormatPrice(p.price) + '</span> <span data-vnd="' + p.dp + '">' + wsFormatPrice(p.dp) + '</span>'
            : '<span data-vnd="' + p.price + '">' + wsFormatPrice(p.price) + '</span>';
          yzdPrice.innerHTML = priceHtml;
      }
      const yzdLink = document.getElementById('yzdLink') as HTMLAnchorElement;
      if (yzdLink) yzdLink.href = CTX + '/productDetails?id=' + p.id;
      
      const yzdPlus = document.getElementById('yzdPlus');
      if (yzdPlus) {
          yzdPlus.onclick = function (e) { 
              e.stopPropagation(); 
              alert('Added to bag: ' + p.name);
          };
      }

      buildDots();
      updateImageNav();
    }

    function buildDots() {
      const el = document.getElementById('yzdDots');
      if (el) buildDotsOn(el, products[curIdx], curImgIdx, true);
    }

    function updateImageNav() {
      const pBtn = document.getElementById('yzdImgPrev');
      const nBtn = document.getElementById('yzdImgNext');
      if (!pBtn || !nBtn) return;
      const imgs = productImages(products[curIdx] || {});
      if (imgs.length < 2) {
        pBtn.hidden = true;
        nBtn.hidden = true;
      } else {
        pBtn.hidden = false;
        nBtn.hidden = false;
      }
    }

    function goToImageIndex(targetIdx: number, dirHint: number) {
      if (busy) return;
      const p = products[curIdx];
      if (!p) return;
      const imgs = productImages(p);
      if (imgs.length < 2) return;
      if (targetIdx < 0 || targetIdx >= imgs.length) return;
      const d = targetIdx - curImgIdx;
      if (d === 0) return;
      const dir = dirHint != null && dirHint !== 0 ? dirHint : (d > 0 ? 1 : -1);
      if (!yzdHTrack || !yzdImgH1) {
        curImgIdx = targetIdx;
        applyProductToUI();
        return;
      }
      busy = true;
      const dImg = document.getElementById('yzdImg') as HTMLImageElement;
      if (dir > 0) {
        yzdImgH1.src = yzImgUrl(imgs[targetIdx]);
        yzdImgH1.alt = p.name || '';
        hTrackSetNoTrans(true);
        yzdHTrack.style.transform = 'translate3d(0,0,0)';
        void yzdHTrack.offsetWidth;
        hTrackSetNoTrans(false);
        yzdHTrack.style.transform = 'translate3d(-50%,0,0)';
        onHTrackTransitionEndOnce(function () {
          curImgIdx = targetIdx;
          dImg.src = yzImgUrl(imgs[curImgIdx]);
          dImg.alt = p.name || '';
          hTrackSetNoTrans(true);
          yzdHTrack.style.transform = 'translate3d(0,0,0)';
          void yzdHTrack.offsetWidth;
          hTrackSetNoTrans(false);
          yzdImgH1.removeAttribute('src');
          yzdImgH1.alt = '';
          buildDots();
          busy = false;
        });
      } else {
        const curSrc = yzImgUrl(imgs[curImgIdx]);
        dImg.src = yzImgUrl(imgs[targetIdx]);
        dImg.alt = p.name || '';
        yzdImgH1.src = curSrc;
        yzdImgH1.alt = p.name || '';
        hTrackSetNoTrans(true);
        yzdHTrack.style.transform = 'translate3d(-50%,0,0)';
        void yzdHTrack.offsetWidth;
        hTrackSetNoTrans(false);
        yzdHTrack.style.transform = 'translate3d(0,0,0)';
        onHTrackTransitionEndOnce(function () {
          curImgIdx = targetIdx;
          hTrackSetNoTrans(true);
          yzdHTrack.style.transform = 'translate3d(0,0,0)';
          void yzdHTrack.offsetWidth;
          hTrackSetNoTrans(false);
          yzdImgH1.removeAttribute('src');
          yzdImgH1.alt = '';
          buildDots();
          busy = false;
        });
      }
    }

    function navImageLoop(dir: number) {
      const p = products[curIdx];
      if (!p || busy) return;
      const imgs = productImages(p);
      if (imgs.length < 2) return;
      const n = imgs.length;
      const nextI = (curImgIdx + dir + n) % n;
      goToImageIndex(nextI, dir);
    }

    function goToProductIndex(newIdx: number, fromDir: number) {
      if (busy || newIdx < 0 || newIdx >= products.length || !yzdVTrack) return;
      busy = true;
      yzdVTrack.classList.remove('is-dragging');
      if (fromDir > 0) {
        loadSlide(1, newIdx, 0);
        vTrackSetNoTrans(true);
        yzdVTrack.style.transform = 'translate3d(0,0,0)';
        yzdVTrack.classList.remove('is-dragging');
        void yzdVTrack.offsetWidth;
        vTrackSetNoTrans(false);
        yzdVTrack.style.transform = 'translate3d(0,-50%,0)';
        onVTrackTransitionEndOnce(function () {
          curIdx = newIdx;
          curImgIdx = 0;
          applyProductToUI();
          vTrackSetNoTrans(true);
          yzdVTrack.style.transform = 'translate3d(0,0,0)';
          void yzdVTrack.offsetWidth;
          vTrackSetNoTrans(false);
          replaceGalleryHash();
          if (yzdImg1) { yzdImg1.removeAttribute('src'); yzdImg1.alt = ''; }
          busy = false;
        });
      } else {
        const oi = curIdx, oimg = curImgIdx;
        loadSlide(0, newIdx, 0);
        loadSlide(1, oi, oimg);
        vTrackSetNoTrans(true);
        yzdVTrack.style.transform = 'translate3d(0,-50%,0)';
        yzdVTrack.classList.remove('is-dragging');
        void yzdVTrack.offsetWidth;
        vTrackSetNoTrans(false);
        yzdVTrack.style.transform = 'translate3d(0,0,0)';
        onVTrackTransitionEndOnce(function () {
          curIdx = newIdx;
          curImgIdx = 0;
          applyProductToUI();
          vTrackSetNoTrans(true);
          yzdVTrack.style.transform = 'translate3d(0,0,0)';
          void yzdVTrack.offsetWidth;
          vTrackSetNoTrans(false);
          replaceGalleryHash();
          if (yzdImg1) { yzdImg1.removeAttribute('src'); yzdImg1.alt = ''; }
          busy = false;
        });
      }
    }

    function navProductLoop(dir: number) {
      if (busy || curIdx < 0 || products.length < 2) return;
      const n = products.length;
      const ni = (curIdx + dir + n) % n;
      for (let i = 0; i < items.length; i++) {
        items[i].style.opacity = (i === ni) ? '1' : '0';
      }
      goToProductIndex(ni, dir);
    }

    function open(idx: number) {
      if (busy || !items[idx]) return;
      busy = true;
      curIdx = idx;
      curImgIdx = 0;
      savedScroll = window.scrollY;
      const firstRect = getImgRect(idx);
      applyProductToUI();
      for (let i = 0; i < items.length; i++) {
        items[i].style.transition = 'opacity 0.35s ease';
        items[i].style.opacity = (i === idx) ? '1' : '0';
      }
      setTimeout(function () {
        if (gridView) gridView.style.visibility = 'hidden';
        const ftEl = document.querySelector('.footer') as HTMLElement;
        if (ftEl) ftEl.style.display = 'none';
        if (items[idx]) {
          items[idx].style.transition = 'none';
          items[idx].style.opacity = '0';
        }
        if (detailView) {
            detailView.classList.add('yz-detail-view--flip');
            detailView.style.display = 'flex';
            detailView.setAttribute('aria-hidden', 'false');
        }
        document.body.style.overflow = 'hidden';
        if (yzdVTrack) {
          vTrackSetNoTrans(true);
          yzdVTrack.style.transform = 'translate3d(0,0,0)';
          yzdVTrack.classList.remove('is-dragging');
          void yzdVTrack.offsetWidth;
          vTrackSetNoTrans(false);
        }
        const dImg = document.getElementById('yzdImg') as HTMLImageElement;
        clearImgAnimClasses(dImg);
        dImg.removeAttribute('style');
        const lastRect = dImg.getBoundingClientRect();
        let settled = false;
        function finishOpen() {
          if (settled) return;
          settled = true;
          if(detailView) {
              detailView.classList.remove('yz-detail-view--flip');
              detailView.classList.add('yz-detail-view--shell-on');
          }
          const info = document.getElementById('yzdInfo');
          if (info) info.classList.add('yz-detail__info--visible');
          busy = false;
        }
        if (firstRect && lastRect && lastRect.width > 2 && lastRect.height > 2) {
          const dx = firstRect.left + firstRect.width / 2 - (lastRect.left + lastRect.width / 2);
          const dy = firstRect.top + firstRect.height / 2 - (lastRect.top + lastRect.height / 2);
          const sx = firstRect.width / Math.max(lastRect.width, 1);
          const sy = firstRect.height / Math.max(lastRect.height, 1);
          const s = Math.min(sx, sy);
          dImg.style.transition = 'none';
          dImg.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')';
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              dImg.style.transition = 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)';
              dImg.style.transform = 'translate(0,0) scale(1)';
              const onFlipEnd = function (e: any) {
                if (e.target !== dImg) return;
                if (e.propertyName && e.propertyName !== 'transform') return;
                dImg.removeEventListener('transitionend', onFlipEnd);
                finishOpen();
              };
              dImg.addEventListener('transitionend', onFlipEnd);
            });
          });
          setTimeout(finishOpen, 700);
        } else {
          setTimeout(finishOpen, 80);
        }
        if ((window as any)._yzSetNavBack) (window as any)._yzSetNavBack();
        if (window.history && window.history.pushState) {
          try { window.history.pushState({ yz: idx, homeGallery: 1 }, '', CTX + '/#g' + idx); } catch (e) {}
        }
      }, 380);
    }

    function close() {
      if (busy || curIdx < 0) return;
      busy = true;
      if (detailView) {
          detailView.classList.remove('yz-detail-view--shell-on');
          detailView.classList.add('yz-detail-view--flip');
      }
      const info = document.getElementById('yzdInfo');
      if (info) info.classList.remove('yz-detail__info--visible');
      const dImg = document.getElementById('yzdImg') as HTMLImageElement;
      dImg.className = 'yz-detail__img-main';
      dImg.classList.remove('yz-ix--out-l', 'yz-ix--out-r', 'yz-ix--in-l', 'yz-ix--in-r', 'yz-ix--in-on');
      const lastRect = dImg.getBoundingClientRect();
      if (gridView) gridView.style.visibility = 'visible';
      if (items[curIdx]) { items[curIdx].style.opacity = '0'; items[curIdx].style.transition = 'none'; }
      window.scrollTo(0, savedScroll);
      const firstRect = getImgRect(curIdx);
      if (firstRect && lastRect) {
        const dx = firstRect.left + firstRect.width / 2 - (lastRect.left + lastRect.width / 2);
        const dy = firstRect.top + firstRect.height / 2 - (lastRect.top + lastRect.height / 2);
        const sx = firstRect.width / Math.max(lastRect.width, 1);
        const sy = firstRect.height / Math.max(lastRect.height, 1);
        const s = Math.min(sx, sy);
        dImg.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        dImg.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')';
      }
      const closedIdx = curIdx;
      setTimeout(function () {
        if (items[closedIdx]) { items[closedIdx].style.transition = 'none'; items[closedIdx].style.opacity = '1'; }
        if (detailView) {
            detailView.style.display = 'none';
            detailView.setAttribute('aria-hidden', 'true');
            detailView.classList.remove('yz-detail-view--flip');
            detailView.classList.remove('yz-detail-view--shell-on');
        }
        dImg.style.transition = 'none';
        dImg.style.transform = '';
        dImg.removeAttribute('style');
        clearImgAnimClasses(dImg);
        if (yzdVTrack) {
          vTrackSetNoTrans(true);
          yzdVTrack.className = 'yz-detail__vtrack';
          yzdVTrack.style.transform = '';
          yzdVTrack.classList.remove('is-dragging');
          vTrackSetNoTrans(false);
        }
        if (yzdHTrack) {
          hTrackSetNoTrans(true);
          yzdHTrack.className = 'yz-detail__htrack';
          yzdHTrack.style.transform = '';
          hTrackSetNoTrans(false);
        }
        if (yzdImg1) { yzdImg1.removeAttribute('src'); yzdImg1.alt = ''; }
        if (yzdImgH1) { yzdImgH1.removeAttribute('src'); yzdImgH1.alt = ''; }
        document.body.style.overflow = '';
        for (let i = 0; i < items.length; i++) {
          if (i !== closedIdx) { items[i].style.transition = 'opacity 0.35s ease'; items[i].style.opacity = '1'; }
        }
        const ft = document.querySelector('.footer') as HTMLElement;
        if (ft) ft.style.display = '';
        if (window.history && window.history.pushState) {
          try { window.history.pushState(null, '', CTX + '/'); } catch (e) {}
        }
        if ((window as any)._yzSetNavClosed) (window as any)._yzSetNavClosed();
        curIdx = -1; busy = false;
      }, 500);
    }

    const yzdImgPrev = document.getElementById('yzdImgPrev');
    const yzdImgNext = document.getElementById('yzdImgNext');
    if (yzdImgPrev) yzdImgPrev.addEventListener('click', function (e) { e.stopPropagation(); navImageLoop(-1); });
    if (yzdImgNext) yzdImgNext.addEventListener('click', function (e) { e.stopPropagation(); navImageLoop(1); });

    function isYzHomeInteractiveClickTarget(t: any) {
      if (!t || !t.closest) return false;
      if (t.closest('#yzdInfo')) return true;
      if (t.closest('button')) return true;
      if (t.closest('a')) return true;
      if (t.closest('.yz-detail__dots')) return true;
      if (t.closest('.yz-detail__img-main')) return true;
      return false;
    }

    items.forEach(function (el) {
      el.addEventListener('click', function (this: HTMLElement) { 
        open(parseInt(this.dataset.index || '0', 10)); 
      });
    });

    if (detailView) {
        detailView.addEventListener('click', function (e) {
          if (curIdx < 0 || busy) return;
          if (isYzHomeInteractiveClickTarget(e.target)) return;
          close();
        });

        detailView.addEventListener('wheel', function (e) {
          if (curIdx < 0) return;
          e.preventDefault();
          if (products.length < 2) return;
          if (busy) { wheelAcc = 0; return; }
          wheelAcc += e.deltaY;
          if (Math.abs(wheelAcc) < 32) return;
          if (wheelAcc > 0) navProductLoop(1);
          else navProductLoop(-1);
          wheelAcc = 0;
        }, { passive: false });
    }

    document.addEventListener('keydown', function (e) {
      if (curIdx < 0) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key === 'ArrowLeft') { e.preventDefault(); navImageLoop(-1); return; }
      if (e.key === 'ArrowRight') { e.preventDefault(); navImageLoop(1); return; }
      if (e.key === 'ArrowUp') { e.preventDefault(); navProductLoop(-1); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); navProductLoop(1); return; }
    });
    
    window.addEventListener('popstate', function () { if (curIdx >= 0) close(); });

    const hb = document.getElementById('yzHamburger');
    if (hb) {
      const obs = new MutationObserver(function () {
        if ((hb.getAttribute('data-nav-mode') === 'gallery' || hb.classList.contains('nav__hamburger--back')) && curIdx >= 0) {
          hb.onclick = function (e) { e.stopPropagation(); close(); };
        }
      });
      obs.observe(hb, { attributes: true, attributeFilter: ['class'] });
    }
  }, [products]);

  return null;
}
