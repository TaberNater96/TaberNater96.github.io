document.addEventListener('DOMContentLoaded', function() {
    // Helper function to measure the header's height and expose it as a CSS variable for layout adjustments
    const updateHeaderHeight = function() {
        // Get the current height of the fixed header element
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        // Store the measured height in a CSS custom property for use in responsive layouts
        document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
    };

    // Immediately calculate and apply header height once the page loads
    updateHeaderHeight();
    // Recalculate header height on every window resize to keep spacing accurate
    window.addEventListener('resize', updateHeaderHeight);
    
    // Collect all navigation links in the sidebar for smooth scrolling and active state toggling
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    // Compute vertical scroll offset for a section, subtracting fixed header height plus extra padding
    function getElementOffset(el) {
        // Measure header height again in case it changed
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        // Get element's position relative to viewport and convert to document-level coordinate
        const rect = el.getBoundingClientRect();
        return rect.top + window.pageYOffset - headerHeight - 20; // Add 20px gap above the section
    }
    
    // Attach click behavior to each sidebar link to control scrolling and highlight active link
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // prevent default jump to anchor
            // Remove "active" highlight from all links before applying to the clicked one
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active'); // Highlight the clicked link
            
            const targetId = this.getAttribute('href');
            // Special case: if href is '#', scroll to very top of page
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            // Otherwise, find the target section and smoothly scroll to its adjusted position
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = getElementOffset(targetElement);
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });
    
    // Listen for page scroll events to dynamically update which sidebar link is marked as active
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY; // current vertical scroll
        // If near top of page, reset to intro (hero) link
        if (scrollPosition < 100) {
            sidebarLinks.forEach(link => link.classList.remove('active'));
            const introLink = document.querySelector('.sidebar-nav a[data-section="intro"]');
            if (introLink) introLink.classList.add('active');
            return;
        }
        // Re-measure header height for precise section offsets
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        // Define main content sections to track their positions
        const sections = [
            { el: document.querySelector('#timeline'), id: 'timeline' },
            { el: document.querySelector('#projects'), id: 'projects' },
            { el: document.querySelector('#psyop'), id: 'psyop' }
        ];
        // Calculate the top threshold for each section relative to scroll
        sections.forEach(section => {
            if (section.el) section.top = section.el.offsetTop - headerHeight - 100;
        });
        // Determine which section the user has scrolled into by comparing positions
        let currentSection = 'timeline';
        for (let i = sections.length - 1; i >= 0; i--) {
            if (sections[i].el && scrollPosition >= sections[i].top) {
                currentSection = sections[i].id;
                break;
            }
        }
        // Highlight the sidebar link corresponding to the current section in view
        sidebarLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.sidebar-nav a[data-section="${currentSection}"]`);
        if (activeLink) activeLink.classList.add('active');
    });
    
    // ----- Projects page specific sidebar navigation -----
    // Select links in the projects page sidebar for scroll and active state control
    const projectsLinks = document.querySelectorAll('.projects-sidebar a');
    
    // Smooth scroll and highlight logic for project items when clicked
    projectsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            projectsLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const offset = targetElement.offsetTop - headerHeight - 20;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });
    
    // If this is the projects page, handle initial hash navigation and update active link on scroll
    if (document.querySelector('.projects-page')) {
        // Scroll to section if URL contains a hash when page loads (e.g., from home page project link)
        if (window.location.hash) {
            const hash = window.location.hash;
            projectsLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === hash) link.classList.add('active');
            });
            setTimeout(() => {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    const offset = targetElement.offsetTop - headerHeight - 20;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            }, 300); // Delay ensures all DOM elements are rendered
        }
        // Update active project link as user scrolls through project sections
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const headerHeight = document.querySelector('.site-header').offsetHeight;
            const projectSections = [
                { el: document.querySelector('#atmoseer'), id: 'atmoseer' },
                { el: document.querySelector('#robi'), id: 'robi' },
                { el: document.querySelector('#portfolio'), id: 'portfolio' },
                { el: document.querySelector('#nfl-analysis'), id: 'nfl-analysis' }
            ];
            projectSections.forEach(section => {
                if (section.el) section.top = section.el.offsetTop - headerHeight - 100;
            });
            let currentSection = null;
            for (let i = projectSections.length - 1; i >= 0; i--) {
                if (projectSections[i].el && scrollPosition >= projectSections[i].top) {
                    currentSection = projectSections[i].id;
                    break;
                }
            }
            if (currentSection) {
                projectsLinks.forEach(link => link.classList.remove('active'));
                const activeProjectLink = document.querySelector(`.projects-sidebar a[data-section="${currentSection}"]`);
                if (activeProjectLink) activeProjectLink.classList.add('active');
            }
        });
    }
    
    // Trigger a scroll event on load to initialize the correct active link based on current scroll position
    window.dispatchEvent(new Event('scroll'));
});