/**
 * Fixxit Pros - Main JavaScript
 */

(function () {
  'use strict';

  /* =========================================
     MOBILE NAV TOGGLE
     ========================================= */
  function initMobileNav() {
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.contains('active');
      mobileMenu.classList.toggle('active', !isOpen);
      hamburger.classList.toggle('active', !isOpen);
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* =========================================
     STICKY HEADER ON SCROLL
     ========================================= */
  function initStickyHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY || window.pageYOffset;
      header.classList.toggle('scrolled', scrollY > 10);
      lastScroll = scrollY;
    }, { passive: true });
  }

  /* =========================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ========================================= */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"], a[href*="/#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        var hash = href.includes('#') ? '#' + href.split('#')[1] : null;
        if (!hash || hash === '#') return;

        // If we're on the same page
        if (href.startsWith('#') || window.location.pathname === '/' || href.startsWith('/#')) {
          var target = document.querySelector(hash);
          if (target) {
            e.preventDefault();
            var headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72;
            var targetOffset = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
            window.scrollTo({ top: targetOffset, behavior: 'smooth' });
          }
        }
      });
    });
  }

  /* =========================================
     TESTIMONIALS CAROUSEL
     ========================================= */
  function initCarousel() {
    var carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    var track = carousel.querySelector('.testimonials-track');
    var slides = carousel.querySelectorAll('.testimonial-slide');
    var dots = carousel.querySelectorAll('.carousel-dot');
    var prevBtn = carousel.querySelector('.carousel-btn.prev');
    var nextBtn = carousel.querySelector('.carousel-btn.next');

    if (!track || slides.length === 0) return;

    var currentIndex = 0;
    var totalSlides = slides.length;
    var autoPlayInterval = null;
    var autoPlayDelay = 5000;

    function goTo(index) {
      currentIndex = (index + totalSlides) % totalSlides;
      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayInterval = setInterval(function () {
        goTo(currentIndex + 1);
      }, autoPlayDelay);
    }

    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goTo(currentIndex - 1);
        stopAutoPlay();
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goTo(currentIndex + 1);
        stopAutoPlay();
        startAutoPlay();
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goTo(i);
        stopAutoPlay();
        startAutoPlay();
      });
    });

    // Touch/swipe support
    var touchStartX = 0;
    var touchEndX = 0;
    carousel.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    carousel.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].clientX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        goTo(currentIndex + (diff > 0 ? 1 : -1));
        stopAutoPlay();
        startAutoPlay();
      }
    }, { passive: true });

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Init
    goTo(0);
    startAutoPlay();
  }

  /* =========================================
     COOKIE CONSENT BANNER
     ========================================= */
  function initCookieBanner() {
    var banner = document.getElementById('cookie-banner');
    if (!banner) return;

    var STORAGE_KEY = 'fp_cookie_consent';
    var consent = localStorage.getItem(STORAGE_KEY);
    if (consent === 'accepted' || consent === 'set') return;

    // Show after short delay
    setTimeout(function () {
      banner.classList.add('visible');
    }, 1200);

    var acceptBtn = document.getElementById('cookie-accept');
    var prefsBtn = document.getElementById('cookie-prefs');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        localStorage.setItem(STORAGE_KEY, 'accepted');
        banner.classList.remove('visible');
        setTimeout(function () { banner.style.display = 'none'; }, 500);
      });
    }

    if (prefsBtn) {
      prefsBtn.addEventListener('click', function () {
        localStorage.setItem(STORAGE_KEY, 'set');
        banner.classList.remove('visible');
        setTimeout(function () { banner.style.display = 'none'; }, 500);
      });
    }
  }

  /* =========================================
     SCROLL-TRIGGERED ANIMATIONS (Intersection Observer)
     ========================================= */
  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements immediately
      document.querySelectorAll('.reveal, .trust-card, .step-item').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal, .trust-card, .step-item').forEach(function (el) {
      observer.observe(el);
    });

    // Service cards with stagger
    var serviceCards = document.querySelectorAll('.service-card');
    var serviceObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var index = parseInt(entry.target.getAttribute('data-index') || '0');
          setTimeout(function () {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 60);
          serviceObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    serviceCards.forEach(function (card, i) {
      card.setAttribute('data-index', i);
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      serviceObserver.observe(card);
    });
  }

  /* =========================================
     FORM VALIDATION
     ========================================= */
  function initFormValidation() {
    var forms = document.querySelectorAll('form[data-netlify="true"]');

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        var isValid = validateForm(form);
        if (!isValid) {
          e.preventDefault();
        }
      });

      // Live validation on blur
      form.querySelectorAll('input, select, textarea').forEach(function (field) {
        field.addEventListener('blur', function () {
          validateField(field);
        });
        field.addEventListener('input', function () {
          if (field.classList.contains('error')) {
            validateField(field);
          }
        });
      });
    });
  }

  function validateForm(form) {
    var fields = form.querySelectorAll('input[required], select[required], textarea[required]');
    var isValid = true;
    fields.forEach(function (field) {
      if (!validateField(field)) {
        isValid = false;
      }
    });
    // Focus first error
    if (!isValid) {
      var firstError = form.querySelector('.error');
      if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    return isValid;
  }

  function validateField(field) {
    var errorEl = field.parentElement.querySelector('.field-error');
    var value = field.value.trim();
    var isValid = true;
    var message = '';

    if (field.hasAttribute('required') && !value) {
      isValid = false;
      message = 'This field is required.';
    } else if (field.type === 'email' && value) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        message = 'Please enter a valid email address.';
      }
    } else if (field.type === 'tel' && value) {
      var phoneRegex = /^[\d\s\-\(\)\+]{7,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        message = 'Please enter a valid phone number.';
      }
    }

    field.classList.toggle('error', !isValid);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.toggle('visible', !isValid);
    }

    return isValid;
  }

  /* =========================================
     INIT ALL
     ========================================= */
  function init() {
    initMobileNav();
    initStickyHeader();
    initSmoothScroll();
    initCarousel();
    initCookieBanner();
    initScrollAnimations();
    initFormValidation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
