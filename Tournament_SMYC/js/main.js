/**
 * VERTEX 2026 - Main Application Orchestrator
 * Navigation, scroll-spy, downloads, and module orchestration.
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 1. Initialize Submodules
    if (window.Modal && typeof window.Modal.init === 'function') {
        window.Modal.init();
    }

    if (window.Registration && typeof window.Registration.init === 'function') {
        window.Registration.init();
    }

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fa-solid fa-xmark text-xl' : 'fa-solid fa-bars text-xl';
            }
        });

        // Close mobile menu when clicking any mobile link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars text-xl';
            });
        });
    }

    // 3. Scroll Spy (Active Navigation Indicator)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function onScrollSpy() {
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${sectionId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', onScrollSpy, { passive: true });
    onScrollSpy();

    // 4. Download Resource Buttons
    const downloadButtons = document.querySelectorAll('[data-download]');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const resource = btn.getAttribute('data-download') || 'Inter Parish Tournament File.pdf';
            const resourceName = btn.getAttribute('data-resource-name') || resource;
            const filePath = `assets/${resource}`;

            if (window.Toast) {
                window.Toast.info(
                    'Download Initiated',
                    `"${resourceName}" is being downloaded to your device.`
                );
            }

            // Create temporary invisible link to trigger real download
            const tempLink = document.createElement('a');
            tempLink.href = filePath;
            tempLink.download = resourceName;
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
        });
    });

    console.log(
        '%c VERTEX 2026 %c Inter-Parish Football Tournament Portal Initialized ',
        'background: #F59E0B; color: #070913; font-weight: bold; border-radius: 4px; padding: 2px 6px;',
        'background: #111827; color: #F3F4F6; padding: 2px 6px;'
    );
});
