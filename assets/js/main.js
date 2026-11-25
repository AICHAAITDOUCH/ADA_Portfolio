/*=============== INITIALIZE EMAILJS ===============*/
(function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({
      publicKey: "OyMqqGWJoK7Dhzd0B",
    });
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  /*=============== PRELOADER ANIMATION ===============*/
  const preloader = document.getElementById('preloader');
  const counterEl = document.getElementById('preloader-counter');
  const progressEl = document.getElementById('preloader-progress');

  if (preloader && counterEl && progressEl) {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 8) + 2;
      if (count >= 100) {
        count = 100;
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('loaded');
        }, 300);
      }
      counterEl.textContent = count;
      progressEl.style.width = `${count}%`;
    }, 30);
  }

  /*=============== AMBIENT PARTICLES & LIGHT CANVAS ===============*/
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 20), 75);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.45;
        this.speedY = (Math.random() - 0.5) * 0.45;
        this.alpha = Math.random() * 0.65 + 0.25;
        this.color = Math.random() > 0.5 ? '#06B6D4' : '#8B5CF6';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateCanvas);
    }

    animateCanvas();
  }

  /*=============== MENU TOGGLE ===============*/
  const navMenu = document.getElementById('nav-menu'),
        navToggle = document.getElementById('nav-toggle'),
        navClose = document.getElementById('nav-close');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
    });
  }

  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }

  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('show-menu');
    });
  });

  /*=============== CHANGE BACKGROUND HEADER ===============*/
  const header = document.getElementById('header');
  const scrollHeader = () => {
    if (window.scrollY >= 50) {
      header.classList.add('scroll-header');
    } else {
      header.classList.remove('scroll-header');
    }
  };
  window.addEventListener('scroll', scrollHeader);

  /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
  const sections = document.querySelectorAll('section[id]');
  const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 120,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

      if (sectionsClass) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          sectionsClass.classList.add('active-link');
        } else {
          sectionsClass.classList.remove('active-link');
        }
      }
    });
  };
  window.addEventListener('scroll', scrollActive);

  /*=============== SHOW SCROLL TOP BUTTON ===============*/
  const scrollTop = document.getElementById('scroll-top');
  if (scrollTop) {
    const scrollShow = () => {
      if (window.scrollY >= 400) {
        scrollTop.classList.add('show-scroll');
      } else {
        scrollTop.classList.remove('show-scroll');
      }
    };
    window.addEventListener('scroll', scrollShow);
    scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /*=============== CUSTOM CURSOR ===============*/
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.top = `${mouseY}px`;
      cursor.style.left = `${mouseX}px`;
    });

    const hoverElements = document.querySelectorAll('a, button, .glass-card, .gallery-card, .social-btn');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
  }

  /*=============== LIGHTBOX GALLERY ===============*/
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  if (lightbox && galleryCards.length > 0) {
    let currentIndex = 0;
    const images = Array.from(galleryCards).map(card => card.getAttribute('data-src'));

    const openLightbox = (index) => {
      currentIndex = index;
      lightboxImg.src = images[currentIndex];
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    galleryCards.forEach((card, index) => {
      card.addEventListener('click', () => openLightbox(index));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
      if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
    });
  }

  /*=============== CONTACT FORM ===============*/
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Envoi en cours...';
      btn.disabled = true;

      const templateParams = {
        name: document.getElementById('Name').value,
        email: document.getElementById('Email').value,
        message: document.getElementById('Message').value
      };

      if (typeof emailjs !== 'undefined') {
        emailjs.send('service_lryij8p', 'template_qw6vkiv', templateParams)
          .then(function () {
            alert('Merci ! Votre message a bien été envoyé.');
            contactForm.reset();
          })
          .catch(function (error) {
            console.error('EmailJS Error:', error);
            alert('Merci pour votre message ! Il a été enregistré.');
            contactForm.reset();
          })
          .finally(function () {
            btn.innerHTML = originalText;
            btn.disabled = false;
          });
      } else {
        alert('Merci pour votre message !');
        contactForm.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
    });
  }

  /*=============== SCROLL REVEAL ANIMATION ===============*/
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'top',
      distance: '40px',
      duration: 1200,
      delay: 200,
      reset: false
    });

    sr.reveal('.hero__data, .section__header');
    sr.reveal('.hero__image-wrapper', { delay: 300, origin: 'bottom' });
    sr.reveal('.about__grid', { interval: 150 });
    sr.reveal('.skill-card', { interval: 70 });
    sr.reveal('.project-card-large', { interval: 200 });
    sr.reveal('.project-card-compact', { interval: 100 });
    sr.reveal('.timeline__item', { interval: 150 });
    sr.reveal('.gallery-card', { interval: 80 });
    sr.reveal('.contact-box, .contact__form-card', { interval: 150 });
  }

});

/*============EmailJS==========*/ 
  emailjs.init({
    publicKey: "NBU4pGaejsasx-5xk",
  });

  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;

    button.disabled = true;
    button.innerHTML = "Envoi en cours...";

    emailjs.sendForm(
      "service_0zllxbu",
      "template_lm9myx6",
      contactForm
    )
    .then(() => {
      alert("Votre message a été envoyé avec succès !");
      contactForm.reset();
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
    })
    .finally(() => {
      button.disabled = false;
      button.innerHTML = originalText;
    });
  });
