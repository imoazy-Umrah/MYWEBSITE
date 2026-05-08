/**
 * Watamu Holidays — Main JavaScript
 * Features:
 * - Mobile navigation toggle
 * - FAQ accordion
 * - Scroll reveal animations (Intersection Observer)
 * - Sticky navigation shadow on scroll
 * - Smooth scroll for anchor links
 */

(function() {
  'use strict';

  // ======================== DOM READY ========================
  document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initFaqAccordion();
    initScrollReveal();
    initStickyNavShadow();
    initSmoothAnchors();
  });

  // ======================== 1. MOBILE NAVIGATION ========================
  function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('open');
      // Optional: change toggle button icon (visual feedback)
      const spans = toggle.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans.forEach(span => span.style.background = '#d4a017');
      } else {
        spans.forEach(span => span.style.background = '');
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !toggle.contains(e.target)) {
        navLinks.classList.remove('open');
        const spans = toggle.querySelectorAll('span');
        spans.forEach(span => span.style.background = '');
      }
    });
  }

  // ======================== 2. FAQ ACCORDION ========================
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-q');
      if (!question) return;

      question.addEventListener('click', function() {
        // Toggle current item
        item.classList.toggle('open');
        // Optional: close other items? Uncomment if you want only one open at a time
        /*
        faqItems.forEach(other => {
          if (other !== item && other.classList.contains('open')) {
            other.classList.remove('open');
          }
        });
        */
      });
    });
  }

  // ======================== 3. SCROLL REVEAL (Intersection Observer) ========================
  function initScrollReveal() {
    // Target elements: all elements with class .scroll-reveal
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: unobserve after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    revealElements.forEach(el => observer.observe(el));
  }

  // ======================== 4. STICKY NAVIGATION SHADOW ON SCROLL ========================
  function initStickyNavShadow() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        nav.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
      } else {
        nav.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
      }
    });
    // trigger once to set initial state
    window.dispatchEvent(new Event('scroll'));
  }

  // ======================== 5. SMOOTH SCROLL FOR ANCHOR LINKS (optional) ========================
  function initSmoothAnchors() {
    const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Update URL without jumping (optional)
          history.pushState(null, null, targetId);
        }
      });
    });
  }

})();