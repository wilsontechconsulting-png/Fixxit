/**
 * Spam Protection for Fixxit Pros Forms
 * Prevents bot submissions without user friction
 */

(function() {
  'use strict';

  // Track form load time for timing checks
  const formLoadTime = Date.now();

  // Initialize spam protection on all forms
  document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form[data-netlify="true"]');
    
    forms.forEach(function(form) {
      // Add hidden timestamp field
      const timestampField = document.createElement('input');
      timestampField.type = 'hidden';
      timestampField.name = 'form_timestamp';
      timestampField.value = Date.now();
      form.appendChild(timestampField);

      // Add form submit validation
      form.addEventListener('submit', function(e) {
        if (!validateFormSubmission(form)) {
          e.preventDefault();
          // Silently reject - don't alert the bot
          return false;
        }
      });
    });
  });

  function validateFormSubmission(form) {
    const formData = new FormData(form);
    
    // 1. Check submission timing (must be at least 3 seconds)
    const submitTime = Date.now();
    const timeSinceLoad = submitTime - formLoadTime;
    if (timeSinceLoad < 3000) {
      console.log('Spam rejected: too fast');
      return false;
    }

    // 2. Check for repeated values (like "Homebase" in all fields)
    const values = [];
    for (let [key, value] of formData.entries()) {
      if (key !== 'form-name' && key !== 'bot-field' && key !== 'form_timestamp') {
        values.push(value.toString().trim().toLowerCase());
      }
    }
    
    // If more than 3 fields have identical values, likely spam
    const uniqueValues = new Set(values.filter(v => v.length > 0));
    if (values.length > 3 && uniqueValues.size === 1) {
      console.log('Spam rejected: repeated values');
      return false;
    }

    // 3. Check for common spam patterns
    const spamPatterns = [
      /homebase/i,
      /test\s*test/i,
      /spam/i,
      /\b(viagra|cialis|loan|casino)\b/i,
      /https?:\/\//i, // URLs in fields
      /(.)\1{10,}/, // Repeated characters
    ];

    for (let [key, value] of formData.entries()) {
      if (key === 'bot-field') continue;
      
      const valueStr = value.toString();
      for (let pattern of spamPatterns) {
        if (pattern.test(valueStr)) {
          console.log('Spam rejected: pattern match');
          return false;
        }
      }
    }

    // 4. Check honeypot field
    const honeypot = formData.get('bot-field');
    if (honeypot && honeypot.toString().trim() !== '') {
      console.log('Spam rejected: honeypot filled');
      return false;
    }

    // 5. Validate email format if present
    const email = formData.get('email');
    if (email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.toString())) {
        console.log('Spam rejected: invalid email');
        return false;
      }
    }

    // 6. Validate phone format if present
    const phone = formData.get('phone');
    if (phone) {
      const phoneStr = phone.toString().replace(/[\s\-\(\)]/g, '');
      // Must be at least 10 digits
      if (!/^\d{10,}$/.test(phoneStr)) {
        console.log('Spam rejected: invalid phone');
        return false;
      }
    }

    // All checks passed
    return true;
  }
})();
