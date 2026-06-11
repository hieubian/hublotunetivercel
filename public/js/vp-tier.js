/**
 * Viewport tier — width + primary input (Hover + Pointer Level 3).
 * wide: ≥ md breakpoint · compact-mouse: cửa sổ hẹp nhưng chuột/bàn phím (DPI / zoom / snap)
 * compact-touch: điện thoại & tablet ưu tiên chạm
 *
 * data-vp-layout — chiều cao khung nhìn khả dụng (visualViewport khi có — chuẩn iOS/Safari, thanh địa chỉ):
 * short | medium | tall — để overlay menu co typography/spacing, hạn chế cuộn trên desktop.
 */
(function (w) {
    'use strict';
    var root = w.document.documentElement;
    var mqWide = w.matchMedia('(min-width: 768px)');
    var mqFine = w.matchMedia('(hover: hover) and (pointer: fine)');
    var mqAnyFine = w.matchMedia('(any-pointer: fine)');

    function tier() {
        if (mqWide.matches) return 'wide';
        if (mqFine.matches) return 'compact-mouse';
        /* Một số PC có màn cảm ứng: primary = coarse nhưng vẫn có chuột */
        if (mqAnyFine.matches) return 'compact-mouse';
        return 'compact-touch';
    }

    /** Chiều cao vùng hiển thị thực (ưu tiên Visual Viewport API — CSS Values 4 / iOS safe). */
    function availableHeight() {
        var inner = w.innerHeight || 0;
        if (w.visualViewport && typeof w.visualViewport.height === 'number') {
            return Math.min(inner, w.visualViewport.height);
        }
        return inner;
    }

    /**
     * Nấc dọc: short (laptop nửa màn, cửa sổ thấp) → medium → tall.
     * Ngưỡng theo px (không dùng vh) để ổn định khi zoom trình duyệt.
     */
    function layoutTier() {
        var h = availableHeight();
        if (h <= 520) return 'short';
        if (h <= 700) return 'medium';
        return 'tall';
    }

    function sync() {
        var t = tier();
        if (root.getAttribute('data-vp-tier') !== t) {
            root.setAttribute('data-vp-tier', t);
        }
        var lt = layoutTier();
        if (root.getAttribute('data-vp-layout') !== lt) {
            root.setAttribute('data-vp-layout', lt);
        }
    }

    sync();
    w.addEventListener('resize', sync);
    if (w.visualViewport) {
        w.visualViewport.addEventListener('resize', sync);
        w.visualViewport.addEventListener('scroll', sync);
    }
    if (typeof mqWide.addEventListener === 'function') {
        mqWide.addEventListener('change', sync);
        mqFine.addEventListener('change', sync);
        mqAnyFine.addEventListener('change', sync);
    } else if (mqWide.addListener) {
        mqWide.addListener(sync);
        mqFine.addListener(sync);
        mqAnyFine.addListener(sync);
    }
})(window);
