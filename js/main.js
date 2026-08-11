document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const yearSpan = document.getElementById('year');
    const skillBars = document.querySelectorAll('.skill-progress-fill');
    const revealElements = document.querySelectorAll('.about-card, .timeline-item, .skill-category, .cert-card, .project-card, .contact-item, .cta-card');

    // Actualizar año en footer
    yearSpan.textContent = new Date().getFullYear();

    // Navbar con scroll
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Botón volver arriba
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        updateActiveNav();
    }

    // Menú móvil
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Navegación activa según sección visible
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Animación de barras de habilidades
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                bar.style.width = bar.getAttribute('data-width') + '%';
            }
        });
    }

    // Animación reveal al hacer scroll
    function revealOnScroll() {
        revealElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                setTimeout(() => {
                    element.classList.add('active');
                }, index * 80);
            }
        });
    }

    // Efecto typing en hero
    function initTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const roles = [
            'Especialista en Ciberseguridad',
            'Pentester',
            'DevSecOps',
            'Arquitecto de Seguridad Cloud'
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        type();
    }

    // Efecto parallax suave en hero
    function parallaxEffect() {
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg && window.innerWidth > 768) {
            const scrolled = window.pageYOffset;
            heroBg.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    }

    // Inicializar
    revealElements.forEach(el => el.classList.add('reveal'));
    
    window.addEventListener('scroll', () => {
        handleScroll();
        animateSkillBars();
        revealOnScroll();
        parallaxEffect();
    });

    // Llamadas iniciales
    handleScroll();
    animateSkillBars();
    revealOnScroll();
    initTypingEffect();

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
});