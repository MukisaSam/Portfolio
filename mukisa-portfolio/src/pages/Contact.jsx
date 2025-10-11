import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  Twitter,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import SEO from '@/components/SEO';
import { contactFormSchema, RATE_LIMITS } from '@/lib/validations';
import { checkRateLimit } from '@/lib/rate-limiter';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setValidationErrors({});
    
    try {
      // Validate form data with Zod
      const validationResult = contactFormSchema.safeParse(formData);
      
      if (!validationResult.success) {
        // Extract validation errors
        const errors = {};
        validationResult.error.errors.forEach((error) => {
          errors[error.path[0]] = error.message;
        });
        setValidationErrors(errors);
        setIsSubmitting(false);
        return;
      }

      // Check rate limiting
      const rateLimitCheck = checkRateLimit('contact_form', RATE_LIMITS.CONTACT_FORM);
      
      if (!rateLimitCheck.allowed) {
        setSubmitError(rateLimitCheck.error);
        setIsSubmitting(false);
        return;
      }
      
      // EmailJS configuration - You'll need to set up your EmailJS account
      // For now, we'll show a demo message. To make it fully functional:
      // 1. Create account at https://www.emailjs.com/
      // 2. Create an email template
      // 3. Replace these values with your actual service ID, template ID, and public key
      
      const templateParams = {
        from_name: validationResult.data.name,
        from_email: validationResult.data.email,
        subject: validationResult.data.subject,
        message: validationResult.data.message,
        to_name: 'Mukisa Samuel',
      };

      // Uncomment and configure when you have EmailJS set up:
      // await emailjs.send(
      //   'YOUR_SERVICE_ID',
      //   'YOUR_TEMPLATE_ID', 
      //   templateParams,
      //   'YOUR_PUBLIC_KEY'
      // );
      
      // For now, simulate successful submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 5000);
      
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitError('Failed to send message. Please try again or contact me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "mukisa.samuel@email.com",
      link: "mailto:mukisa.samuel@email.com"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      value: "+256 700 123 456",
      link: "tel:+256700123456"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      value: "Kampala, Uganda",
      link: null
    }
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="h-6 w-6" />,
      url: "https://github.com/mukisa",
      color: "hover:text-gray-900"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-6 w-6" />,
      url: "https://linkedin.com/in/mukisa-samuel",
      color: "hover:text-blue-600"
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-6 w-6" />,
      url: "https://twitter.com/mukisa_samuel",
      color: "hover:text-blue-400"
    }
  ];

  const quickTopics = [
    "Web Development Project",
    "Security Consultation",
    "Code Review",
    "Speaking Opportunity",
    "Collaboration",
    "Other"
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Contact"
        description="Get in touch with Mukisa Samuel for software engineering projects, cybersecurity consulting, or collaboration opportunities. Available for freelance and full-time opportunities."
        keywords="contact, hire software engineer, cybersecurity consultant, freelance developer, collaboration, Uganda developer"
        url="https://mukisa.dev/contact"
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a project in mind or want to discuss cybersecurity? I'd love to hear from you. 
            Let's create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">
                      Thank you for reaching out. I'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className={`w-full ${validationErrors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                        />
                        {validationErrors.name && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {validationErrors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          className={`w-full ${validationErrors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                        />
                        {validationErrors.email && (
                          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {validationErrors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        className={`w-full ${validationErrors.subject ? 'border-red-500 focus:border-red-500' : ''}`}
                      />
                      {validationErrors.subject && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {validationErrors.subject}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message * ({formData.message.length}/1000 characters)
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project or inquiry..."
                        rows={6}
                        className={`w-full ${validationErrors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                        maxLength={1000}
                      />
                      {validationErrors.message && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {validationErrors.message}
                        </p>
                      )}
                    </div>
                    
                    {/* Quick Topic Buttons */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Quick Topics (optional)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {quickTopics.map((topic) => (
                          <button
                            key={topic}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, subject: topic }))}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors"
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                    
                    {/* Error Message */}
                    {submitError && (
                      <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        <AlertCircle className="h-5 w-5" />
                        <p className="text-sm">{submitError}</p>
                      </div>
                    )}
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg">
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{info.title}</p>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-600">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md ${social.color}`}
                    >
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {social.icon}
                      </div>
                      <div>
                        <p className="font-medium">{social.name}</p>
                        <p className="text-sm text-gray-600">Follow me on {social.name}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Response Time</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  I typically respond to messages within 24 hours. For urgent matters, 
                  feel free to reach out via phone or LinkedIn.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-3">What services do you offer?</h3>
                <p className="text-gray-600 text-sm">
                  I specialize in web development, cybersecurity consulting, penetration testing, 
                  and secure application development. I also offer code reviews and security audits.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-3">What's your typical project timeline?</h3>
                <p className="text-gray-600 text-sm">
                  Project timelines vary based on scope and complexity. Small projects typically 
                  take 2-4 weeks, while larger applications can take 2-6 months.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-3">Do you work with remote teams?</h3>
                <p className="text-gray-600 text-sm">
                  Absolutely! I have extensive experience working with distributed teams and 
                  use modern collaboration tools to ensure smooth communication.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-3">Can you help with existing projects?</h3>
                <p className="text-gray-600 text-sm">
                  Yes, I can help with code reviews, security assessments, performance optimization, 
                  and adding new features to existing applications.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;

