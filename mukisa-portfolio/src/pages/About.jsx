import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Heart,
  Code,
  Shield,
  Briefcase,
  Mail,
  Phone,
  Github,
  Linkedin,
  Twitter,
  CheckCircle2,
  BookOpen,
  Database,
  Globe,
  Smartphone
} from 'lucide-react';
import SEO from '@/components/SEO';
import ProfileAvatar from '@/components/ui/profile-avatar';

const About = () => {
  const timeline = [
    {
      year: '2025 - Present',
      title: 'Chief Systems Officer',
      company: 'Zentara Holdings Company Limited',
      description: 'Develop and maintain company software systems, provide technical support and staff training, troubleshoot hardware and software issues, implement security protocols, and document systems and reports.',
      type: 'work'
    },
    {
      year: '2022 - Present',
      title: 'Data Analyst',
      company: 'Freelancer',
      description: 'Analyze datasets using statistical methods, Python, MySQL, Excel, and Kobo Toolbox to clean, process, visualize, and report findings for clients.',
      type: 'work'
    },
    {
      year: '2023 - 2025',
      title: 'Teacher',
      company: 'St Mary’s SS, Kiboga',
      description: 'Taught Advanced Mathematics, prepared lesson plans, assessed student progress, provided one-on-one support, and adapted teaching methods for different learning styles.',
      type: 'work'
    },
    {
      year: '2024 - Present',
      title: 'BSc in Software Engineering',
      company: 'Makerere University',
      description: 'Current undergraduate study focused on software engineering, systems development, and practical computing projects.',
      type: 'education'
    },
    {
      year: '2022 - 2023',
      title: 'Advanced Level',
      company: 'Mengo Senior School',
      description: 'Completed UACE with 20 points in PCM.',
      type: 'education'
    },
    {
      year: '2017 - 2020',
      title: 'Ordinary Level',
      company: 'Rines Secondary School',
      description: 'Completed UCE and built a foundation in mathematics and science.',
      type: 'education'
    }
  ];

  const skillHighlights = [
    {
      icon: <Code className="h-6 w-6 text-blue-600" />,
      title: 'Programming',
      items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'PHP', 'SQL', 'Kotlin', 'C/C++']
    },
    {
      icon: <Globe className="h-6 w-6 text-purple-600" />,
      title: 'Web & Backend',
      items: ['HTML/CSS', 'Tailwind CSS', 'React', 'Next.js', 'Node.js / Express', 'Laravel Blade', 'FastAPI', 'REST APIs']
    },
    {
      icon: <Smartphone className="h-6 w-6 text-green-600" />,
      title: 'Mobile & Cloud',
      items: ['Android Studio', 'Jetpack Compose', 'React Native', 'Flutter', 'Docker', 'Render', 'Vercel', 'AWS / Azure concepts']
    },
    {
      icon: <Database className="h-6 w-6 text-red-600" />,
      title: 'Data & AI',
      items: ['pandas', 'openpyxl', 'Excel', 'Kobo Toolbox', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'FastAPI ML deployment']
    }
  ];

  const values = [
    {
      title: 'Practical Systems',
      description: 'I focus on software that solves actual business, education, tourism, and real-estate problems.',
      icon: <Shield className="h-6 w-6 text-blue-600" />
    },
    {
      title: 'Continuous Learning',
      description: 'My work spans software engineering, data analysis, AI experiments, and cybersecurity learning.',
      icon: <GraduationCap className="h-6 w-6 text-purple-600" />
    },
    {
      title: 'Security Awareness',
      description: 'I build with authentication, access control, validation, and secure design in mind.',
      icon: <Heart className="h-6 w-6 text-red-600" />
    },
    {
      title: 'Clear Communication',
      description: 'Teaching and consulting experience helps me explain technical work clearly to non-technical users.',
      icon: <BookOpen className="h-6 w-6 text-green-600" />
    }
  ];

  const profileLinks = [
    { icon: <Mail className="h-4 w-4" />, label: 'mukisasamuel2020@gmail.com', href: 'mailto:mukisasamuel2020@gmail.com' },
    { icon: <Phone className="h-4 w-4" />, label: '+256 757 429 284', href: 'tel:+256757429284' },
    { icon: <Github className="h-4 w-4" />, label: 'MukisaSam', href: 'https://github.com/MukisaSam' },
    { icon: <Linkedin className="h-4 w-4" />, label: 'mukisa-samuel', href: 'https://www.linkedin.com/in/mukisa-samuel' },
    { icon: <Twitter className="h-4 w-4" />, label: 'samuelmuki', href: 'https://x.com/samuelmuki' }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <SEO 
        title="About Me"
        description="Learn more about Mukisa Samuel's background in software engineering, systems development, data analysis, teaching, and cybersecurity."
        keywords="about, biography, software engineering, systems development, data analyst, teacher, cybersecurity, Uganda developer"
        url="https://mukisa.dev/about"
      />
      
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-8 flex justify-center">
            <ProfileAvatar size="xl" showOnlineStatus={false} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Software engineering student, systems builder, data analyst, and teacher based in Wakiso, Uganda.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {profileLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
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
                I am Mukisa Samuel, a software engineering student at Makerere University and a practical builder of business software, data tools, and digital systems.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                My experience spans systems development, web development, ethical hacking, penetration testing, and data analysis. I have worked on real estate systems, tenant management, tourism ideas, school systems, service marketplaces, and survey automation projects.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Professionally, I currently serve as Chief Systems Officer at Zentara Holdings Company Limited, where I help maintain software systems, troubleshoot issues, implement security protocols, and support staff. I also work as a freelance data analyst using Python, MySQL, Excel, and Kobo Toolbox, and I previously taught Advanced Mathematics at St Mary’s SS, Kiboga.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                I enjoy building useful systems for Uganda and African SMEs, especially in real estate, tourism, education, and automation. My technical focus includes Python, JavaScript, PHP/Laravel, React, FastAPI, PostgreSQL, Excel automation, AI/ML experimentation, and cybersecurity concepts.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Skills Snapshot */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Skills Snapshot</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {skillHighlights.map((group) => (
              <Card key={group.title} className="hover-lift dark-transition">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    {group.icon}
                    {group.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge key={item} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Experience & Education</h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start gap-4 group">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    item.type === 'work' ? 'bg-blue-100 dark:bg-blue-900' :
                    item.type === 'education' ? 'bg-purple-100 dark:bg-purple-900' :
                    'bg-green-100 dark:bg-green-900'
                  }`}>
                    {item.type === 'work' ? <Briefcase className="h-6 w-6" /> :
                     item.type === 'education' ? <GraduationCap className="h-6 w-6" /> :
                     <CheckCircle2 className="h-6 w-6" />}
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

        {/* Location & Fun Facts */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover-lift dark-transition">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Based in Wakiso, Uganda
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Currently based in Wakiso, Uganda. I build and support software systems for business, education, and data work while staying open to remote collaboration.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Available for remote and on-site work</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift dark-transition">
              <CardHeader>
                <CardTitle>What I Focus On</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Building practical systems that solve real business problems</li>
                  <li>• Cleaning and analyzing data for reports and decision-making</li>
                  <li>• Designing secure applications with role-based access and validation</li>
                  <li>• Exploring AI, machine learning, and embedded/IoT concepts</li>
                  <li>• Turning ideas into structured SRS documents, workflows, and implementations</li>
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