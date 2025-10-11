import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Code, 
  Shield, 
  Database, 
  Cloud, 
  Smartphone, 
  Globe, 
  Award,
  BookOpen,
  Users,
  Zap
} from 'lucide-react';
import SEO from '@/components/SEO';

const Portfolio = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="h-6 w-6" />,
      skills: [
        { name: "JavaScript/TypeScript", level: 95, years: 5 },
        { name: "Python", level: 90, years: 4 },
        { name: "Java", level: 85, years: 3 },
        { name: "C/C++", level: 80, years: 3 },
        { name: "Go", level: 75, years: 2 },
        { name: "Rust", level: 70, years: 1 }
      ]
    },
    {
      title: "Web Technologies",
      icon: <Globe className="h-6 w-6" />,
      skills: [
        { name: "React/Next.js", level: 95, years: 4 },
        { name: "Node.js/Express", level: 90, years: 4 },
        { name: "HTML/CSS", level: 95, years: 6 },
        { name: "Vue.js", level: 80, years: 2 },
        { name: "Angular", level: 75, years: 2 },
        { name: "GraphQL", level: 85, years: 3 }
      ]
    },
    {
      title: "Cybersecurity",
      icon: <Shield className="h-6 w-6" />,
      skills: [
        { name: "Penetration Testing", level: 90, years: 4 },
        { name: "Vulnerability Assessment", level: 95, years: 5 },
        { name: "Network Security", level: 85, years: 3 },
        { name: "Web Application Security", level: 90, years: 4 },
        { name: "Incident Response", level: 80, years: 3 },
        { name: "Security Auditing", level: 85, years: 3 }
      ]
    },
    {
      title: "Database & Cloud",
      icon: <Database className="h-6 w-6" />,
      skills: [
        { name: "PostgreSQL", level: 90, years: 4 },
        { name: "MongoDB", level: 85, years: 3 },
        { name: "Redis", level: 80, years: 3 },
        { name: "AWS", level: 85, years: 3 },
        { name: "Docker/Kubernetes", level: 80, years: 2 },
        { name: "Firebase", level: 75, years: 2 }
      ]
    }
  ];

  const certifications = [
    {
      name: "Certified Ethical Hacker (CEH)",
      issuer: "EC-Council",
      date: "2023",
      credentialId: "ECC-1234567890"
    },
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "AWS-SA-123456"
    },
    {
      name: "CISSP - Certified Information Systems Security Professional",
      issuer: "(ISC)²",
      date: "2022",
      credentialId: "CISSP-789012"
    },
    {
      name: "CompTIA Security+",
      issuer: "CompTIA",
      date: "2022",
      credentialId: "COMP-SEC-345678"
    }
  ];

  const achievements = [
    {
      title: "Bug Bounty Hunter",
      description: "Discovered and reported 50+ security vulnerabilities across various platforms",
      icon: <Shield className="h-8 w-8" />,
      metric: "50+ Bugs Found"
    },
    {
      title: "Open Source Contributor",
      description: "Active contributor to security tools and web development frameworks",
      icon: <Code className="h-8 w-8" />,
      metric: "100+ Contributions"
    },
    {
      title: "Tech Speaker",
      description: "Presented at cybersecurity conferences and developer meetups",
      icon: <Users className="h-8 w-8" />,
      metric: "15+ Talks"
    },
    {
      title: "Mentor & Educator",
      description: "Mentored junior developers and security professionals",
      icon: <BookOpen className="h-8 w-8" />,
      metric: "25+ Mentees"
    }
  ];

  const tools = [
    "Burp Suite", "Metasploit", "Nmap", "Wireshark", "OWASP ZAP",
    "Git", "VS Code", "IntelliJ IDEA", "Postman", "Figma",
    "Jenkins", "GitHub Actions", "Terraform", "Ansible", "Nginx"
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Skills & Portfolio"
        description="Explore Mukisa Samuel's technical skills, certifications, and achievements in software engineering and cybersecurity. Certified Ethical Hacker (CEH), AWS Solutions Architect, and more."
        keywords="skills, portfolio, certifications, CEH, AWS, cybersecurity certifications, programming languages, technical expertise"
        url="https://mukisa.dev/skills"
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Skills & Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise, certifications, and professional achievements.
          </p>
        </div>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technical Skills</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg">
                      {category.icon}
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{skill.years}y</span>
                            <span className="text-sm font-semibold text-gray-700">{skill.level}%</span>
                          </div>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full">
                      {achievement.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                  <div className="text-2xl font-bold text-blue-600">{achievement.metric}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg">
                      <Award className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{cert.name}</h3>
                      <p className="text-gray-600 mb-2">{cert.issuer}</p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-xs">
                          Issued {cert.date}
                        </Badge>
                        <span className="text-xs text-gray-500">ID: {cert.credentialId}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tools & Technologies */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tools & Technologies</h2>
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-wrap gap-3 justify-center">
                {tools.map((tool, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="px-4 py-2 text-sm hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-default"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <div className="mb-6">
              <Zap className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to bring your ideas to life?
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                With my diverse skill set in software engineering and cybersecurity, 
                I can help you build secure, scalable, and innovative solutions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold">
                Start a Project
              </button>
              <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                Download Resume
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;

