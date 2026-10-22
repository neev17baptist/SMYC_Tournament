/**
 * VERTEX 2026 - Toast Notification System
 * Non-blocking, accessible, customizable notification toast manager.
 */
(function(window) {
    'use strict';

    let container = null;

    function getOrCreateContainer() {
        if (!container || !document.body.contains(container)) {
            container = document.getElementById('toastContainer');
            if (!container) {
                container = document.createElement('div');
                container.id = 'toastContainer';
                container.setAttribute('aria-live', 'polite');
                container.setAttribute('aria-atomic', 'true');
                document.body.appendChild(container);
            }
        }
        return container;
    }

    const ICONS = {
        success: 'fa-solid fa-circle-check',
        error: 'fa-solid fa-circle-xmark',
        info: 'fa-solid fa-circle-info',
        warning: 'fa-solid fa-triangle-exclamation'
    };

    const Toast = {
        /**
         * Show a toast notification
         * @param {Object} options
         * @param {string} options.title - Header of the toast
         * @param {string} options.message - Body text
         * @param {'success'|'error'|'info'|'warning'} [options.type='success']
         * @param {number} [options.duration=4500] - Duration in ms before auto-dismiss
         */
        show({ title = 'Notification', message = '', type = 'info', duration = 4500 }) {
            const cont = getOrCreateContainer();
            const iconClass = ICONS[type] || ICONS.info;

            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.setAttribute('role', 'alert');

            toast.innerHTML = `
                <div class="toast-icon">
                    <i class="${iconClass}"></i>
                </div>
                <div class="toast-body">
                    <h5 class="toast-title">${title}</h5>
                    <p class="toast-message">${message}</p>
                </div>
                <button type="button" class="toast-close" aria-label="Close notification">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            `;

            cont.appendChild(toast);

            // Trigger animation frame for transition
            requestAnimationFrame(() => {
                toast.classList.add('show');
            });

            let dismissTimer = null;

            const dismiss = () => {
                if (dismissTimer) clearTimeout(dismissTimer);
                toast.classList.remove('show');
                toast.classList.add('hide');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            };

            const closeBtn = toast.querySelector('.toast-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', dismiss);
            }

            if (duration > 0) {
                dismissTimer = setTimeout(dismiss, duration);
            }

            return { dismiss };
        },

        success(title, message, duration) {
            return this.show({ title, message, type: 'success', duration });
        },

        error(title, message, duration) {
            return this.show({ title, message, type: 'error', duration });
        },

        info(title, message, duration) {
            return this.show({ title, message, type: 'info', duration });
        }
    };

    window.Toast = Toast;
})(window);
