import { useState, useEffect, useCallback } from 'react';
import { blogAPI, strapiErrors } from '@/lib/strapi-api';

// Hook for managing blog posts
export const useBlogPosts = (initialFilters = {}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({});
  const [filters, setFilters] = useState(initialFilters);

  // Fetch posts function
  const fetchPosts = useCallback(async (customFilters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await blogAPI.getAllPosts({ ...filters, ...customFilters });
      setPosts(result.data);
      setMeta(result.meta);
    } catch (err) {
      setError(strapiErrors.getErrorMessage(err));
      // Fallback to mock data if Strapi is not available
      setPosts(getMockBlogPosts());
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Search posts
  const searchPosts = useCallback(async (query) => {
    if (!query.trim()) {
      return fetchPosts();
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await blogAPI.searchPosts(query, filters);
      setPosts(result.data);
      setMeta(result.meta);
    } catch (err) {
      setError(strapiErrors.getErrorMessage(err));
      // Fallback to local search in mock data
      const mockPosts = getMockBlogPosts();
      const filteredPosts = mockPosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setPosts(filteredPosts);
    } finally {
      setLoading(false);
    }
  }, [filters, fetchPosts]);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Refresh posts
  const refresh = useCallback(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Initial load
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    meta,
    filters,
    searchPosts,
    updateFilters,
    refresh
  };
};

// Hook for a single blog post
export const useBlogPost = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let result;
        if (isNaN(postId)) {
          // Treat as slug
          result = await blogAPI.getPostBySlug(postId);
        } else {
          // Treat as ID
          result = await blogAPI.getPostById(postId);
        }
        
        if (result) {
          setPost(result);
        } else {
          // Fallback to mock data
          const mockPosts = getMockBlogPosts();
          const mockPost = mockPosts.find(p => p.id.toString() === postId.toString());
          setPost(mockPost || null);
        }
      } catch (err) {
        setError(strapiErrors.getErrorMessage(err));
        // Fallback to mock data
        const mockPosts = getMockBlogPosts();
        const mockPost = mockPosts.find(p => p.id.toString() === postId.toString());
        setPost(mockPost || null);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  return { post, loading, error };
};

// Mock data fallback (when Strapi is not available)
const getMockBlogPosts = () => [
  {
    id: 1,
    attributes: {
      title: "Zero-Day Discovery: My First Critical Vulnerability Find",
      slug: "zero-day-discovery-first-critical-vulnerability",
      excerpt: "The complete story of how I discovered a critical SQL injection vulnerability in a major e-commerce platform, from initial reconnaissance to responsible disclosure and the $5,000 bounty reward.",
      content: `# The Discovery

      It was 2 AM when I found my first zero-day vulnerability. The soft glow of my laptop screen was the only light in my Kampala apartment as I methodically tested an e-commerce platform that millions of users trusted with their personal data.

      ## Initial Reconnaissance

      The platform appeared secure at first glance - modern UI, HTTPS everywhere, and seemingly robust input validation. But experience had taught me that security isn't about appearances; it's about understanding the underlying architecture.

      I started with basic enumeration:
      - Subdomain discovery
      - Technology stack identification  
      - API endpoint mapping
      - Authentication flow analysis

      ## The Breakthrough

      The vulnerability was hiding in plain sight - a classic SQL injection in the search functionality. What made it critical was its position in the authentication bypass chain.

      \`\`\`sql
      SELECT * FROM users WHERE username = '$input' AND status = 'active'
      \`\`\`

      By crafting a specific payload, I could manipulate this query to bypass authentication entirely:

      \`\`\`
      admin' OR '1'='1' --
      \`\`\`

      ## Responsible Disclosure

      With great power comes great responsibility. I immediately began the responsible disclosure process:

      1. **Documentation**: Comprehensive proof-of-concept
      2. **Initial Contact**: Reached out through their security contact
      3. **Follow-up**: Provided detailed remediation steps
      4. **Verification**: Confirmed the fix was properly implemented

      ## The Reward

      Three months later, I received a $5,000 bounty reward and recognition in their hall of fame. But the real reward was knowing I'd helped protect millions of users from potential data breaches.

      ## Lessons Learned

      - Never assume security based on appearances
      - Systematic methodology beats random testing
      - Responsible disclosure builds trust and improves security for everyone
      - Every vulnerability is a learning opportunity

      This discovery launched my career in security research and reinforced my commitment to ethical hacking practices.`,
      category: "professional",
      tags: ["Bug Bounty", "SQL Injection", "Security Research", "Ethical Hacking"],
      publishedAt: "2024-02-15T00:00:00.000Z",
      createdAt: "2024-02-15T00:00:00.000Z",
      updatedAt: "2024-02-15T00:00:00.000Z",
      featured: true,
      readTime: "15 min read",
      coverImage: {
        data: {
          attributes: {
            url: "/api/placeholder/800/400",
            alternativeText: "Code security analysis"
          }
        }
      },
      seo: {
        metaTitle: "Zero-Day Discovery: My First Critical Vulnerability Find",
        metaDescription: "The complete story of discovering a critical SQL injection vulnerability and the responsible disclosure process.",
        keywords: "bug bounty, sql injection, security research, ethical hacking, zero-day"
      }
    }
  },
  {
    id: 2,
    attributes: {
      title: "React 19 and the Future of Frontend Security",
      slug: "react-19-future-frontend-security",
      excerpt: "Analyzing the security implications of React 19's new features including Server Components, Actions, and the new compiler. What developers need to know to build secure applications.",
      content: `# React 19: A Security Perspective

      React 19 brings revolutionary changes to frontend development, but with great power comes new security considerations. Let's explore the security implications of the latest features.

      ## Server Components: A Paradigm Shift

      Server Components fundamentally change how we think about data flow and security boundaries...

      ## New Compiler: Performance vs Security

      The new React compiler promises significant performance improvements, but how does it affect our security posture?

      ## Best Practices for Secure React 19 Applications

      1. **Server Component Security**
      2. **Action Validation**
      3. **Hydration Boundary Protection**
      4. **State Management Security**

      ## Conclusion

      React 19 offers exciting possibilities for building more secure applications, but requires careful consideration of new attack vectors and security patterns.`,
      category: "professional",
      tags: ["React", "Security", "Frontend", "Web Development"],
      publishedAt: "2024-02-10T00:00:00.000Z",
      createdAt: "2024-02-10T00:00:00.000Z",
      updatedAt: "2024-02-10T00:00:00.000Z",
      featured: false,
      readTime: "12 min read",
      coverImage: {
        data: {
          attributes: {
            url: "/api/placeholder/800/400",
            alternativeText: "React security"
          }
        }
      }
    }
  }
  // Add more mock posts as needed...
];

export default useBlogPosts;