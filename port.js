// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeTyping();
    initializeScrollEffects();
    initializeProjectFilters();
    initializeSkillAnimations();
    setupContactForm();
    setupNavbarScroll();
    setupMobileMenu();
});

// Typing animation for hero section
function initializeTyping() {
    const typedText = document.querySelector('.typed-text');
    const phrases = ['Web Developer', 'UI/UX Designer', 'Frontend Developer'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            charIndex--;
            typingSpeed = 50;
        } else {
            charIndex++;
            typingSpeed = 100;
        }

        typedText.textContent = currentPhrase.substring(0, charIndex);

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Smooth scroll effect for navigation
function initializeScrollEffects() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScrollTo(target.offsetTop - 70, 1000);
            }
        });
    });
}

function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Project filter functionality
function initializeProjectFilters() {
    const projectsData = [
        {
            title: "Management Restaurant",
            category: "web",
            image: "images/pj5.png",
            description: "Website sistem pengelola user dan admin restaurant",
            tags: ["MySql", "CSS", "PHP"],
            link: ""
        },
        {
            title: "Ebook App Mobile",
            category: "design",
            image: "images/pj3.png",
            description: "UI/UX design with figma for ebook app mobile",
            tags: ["Figma",],
            link: ""
        },
        {
            title: "Mockup Web Berita ",
            category: "design",
            image: "images/pj4.png",
            description: "UI/UX design with figma for news website",
            tags: ["Figma",],
            link: ""
        },
        {
            title: "Simple Portofolio",
            category: "web",
            image: "images/pj1.png",
            description: "UI/UX design with figma for ebook app mobile",
            tags: ["HTML", "CSS", "JavaScript"],
            link: ""
        },
        // Add more projects as needed
    ];

    const projectGrid = document.querySelector('.project-grid');
    const filterButtons = document.querySelector('.projects-filter');

    // Create filter buttons
    const categories = ['all', ...new Set(projectsData.map(project => project.category))];
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'filter-btn' + (category === 'all' ? ' active' : '');
        button.dataset.filter = category;
        button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        filterButtons.appendChild(button);
    });

    // Create project cards with improved image handling
    function createProjectCard(project) {
        const tags = project.tags ? project.tags.map(tag => 
            `<span class="project-tag">${tag}</span>`
        ).join('') : '';

        return `
            <div class="project-card" data-category="${project.category}">
                <div class="project-image-container">
                    <img src="${project.image}" 
                         alt="${project.title}" 
                         class="project-image"
                         onerror="this.src='/api/placeholder/280/160';this.onerror=null;"
                    >
                    <div class="project-overlay">
                    </div>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${tags}
                    </div>
                </div>
            </div>
        `;
    }

    // Handle image loading errors
    function handleImageErrors() {
        const projectImages = document.querySelectorAll('.project-image');
        projectImages.forEach(img => {
            img.addEventListener('error', function() {
                this.src = '/api/placeholder/280/160';  // Fallback image with correct dimensions
            });
        });
    }

    // Display projects and handle filtering
    function displayProjects(category = 'all') {
        const filteredProjects = category === 'all' 
            ? projectsData 
            : projectsData.filter(project => project.category === category);
        
        projectGrid.innerHTML = filteredProjects.map(createProjectCard).join('');
        handleImageErrors();
        
        // Add fade-in animation to new cards
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.animation = `fadeIn 0.3s ease forwards ${index * 0.1}s`;
        });
    }

    // Initialize projects
    displayProjects();

    // Handle filter clicks
    filterButtons.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            displayProjects(e.target.dataset.filter);
        }
    });

    // Add window resize handler for responsive images
    window.addEventListener('resize', () => {
        const projectImages = document.querySelectorAll('.project-image');
        projectImages.forEach(img => {
            img.style.height = '160px';  // Maintain consistent height
        });
    });
}

// Skill bars animation
function initializeSkillAnimations() {
    const skillBars = document.querySelectorAll('.progress');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.parentElement.dataset.progress;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        bar.style.width = '0';
        observer.observe(bar);
    });
}

// Contact form handling
function setupContactForm() {
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form validation
            const formData = new FormData(this);
            const formValid = validateForm(formData);
            
            if (formValid) {
                // Simulate form submission
                showNotification('Thank you for your message! I will get back to you soon.');
                this.reset();
            }
        });
    }
}

// Form validation helper
function validateForm(formData) {
    let isValid = true;
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        isValid = false;
    }

    return isValid;
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }, 100);
}

// Navbar scroll effect
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove background color based on scroll position
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }

        lastScroll = currentScroll;
    });
}

// Mobile menu setup
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }
}

// Function to scroll to projects section
function scrollToProjects() {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
        smoothScrollTo(projectsSection.offsetTop - 70, 1000);
    }
}

// Add scroll reveal animations
window.addEventListener('load', () => {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });
});