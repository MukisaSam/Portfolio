import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" }),
  
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email must be less than 100 characters" }),
  
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters long" })
    .max(100, { message: "Subject must be less than 100 characters" }),
  
  message: z
    .string()
    .min(20, { message: "Message must be at least 20 characters long" })
    .max(1000, { message: "Message must be less than 1000 characters" })
});

// Newsletter signup validation schema
export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email must be less than 100 characters" })
});

// Blog search validation schema
export const searchSchema = z.object({
  query: z
    .string()
    .max(100, { message: "Search query must be less than 100 characters" })
    .optional()
});

// Rate limiting configuration
export const RATE_LIMITS = {
  CONTACT_FORM: {
    requests: 3, // Maximum requests
    window: 60 * 60 * 1000, // 1 hour in milliseconds
    message: "Too many contact form submissions. Please try again in an hour."
  },
  NEWSLETTER_SIGNUP: {
    requests: 5, // Maximum requests
    window: 60 * 60 * 1000, // 1 hour in milliseconds
    message: "Too many newsletter signup attempts. Please try again in an hour."
  }
};

// Type inference helpers for JavaScript (commented for reference)
// ContactFormData = z.infer<typeof contactFormSchema>
// NewsletterFormData = z.infer<typeof newsletterSchema>
// SearchFormData = z.infer<typeof searchSchema>