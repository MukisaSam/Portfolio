import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  ArrowUp
} from 'lucide-react';
import Logo from '@/components/ui/logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/blog', label: 'Blog' },
    { path: '/projects', label: 'Projects' },
    { path: '/skills', label: 'Skills' },
    { path: '/contact', label: 'Contact' }
  ];

  const services = [
    'Web Development',
    'Cybersecurity Consulting',
    'Penetration Testing',
    'Code Review',
    'Security Auditing',
    'Technical Writing'
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github className="h-5 w-5" />,
      url: 'https://github.com/MukisaSam',
      color: 'hover:text-gray-900'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
      url: 'https://www.linkedin.com/in/mukisa-samuel',
      color: 'hover:text-blue-600'
    },
    {
      name: 'X',
      icon: <Twitter className="h-5 w-5" />,
      url: 'https://x.com/samuelmuki',
      color: 'hover:text-blue-400'
    }
  ];

  const contactInfo = [
    {
      icon: <Mail className="h-4 w-4" />,
      text: 'mukisasamuel2020@gmail.com',
      link: 'mailto:mukisasamuel2020@gmail.com'
    },
    {
      icon: <Phone className="h-4 w-4" />,
      text: '+256 757 429 284',
      link: 'tel:+256757429284'
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      text: 'Kampala, Uganda',
      link: null
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo size="medium" showText={true} variant="gradient" />
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Building secure, scalable software solutions and helping organizations 
              strengthen their cybersecurity posture through ethical hacking and security consulting.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Mukisa Samuel's ${social.name} profile`}
                  className={`p-2 bg-gray-800 rounded-lg transition-all duration-300 hover:bg-gray-700 ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-400 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Get In Touch</h4>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-gray-400">
                    {info.icon}
                  </div>
                  {info.link ? (
                    <a 
                      href={info.link}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {info.text}
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">{info.text}</span>
                  )}
                </div>
              ))}
            </div>
            
            {/* CTA Button */}
            <div className="mt-6">
              <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Link to="/contact">Start a Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>© {currentYear} Mukisa Samuel. Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>and lots of coffee.</span>
            </div>
            
            <div className="flex items-center gap-6">
              <Link
                to="/contact"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/contact"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <button
                onClick={scrollToTop}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 group"
              >
                <ArrowUp className="h-4 w-4 text-gray-400 group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

