import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  ThumbsUp, 
  Reply, 
  Flag,
  Clock,
  User,
  Shield,
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react';
import { commentsAPI, strapiErrors } from '@/lib/strapi-api';
import { contactFormSchema } from '@/lib/validations';
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limiter';

const CommentsSection = ({ postId, postTitle }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load comments from Strapi with localStorage fallback
  useEffect(() => {
    const loadComments = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try to fetch from Strapi first
        const strapiComments = await commentsAPI.getPostComments(postId);
        
        if (strapiComments.length > 0) {
          // Transform Strapi comments to our format
          const transformedComments = strapiComments.map(comment => ({
            id: comment.id.toString(),
            name: comment.attributes.author_name,
            email: comment.attributes.author_email,
            message: comment.attributes.content,
            timestamp: comment.attributes.createdAt,
            likes: comment.attributes.likes || 0,
            replies: [], // TODO: Handle nested comments in Strapi
            parentId: comment.attributes.parent_comment?.data?.id || null,
            isAuthor: comment.attributes.author_email === 'hello@mukisa.dev',
            approved: comment.attributes.approved
          }));
          
          setComments(transformedComments);
        } else {
          // Fallback to localStorage for demo
          const storageKey = `comments_${postId}`;
          const storedComments = localStorage.getItem(storageKey);
          if (storedComments) {
            setComments(JSON.parse(storedComments));
          }
        }
      } catch (err) {
        console.error('Error loading comments:', err);
        setError(strapiErrors.getErrorMessage(err));
        
        // Fallback to localStorage
        const storageKey = `comments_${postId}`;
        const storedComments = localStorage.getItem(storageKey);
        if (storedComments) {
          setComments(JSON.parse(storedComments));
        }
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      loadComments();
    }
  }, [postId]);

  // Save comments to both Strapi and localStorage
  const saveComments = async (commentData, isUpdate = false) => {
    try {
      if (isUpdate) {
        // For updates like likes, use both Strapi and localStorage
        const updatedComments = comments.map(c => 
          c.id === commentData.id ? { ...c, ...commentData } : c
        );
        setComments(updatedComments);
        
        // Save to localStorage as backup
        const storageKey = `comments_${postId}`;
        localStorage.setItem(storageKey, JSON.stringify(updatedComments));
        
        // Try to update in Strapi
        try {
          await commentsAPI.updateComment(commentData.id, {
            likes: commentData.likes
          });
        } catch (err) {
          console.warn('Failed to update comment in Strapi:', err);
        }
      } else {
        // For new comments, try Strapi first, then localStorage
        try {
          const strapiComment = await commentsAPI.createComment({
            author_name: commentData.name,
            author_email: commentData.email,
            content: commentData.message,
            blog_post: postId,
            parent_comment: commentData.parentId || null,
            approved: false // Comments need approval
          });
          
          // Add to local state
          const newComment = {
            id: strapiComment.id.toString(),
            name: commentData.name,
            email: commentData.email,
            message: commentData.message,
            timestamp: new Date().toISOString(),
            likes: 0,
            replies: [],
            parentId: commentData.parentId || null,
            isAuthor: commentData.email === 'hello@mukisa.dev',
            approved: false
          };
          
          setComments(prev => [newComment, ...prev]);
          return newComment;
        } catch (err) {
          console.warn('Failed to save to Strapi, using localStorage:', err);
          
          // Fallback to localStorage
          const localComment = {
            id: Date.now().toString(),
            name: commentData.name,
            email: commentData.email,
            message: commentData.message,
            timestamp: new Date().toISOString(),
            likes: 0,
            replies: [],
            parentId: commentData.parentId || null,
            isAuthor: commentData.email === 'hello@mukisa.dev',
            approved: true // Auto-approve for localStorage
          };
          
          const updatedComments = [localComment, ...comments];
          setComments(updatedComments);
          
          const storageKey = `comments_${postId}`;
          localStorage.setItem(storageKey, JSON.stringify(updatedComments));
          
          return localComment;
        }
      }
    } catch (err) {
      console.error('Error saving comment:', err);
      throw err;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationErrors({});
    setError(null);
    setSubmitSuccess(false);

    try {
      // Validate form data
      const commentValidation = contactFormSchema.omit(['subject']).safeParse({
        name: newComment.name,
        email: newComment.email,
        message: newComment.message
      });

      if (!commentValidation.success) {
        const errors = {};
        commentValidation.error.errors.forEach((error) => {
          errors[error.path[0]] = error.message;
        });
        setValidationErrors(errors);
        setIsSubmitting(false);
        return;
      }

      // Check rate limiting
      const rateLimitCheck = checkRateLimit('comment_submission', {
        requests: 5,
        window: 60 * 60 * 1000, // 1 hour
        message: 'Too many comments submitted. Please wait before commenting again.'
      });

      if (!rateLimitCheck.allowed) {
        setError(rateLimitCheck.error);
        setIsSubmitting(false);
        return;
      }

      // Create comment data
      const commentData = {
        name: newComment.name.trim(),
        email: newComment.email.trim(),
        message: newComment.message.trim(),
        parentId: replyingTo
      };

      // Save comment
      const savedComment = await saveComments(commentData, false);
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form
      setNewComment({ name: '', email: '', message: '' });
      setReplyingTo(null);
      
      // Auto-hide success message
      setTimeout(() => setSubmitSuccess(false), 5000);

    } catch (err) {
      setError(strapiErrors.getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (commentId, isReply = false, parentId = null) => {
    try {
      const comment = isReply 
        ? comments.find(c => c.id === parentId)?.replies.find(r => r.id === commentId)
        : comments.find(c => c.id === commentId);
      
      if (!comment) return;

      const updatedComment = {
        ...comment,
        likes: comment.likes + 1
      };

      // Update in state and Strapi
      await saveComments(updatedComment, true);
      
    } catch (err) {
      console.error('Error liking comment:', err);
      setError('Failed to like comment. Please try again.');
    }
  };

  // Handle comment reporting
  const handleReport = async (commentId, reason = 'inappropriate') => {
    try {
      await commentsAPI.reportComment(commentId, reason);
      setError(null);
      // Show success feedback
      setTimeout(() => {
        alert('Comment reported successfully. Thank you for helping keep our community safe.');
      }, 100);
    } catch (err) {
      console.error('Error reporting comment:', err);
      setError('Failed to report comment. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const CommentItem = ({ comment, isReply = false, parentId = null }) => (
    <div className={`${isReply ? 'ml-8 border-l-2 border-gray-200 dark:border-gray-700 pl-4' : ''}`}>
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {getInitials(comment.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {comment.name}
                </span>
                {comment.isAuthor && (
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    <Shield className="h-3 w-3 mr-1" />
                    Author
                  </Badge>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDate(comment.timestamp)}
                </span>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {comment.message}
              </p>
              
              <div className="flex items-center gap-4 text-sm">
                <button
                  onClick={() => handleLike(comment.id, isReply, parentId)}
                  className="flex items-center gap-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  <ThumbsUp className="h-4 w-4" />
                  {comment.likes > 0 && comment.likes}
                </button>
                
                {!isReply && (
                  <button
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="flex items-center gap-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    <Reply className="h-4 w-4" />
                    Reply
                  </button>
                )}
                
                <button className="flex items-center gap-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors">
                  <Flag className="h-4 w-4" />
                  Report
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Replies */}
      {!isReply && comment.replies && comment.replies.length > 0 && (
        <div className="ml-4">
          {comment.replies.map(reply => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              isReply={true}
              parentId={comment.id}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="mt-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            Comments ({comments.length + comments.reduce((sum, c) => sum + c.replies.length, 0)})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Comment Form */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {replyingTo ? 'Write a Reply' : 'Leave a Comment'}
            </h4>
            
            {replyingTo && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Replying to a comment. 
                  <button 
                    onClick={() => setReplyingTo(null)}
                    className="ml-2 underline hover:no-underline"
                  >
                    Cancel reply
                  </button>
                </p>
              </div>
            )}
            
            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                  <CheckCircle className="h-5 w-5" />
                  <p className="font-medium">Comment submitted successfully!</p>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  Your comment is pending approval and will appear shortly.
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                  <AlertCircle className="h-5 w-5" />
                  <p className="font-medium">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    name="name"
                    placeholder="Your name *"
                    value={newComment.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full ${validationErrors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {validationErrors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {validationErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your email * (won't be published)"
                    value={newComment.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full ${validationErrors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {validationErrors.email}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <Textarea
                  name="message"
                  placeholder="Write your comment..."
                  value={newComment.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className={`w-full ${validationErrors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                  maxLength={1000}
                />
                <div className="flex justify-between items-center mt-1">
                  {validationErrors.message ? (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {validationErrors.message}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {newComment.message.length}/1000 characters
                    </p>
                  )}
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin h-4 w-4 mr-2" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    {replyingTo ? 'Post Reply' : 'Post Comment'}
                  </>
                )}
              </Button>
            </form>
          </div>
          
          {/* Comments List */}
          <div>
            {comments.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No comments yet. Be the first to share your thoughts!
                </p>
              </div>
            ) : (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Discussion
                </h4>
                {comments.map(comment => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentsSection;