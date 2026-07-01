import React from 'react';
import { Badge } from '@/components/ui/badge';
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
        { name: "Python", experience: "Advanced", usage: "Data analysis, automation, machine learning experiments, FastAPI backend development" },
        { name: "JavaScript", experience: "Advanced", usage: "Frontend development, React projects, web application logic" },
        { name: "TypeScript", experience: "Intermediate", usage: "Modern web application development and typed frontend/backend logic" },
        { name: "Java", experience: "Intermediate", usage: "Academic projects, object-oriented programming, server-side logic, Android concepts" },
        { name: "PHP", experience: "Intermediate", usage: "Laravel Blade applications and business systems" },
        { name: "SQL", experience: "Advanced", usage: "PostgreSQL/MySQL database design, queries, reporting, and relational modeling" },
        { name: "Kotlin", experience: "Beginner-Intermediate", usage: "Android mobile programming, Jetpack Compose learning" },
        { name: "C/C++", experience: "Beginner-Intermediate", usage: "Programming fundamentals and academic coursework" }
      ]
    },
    {
      title: "Web Technologies",
      icon: <Globe className="h-6 w-6" />,
      skills: [
        { name: "HTML/CSS", experience: "Advanced", usage: "Responsive layouts, landing pages, dashboards, UI implementation" },
        { name: "Tailwind CSS", experience: "Intermediate-Advanced", usage: "Modern dashboard and SaaS interface styling" },
        { name: "React.js", experience: "Intermediate-Advanced", usage: "Admin dashboards, web applications, frontend architecture" },
        { name: "Next.js", experience: "Intermediate", usage: "Modern full-stack/web frontend exploration" },
        { name: "Node.js / Express", experience: "Intermediate", usage: "Backend APIs and server-side JavaScript concepts" },
        { name: "Laravel Blade", experience: "Intermediate-Advanced", usage: "Real estate, tenant management, and business applications" },
        { name: "FastAPI", experience: "Intermediate", usage: "API development, ML service integration, backend architecture" },
        { name: "REST APIs", experience: "Advanced", usage: "Designing and consuming APIs for web/mobile systems" }
      ]
    },
    {
      title: "Mobile Development",
      icon: <Smartphone className="h-6 w-6" />,
      skills: [
        { name: "Android Studio", experience: "Intermediate", usage: "Mobile programming coursework and Android app development" },
        { name: "Kotlin", experience: "Beginner-Intermediate", usage: "Jetpack Compose, ViewModel, LiveData, Data Binding concepts" },
        { name: "Jetpack Compose", experience: "Beginner-Intermediate", usage: "Building modern Android UI screens" },
        { name: "React Native", experience: "Intermediate", usage: "Mobile app planning for marketplace, tourism, and real estate apps" },
        { name: "Flutter", experience: "Beginner-Intermediate", usage: "Considered for real estate and mobile business systems" }
      ]
    },
    {
      title: "Database & Backend Systems",
      icon: <Database className="h-6 w-6" />,
      skills: [
        { name: "PostgreSQL", experience: "Advanced", usage: "Tenant systems, real estate systems, SaaS platforms, relational data modeling" },
        { name: "MySQL / MariaDB", experience: "Intermediate-Advanced", usage: "XAMPP, Laravel, academic and business applications" },
        { name: "MongoDB", experience: "Intermediate", usage: "Considered for tourism/cultural API and flexible content systems" },
        { name: "Redis", experience: "Beginner-Intermediate", usage: "Caching/session architecture knowledge" },
        { name: "Authentication & Authorization", experience: "Intermediate-Advanced", usage: "Role-based access, JWT concepts, admin/user dashboards" },
        { name: "Database Design", experience: "Advanced", usage: "ERDs, normalization, entity relationships, system data modeling" }
      ]
    },
    {
      title: "Cloud, Hosting & DevOps",
      icon: <Cloud className="h-6 w-6" />,
      skills: [
        { name: "Render", experience: "Intermediate", usage: "Backend/database deployment exploration" },
        { name: "Vercel", experience: "Intermediate", usage: "Frontend deployment planning" },
        { name: "DigitalOcean", experience: "Intermediate", usage: "VPS/media storage architecture planning" },
        { name: "Docker", experience: "Beginner-Intermediate", usage: "Containerization and deployment concepts" },
        { name: "Git & GitHub", experience: "Intermediate-Advanced", usage: "Version control and project collaboration" },
        { name: "GitHub Actions", experience: "Beginner-Intermediate", usage: "CI/CD concepts" },
        { name: "AWS", experience: "Beginner-Intermediate", usage: "Cloud architecture exploration, S3/storage discussions" },
        { name: "Nginx", experience: "Beginner-Intermediate", usage: "Web server/deployment concepts" }
      ]
    },
    {
      title: "Data Analysis & Automation",
      icon: <Zap className="h-6 w-6" />,
      skills: [
        { name: "pandas", experience: "Advanced", usage: "Excel data cleaning, automated survey analysis, multi-response question analysis" },
        { name: "openpyxl", experience: "Advanced", usage: "Excel report generation, formatting, formulas, tables, styled outputs" },
        { name: "Excel", experience: "Advanced", usage: "Pivot tables, charts, summaries, cross-tabulation, survey reports" },
        { name: "Power Query", experience: "Intermediate", usage: "Data cleaning and transformation concepts" },
        { name: "SPSS-style Analysis", experience: "Intermediate", usage: "Survey data preparation and structured analysis" },
        { name: "Data Visualization", experience: "Intermediate-Advanced", usage: "Charts, dashboard summaries, Excel visuals" }
      ]
    },
    {
      title: "Artificial Intelligence & Machine Learning",
      icon: <Zap className="h-6 w-6" />,
      skills: [
        { name: "Machine Learning Concepts", experience: "Intermediate", usage: "Demand forecasting, recommendation systems, predictive analytics" },
        { name: "Deep Learning Concepts", experience: "Intermediate", usage: "VAE, GAN, diffusion model exploration" },
        { name: "Computer Vision", experience: "Intermediate", usage: "Facial emotion recognition, object detection concepts" },
        { name: "Audio Feature Extraction", experience: "Intermediate", usage: "MFCC, Mel spectrogram, Chroma, Spectral Centroid" },
        { name: "AI Integration", experience: "Intermediate-Advanced", usage: "AI-powered tourism guide, SME automation, ML-backed analytics" },
        { name: "FastAPI ML Deployment", experience: "Intermediate", usage: "Serving ML models through APIs" }
      ]
    },
    {
      title: "Cybersecurity",
      icon: <Shield className="h-6 w-6" />,
      skills: [
        { name: "Web Application Security", experience: "Intermediate", usage: "Secure authentication, authorization, validation, and system hardening concepts" },
        { name: "Vulnerability Assessment", experience: "Intermediate", usage: "Identifying risks in applications and systems" },
        { name: "Penetration Testing Concepts", experience: "Intermediate", usage: "Kali Linux, ethical hacking tools, security testing fundamentals" },
        { name: "Network Security", experience: "Beginner-Intermediate", usage: "Network protocols, routing, firewalls, and secure communication concepts" },
        { name: "Cryptography Concepts", experience: "Intermediate", usage: "Encryption, key compromise risks, secure data-sharing architecture" },
        { name: "GRC / Purple Team Concepts", experience: "Beginner-Intermediate", usage: "Governance, risk, compliance, defensive and offensive security alignment" }
      ]
    }
  ];

  const certifications = [
  ];

  const keyProjects = [
    {
      title: "Tenant Management System",
      category: "Real Estate",
      description: "Property and tenant management system for tenants, properties, rental units, payments, arrears, and administrative roles.",
      points: ["Tenant registration", "Property and unit management", "Rent due date tracking", "Arrears classification", "CSV export", "Role-based access control"],
      technologies: ["Laravel Blade", "PostgreSQL", "Tailwind CSS", "pgAdmin", "Render"],
      status: "Designed and developed"
    },
    {
      title: "Rental Listing Platform",
      category: "Marketplace",
      description: "A Jiji-like rental listing platform for rooms and houses in Uganda with verified listing workflow and payment-gated property info.",
      points: ["Landlord listing requests", "Field team verification", "Photo/video/GPS capture", "Admin approval", "Paid contact/location access", "Appointment workflow"],
      technologies: ["React Native", "FastAPI", "PostgreSQL", "DigitalOcean Spaces", "Mobile Money"],
      status: "Designed"
    },
    {
      title: "Uganda Destinations API",
      category: "Tourism",
      description: "A tourism and culture API for destinations, tribes, kingdoms, clans, myths, stories, and heritage information.",
      points: ["Destination profiles", "Cultural stories and myths", "Tribe/kingdom/chiefdom data", "Community contribution model", "Moderation workflow", "Structured endpoints"],
      technologies: ["PostgreSQL", "MongoDB", "REST API architecture"],
      status: "Planned"
    },
    {
      title: "ZunoBotics / Okello AI Tourism Robot",
      category: "AI + Robotics",
      description: "AI and robotics concepts connected to tourism and culture, including the Okello AI tourism guide prototype.",
      points: ["AI-powered tourism guidance", "Cultural storytelling", "Robotics and public innovation", "Tourism technology branding", "AI, culture, and tourism positioning"],
      technologies: ["AI", "Robotics", "Tourism"],
      status: "Concept and communication work"
    },
    {
      title: "Textile Supply Chain Management System",
      category: "Business Software",
      description: "A software engineering project for textile/agricultural supply chain management involving suppliers, manufacturers, retailers, wholesalers, customers, and admins.",
      points: ["Supplier registration", "Manufacturer and wholesaler dashboards", "Quality grading", "Negotiation/chat workflows", "Demand and supply analytics", "Price trend visualization"],
      technologies: ["Java", "XAMPP", "Database design", "Dashboard systems", "ML integration"],
      status: "Academic project"
    },
    {
      title: "Survey Data Analysis Automation Tool",
      category: "Data Analysis",
      description: "Python scripts for cleaning and analyzing structured survey data, especially multi-response agricultural survey questions.",
      points: ["Automated Excel data cleaning", "Multi-response grouping", "Demographic cross-tabulation", "Percentage and total calculations", "Styled Excel reports", "Survey automation"],
      technologies: ["Python", "pandas", "openpyxl", "Excel"],
      status: "Built"
    },
    {
      title: "Emotion-Aware Music Companion",
      category: "AI / ML",
      description: "An AI/ML project that detects user emotions and maps them to suitable music recommendations or generative music features.",
      points: ["Facial emotion recognition", "Emotion classification", "DeepFace experimentation", "Audio feature extraction", "Music feature mapping", "VAE/GAN/diffusion exploration"],
      technologies: ["Python", "DeepFace", "Kaggle", "Jupyter Notebook", "FastAPI"],
      status: "Experimentation"
    },
    {
      title: "Assistive Wearable for Visually Impaired Users",
      category: "Hardware + AI",
      description: "A hardware/software assistive wearable concept to help visually impaired users detect obstacles, hazards, and objects.",
      points: ["Obstacle detection", "Object detection", "GPS support", "Vibration/sound alerts", "Camera-based awareness", "Face/object recognition concepts"],
      technologies: ["ESP32-WROVER", "ESP32-CAM", "Ultrasonic sensors", "GPS module"],
      status: "Concept"
    },
    {
      title: "School Management System",
      category: "Education",
      description: "A full school management system covering students, teachers, parents, finance, exams, attendance, and administrative workflows.",
      points: ["Student records", "Staff records", "Parent/student portals", "Class management", "Attendance", "Exam/results management"],
      technologies: ["FastAPI", "React", "PostgreSQL"],
      status: "Planned"
    },
    {
      title: "Real Estate Company Management System",
      category: "Real Estate",
      description: "A system for a company that buys land, sells plots, and manages installment and full payments.",
      points: ["Land/property records", "Plot sales", "Installment tracking", "Staff roles", "Agent workflows", "Finance operations"],
      technologies: ["Laravel Blade", "PostgreSQL", "Tailwind CSS", "Flutter later"],
      status: "Planned"
    },
    {
      title: "Service Marketplace Platform",
      category: "Marketplace",
      description: "A service marketplace concept for connecting clients with formal and informal service providers.",
      points: ["Service provider profiles", "Service posts", "Client-provider chat", "Reviews", "Provider social links", "Blog/content section"],
      technologies: ["Web platform"],
      status: "Concept"
    },
    {
      title: "Consultancy Firm Management System",
      category: "Business Software",
      description: "A business operations system for consulting firms focused on the full cycle from leads to profitability.",
      points: ["Lead management", "Proposal tracking", "Contract management", "Bench/resource planning", "Timesheets", "Expenses", "Billing", "Utilization tracking"],
      technologies: ["Operations workflow", "Business software"],
      status: "Concept"
    },
    {
      title: "FamilyConnect App",
      category: "Social",
      description: "A family networking and family-tree management application.",
      points: ["Family tree", "Member profiles", "Admin validation", "Events", "Messaging", "Calendar integration", "Privacy levels"],
      technologies: ["Web or mobile app"],
      status: "Concept"
    },
    {
      title: "HomeGuy / Home Services App",
      category: "Services",
      description: "A home services platform starting with owned service providers before expanding into a wider marketplace.",
      points: ["Laundry", "Cleaning", "Car wash", "Booking", "Scheduling", "Worker assignment", "Customer request management"],
      technologies: ["Web or mobile app"],
      status: "Planned"
    },
    {
      title: "Odoo Inventory and Sales Integration",
      category: "ERP",
      description: "An ERP-related academic project involving inventory and sales integration for retail operations.",
      points: ["Product records", "Stock management", "Reordering", "Supplier details", "Barcode/location workflow", "Integration with sales"],
      technologies: ["Odoo", "Inventory module"],
      status: "Academic project"
    }
  ];

  const tools = [
    "VS Code", "IntelliJ IDEA", "Android Studio", "GitHub Desktop", "Postman", "pgAdmin", "XAMPP",
    "Figma", "wireframing tools", "system architecture diagrams", "SRS documentation",
    "Kali Linux", "Nmap", "Wireshark", "Burp Suite", "OWASP ZAP", "John the Ripper",
    "Jupyter Notebook", "Kaggle", "pandas", "openpyxl", "Excel", "TensorFlow concepts", "DeepFace",
    "Render", "Vercel", "DigitalOcean", "AWS concepts", "Docker", "GitHub Actions", "Nginx"
  ];

  const professionalStrengths = [
    "Strong ability to design business software systems from idea to architecture",
    "Experience with real estate, tourism, education, service marketplace, and SME systems",
    "Good understanding of database design and role-based systems",
    "Practical experience automating Excel/data analysis workflows using Python",
    "Growing AI/ML experience across emotion detection, recommendation systems, tourism AI, and forecasting",
    "Strong interest in cybersecurity, secure system design, and ethical hacking",
    "Ability to write SRS documents, system features, ERDs, workflows, and implementation plans",
    "Entrepreneurial mindset focused on building useful systems for Uganda and African SMEs"
  ];

  const headline = "Software Engineering Student | Full-Stack Developer | AI & Data Enthusiast | Building Business, Tourism, Real Estate, and Automation Systems";

  const aboutText = [
    "I am a software engineering student and developer focused on building practical digital systems for businesses, institutions, and communities.",
    "My work spans full-stack web development, mobile app planning, database design, data analysis automation, AI/ML experimentation, and cybersecurity concepts.",
    "I have worked on projects in real estate management, tenant management, tourism technology, school management, service marketplaces, survey data analysis, AI-powered music recommendation, and assistive technology.",
    "My technical experience includes Python, JavaScript, PHP/Laravel, React, FastAPI, PostgreSQL, MySQL, Excel automation, pandas, openpyxl, and AI/ML tools. I also have a growing interest in cybersecurity, secure system design, and cloud deployment."
  ];

  const certificationNote = "At the moment, only include certifications you can prove with a certificate, badge, transcript, or official ID.";

  const getCategoryColor = (category) => {
    const colors = {
      "Real Estate": 'bg-cyan-100 text-cyan-800',
      "Marketplace": 'bg-purple-100 text-purple-800',
      "Tourism": 'bg-emerald-100 text-emerald-800',
      "AI + Robotics": 'bg-fuchsia-100 text-fuchsia-800',
      "Business Software": 'bg-amber-100 text-amber-800',
      "Data Analysis": 'bg-slate-100 text-slate-800',
      "AI / ML": 'bg-pink-100 text-pink-800',
      "Hardware + AI": 'bg-lime-100 text-lime-800',
      "Education": 'bg-violet-100 text-violet-800',
      "Real Estate": 'bg-cyan-100 text-cyan-800',
      "Services": 'bg-orange-100 text-orange-800',
      "Social": 'bg-blue-100 text-blue-800',
      "ERP": 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Skills & Portfolio"
        description="A truthful overview of Mukisa Samuel's skills, actual project work, and verified portfolio focus across software, data, AI, and cybersecurity."
        keywords="skills, portfolio, programming languages, web development, AI, data analysis, cybersecurity, real estate systems, tourism systems"
        url="https://mukisa.dev/skills"
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Skills & Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {headline}
          </p>
        </div>

        {/* About Section */}
        <section className="mb-16">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <BookOpen className="h-6 w-6 text-blue-600" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              {aboutText.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </CardContent>
          </Card>
        </section>

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
                        <div className="flex flex-col gap-2 mb-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium text-gray-700">{skill.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {skill.experience}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {skill.usage}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Key Projects Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Projects & Achievements</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {keyProjects.map((project) => (
              <Card key={project.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <Badge className={getCategoryColor(project.category)}>{project.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">{project.status}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{project.description}</p>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {project.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <Badge key={technology} variant="outline" className="text-xs">
                          {technology}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Certifications</h2>
          <Card className="shadow-lg">
            <CardContent className="p-8 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {certificationNote}
              </p>
              <p className="text-sm text-gray-500">
                No certifications are listed here unless they are verified with a certificate, badge, transcript, or official ID.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Professional Strengths */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Professional Strengths</h2>
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {professionalStrengths.map((strength) => (
                  <div key={strength} className="flex items-start gap-3 rounded-xl border border-gray-100 p-4">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600 shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{strength}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
                Suggested About Section
              </h3>
              <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                I am a software engineering student and developer focused on building practical digital systems for businesses, institutions, and communities. My work spans full-stack web development, mobile app planning, database design, data analysis automation, AI/ML experimentation, and cybersecurity concepts.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold">
                Start a Project
              </button>
              <a
                href="/Mukisa_Samuel_CV.PDF"
                download="Mukisa_Samuel_CV.pdf"
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold inline-flex items-center justify-center"
              >
                Download Resume
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;

