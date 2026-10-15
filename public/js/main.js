document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Mobile Menu Toggle (Template A & General)
    // ==========================================
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            // Toggle the visibility of the mobile menu panel
            mobileMenu.classList.toggle('hidden');
        });
    }

    // ==========================================
    // 2. Smooth Scrolling & Active Link States
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just a top-level anchor
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Smooth scroll to the target section
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Automatically close mobile menu if it is open (Template A)
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // ==========================================
    // 3. Scroll-to-Top Button Visibility
    // ==========================================
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            // Show button after scrolling down 300px
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
                backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
            } else {
                backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
                backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
            }
        });

        // Click event to scroll back to top
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 4. Sticky Navbar Shadow Effect on Scroll
    // ==========================================
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                navbar.classList.add('shadow-md');
                navbar.classList.remove('shadow-sm');
            } else {
                navbar.classList.remove('shadow-md');
                navbar.classList.add('shadow-sm');
            }
        });
    }
});