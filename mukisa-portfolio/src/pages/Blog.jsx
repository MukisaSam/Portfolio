import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, ArrowRight, Search, X, Eye, Rss, Download } from 'lucide-react';
import SEO from '@/components/SEO';
import { getInitialViews } from '@/hooks/use-view-counter';
import NewsletterSignup from '@/components/ui/newsletter-signup';
import CommentsSection from '@/components/ui/comments-section';
import { useRSSFeed } from '@/lib/rss-feed';

const Blog = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const blogPosts = [
    {
      id: 1,
      title: "Zero-Day Discovery: My First Critical Vulnerability Find",
      excerpt: "The complete story of how I discovered a critical SQL injection vulnerability in a major e-commerce platform, from initial reconnaissance to responsible disclosure and the $5,000 bounty reward.",
      category: "professional",
      tags: ["Bug Bounty", "SQL Injection", "Security Research", "Ethical Hacking"],
      date: "2024-02-15",
      readTime: "15 min read",
      image: "/api/placeholder/400/250",
      featured: true
    },
    {
      id: 2,
      title: "React 19 and the Future of Frontend Security",
      excerpt: "Analyzing the security implications of React 19's new features including Server Components, Actions, and the new compiler. What developers need to know to build secure applications.",
      category: "professional",
      tags: ["React", "Security", "Frontend", "Web Development"],
      date: "2024-02-10",
      readTime: "12 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Building My Automated Security Testing Lab with Docker",
      excerpt: "A step-by-step guide to creating a comprehensive security testing environment using Docker containers, complete with vulnerable applications, scanning tools, and monitoring setup.",
      category: "professional",
      tags: ["Docker", "DevSecOps", "Automation", "Security Testing"],
      date: "2024-02-05",
      readTime: "18 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 4,
      title: "From Kampala to Global Impact: My Tech Journey",
      excerpt: "A personal reflection on growing up in Uganda, discovering programming, and how local challenges shaped my approach to building secure, accessible technology for everyone.",
      category: "casual",
      tags: ["Personal", "Career", "Uganda", "Tech Community"],
      date: "2024-01-28",
      readTime: "8 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 5,
      title: "Why I Chose Ethical Hacking Over Traditional Development",
      excerpt: "The pivotal moment when I realized that understanding how to break systems made me a better builder. My transition from full-stack developer to security researcher.",
      category: "casual",
      tags: ["Career", "Ethical Hacking", "Personal Growth", "Decision Making"],
      date: "2024-01-20",
      readTime: "10 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 6,
      title: "API Security Best Practices: Lessons from 50+ Penetration Tests",
      excerpt: "A comprehensive guide based on real-world findings from API security assessments. Common vulnerabilities, testing methodologies, and actionable remediation strategies.",
      category: "professional",
      tags: ["API Security", "Penetration Testing", "Best Practices", "OWASP"],
      date: "2024-01-15",
      readTime: "20 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 7,
      title: "The Art of Responsible Disclosure: A Bug Hunter's Guide",
      excerpt: "Everything I've learned about responsible vulnerability disclosure from 3 years of bug hunting. Communication strategies, timelines, and building relationships with security teams.",
      category: "professional",
      tags: ["Bug Bounty", "Responsible Disclosure", "Communication", "Ethics"],
      date: "2024-01-10",
      readTime: "14 min read",
      image: "/api/placeholder/400/250"
    },
    {
      id: 8,
      title: "Coffee, Code, and Midnight Breakthroughs",
      excerpt: "Why some of my best discoveries happen at 2 AM with a cup of Ugandan coffee. Reflections on the creative process, persistence, and the beauty of problem-solving.",
      category: "casual",
      tags: ["Lifestyle", "Creativity", "Personal", "Coffee"],
      date: "2024-01-05",
      readTime: "6 min read",
      image: "/api/placeholder/400/250"
    }
  ];
  
  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    let posts = blogPosts;
    
    // Filter by category
    if (activeCategory !== 'all') {
      posts = posts.filter(post => post.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return posts;
  }, [activeCategory, searchQuery, blogPosts]);

  const categories = [
    { id: 'all', label: 'All Posts', count: blogPosts.length },
    { id: 'professional', label: 'Professional', count: blogPosts.filter(post => post.category === 'professional').length },
    { id: 'casual', label: 'Casual', count: blogPosts.filter(post => post.category === 'casual').length }
  ];

  const clearSearch = () => {
    setSearchQuery('');
  };

  // RSS feed functionality
  const { downloadRSS, rssUrl } = useRSSFeed(blogPosts);
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Blog & Insights"
        description="Read Mukisa Samuel's latest thoughts on software engineering, cybersecurity, ethical hacking, and technology trends. Professional insights and personal experiences."
        keywords="blog, cybersecurity blog, software engineering insights, ethical hacking, tech blog, programming tutorials"
        url="https://mukisa.dev/blog"
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Blog & Insights
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
            Sharing thoughts on software engineering, cybersecurity, and the ever-evolving world of technology.
          </p>
          
          {/* RSS Feed Links */}
          <div className="flex justify-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={downloadRSS}
              className="text-orange-600 border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20"
            >
              <Download className="h-4 w-4 mr-2" />
              Download RSS
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              asChild
              className="text-orange-600 border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20"
            >
              <a href={rssUrl} target="_blank" rel="noopener noreferrer">
                <Rss className="h-4 w-4 mr-2" />
                RSS Feed
              </a>
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search posts by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 py-2 w-full border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
              Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} matching "{searchQuery}"
            </p>
          )}
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`${
                activeCategory === category.id 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {category.label} ({category.count})
            </Button>
          ))}
        </div>
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              {/* Post Image */}
              <div 
                className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden"
                role="img"
                aria-label={`Thumbnail image for blog post: ${post.title}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">Blog Post</span>
                </div>
              </div>
              
              {/* Post Content */}
              <div className="p-6">
                {/* Category Badge */}
                <Badge 
                  variant="secondary" 
                  className={`mb-3 ${
                    post.category === 'professional' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}
                >
                  {post.category === 'professional' ? 'Professional' : 'Casual'}
                </Badge>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {getInitialViews(post.id, 'blog').toLocaleString()} views
                    </div>
                  </div>
                </div>
                
                {/* Read More Button */}
                <Button 
                  variant="ghost" 
                  className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  onClick={() => {
                    console.log(`Navigating to blog post ${post.id}`);
                    navigate(`/blog/${post.id}`);
                  }}
                >
                  Read More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </article>
          ))}
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-16 mb-12">
          <NewsletterSignup />
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;

