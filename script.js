/* script.js - animações e comportamentos */
// DEBUG: habilite logs abrindo o DevTools (F12) e verificando o console
(function () {
    'use strict';

    function safeQuery(selector) {
        try {
            return document.querySelectorAll(selector) || [];
        } catch (e) {
            console.warn('querySelectorAll failed for', selector, e);
            return [];
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        // sinaliza que o JS está pronto (CSS usa body.js-ready)
        document.body.classList.add('js-ready');
        console.log('script.js: DOMContentLoaded — JS ready class added');

        // REVEAL ON SCROLL
        const revealSelector = '.product-card, .product-detail, .bundle-suggestion, .featured-products';
        const revealElements = Array.from(safeQuery(revealSelector));

        function revealOnScroll() {
            const threshold = window.innerHeight - 80;
            revealElements.forEach(el => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                if (rect.top < threshold) {
                    el.classList.add('revealed');
                }
            });
        }

        // run once
        revealOnScroll();
        // and on scroll / resize
        window.addEventListener('scroll', revealOnScroll, { passive: true });
        window.addEventListener('resize', revealOnScroll);

        // NAVBAR SHRINK
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const onScrollNav = () => {
                if (window.scrollY > 40) navbar.classList.add('shrink');
                else navbar.classList.remove('shrink');
            };
            window.addEventListener('scroll', onScrollNav, { passive: true });
            onScrollNav();
            console.log('script.js: navbar shrink initialized');
        } else {
            console.log('script.js: navbar not found');
        }

        // BUTTON RIPPLE
        const buttons = Array.from(safeQuery('button'));
        buttons.forEach(btn => {
            btn.addEventListener('click', function (e) {
                const rect = this.getBoundingClientRect();
                const circle = document.createElement('span');
                circle.className = 'ripple';
                // calculate position relative to button
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                circle.style.left = `${x - 40}px`; // center the 80px circle
                circle.style.top = `${y - 40}px`;
                this.appendChild(circle);
                setTimeout(() => {
                    try { circle.remove(); } catch (err) { /* ignore */ }
                }, 650);
            });
        });
        console.log(`script.js: ripple bound to ${buttons.length} buttons`);

        // BADGE pulse
        const badge = document.querySelector('.badge');
        if (badge) {
            badge.classList.add('badge-animate');
            console.log('script.js: badge animation enabled');
        }

    }); // DOMContentLoaded end

    // Safety: if the script fails to load, the page remains visible (CSS default opacity:1)
})();
