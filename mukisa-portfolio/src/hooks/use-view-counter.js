import { useState, useEffect } from 'react';

// Simple localStorage-based view counter
export const useViewCounter = (itemId, type = 'project') => {
  const [views, setViews] = useState(0);
  const storageKey = `views_${type}_${itemId}`;

  useEffect(() => {
    // Get existing view count
    const existingViews = parseInt(localStorage.getItem(storageKey) || '0');
    
    // Increment view count (simulate real tracking)
    const newViewCount = existingViews + Math.floor(Math.random() * 3) + 1;
    localStorage.setItem(storageKey, newViewCount.toString());
    
    setViews(newViewCount);
  }, [itemId, storageKey]);

  // Function to manually increment views (for actual view tracking)
  const incrementViews = () => {
    const newViews = views + 1;
    setViews(newViews);
    localStorage.setItem(storageKey, newViews.toString());
  };

  return { views, incrementViews };
};

// Get initial view counts with some realistic base numbers
export const getInitialViews = (itemId, type = 'project') => {
  if (typeof window === 'undefined') return 0;
  
  const storageKey = `views_${type}_${itemId}`;
  const existing = localStorage.getItem(storageKey);
  
  if (!existing) {
    // Generate realistic initial view counts
    const baseViews = type === 'blog' 
      ? Math.floor(Math.random() * 500) + 150  // Blog posts: 150-650 views
      : Math.floor(Math.random() * 300) + 50;  // Projects: 50-350 views
    
    localStorage.setItem(storageKey, baseViews.toString());
    return baseViews;
  }
  
  return parseInt(existing);
};

export default useViewCounter;