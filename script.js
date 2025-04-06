document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Sticky Navigation on Scroll
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        // Hero section animation
        gsap.to('.hero-content', {
            duration: 1,
            y: 50,
            opacity: 1,
            ease: 'power3.out'
        });

        // Method cards stagger animation
        gsap.utils.toArray('.method-card').forEach((card, i) => {
            ScrollTrigger.create({
                trigger: card,
                start: "top 80%",
                onEnter: () => {
                    gsap.to(card, {
                        duration: 0.5,
                        opacity: 1,
                        y: 0,
                        ease: 'power2.out'
                    });
                }
            });
        });

        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            gsap.to(hero, {
                scrollTrigger: {
                    trigger: hero,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                },
                backgroundPositionY: "30%",
                ease: "none"
            });
        }
    }

    // Ad placeholder hover effect
    document.querySelectorAll('.adsense-slot').forEach(ad => {
        ad.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        });

        ad.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});