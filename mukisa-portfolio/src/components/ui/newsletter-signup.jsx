import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { newsletterSchema, RATE_LIMITS } from '@/lib/validations';
import { checkRateLimit } from '@/lib/rate-limiter';

const NewsletterSignup = ({ variant = 'default', className = '' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Validate email with Zod
      const validationResult = newsletterSchema.safeParse({ email });
      
      if (!validationResult.success) {
        setStatus('error');
        setMessage(validationResult.error.errors[0].message);
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
        return;
      }

      // Check rate limiting
      const rateLimitCheck = checkRateLimit('newsletter_signup', RATE_LIMITS.NEWSLETTER_SIGNUP);
      
      if (!rateLimitCheck.allowed) {
        setStatus('error');
        setMessage(rateLimitCheck.error);
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
        return;
      }
    
      // Simulate API call (replace with actual newsletter service)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success (you would integrate with services like ConvertKit, Mailchimp, etc.)
      setStatus('success');
      setMessage('Thanks for subscribing! Check your email for confirmation.');
      setEmail('');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
      
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`max-w-md mx-auto ${className}`}>
        <div className="text-center mb-4">
          <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Stay Updated
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get the latest posts and security insights
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            className="w-full"
          />
          <Button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {status === 'loading' ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Subscribing...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </>
            )}
          </Button>
        </form>
        
        {message && (
          <div className={`flex items-center gap-2 text-sm mt-3 ${
            status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {status === 'success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            {message}
          </div>
        )}
      </div>
    );
  }

  return (
    <Card className={`hover-lift dark-transition ${className}`}>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
            <Mail className="h-6 w-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Subscribe to My Newsletter
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Get the latest insights on software engineering, cybersecurity, and ethical hacking 
          delivered straight to your inbox. No spam, just valuable content.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={status === 'loading'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {status === 'loading' ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
        
        {message && (
          <div className={`flex items-center gap-2 text-sm mt-4 p-3 rounded-lg ${
            status === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
              : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
          }`}>
            {status === 'success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            {message}
          </div>
        )}
        
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
          <p>✨ Join 500+ developers already subscribed</p>
          <p>📧 Weekly updates • 🔒 No spam • 👋 Unsubscribe anytime</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsletterSignup;