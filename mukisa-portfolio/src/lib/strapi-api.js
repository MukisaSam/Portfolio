import axios from 'axios';

// Strapi configuration
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

// Create axios instance with default config
const strapiApi = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(STRAPI_API_TOKEN && {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`
    })
  }
});

// Request interceptor for debugging
strapiApi.interceptors.request.use(
  (config) => {
    console.log('Strapi API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
strapiApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Strapi API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Blog Posts API
export const blogAPI = {
  // Get all blog posts
  async getAllPosts(params = {}) {
    try {
      const queryParams = {
        'populate': '*',
        'sort[0]': 'publishedAt:desc',
        ...params
      };
      
      const response = await strapiApi.get('/blog-posts', { params: queryParams });
      return {
        data: response.data.data || [],
        meta: response.data.meta || {}
      };
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return { data: [], meta: {} };
    }
  },

  // Get single blog post by ID
  async getPostById(id) {
    try {
      const response = await strapiApi.get(`/blog-posts/${id}`, {
        params: { 'populate': '*' }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  },

  // Get blog post by slug
  async getPostBySlug(slug) {
    try {
      const response = await strapiApi.get('/blog-posts', {
        params: {
          'filters[slug][$eq]': slug,
          'populate': '*'
        }
      });
      return response.data.data[0] || null;
    } catch (error) {
      console.error('Error fetching blog post by slug:', error);
      return null;
    }
  },

  // Search blog posts
  async searchPosts(query, filters = {}) {
    try {
      const searchParams = {
        'populate': '*',
        'sort[0]': 'publishedAt:desc',
        ...filters
      };

      // Add search filters
      if (query) {
        searchParams['filters'][$or] = [
          { title: { $containsi: query } },
          { excerpt: { $containsi: query } },
          { content: { $containsi: query } }
        ];
      }

      const response = await strapiApi.get('/blog-posts', { params: searchParams });
      return {
        data: response.data.data || [],
        meta: response.data.meta || {}
      };
    } catch (error) {
      console.error('Error searching blog posts:', error);
      return { data: [], meta: {} };
    }
  }
};

// Comments API
export const commentsAPI = {
  // Get comments for a blog post
  async getPostComments(postId) {
    try {
      const response = await strapiApi.get('/comments', {
        params: {
          'filters[blog_post][id][$eq]': postId,
          'filters[approved][$eq]': true,
          'sort[0]': 'createdAt:desc',
          'populate': '*'
        }
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  },

  // Create a new comment
  async createComment(commentData) {
    try {
      const response = await strapiApi.post('/comments', {
        data: {
          ...commentData,
          approved: false, // Comments need approval by default
          createdAt: new Date().toISOString()
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  },

  // Update comment (for likes, etc.)
  async updateComment(commentId, updateData) {
    try {
      const response = await strapiApi.put(`/comments/${commentId}`, {
        data: updateData
      });
      return response.data.data;
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  },

  // Delete comment (admin only)
  async deleteComment(commentId) {
    try {
      await strapiApi.delete(`/comments/${commentId}`);
      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  },

  // Report comment
  async reportComment(commentId, reason) {
    try {
      const response = await strapiApi.post('/comment-reports', {
        data: {
          comment: commentId,
          reason: reason,
          reported_at: new Date().toISOString()
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error reporting comment:', error);
      throw error;
    }
  }
};

// Categories API
export const categoriesAPI = {
  // Get all categories
  async getAllCategories() {
    try {
      const response = await strapiApi.get('/categories', {
        params: { 'populate': '*' }
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }
};

// Tags API
export const tagsAPI = {
  // Get all tags
  async getAllTags() {
    try {
      const response = await strapiApi.get('/tags', {
        params: { 'populate': '*' }
      });
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  }
};

// Utility functions
export const strapiUtils = {
  // Get image URL from Strapi media
  getImageUrl(imageData) {
    if (!imageData) return null;
    
    // Handle both single image and image array
    const image = Array.isArray(imageData) ? imageData[0] : imageData;
    
    if (!image?.attributes?.url) return null;
    
    // Return full URL if it's already absolute, otherwise prepend Strapi URL
    return image.attributes.url.startsWith('http') 
      ? image.attributes.url 
      : `${STRAPI_URL}${image.attributes.url}`;
  },

  // Format Strapi date
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  // Convert Strapi rich text to HTML (basic implementation)
  richTextToHtml(richText) {
    if (!richText) return '';
    
    // This is a basic implementation - for production, use a proper rich text renderer
    if (typeof richText === 'string') return richText;
    
    // Handle Strapi's rich text format (blocks)
    if (Array.isArray(richText)) {
      return richText.map(block => {
        switch (block.type) {
          case 'paragraph':
            return `<p>${block.children?.map(child => child.text).join('') || ''}</p>`;
          case 'heading':
            const level = block.level || 1;
            return `<h${level}>${block.children?.map(child => child.text).join('') || ''}</h${level}>`;
          case 'list':
            const listType = block.format === 'ordered' ? 'ol' : 'ul';
            const items = block.children?.map(item => 
              `<li>${item.children?.map(child => child.text).join('') || ''}</li>`
            ).join('') || '';
            return `<${listType}>${items}</${listType}>`;
          default:
            return block.children?.map(child => child.text).join('') || '';
        }
      }).join('');
    }
    
    return richText.toString();
  },

  // Generate slug from title
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
};

// Error handling utilities
export const strapiErrors = {
  isConnectionError(error) {
    return error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND';
  },

  isAuthError(error) {
    return error.response?.status === 401 || error.response?.status === 403;
  },

  isNotFoundError(error) {
    return error.response?.status === 404;
  },

  getErrorMessage(error) {
    if (this.isConnectionError(error)) {
      return 'Unable to connect to the content management system. Please try again later.';
    }
    
    if (this.isAuthError(error)) {
      return 'Authentication failed. Please check your credentials.';
    }
    
    if (this.isNotFoundError(error)) {
      return 'The requested content was not found.';
    }
    
    return error.response?.data?.error?.message || error.message || 'An unexpected error occurred.';
  }
};

export default strapiApi;