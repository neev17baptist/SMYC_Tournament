# VERTEX 2026 - Tournament Web Portal
**1st Annual Inter-Parish 4-A-Side Football Tournament**  
*Hosted by St. Mary's Youth Movement (ICYM) | Archdiocese of Kolkata*

---

## 📁 Project Architecture & Industry-Standard Structure

This project has been modularized and separated according to front-end industry best practices:

```
Tournament_SMYC/
├── index.html                   # Primary entry point (semantic HTML5, zero inline styles/scripts)
├── PAGE.html                    # Synchronized entry point for backwards compatibility
├── README.md                    # Project documentation & guidelines
├── plan.md                      # Tournament roadmap & tournament phases
│
├── css/
│   └── style.css                # Centralized stylesheet (Design tokens, custom scrollbars, glassmorphism, animations)
│
├── js/
│   ├── main.js                  # Application orchestrator, mobile navigation, scroll-spy, downloads
│   ├── modal.js                 # Accessible modal system (Escape key, backdrop click, focus management)
│   ├── toast.js                 # Accessible non-blocking toast notifications (aria-live, auto-dismiss)
│   └── registration.js          # Form validation, PDF type/size checks, localStorage persistence
│
└── assets/ (or assests/)
    ├── FrDominic.png            # Portrait of Parish Priest Rev. Fr. Dominic Gomes
    ├── mark.jpeg                # Photo of Youth President Mark Partridge
    ├── nikita.png               # Photo of Youth Secretary Nikita Culpeper
    ├── Vertex Football Tournament Poster.png # Official high-resolution tournament poster
    └── Inter Parish Tournament File.pdf     # Official tournament documentation & form PDF
```

---

## 🛠️ Industry Standards & Best Practices Applied

1. **Separation of Concerns**:
   - **HTML (`index.html` / `PAGE.html`)**: Semantic structure only (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), fully accessible with `aria-*` attributes. Zero inline CSS `<style>` blocks and zero inline JS handlers (`onclick`, `onsubmit`).
   - **CSS (`css/style.css`)**: Dedicated design tokens (`:root` CSS variables for brand colors, elevations, and transitions), sleek custom scrollbars, responsive glassmorphism, and subtle hover micro-animations.
   - **JavaScript (`js/`)**: Split into focused, single-responsibility modules:
     - `toast.js`: Toast notification queue and rendering.
     - `modal.js`: Accessible modal management with keyboard navigation (`Esc`) and background scroll lock.
     - `registration.js`: Form validation (10-digit mobile check, PDF MIME/size verification, `localStorage` draft saving).
     - `main.js`: Main bootstrap script managing the mobile menu toggle, active section scroll-spy, and file downloads.

2. **Performance & Non-Blocking Execution**:
   - Scripts are loaded with the `defer` attribute, ensuring instant HTML parsing without render blocking.
   - External dependencies (Google Fonts, FontAwesome, Tailwind) utilize `preconnect` links.

3. **Connected Real Assets**:
   - Connected actual photos for Rev. Fr. Dominic Gomes, Mark Partridge, and Nikita Culpeper with robust fallback initials if an image cannot load.
   - Connected actual tournament poster visual within the popup modal.
   - Download buttons trigger downloads of the official PDF document.

4. **Responsive & Mobile-Ready**:
   - Integrated mobile hamburger navigation drawer with smooth transitions.
   - Active scroll-spy that highlights the section you are currently viewing.

---

## 🚀 How to Run Locally

You can open `index.html` or `PAGE.html` directly in any modern browser:
- Double click `index.html` in Windows Explorer, **OR**
- Run a lightweight local HTTP server (optional):
  ```bash
  npx -y serve .
  ```
