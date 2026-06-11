/* ============================================================
   HUBLOT UNETI - Currency Switcher
   Default: VND  |  Toggle: USD
   Rate: 1 USD = 25,000 VND
   ============================================================ */
(function () {
    var RATE = 25000;

    function get() {
        return localStorage.getItem('wsCurrency') || 'VND';
    }
    function set(code) {
        localStorage.setItem('wsCurrency', code);
    }

    function fmtVND(n) {
        return '\u20ab' + Math.round(n).toLocaleString('en');
    }
    function fmtUSD(n) {
        return '$' + (n / RATE).toFixed(2);
    }

    window.wsFormatPrice = function (n) {
        return get() === 'USD' ? fmtUSD(n) : fmtVND(n);
    };
    window.wsGetCurrency = get;
    window.wsUSDRate = RATE;

    window.setCurrency = function (code) {
        set(code);
        updateAll();
    };

    function updateAll() {
        var cur = get();
        document.querySelectorAll('[data-vnd]').forEach(function (el) {
            var v = parseFloat(el.getAttribute('data-vnd'));
            if (!isNaN(v)) {
                el.textContent = cur === 'USD' ? fmtUSD(v) : fmtVND(v);
            }
        });
    }

    /* Sync currency with server-side language on every page load */
    function syncWithLang() {
        var serverLang = document.documentElement.lang || 'vi';
        var expected = (serverLang === 'en') ? 'USD' : 'VND';
        if (get() !== expected) {
            set(expected);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        syncWithLang();
        updateAll();
    });
})();
