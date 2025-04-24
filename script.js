document.addEventListener('DOMContentLoaded', () => {
    const articles = document.querySelectorAll('.news-article');
    const visibleArticles = new Set();
    const darkModeToggle = document.getElementById('darkModeToggle');
    const rootElement = document.documentElement; // Get the <html> element

    // --- Dark Mode Toggle Logic ---
    const enableDarkMode = () => {
        rootElement.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    };

    const disableDarkMode = () => {
        rootElement.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    };

    // Event listener for the toggle button
    darkModeToggle.addEventListener('click', () => {
        if (rootElement.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // Initial check is handled by inline script in <head> now


    // --- Intersection Observer Setup (Scroll Effect - Unchanged) ---
    const visibilityObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0
    };

    const visibilityCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                visibleArticles.add(entry.target);
            } else {
                visibleArticles.delete(entry.target);
                entry.target.classList.remove('is-visible');
            }
        });
        // Optional: checkArticlePositions();
    };

    const visibilityObserver = new IntersectionObserver(visibilityCallback, visibilityObserverOptions);

    // --- Function to Check Positions (Scroll Effect - Unchanged) ---
    const checkArticlePositions = () => {
        const viewportHeight = window.innerHeight;
        const sixtyPercentMarkPx = viewportHeight * 0.6;

        visibleArticles.forEach(article => {
            const elementRect = article.getBoundingClientRect();
            const elementTopPx = elementRect.top;
            const elementBottomPx = elementRect.bottom;

            if (elementTopPx <= sixtyPercentMarkPx && elementBottomPx > 0) {
                 // Top edge is past the 60% mark and element is still partially in view from top
                article.classList.add('is-visible');
            } else {
                // Top edge is above 60% mark OR element scrolled completely past top
                article.classList.remove('is-visible');
            }
        });
    };

    // --- Scroll Event Listener (Scroll Effect - Unchanged) ---
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(checkArticlePositions, 20);
    }, { passive: true });

    // --- Initial Setup (Observe Articles - Unchanged) ---
    articles.forEach(article => {
        visibilityObserver.observe(article);
    });

    // Run the position check once on load
    setTimeout(checkArticlePositions, 100);


}); // End DOMContentLoaded