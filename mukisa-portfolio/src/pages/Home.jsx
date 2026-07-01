import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Github, Linkedin, Twitter } from 'lucide-react';
import SEO from '@/components/SEO';
import ProfileAvatar from '@/components/ui/profile-avatar';
import NewsletterSignup from '@/components/ui/newsletter-signup';

const Home = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Home"
        description="Welcome to Mukisa Samuel's portfolio. Software Engineer and Ethical Hacker passionate about building secure, scalable solutions and strengthening cybersecurity posture."
        url="https://mukisa.dev/"
      />
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Avatar/Photo */}
            <div className="mb-8 flex justify-center">
              <ProfileAvatar size="xl" showOnlineStatus={true} />
            </div>
            
            {/* Name and Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6 animate-fade-in">
              Mukisa Samuel
            </h1>
            
            {/* Tagline */}
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto animate-slide-up">
              Software Engineer • Ethical Hacker • Tech Enthusiast
            </p>
            
            {/* Bio */}
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up-delayed">
              Passionate about building secure, scalable software solutions and exploring the depths of cybersecurity. 
              I combine my expertise in software engineering with ethical hacking to create robust applications that 
              stand the test of modern security challenges.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
                <Link to="/projects">
                  View My Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3">
                <a href="/Mukisa_Samuel_CV.PDF" download="Mukisa_Samuel_CV.pdf">
                  Download CV
                  <Download className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-6 animate-slide-up-delayed">
              <a 
                href="https://github.com/MukisaSam" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
                aria-label="Visit Mukisa Samuel's GitHub profile"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/mukisa-samuel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
                aria-label="Connect with Mukisa Samuel on LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://x.com/samuelmuki" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
                aria-label="Follow Mukisa Samuel on X"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 transition-transform duration-300 group-hover:scale-110">50+</div>
              <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2 transition-transform duration-300 group-hover:scale-110">5+</div>
              <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 transition-transform duration-300 group-hover:scale-110">100+</div>
              <div className="text-gray-600 dark:text-gray-400">Security Audits</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup variant="compact" />
        </div>
      </section>
    </div>
  );
};

export default Home;

