document.addEventListener('DOMContentLoaded', () => {
    
    // Select all possible theme toggles and icons (Desktop & Mobile)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
    const themeIcon = document.getElementById('theme-icon');
    const themeIconMobile = document.getElementById('theme-icon-mobile');

    // ==========================================
    // 1. Icon UI Updater
    // ==========================================
    const updateIcons = (isDark) => {
        const iconClassToAdd = isDark ? 'fa-sun' : 'fa-moon';
        const iconClassToRemove = isDark ? 'fa-moon' : 'fa-sun';

        if (themeIcon) {
            themeIcon.classList.remove(iconClassToRemove);
            themeIcon.classList.add(iconClassToAdd);
            
            // Adjust icon color slightly based on theme
            if(isDark) {
                themeIcon.classList.remove('text-gray-800');
                themeIcon.classList.add('text-yellow-400');
            } else {
                themeIcon.classList.remove('text-yellow-400');
                themeIcon.classList.add('text-gray-800');
            }
        }
        
        if (themeIconMobile) {
            themeIconMobile.classList.remove(iconClassToRemove);
            themeIconMobile.classList.add(iconClassToAdd);
            
            if(isDark) {
                themeIconMobile.classList.remove('text-gray-800');
                themeIconMobile.classList.add('text-yellow-400');
            } else {
                themeIconMobile.classList.remove('text-yellow-400');
                themeIconMobile.classList.add('text-gray-800');
            }
        }
    };

    // ==========================================
    // 2. Initialize Theme on Load
    // ==========================================
    // Check local storage OR system preference
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        updateIcons(true);
    } else {
        document.documentElement.classList.remove('dark');
        updateIcons(false);
    }

    // ==========================================
    // 3. Theme Toggle Logic
    // ==========================================
    const toggleTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            // Switch to Light Mode
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            updateIcons(false);
        } else {
            // Switch to Dark Mode
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            updateIcons(true);
        }
    };

    // ==========================================
    // 4. Attach Event Listeners
    // ==========================================
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleMobileBtn) {
        themeToggleMobileBtn.addEventListener('click', toggleTheme);
    }
});