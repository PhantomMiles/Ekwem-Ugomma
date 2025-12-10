// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlight
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Show success message
        const button = contactForm.querySelector('.btn');
        const originalText = button.textContent;
        button.textContent = 'Message Sent! ✓';
        button.style.background = 'var(--primary)';
        
        // Reset form
        contactForm.reset();
        
        // Restore button after 3 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 3000);
    });
}

// Add animation to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = getComputedStyle(entry.target).animation;
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .practice-item, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Parallax effect for background orbs
window.addEventListener('scroll', () => {
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        orb.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
});

// Add hover animation to service icons
document.querySelectorAll('.service-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(10deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ========================================
// HERO SECTION PARALLAX EFFECT
// ========================================

const heroSection = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');
const heroImage = document.querySelector('.hero-image');

if (heroSection && heroContent && heroImage) {
    // Get hero section position
    const heroTop = heroSection.offsetTop;
    const heroHeight = heroSection.clientHeight;
    const heroBottom = heroTop + heroHeight;

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        
        // Calculate parallax based on hero section visibility
        // When user is viewing hero section, apply parallax
        if (scrollPos < heroBottom) {
            // Calculate offset as percentage of scroll within hero section
            const scrollInHero = Math.max(0, scrollPos - heroTop);
            const parallaxAmount = scrollInHero * 0.3; // Adjust multiplier for stronger/weaker effect
            
            // Text slides to the left (negative X)
            heroContent.style.transform = `translateX(-${parallaxAmount}px)`;
            
            // Image slides to the right (positive X)
            heroImage.style.transform = `translateX(${parallaxAmount}px)`;
        } else {
            // Reset when out of view
            heroContent.style.transform = 'translateX(0)';
            heroImage.style.transform = 'translateX(0)';
        }
    });

    // Reset on page load
    window.addEventListener('load', () => {
        heroContent.style.transform = 'translateX(0)';
        heroImage.style.transform = 'translateX(0)';
    });

    // Smooth transition back to center on scroll up
    let lastScrollPos = 0;
    window.addEventListener('scroll', () => {
        const currentScrollPos = window.scrollY;
        
        // If user scrolls back to top of hero, smoothly return elements to center
        if (currentScrollPos < 200) {
            const returnAmount = currentScrollPos * 0.3;
            heroContent.style.transition = 'transform 0.2s ease-out';
            heroImage.style.transition = 'transform 0.2s ease-out';
            
            heroContent.style.transform = `translateX(-${returnAmount}px)`;
            heroImage.style.transform = `translateX(${returnAmount}px)`;
        }
        
        lastScrollPos = currentScrollPos;
    });
}