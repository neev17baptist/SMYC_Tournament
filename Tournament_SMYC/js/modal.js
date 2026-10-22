/**
 * VERTEX 2026 - Modal Controller Module
 * Handles opening, closing, backdrop clicks, Escape key, and scroll locks.
 */
(function(window) {
    'use strict';

    const Modal = {
        init() {
            const modal = document.getElementById('posterModal');
            if (!modal) return;

            // Close on backdrop click (clicking outside .modal-content)
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.close('posterModal');
                }
            });

            // Close on Escape key press
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    this.close('posterModal');
                }
            });

            // Attach click listeners to any trigger elements with data-modal-target or data-modal-close
            document.querySelectorAll('[data-modal-target]').forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = trigger.getAttribute('data-modal-target');
                    this.open(targetId);
                });
            });

            document.querySelectorAll('[data-modal-close]').forEach(closeBtn => {
                closeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = closeBtn.getAttribute('data-modal-close') || 'posterModal';
                    this.close(targetId);
                });
            });

            // Auto-open modal on first page load
            this.open('posterModal');
        },

        open(modalId) {
            const modal = document.getElementById(modalId);
            if (!modal) return;

            modal.style.display = 'flex';
            // Allow DOM render then add active class
            requestAnimationFrame(() => {
                modal.classList.add('active');
            });

            document.body.style.overflow = 'hidden';
            modal.setAttribute('aria-hidden', 'false');

            // Set focus to the primary action inside modal
            const actionBtn = modal.querySelector('button, [tabindex="0"]');
            if (actionBtn) {
                setTimeout(() => actionBtn.focus(), 100);
            }
        },

        close(modalId) {
            const modal = document.getElementById(modalId);
            if (!modal) return;

            modal.classList.remove('active');
            document.body.style.overflow = '';
            modal.setAttribute('aria-hidden', 'true');

            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    };

    window.Modal = Modal;
})(window);
