import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Award,
  Heart,
  Code,
  Shield,
  Coffee,
  Music,
  Camera,
  Gamepad2
} from 'lucide-react';
import SEO from '@/components/SEO';
import ProfileAvatar from '@/components/ui/profile-avatar';

const About = () => {
  const timeline = [
    {
      year: '2024',
      title: 'Senior Security Consultant',
      company: 'CyberSec Solutions',
      description: 'Leading security assessments for enterprise clients, discovered 200+ vulnerabilities, and built custom security tools.',
      type: 'work'
    },
    {
      year: '2023',
      title: 'Certified Ethical Hacker (CEH)',
      company: 'EC-Council',
      description: 'Achieved CEH certification, expanding expertise in penetration testing and vulnerability assessment.',
      type: 'education'
    },
    {
      year: '2022',
      title: 'Full Stack Developer',
      company: 'TechCorp Ltd',
      description: 'Built 15+ web applications with security-first approach, reduced vulnerabilities by 80%.',
      type: 'work'
    },
    {
      year: '2019',
      title: 'Computer Science Degree',
      company: 'Makerere University',
      description: 'Graduated with First Class Honours, thesis on "Machine Learning Approaches to Intrusion Detection".',
      type: 'education'
    },
    {
      year: '2018',
      title: 'First Bug Bounty',
      company: 'Personal Milestone',
      description: 'Discovered my first security vulnerability and received recognition from a major tech company.',
      type: 'milestone'
    }
  ];

  const personalInterests = [
    { icon: <Coffee className="h-5 w-5" />, title: 'Coffee Enthusiast', description: 'Always brewing the perfect cup while coding' },
    { icon: <Music className="h-5 w-5" />, title: 'Music Lover', description: 'Jazz and classical music fuel my creativity' },
    { icon: <Camera className="h-5 w-5" />, title: 'Photography', description: 'Capturing moments and beautiful landscapes' },
    { icon: <Gamepad2 className="h-5 w-5" />, title: 'Gaming', description: 'Strategy games and puzzle solving' }
  ];

  const values = [
    {
      title: 'Security First',
      description: 'Every line of code I write is crafted with security in mind, ensuring robust and safe applications.',
      icon: <Shield className="h-6 w-6 text-blue-600" />
    },
    {
      title: 'Continuous Learning',
      description: 'The tech world evolves rapidly, and I stay ahead by constantly learning new technologies and methodologies.',
      icon: <GraduationCap className="h-6 w-6 text-purple-600" />
    },
    {
      title: 'Ethical Responsibility',
      description: 'Using my skills to protect and improve digital security for everyone, never for malicious purposes.',
      icon: <Heart className="h-6 w-6 text-red-600" />
    },
    {
      title: 'Quality Code',
      description: 'Writing clean, maintainable, and efficient code that stands the test of time and scale.',
      icon: <Code className="h-6 w-6 text-green-600" />
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <SEO 
        title="About Me"
        description="Learn more about Mukisa Samuel's journey in software engineering and cybersecurity. From Uganda to global impact, discover the story behind the code."
        keywords="about, biography, software engineer journey, ethical hacker story, Uganda developer, personal story"
        url="https://mukisa.dev/about"
      />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-8 flex justify-center">
            <ProfileAvatar size="xl" showOnlineStatus={false} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            The story behind the code: From curious student to cybersecurity professional
          </p>
        </div>

        {/* Personal Story */}
        <section className="mb-16">
          <Card className="hover-lift dark-transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                My Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                My journey into the world of technology began in the bustling streets of Kampala, Uganda, where 
                curiosity about how things work led me to my first computer at age 12. That moment of wonder when 
                I first wrote "Hello, World!" in BASIC sparked a passion that would define my entire career.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                During my university years at Makerere University, I discovered the fascinating intersection of 
                software development and cybersecurity. While my classmates focused on building applications, 
                I was equally interested in breaking them—ethically, of course. This dual perspective of creation 
                and protection became my unique strength.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                The turning point came during my final year when I discovered my first security vulnerability in 
                a popular web application. The rush of finding that critical flaw, responsibly disclosing it, and 
                seeing it fixed made me realize that cybersecurity wasn't just a career choice—it was my calling.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Today, with over 5 years of experience, I've had the privilege of securing applications used by 
                thousands of people, mentoring junior developers, and contributing to the global effort of making 
                the internet a safer place. Every line of code I write and every vulnerability I discover is 
                driven by the same curiosity that got me started—and the responsibility to protect others.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Career Timeline</h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start gap-4 group">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    item.type === 'work' ? 'bg-blue-100 dark:bg-blue-900' :
                    item.type === 'education' ? 'bg-purple-100 dark:bg-purple-900' :
                    'bg-green-100 dark:bg-green-900'
                  }`}>
                    {item.type === 'work' ? <Badge className="h-6 w-6" /> :
                     item.type === 'education' ? <GraduationCap className="h-6 w-6" /> :
                     <Award className="h-6 w-6" />}
                  </div>
                </div>
                <Card className="flex-1 hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{item.year}</Badge>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
                    </div>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{item.company}</p>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover-lift dark-transition">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{value.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{value.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Personal Interests */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Beyond Code</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalInterests.map((interest, index) => (
              <Card key={index} className="text-center hover-lift dark-transition group">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full group-hover:scale-110 transition-transform duration-300">
                      {interest.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{interest.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{interest.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Location & Fun Facts */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover-lift dark-transition">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Based in Uganda
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Currently based in Kampala, Uganda - the heart of East Africa's growing tech scene. 
                  I'm proud to be part of the vibrant African tech community while working with clients globally.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Available for remote work worldwide</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift dark-transition">
              <CardHeader>
                <CardTitle>Fun Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• I've consumed over 10,000 cups of coffee while coding ☕</li>
                  <li>• I can solve a Rubik's cube in under 2 minutes 🧩</li>
                  <li>• I speak 3 languages: English, Luganda, and JavaScript 😄</li>
                  <li>• My favorite debugging method? Rubber duck debugging 🦆</li>
                  <li>• I've mentored 20+ junior developers 👨‍🏫</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;