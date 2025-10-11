import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Eye, 
  Share2, 
  Twitter, 
  Facebook, 
  Linkedin,
  User
} from 'lucide-react';
import SEO from '@/components/SEO';
import CommentsSection from '@/components/ui/comments-section';
import { useViewCounter } from '@/hooks/use-view-counter';
import { useBlogPost } from '@/hooks/use-blog-posts';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { views, incrementViews } = useViewCounter(id, 'blog');
  const { post, loading, error } = useBlogPost(id);

  useEffect(() => {
    if (id) {
      incrementViews();
    }
  }, [id, incrementViews]);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Only handle ESC key, don't interfere with other keys/clicks
      if (event.key === 'Escape' && !event.defaultPrevented) {
        event.preventDefault();
        event.stopPropagation();
        console.log('ESC pressed - navigating back to blog');
        setIsNavigating(true);
        
        try {
          // Check if user came from within the app
          if (window.history.length > 1 && document.referrer.includes(window.location.origin)) {
            window.history.back();
          } else {
            // Navigate directly to blog page
            navigate('/blog');
          }
        } catch (error) {
          console.error('Navigation error:', error);
          navigate('/blog');
        } finally {
          // Reset navigation state after a short delay
          setTimeout(() => setIsNavigating(false), 1000);
        }
      }
    };

    // Add event listener with specific options to avoid interference
    document.addEventListener('keydown', handleKeyPress, { passive: false });
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  const handleBackToBlog = () => {
    console.log('Back to blog clicked');
    setIsNavigating(true);
    
    try {
      // Check if user came from within the app
      if (window.history.length > 1 && document.referrer.includes(window.location.origin)) {
        window.history.back();
      } else {
        // Navigate directly to blog page
        navigate('/blog');
      }
    } catch (error) {
      console.error('Navigation error:', error);
      navigate('/blog');
    } finally {
      // Reset navigation state after a short delay
      setTimeout(() => setIsNavigating(false), 1000);
    }
  };

  const handleShare = async (platform) => {
    setIsSharing(true);
    const url = window.location.href;
    const title = post?.title || 'Check out this blog post';
    
    try {
      if (platform === 'native' && navigator.share) {
        await navigator.share({
          title,
          text: post?.excerpt || '',
          url
        });
      } else {
        const shareUrls = {
          twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        };
        
        if (shareUrls[platform]) {
          window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Blog Post Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {error || 'The blog post you\'re looking for doesn\'t exist.'}
            </p>
            <Button 
              onClick={handleBackToBlog}
              className="transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={post.title}
        description={post.excerpt}
        keywords={post.tags?.join(', ')}
        type="article"
        publishedTime={post.date}
        author="Samuel Mukisa"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="flex items-center gap-4 mb-8">
              <Button 
                variant="ghost" 
                onClick={handleBackToBlog}
                disabled={isNavigating}
                className="text-blue-600 hover:text-blue-700 transition-colors disabled:opacity-50"
              >
                {isNavigating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    Navigating...
                  </>
                ) : (
                  <>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Blog
                  </>
                )}
              </Button>
            </div>

            {/* Article Header */}
            <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {/* Featured Image */}
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-600 dark:text-gray-300">
                    {post.title}
                  </span>
                </div>
                {post.featured && (
                  <Badge className="absolute top-4 left-4 bg-yellow-500 text-yellow-900">
                    Featured
                  </Badge>
                )}
              </div>

              {/* Article Content */}
              <div className="p-8">
                {/* Category */}
                <Badge 
                  variant="secondary" 
                  className={`mb-4 ${
                    post.category === 'professional' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  }`}
                >
                  {post.category === 'professional' ? 'Professional' : 'Casual'}
                </Badge>

                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  {post.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Samuel Mukisa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>{views.toLocaleString()} views</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags?.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  {/* Main Content - This would be the full article content */}
                  <div className="space-y-6 text-gray-700 dark:text-gray-300">
                    {post.content ? (
                      <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    ) : (
                      <>
                        <h2>Introduction</h2>
                        <p>
                          This is where the full blog post content would appear. In a real application, 
                          this content would be fetched from your CMS (like Strapi) and could include 
                          rich text formatting, images, code blocks, and more.
                        </p>

                        <h2>Main Content</h2>
                        <p>
                          {post.excerpt}
                        </p>

                        <h2>Conclusion</h2>
                        <p>
                          Thank you for reading! Feel free to share your thoughts in the comments below 
                          or reach out to me directly through the contact page.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Share this article
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare('twitter')}
                      disabled={isSharing}
                      className="flex items-center gap-2"
                    >
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare('facebook')}
                      disabled={isSharing}
                      className="flex items-center gap-2"
                    >
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare('linkedin')}
                      disabled={isSharing}
                      className="flex items-center gap-2"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      className="flex items-center gap-2"
                    >
                      <Share2 className="h-4 w-4" />
                      Copy Link
                    </Button>
                  </div>
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <div className="mt-12">
              <CommentsSection postId={post.id} />
            </div>

            {/* Related Posts or Navigation */}
            <div className="mt-12 text-center">
              <Button 
                onClick={handleBackToBlog} 
                variant="outline" 
                size="lg"
                className="transition-colors hover:bg-blue-50 dark:hover:bg-blue-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                View All Blog Posts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;