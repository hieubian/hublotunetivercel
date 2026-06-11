/**
 * Toggle circular spinner on buttons during async / full page submit.
 * Uses CSS .btn--loading (see yeezy.css); does not replace button label HTML.
 */
(function (global) {
    'use strict';

    function el(btn) {
        return typeof btn === 'string' ? document.querySelector(btn) : btn;
    }

    global.HublotBtnLoading = {
        start: function (btn) {
            var node = el(btn);
            if (!node || node.getAttribute('data-hbl-loading') === '1') return;
            node.setAttribute('data-hbl-loading', '1');
            node.disabled = true;
            node.classList.add('btn--loading');
            node.setAttribute('aria-busy', 'true');
        },
        stop: function (btn) {
            var node = el(btn);
            if (!node || node.getAttribute('data-hbl-loading') !== '1') return;
            node.classList.remove('btn--loading');
            node.disabled = false;
            node.removeAttribute('data-hbl-loading');
            node.removeAttribute('aria-busy');
        }
    };
})(typeof window !== 'undefined' ? window : this);
