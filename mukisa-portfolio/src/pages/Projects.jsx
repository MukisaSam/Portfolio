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
      title: "Textile Supply Chain Management System",
      description: "A university software engineering project that evolved into a supply-chain platform connecting suppliers, manufacturers, wholesalers, retailers, and customers.",
      longDescription: "The system grew from a basic CRUD idea into an intelligent textile supply-chain platform with verification, dashboards, analytics, and forecasting support.",
      status: "ongoing",
      category: "business",
      techStack: ["Java", "FastAPI", "Laravel", "XAMPP", "PostgreSQL", "Machine Learning"],
      githubUrl: "https://github.com/MukisaSam",
      liveUrl: null,
      image: "/api/placeholder/400/250",
      featured: true,
      startDate: "2023-01-01",
      endDate: null,
      teamSize: 1,
      highlights: ["Supplier verification", "Negotiation workflows", "Price trends", "Demand forecasting"],
      challenges: ["Handling multi-actor workflows", "Tracking quality grades", "Designing analytics-ready data"],
      solutions: ["Role-based dashboards", "Grading and visit forms", "ML-assisted forecasting"],
      impact: "A more intelligent academic supply-chain platform with business and analytics depth"
    },
    {
      id: 2,
      title: "Tenant Management System / Property Management System",
      description: "A real-estate SaaS for Zentara Holdings to manage tenants, properties, rent payments, arrears, reminders, and multi-site operations.",
      longDescription: "The system was planned as a business-grade internal platform with role-based access, arrears tracking, reminders, exports, and deployment questions around Laravel and PostgreSQL.",
      status: "ongoing",
      category: "realestate",
      techStack: ["Laravel", "Blade", "Tailwind CSS", "PostgreSQL", "Render", "pgAdmin"],
      githubUrl: "https://github.com/MukisaSam",
      liveUrl: null,
      image: "/api/placeholder/400/250",
      featured: true,
      startDate: "2024-01-01",
      endDate: null,
      teamSize: 1,
      highlights: ["Arrears tracking", "Tenant reminders", "Role-based access", "CSV exports"],
      challenges: ["Handling due dates and grace periods", "Supporting multiple manager roles", "Making arrears categories visible"],
      solutions: ["Structured rent workflows", "Role-specific dashboards", "Clear reporting layers"],
      impact: "One of the most practical internal business systems in the portfolio"
    },
    {
      id: 3,
      title: "Rental Listing App / Jiji-like Housing Platform",
      description: "A managed rental marketplace where landlords list properties after field verification, media capture, and payment-gated contact access.",
      status: "ongoing",
      category: "realestate",
      techStack: ["React Native", "FastAPI", "PostgreSQL", "JWT", "DigitalOcean Spaces", "Firebase"],
      githubUrl: "https://github.com/MukisaSam",
      liveUrl: null,
      image: "/api/placeholder/400/250",
      featured: true,
      startDate: "2024-03-01",
      endDate: null,
      teamSize: 1,
      highlights: ["Verified listings", "GPS capture", "Payment-gated contacts", "Viewing workflow"],
      challenges: ["Creating a trusted verification flow", "Managing photos and videos", "Designing mobile-first listing discovery"],
      solutions: ["Field-team workflow", "Storage-backed media handling", "Buyer/landlord workflow separation"],
      impact: "A commercially strong housing platform for Uganda's rental market"
    },
    {
      id: 4,
      title: "Uganda Destinations API / Tourism Knowledge API",
      description: "A public knowledge API for destinations, tribes, kingdoms, myths, clans, and structured cultural heritage data.",
      status: "ongoing",
      category: "tourism",
      techStack: ["PostgreSQL", "MongoDB", "API Design", "Moderation", "Community Data"],
      githubUrl: "https://github.com/MukisaSam",
      liveUrl: null,
      image: "/api/placeholder/400/250",
      featured: true,
      startDate: "2024-02-01",
      endDate: null,
      teamSize: 1,
      highlights: ["Destination profiles", "Cultural endpoints", "Community contribution", "Moderation workflow"],
      challenges: ["Collecting reliable cultural data", "Designing a clean endpoint model", "Balancing openness and licensing"],
      solutions: ["Structured entity modeling", "Contribution moderation", "API-first content architecture"],
      impact: "A unique cultural data layer that can power tourism apps and AI guides"
    },
    {
      id: 5,
      title: "ZunoBotics / Okello AI Tourism Robot",
      description: "An AI and robotics initiative focused on tourism storytelling, cultural engagement, and public-facing innovation.",
      longDescription: "The work explored Okello, an AI-powered humanoid robot concept tied to tourism branding, cultural communication, and investor-facing storytelling.",
      status: "ongoing",
      category: "iot",
      techStack: ["AI", "Robotics", "Computer Vision", "Tourism", "ESP32"],
      githubUrl: "https://github.com/MukisaSam",
      liveUrl: null,
      image: "/api/placeholder/400/250",
      featured: true,
      startDate: "2024-05-01",
      endDate: null,
      teamSize: 1,
      highlights: ["AI tour guide direction", "Public innovation branding", "Tourism storytelling", "Robotics concepting"],
      impact: "One of the clearest examples of AI, culture, and tourism combined"
    },
    {
      id: 6,
      title: "Tourism ERP + Client App",
      description: "A multi-tenant ERP and client platform for tour operators, lodges, travel agencies, and destination management companies.",
      status: "ongoing",
      category: "tourism",
      techStack: ["React", "FastAPI", "PostgreSQL", "Multi-tenant SaaS", "Mobile App"],
      githubUrl: "https://github.com/MukisaSam",
      liveUrl: null,
      image: "/api/placeholder/400/250",
      featured: true,
      startDate: "2024-04-01",
      endDate: null,
      teamSize: 1,
      highlights: ["HR and finance modules", "Booking management", "Client mobile app", "Social media inquiries"],
      impact: "A digitization platform for tourism SMEs in Uganda and the region"
    },
    {
      id: 7,
      title: "School Management System",
      description: "A full software system for student, staff, finance, attendance, exams, and portal management.",
      status: "ongoing",
      category: "education",
      techStack: ["FastAPI", "React", "PostgreSQL", "Role-based Access", "School ERP"],
      githubUrl: "https://github.com/MukisaSam",
      liveUrl: null,
      image: "/api/placeholder/400/250",
      featured: false,
      startDate: "2024-06-01",
      endDate: null,
      teamSize: 1,
      highlights: ["Attendance", "Exams", "Finance", "Parent and student portals"],
      impact: "A complete education-management platform suitable for Ugandan schools"
    },
    {
      id: 8,
      title: "FamilyConnect App",
      description: "A family platform for family trees, events, messages, privacy controls, and member governance.",
      status: "ongoing",
      category: "social",
      techStack: ["React", "Node.js", "Google Calendar", "Notifications", "Privacy Controls"],
      githubUrl: "https://github.com/MukisaSam",
      liveUrl: null,
      image: "/api/placeholder/400/250",
      featured: false,
      startDate: "2024-06-15",
      endDate: null,
      teamSize: 1,
      highlights: ["Family tree", "Events", "Messaging", "Privacy levels"],
      impact: "A private family-organization and communication platform"
    },
    {
      id: 9,
      title: "AI-Powered SME Operating System",
      description: "A startup-friendly operating system for African SMEs with AI automation, dashboards, inventory, and WhatsApp workflows.",
      status: "ongoing",
      category: "business",
      techStack: ["React", "FastAPI", "PostgreSQL", "WhatsApp Bot", "Automation"],
      githubUrl: "https://github.com/MukisaSam",
      liveUrl: null,
      image: "/api/placeholder/400/250",
      featured: true,
      startDate: "2024-07-01",
      endDate: null,
      teamSize: 1,
      highlights: ["Inventory and sales", "AI automation", "Business dashboard", "WhatsApp orders"],
      impact: "A VC-friendly operating system concept for SME digitization"
    },
    {
      id: 10,
      title: "Emotion-Aware Music Companion",
      description: "An AI/ML project that detects emotion and recommends or generates music aligned to the user's state.",
      status: "ongoing",
      category: "ai",
      techStack: ["DeepFace", "Python", "VAE", "GAN", "Diffusion Models"],
      githubUrl: "https://github.com/MukisaSam",
      liveUrl: null,
      image: "/api/placeholder/400/250",
      featured: true,
      startDate: "2024-08-01",
      endDate: null,
      teamSize: 1,
      highlights: ["Emotion detection", "Music feature mapping", "Generative AI", "FastAPI deployment"],
      impact: "A technically advanced computer-vision and audio-ML experiment"
    },
    {
      id: 11,
      title: "Assistive Wearable for Visually Impaired People",
      description: "A hardware and AI assistive device concept for obstacle detection, hazard alerts, and navigation support.",
      status: "ongoing",
      category: "iot",
      techStack: ["ESP32", "ESP32-CAM", "Ultrasonic Sensors", "GPS", "IoT"],
      githubUrl: "https://github.com/MukisaSam",
      liveUrl: null,
      image: "/api/placeholder/400/250",
      featured: true,
      startDate: "2024-09-01",
      endDate: null,
      teamSize: 1,
      highlights: ["Obstacle detection", "Reading support", "Face identification", "Location awareness"],
      impact: "A strong social-impact hardware/software project"
    },
    {
      id: 12,
      title: "Smart Agriculture / Survey Data Analysis Project",
      description: "A Python automation tool for cleaning and analyzing survey and agriculture questionnaire data in Excel.",
      status: "completed",
      category: "data",
      techStack: ["Python", "pandas", "openpyxl", "Excel", "Data Cleaning"],
      githubUrl: "https://github.com/MukisaSam",
      liveUrl: null,
      image: "/api/placeholder/400/250",
      featured: false,
      startDate: "2024-10-01",
      endDate: "2024-11-15",
      teamSize: 1,
      highlights: ["Automated survey analysis", "Multi-response grouping", "Formatted Excel output", "Cross-tab reporting"],
      impact: "A practical data-engineering workflow for survey reporting"
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
      iot: 'bg-green-100 text-green-800',
      business: 'bg-amber-100 text-amber-800',
      realestate: 'bg-cyan-100 text-cyan-800',
      tourism: 'bg-emerald-100 text-emerald-800',
      education: 'bg-violet-100 text-violet-800',
      social: 'bg-pink-100 text-pink-800',
      ai: 'bg-fuchsia-100 text-fuchsia-800',
      data: 'bg-slate-100 text-slate-800',
      agriculture: 'bg-lime-100 text-lime-800',
      mobile: 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };
  
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <SEO 
        title="Projects"
        description="Explore Mukisa Samuel's portfolio map of real estate, tourism, AI, hardware, education, and data projects."
        keywords="projects, portfolio, software engineering, AI, real estate, tourism, IoT, data analysis"
        url="https://mukisa.dev/projects"
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Portfolio Map
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A consolidated view of the major systems, products, and experiments across business software, AI, hardware, tourism, and data.
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

