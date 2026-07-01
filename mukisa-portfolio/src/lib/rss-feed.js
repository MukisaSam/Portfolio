// RSS Feed Generator for Blog Posts
// This would typically be generated server-side, but we'll create a client-side version for demo

export const generateRSSFeed = (posts) => {
  const siteUrl = 'https://mukisa.dev';
  const feedTitle = 'Mukisa Samuel - Software Engineering & Cybersecurity Blog';
  const feedDescription = 'Latest insights on software engineering, cybersecurity, ethical hacking, and technology trends from Mukisa Samuel.';
  const authorEmail = 'mukisasamuel2020@gmail.com';
  const authorName = 'Mukisa Samuel';
  
  const rssItems = posts.map(post => {
    const postUrl = `${siteUrl}/blog/${post.id}`;
    const pubDate = new Date(post.date).toUTCString();
    
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${authorEmail} (${authorName})</author>
      <category>${post.category}</category>
      ${post.tags.map(tag => `<category>${tag}</category>`).join('\n      ')}
    </item>`;
  }).join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${feedTitle}</title>
    <description>${feedDescription}</description>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>${authorEmail} (${authorName})</managingEditor>
    <webMaster>${authorEmail} (${authorName})</webMaster>
    <category>Technology</category>
    <category>Software Engineering</category>
    <category>Cybersecurity</category>
    <category>Ethical Hacking</category>
    <ttl>60</ttl>
    <image>
      <url>${siteUrl}/favicon.ico</url>
      <title>${feedTitle}</title>
      <link>${siteUrl}/blog</link>
      <width>32</width>
      <height>32</height>
    </image>
${rssItems}
  </channel>
</rss>`;

  return rssFeed;
};

// Function to download RSS feed as file
export const downloadRSSFeed = (posts) => {
  const rssContent = generateRSSFeed(posts);
  const blob = new Blob([rssContent], { type: 'application/rss+xml' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'mukisa-blog-feed.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Function to generate JSON feed (alternative to RSS)
export const generateJSONFeed = (posts) => {
  const siteUrl = 'https://mukisa.dev';
  
  const jsonFeed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Mukisa Samuel - Software Engineering & Cybersecurity Blog',
    description: 'Latest insights on software engineering, cybersecurity, ethical hacking, and technology trends from Mukisa Samuel.',
    home_page_url: `${siteUrl}/blog`,
    feed_url: `${siteUrl}/feed.json`,
    language: 'en-US',
    icon: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    authors: [
      {
        name: 'Mukisa Samuel',
        url: siteUrl,
        avatar: `${siteUrl}/profile-photo.jpg`
      }
    ],
    items: posts.map(post => ({
      id: `${siteUrl}/blog/${post.id}`,
      url: `${siteUrl}/blog/${post.id}`,
      title: post.title,
      content_html: `<p>${post.excerpt}</p>`,
      content_text: post.excerpt,
      summary: post.excerpt,
      date_published: new Date(post.date).toISOString(),
      date_modified: new Date(post.date).toISOString(),
      authors: [
        {
          name: 'Mukisa Samuel',
          url: siteUrl
        }
      ],
      tags: post.tags,
      language: 'en-US'
    }))
  };

  return JSON.stringify(jsonFeed, null, 2);
};

// Hook to use RSS functionality
export const useRSSFeed = (posts) => {
  const generateRSS = () => generateRSSFeed(posts);
  const downloadRSS = () => downloadRSSFeed(posts);
  const generateJSON = () => generateJSONFeed(posts);
  
  // Generate RSS URL (for demo purposes, in production this would be server-generated)
  const rssUrl = `data:application/rss+xml;charset=utf-8,${encodeURIComponent(generateRSSFeed(posts))}`;
  const jsonUrl = `data:application/json;charset=utf-8,${encodeURIComponent(generateJSONFeed(posts))}`;
  
  return {
    generateRSS,
    downloadRSS,
    generateJSON,
    rssUrl,
    jsonUrl
  };
};