// ========== MOBILE MENU ========== 
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.getElementById('nav');

mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close menu when clicking nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ========== FORM HANDLING ==========
const projectForm = document.getElementById('projectForm');
const formMessage = document.querySelector('.form-message');

projectForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(projectForm);
    
    // Submit to Formspree
    fetch(projectForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            formMessage.classList.add('success');
            formMessage.classList.remove('error');
            formMessage.textContent = 'Thank you! Your inquiry has been sent. We\'ll be in touch soon.';
            projectForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        formMessage.classList.add('error');
        formMessage.classList.remove('success');
        formMessage.textContent = 'Something went wrong. Please try again.';
    });
});

// ========== FOOTER YEAR ==========
document.getElementById('year').textContent = new Date().getFullYear();

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.process-card, .solution-card, .value-item').forEach(el => {
    observer.observe(el);
});