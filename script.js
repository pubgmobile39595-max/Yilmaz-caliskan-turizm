// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Menü linkine tıklayınca kapansın
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Sayaç Animasyonu (Düzeltilmiş) =====
const counters = document.querySelectorAll('.stat-number');

function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // 2 saniye
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.innerText = target;
            clearInterval(timer);
        } else {
            counter.innerText = Math.floor(current);
        }
    }, stepTime);
}

// Sayfa kaydırılınca sayaçları başlat
const aboutSection = document.querySelector('.about');
let countersStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            counters.forEach(counter => animateCounter(counter));
            countersStarted = true;
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

if (aboutSection) {
    counterObserver.observe(aboutSection);
}

// ===== Yorumlar Slider =====
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        showTestimonial(+dot.dataset.index);
    });
});

// Otomatik kaydır
setInterval(() => {
    let next = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(next);
}, 5000);

// ===== Form =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Teşekkürler! Mesajınız alındı.\n\n(Not: Bu form şu an demo amaçlıdır.)');
        contactForm.reset();
    });
}

// ===== Kartların yumuşak görünmesi =====
const revealElements = document.querySelectorAll('.tour-card, .feature, .gallery-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.7s ease';
    revealObserver.observe(el);
});
