/**
 * VERTEX 2026 - Registration Form Controller
 * Robust form validation, file checks, persistence & feedback
 */
(function(window) {
    'use strict';

    const Registration = {
        STORAGE_KEY: 'vertex_2026_registrations',

        init() {
            const form = document.getElementById('registrationForm');
            if (!form) return;

            form.addEventListener('submit', (e) => this.handleSubmit(e));
        },

        handleSubmit(event) {
            event.preventDefault();
            const form = event.target;

            // Extract form inputs
            const parishInput = document.getElementById('regParish');
            const teamInput = document.getElementById('regTeamName');
            const managerInput = document.getElementById('regManager');
            const phoneInput = document.getElementById('regPhone');
            const fileInput = document.getElementById('regFile');
            const submitBtn = form.querySelector('button[type="submit"]');

            const parish = parishInput ? parishInput.value.trim() : '';
            const team = teamInput ? teamInput.value.trim() : '';
            const manager = managerInput ? managerInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const file = fileInput && fileInput.files ? fileInput.files[0] : null;

            // 1. Basic field validation
            if (!parish || !team || !manager || !phone) {
                if (window.Toast) {
                    window.Toast.error('Incomplete Details', 'Please fill in all mandatory fields before submitting.');
                }
                return;
            }

            // 2. Phone number validation (Indian 10-digit mobile or international with optional +)
            const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
            const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
            if (!phoneRegex.test(cleanPhone)) {
                if (window.Toast) {
                    window.Toast.error('Invalid Phone Number', 'Please enter a valid 10-digit mobile number for the team manager.');
                }
                if (phoneInput) phoneInput.focus();
                return;
            }

            // 3. Document / PDF validation
            if (!file) {
                if (window.Toast) {
                    window.Toast.error('Missing Documents', 'Please upload the combined PDF of player baptism certificates and Aadhaar cards.');
                }
                if (fileInput) fileInput.focus();
                return;
            }

            const fileName = file.name.toLowerCase();
            if (!fileName.endsWith('.pdf') && file.type !== 'application/pdf') {
                if (window.Toast) {
                    window.Toast.error('Invalid File Format', 'Only PDF files (.pdf) are accepted for document verification.');
                }
                return;
            }

            const maxSizeInBytes = 15 * 1024 * 1024; // 15MB limit
            if (file.size > maxSizeInBytes) {
                if (window.Toast) {
                    window.Toast.error('File Too Large', 'Please upload a PDF document under 15MB.');
                }
                return;
            }

            // 4. Loading state simulation
            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Submit Registration Entry';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Submitting Registration...';
            }

            setTimeout(() => {
                // 5. Store registration in local storage
                try {
                    const existing = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
                    const newEntry = {
                        id: 'VTX-' + Date.now().toString(36).toUpperCase(),
                        parish,
                        team,
                        manager,
                        phone,
                        fileName: file.name,
                        submittedAt: new Date().toISOString()
                    };
                    existing.push(newEntry);
                    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existing));
                } catch (err) {
                    console.warn('LocalStorage error while storing registration:', err);
                }

                // 6. Reset UI and Notify User
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }

                form.reset();

                if (window.Toast) {
                    window.Toast.success(
                        'Registration Received!',
                        `Team "${team}" from ${parish} has been recorded. Please complete entry fee payment of ₹2,000/- with the committee.`
                    );
                }
            }, 600);
        }
    };

    window.Registration = Registration;
})(window);
