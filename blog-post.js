'use strict';

import { BLOG_POSTS } from './constants.js';

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  const post = BLOG_POSTS.find(post => post.id === parseInt(postId));

  if (post) {
    document.title = `${post.title} - La Trattoria Blog`;

    const content = `
    <article class="blog-post">
     <nav class="blog-nav">
      <a href="blogs.html" class="back-button">&larr; Back to All</a>
     </nav>
     <h1>${post.title}</h1>
     <img src="${post.image}" alt="${post.title}" class="blog-image" />
     <div className="blog-meta">
      <span class="blog-date">${post.date}</span>
      <span class="blog-comment">${post.commentCount} Comments</span>
      <span class="blog-like">${post.likeCount} Likes</span> 
    </div>
    <div className="blog-content">
        ${post.content}
    </div>
    </article>
    `;

    document.getElementById('blog-post-content').innerHTML = content;
  } else {
    document.getElementById(
      'blog-post-content'
    ).innerHTML = `<p>Blog post not found</p>`;
  }
});
