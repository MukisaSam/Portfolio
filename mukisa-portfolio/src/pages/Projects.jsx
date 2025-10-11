import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Calendar, Users, Star, Eye } from 'lucide-react';
import SEO from '@/components/SEO';
import { getInitialViews } from '@/hooks/use-view-counter';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTech, setSelectedTech] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: "SecureAuth API",
      description: "A comprehensive authentication and authorization API built with Node.js and JWT. Features include multi-factor authentication, role-based access control, and advanced security measures.",
      longDescription: "Built from the ground up to address common authentication vulnerabilities, this API provides enterprise-grade security while maintaining ease of integration. The project was born from analyzing 50+ authentication implementations and identifying common security gaps.",
      status: "completed",
      category: "backend",
      techStack: ["Node.js", "Express", "MongoDB", "JWT", "Redis", "Docker"],
      githubUrl: "https://github.com/mukisa-samuel/secureauth-api",
      liveUrl: "https://secureauth-api-demo.vercel.app",
      image: "/api/placeholder/400/250",
      featured: true,
      startDate: "2023-08-01",
      endDate: "2023-11-15",
      teamSize: 1,
      highlights: ["99.9% uptime", "500+ active users", "Zero security incidents", "OWASP Top 10 compliant"],
      challenges: ["Implementing secure session management", "Building scalable rate limiting", "Creating intuitive developer documentation"],
      solutions: ["Redis-based session store with encryption", "Distributed rate limiting with sliding windows", "Interactive API playground with code examples"],
      impact: "Reduced authentication-related vulnerabilities by 85% for implementing teams"
    },
    {
      id: 2,
      title: "VulnScanner Pro",
      description: "An automated vulnerability scanning tool that helps organizations identify and remediate security weaknesses in their web applications and infrastructure.",
      longDescription: "This project emerged from the need for intelligent, context-aware vulnerability scanning. Traditional scanners produce too much noise; VulnScanner Pro uses machine learning to prioritize findings based on exploitability and business impact.",
      status: "ongoing",
      category: "security",
      techStack: ["Python", "Django", "PostgreSQL", "Docker", "Kubernetes", "TensorFlow"],
      githubUrl: "https://github.com/mukisa-samuel/vulnscanner-pro",
      liveUrl: null,
      image: "/api/placeholder/400/250",
      featured: true,
      startDate: "2024-01-01",
      endDate: null,
      teamSize: 2,
      highlights: ["AI-powered detection", "Custom rule engine", "Enterprise ready", "95% accuracy rate"],
      challenges: ["Reducing false positives", "Scaling across large infrastructures", "Real-time threat intelligence integration"],
      solutions: ["ML-based vulnerability classification", "Distributed scanning architecture", "API integration with multiple threat feeds"],
      impact: "Currently being piloted by 3 Fortune 500 companies"
    },
    {
      id: 3,
      title: "Portfolio Dashboard",
      description: "A modern, responsive dashboard for tracking personal projects, skills, and professional growth. Built with React and featuring real-time analytics.",
      status: "completed",
      category: "frontend",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Chart.js", "Firebase"],
      githubUrl: "https://github.com/mukisa-samuel/portfolio-dashboard",
      liveUrl: "https://portfolio-dashboard-demo.vercel.app",
      image: "/api/placeholder/400/250",
      featured: false,
      startDate: "2023-06-01",
      endDate: "2023-07-30",
      teamSize: 1,
      highlights: ["Mobile-first design", "Real-time updates", "Dark mode support"]
    },
    {
      id: 4,
      title: "CyberEd Platform",
      description: "An educational platform for cybersecurity training with interactive labs, progress tracking, and certification programs.",
      longDescription: "Born from the lack of practical, hands-on cybersecurity education in Uganda, CyberEd Platform provides interactive learning experiences with real-world scenarios. Students can practice ethical hacking in safe, contained environments.",
      status: "ongoing",
      category: "fullstack",
      techStack: ["React", "Node.js", "PostgreSQL", "Docker", "AWS", "Kubernetes"],
      githubUrl: "https://github.com/mukisa-samuel/cybered-platform",
      liveUrl: "https://cybered-platform-demo.vercel.app",
      image: "/api/placeholder/400/250",
      featured: true,
      startDate: "2023-12-01",
      endDate: null,
      teamSize: 3,
      highlights: ["Interactive labs", "Progress tracking", "Certification system", "500+ students enrolled"],
      challenges: ["Creating isolated lab environments", "Scaling containerized workloads", "Gamifying complex security concepts"],
      solutions: ["Docker-based lab isolation", "Kubernetes orchestration", "Progressive skill-building curriculum"],
      impact: "Training the next generation of African cybersecurity professionals"
    },
    {
      id: 5,
      title: "API Security Toolkit",
      description: "A collection of tools and utilities for testing and securing REST APIs, including automated testing, rate limiting, and security headers validation.",
      status: "completed",
      category: "security",
      techStack: ["Python", "FastAPI", "SQLite", "Pytest", "Docker"],
      githubUrl: "https://github.com/mukisa-samuel/api-security-toolkit",
      liveUrl: null,
      image: "/api/placeholder/400/250",
      featured: false,
      startDate: "2023-04-01",
      endDate: "2023-05-30",
      teamSize: 1,
      highlights: ["Automated testing", "Security validation", "Easy integration"]
    },
    {
      id: 6,
      title: "Smart Home Security System",
      description: "IoT-based home security system with real-time monitoring, mobile alerts, and machine learning-powered threat detection.",
      status: "ongoing",
      category: "iot",
      techStack: ["Python", "Raspberry Pi", "TensorFlow", "MQTT", "React Native"],
      githubUrl: "https://github.com/mukisa-samuel/smart-home-security",
      liveUrl: null,
      image: "/api/placeholder/400/250",
      featured: false,
      startDate: "2024-02-01",
      endDate: null,
      teamSize: 1,
      highlights: ["ML-powered detection", "Real-time alerts", "Mobile app"]
    }
  ];
  
  // Extract all unique technologies from projects
  const allTechnologies = [...new Set(projects.flatMap(project => project.techStack))].sort();
  
  const tabs = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'ongoing', label: 'Ongoing', count: projects.filter(p => p.status === 'ongoing').length },
    { id: 'completed', label: 'Completed', count: projects.filter(p => p.status === 'completed').length },
    { id: 'featured', label: 'Featured', count: projects.filter(p => p.featured).length }
  ];

  const techFilters = [
    { id: 'all', label: 'All Technologies', count: projects.length },
    ...allTechnologies.map(tech => ({
      id: tech,
      label: tech,
      count: projects.filter(p => p.techStack.includes(tech)).length
    }))
  ];
  
  const filteredProjects = projects.filter(project => {
    // Filter by status/type
    let matchesTab = true;
    if (activeTab === 'featured') matchesTab = project.featured;
    else if (activeTab !== 'all') matchesTab = project.status === activeTab;
    
    // Filter by technology
    let matchesTech = true;
    if (selectedTech !== 'all') matchesTech = project.techStack.includes(selectedTech);
    
    return matchesTab && matchesTech;
  });
  
  const getStatusColor = (status) => {
    return status === 'ongoing' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
  };
  
  const getCategoryColor = (category) => {
    const colors = {
      frontend: 'bg-purple-100 text-purple-800',
      backend: 'bg-blue-100 text-blue-800',
      fullstack: 'bg-indigo-100 text-indigo-800',
      security: 'bg-red-100 text-red-800',
      iot: 'bg-green-100 text-green-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };
  
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <SEO 
        title="Projects"
        description="Explore Mukisa Samuel's portfolio of software engineering and cybersecurity projects including SecureAuth API, VulnScanner Pro, and CyberEd Platform."
        keywords="projects, portfolio, software engineering, cybersecurity projects, web development, security tools"
        url="https://mukisa.dev/projects"
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Projects & Work
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of my software engineering and cybersecurity projects, from concept to deployment.
          </p>
        </div>
        
        {/* Project Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab.label} ({tab.count})
            </Button>
          ))}
        </div>

        {/* Technology Filter */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Filter by Technology</h3>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {techFilters.map((tech) => (
              <Badge
                key={tech.id}
                variant={selectedTech === tech.id ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedTech === tech.id
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                }`}
                onClick={() => setSelectedTech(tech.id)}
              >
                {tech.label} ({tech.count})
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Project Image */}
              <div 
                className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden"
                role="img"
                aria-label={`Preview image for ${project.title} project`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">{project.title}</span>
                </div>
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                {/* Status and Category Badges */}
                <div className="flex gap-2 mb-4">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status === 'ongoing' ? 'In Progress' : 'Completed'}
                  </Badge>
                  <Badge className={getCategoryColor(project.category)}>
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </Badge>
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Project Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(project.startDate).toLocaleDateString()}
                    {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString()}`}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {project.teamSize} {project.teamSize === 1 ? 'person' : 'people'}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {getInitialViews(project.id, 'project').toLocaleString()} views
                  </div>
                </div>
                
                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Highlights:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                  {project.liveUrl && (
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Interested in collaborating?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

