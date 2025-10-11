// Simple client-side rate limiting using localStorage
// In production, this should be handled server-side

// Rate limiting configurations
export const RATE_LIMITS = {
  COMMENT: {
    requests: 5,
    window: 15 * 60 * 1000, // 15 minutes
    message: 'Too many comments posted.'
  },
  CONTACT: {
    requests: 3,
    window: 60 * 60 * 1000, // 1 hour
    message: 'Too many contact form submissions.'
  },
  NEWSLETTER: {
    requests: 2,
    window: 60 * 60 * 1000, // 1 hour
    message: 'Too many newsletter signup attempts.'
  },
  SEARCH: {
    requests: 30,
    window: 60 * 1000, // 1 minute
    message: 'Too many search requests.'
  }
};

class RateLimiter {
  constructor() {
    this.storagePrefix = 'rate_limit_';
  }

  // Check if action is rate limited
  isRateLimited(action, maxRequests, windowMs) {
    const now = Date.now();
    const key = `${this.storagePrefix}${action}`;
    
    try {
      const stored = localStorage.getItem(key);
      const requests = stored ? JSON.parse(stored) : [];
      
      // Remove old requests outside the time window
      const validRequests = requests.filter(timestamp => 
        now - timestamp < windowMs
      );
      
      // Check if we've exceeded the limit
      if (validRequests.length >= maxRequests) {
        return {
          isLimited: true,
          resetTime: Math.min(...validRequests) + windowMs,
          remainingRequests: 0
        };
      }
      
      return {
        isLimited: false,
        resetTime: null,
        remainingRequests: maxRequests - validRequests.length
      };
      
    } catch (error) {
      console.warn('Rate limiting error:', error);
      // If there's an error, allow the request
      return {
        isLimited: false,
        resetTime: null,
        remainingRequests: maxRequests
      };
    }
  }

  // Record a new request
  recordRequest(action, maxRequests, windowMs) {
    const now = Date.now();
    const key = `${this.storagePrefix}${action}`;
    
    try {
      const stored = localStorage.getItem(key);
      const requests = stored ? JSON.parse(stored) : [];
      
      // Remove old requests outside the time window
      const validRequests = requests.filter(timestamp => 
        now - timestamp < windowMs
      );
      
      // Add the new request
      validRequests.push(now);
      
      // Keep only the most recent requests within the limit
      const trimmedRequests = validRequests.slice(-maxRequests);
      
      localStorage.setItem(key, JSON.stringify(trimmedRequests));
      
      return {
        success: true,
        remainingRequests: Math.max(0, maxRequests - trimmedRequests.length)
      };
      
    } catch (error) {
      console.warn('Failed to record rate limit:', error);
      return { success: false, remainingRequests: 0 };
    }
  }

  // Get time until rate limit resets
  getResetTimeMessage(resetTime) {
    if (!resetTime) return '';
    
    const now = Date.now();
    const remaining = resetTime - now;
    
    if (remaining <= 0) return 'Rate limit has expired';
    
    const minutes = Math.ceil(remaining / (1000 * 60));
    if (minutes === 1) return 'Try again in 1 minute';
    if (minutes < 60) return `Try again in ${minutes} minutes`;
    
    const hours = Math.ceil(minutes / 60);
    if (hours === 1) return 'Try again in 1 hour';
    return `Try again in ${hours} hours`;
  }

  // Clear rate limit data (useful for testing)
  clearRateLimit(action) {
    const key = `${this.storagePrefix}${action}`;
    localStorage.removeItem(key);
  }

  // Clear all rate limit data
  clearAllRateLimits() {
    const keys = Object.keys(localStorage).filter(key => 
      key.startsWith(this.storagePrefix)
    );
    keys.forEach(key => localStorage.removeItem(key));
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter();

// Helper function to check and record rate limit
export const checkRateLimit = (action, config) => {
  const { requests, window: windowMs, message } = config;
  
  const limitCheck = rateLimiter.isRateLimited(action, requests, windowMs);
  
  if (limitCheck.isLimited) {
    const resetMessage = rateLimiter.getResetTimeMessage(limitCheck.resetTime);
    return {
      allowed: false,
      error: `${message} ${resetMessage}`,
      remainingRequests: 0
    };
  }
  
  const recordResult = rateLimiter.recordRequest(action, requests, windowMs);
  
  return {
    allowed: true,
    error: null,
    remainingRequests: recordResult.remainingRequests
  };
};