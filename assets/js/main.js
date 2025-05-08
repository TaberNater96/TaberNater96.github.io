document.addEventListener('DOMContentLoaded', function() {
    // Dynamic header height function
    const updateHeaderHeight = function() {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
    };

    // Call initially
    updateHeaderHeight();

    // Update on window resize
    window.addEventListener('resize', updateHeaderHeight);
    
    // Handle sidebar links on home page
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    // Function to get the correct offset for each section
    function getElementOffset(el) {
        // Get the height of the fixed header
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        
        // Get the element's position relative to the viewport
        const rect = el.getBoundingClientRect();
        
        // Calculate the absolute position and subtract the header height
        return rect.top + window.pageYOffset - headerHeight - 20; // Additional 20px for spacing
    }
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Always prevent default
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section
            const targetId = this.getAttribute('href');
            
            // Special case for Intro (hero banner)
            if(targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                const offset = getElementOffset(targetElement);
                
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active link based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Simply check if we're at the top of the page
        if (scrollPosition < 100) {
            // We're at the top (Intro section)
            sidebarLinks.forEach(link => link.classList.remove('active'));
            const introLink = document.querySelector('.sidebar-nav a[data-section="intro"]');
            if (introLink) {
                introLink.classList.add('active');
            }
            return;
        }
        
        // If we're not at the top, check which section we're in
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        
        // Get all sections with their positions
        const sections = [
            { el: document.querySelector('#timeline'), id: 'timeline' },
            { el: document.querySelector('#projects'), id: 'projects' },
            { el: document.querySelector('#psyop'), id: 'psyop' }
        ];
        
        // Add top offsets to each section for comparison
        sections.forEach(section => {
            if(section.el) {
                section.top = section.el.offsetTop - headerHeight - 100;
            }
        });
        
        // Find the current section
        let currentSection = 'timeline'; // Default to first section after intro
        
        for(let i = sections.length - 1; i >= 0; i--) {
            if(sections[i].el && scrollPosition >= sections[i].top) {
                currentSection = sections[i].id;
                break;
            }
        }
        
        // Update active link
        sidebarLinks.forEach(link => link.classList.remove('active'));
        
        const activeLink = document.querySelector(`.sidebar-nav a[data-section="${currentSection}"]`);
        if(activeLink) {
            activeLink.classList.add('active');
        }
    });
    
    // Projects page sidebar navigation
    const projectsLinks = document.querySelectorAll('.projects-sidebar a');
    
    projectsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            projectsLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                // Get the height of the fixed header
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                
                // Calculate the offset to scroll to the top of the target element
                const offset = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active link based on scroll position for projects page
    if(document.querySelector('.projects-page')) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const headerHeight = document.querySelector('.site-header').offsetHeight;
            
            // Get all project sections
            const projectSections = [
                { el: document.querySelector('#atmoseer'), id: 'atmoseer' },
                { el: document.querySelector('#robi'), id: 'robi' },
                { el: document.querySelector('#portfolio'), id: 'portfolio' },
                { el: document.querySelector('#nfl-analysis'), id: 'nfl-analysis' }
            ];
            
            // Add offsets for comparison
            projectSections.forEach(section => {
                if(section.el) {
                    section.top = section.el.offsetTop - headerHeight - 100;
                }
            });
            
            // Find current section
            let currentSection = null;
            for(let i = projectSections.length - 1; i >= 0; i--) {
                if(projectSections[i].el && scrollPosition >= projectSections[i].top) {
                    currentSection = projectSections[i].id;
                    break;
                }
            }
            
            // Update active link
            if(currentSection) {
                projectsLinks.forEach(link => link.classList.remove('active'));
                const activeProjectLink = document.querySelector(`.projects-sidebar a[data-section="${currentSection}"]`);
                if(activeProjectLink) {
                    activeProjectLink.classList.add('active');
                }
            }
        });
    }
    
    // Trigger scroll event once on page load to set initial active state
    window.dispatchEvent(new Event('scroll'));
});