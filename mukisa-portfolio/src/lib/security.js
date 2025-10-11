// Security utilities for production deployment

// HTTPS redirect function
export const enforceHTTPS = () => {
  if (import.meta.env.PROD && window.location.protocol !== 'https:') {
    window.location.replace(`https:${window.location.href.substring(window.location.protocol.length)}`);
  }
};

// Content Security Policy helpers
export const getCSPHeaders = () => ({
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://cdn.emailjs.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https:;
    connect-src 'self' https://api.emailjs.com;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
  `.replace(/\s+/g, ' ').trim()
});

// Security headers for production
export const getSecurityHeaders = () => ({
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  ...getCSPHeaders()
});

// Input sanitization for forms
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

// URL validation
export const isValidURL = (string) => {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
};

// Email validation (more secure than basic regex)
export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

// Prevent XSS in dynamic content
export const escapeHTML = (unsafe) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Initialize security measures
export const initializeSecurity = () => {
  // Enforce HTTPS in production
  enforceHTTPS();
  
  // Disable right-click context menu in production (optional)
  if (import.meta.env.PROD) {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+U
    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    });
  }
  
  // Remove console logs in production
  if (import.meta.env.PROD) {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
  }
};

// Security audit function
export const runSecurityAudit = () => {
  const issues = [];
  
  // Check if HTTPS is enabled
  if (window.location.protocol !== 'https:' && import.meta.env.PROD) {
    issues.push('HTTPS not enforced');
  }
  
  // Check for inline scripts (basic check)
  const inlineScripts = document.querySelectorAll('script:not([src])');
  if (inlineScripts.length > 0) {
    issues.push(`${inlineScripts.length} inline script(s) found`);
  }
  
  // Check for mixed content
  const insecureResources = Array.from(document.querySelectorAll('img, script, link'))
    .filter(el => {
      const src = el.src || el.href;
      return src && src.startsWith('http://');
    });
  
  if (insecureResources.length > 0) {
    issues.push(`${insecureResources.length} insecure resource(s) found`);
  }
  
  return {
    passed: issues.length === 0,
    issues
  };
};