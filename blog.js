'use strict';

// blog.js

import { BLOG_POSTS } from './constants.js';

function createBlogCard(post) {
  return `
    <div class="blog-card">
      <div class="blog-image">
        <img src="${post.image}" alt="${post.title}" />
        <div class="blog-icons">
          <svg class="calendar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
            <path d="M8.2881437,19.1950792 C8.38869181,19.1783212 8.49195996,19.1926955 8.58410926,19.2362761 C9.64260561,19.7368747 10.8021412,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,13.7069096 4.53528582,15.3318588 5.51454846,16.6849571 C5.62010923,16.830816 5.63909672,17.022166 5.5642591,17.1859256 L4.34581002,19.8521348 L8.2881437,19.1950792 Z M3.58219949,20.993197 C3.18698783,21.0590656 2.87870208,20.6565881 3.04523765,20.2921751 L4.53592782,17.0302482 C3.54143337,15.5576047 3,13.818993 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 C10.707529,21 9.4528641,20.727055 8.30053434,20.2068078 L3.58219949,20.993197 Z"/>
          </svg>
          <p>${post.commentCount}</p>
          <svg class="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="#231F20">
            <path d="M48,6c-4.418,0-8.418,1.791-11.313,4.687l-3.979,3.961c-0.391,0.391-1.023,0.391-1.414,0 c0,0-3.971-3.97-3.979-3.961C24.418,7.791,20.418,6,16,6C7.163,6,0,13.163,0,22c0,3.338,1.024,6.436,2.773,9 c0,0,0.734,1.164,1.602,2.031s24.797,24.797,24.797,24.797C29.953,58.609,30.977,59,32,59s2.047-0.391,2.828-1.172 c0,0,23.93-23.93,24.797-24.797S61.227,31,61.227,31C62.976,28.436,64,25.338,64,22C64,13.163,56.837,6,48,6z M58.714,30.977c0,0-0.612,0.75-1.823,1.961S33.414,56.414,33.414,56.414C33.023,56.805,32.512,57,32,57s-1.023-0.195-1.414-0.586 c0,0-22.266-22.266-23.477-23.477s-1.823-1.961-1.823-1.961C3.245,28.545,2,25.424,2,22C2,14.268,8.268,8,16,8 c3.866,0,7.366,1.566,9.899,4.101l0.009-0.009l4.678,4.677c0.781,0.781,2.047,0.781,2.828,0l4.678-4.677l0.009,0.009 C40.634,9.566,44.134,8,48,8c7.732,0,14,6.268,14,14C62,25.424,60.755,28.545,58.714,30.977z"/>
            <path d="M48,12c-0.553,0-1,0.447-1,1s0.447,1,1,1c4.418,0,8,3.582,8,8c0,0.553,0.447,1,1,1s1-0.447,1-1 C58,16.478,53.522,12,48,12z"/>
          </svg>
          <p>${post.likeCount}</p>
        </div>
      </div>
      <div class="blog-content">
        <h3 class="blog-title">${post.title}</h3>
        <div class="blog-meta">
          <svg class="calendar" version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
            <path fill="#231F20" d="M60,4h-7V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H17V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H4 C1.789,4,0,5.789,0,8v52c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V8C64,5.789,62.211,4,60,4z M49,3c0-0.553,0.447-1,1-1 s1,0.447,1,1v3v4c0,0.553-0.447,1-1,1s-1-0.447-1-1V6V3z M13,3c0-0.553,0.447-1,1-1s1,0.447,1,1v3v4c0,0.553-0.447,1-1,1 s-1-0.447-1-1V6V3z M62,60c0,1.104-0.896,2-2,2H4c-1.104,0-2-0.896-2-2V17h60V60z M62,15H2V8c0-1.104,0.896-2,2-2h7v4 c0,1.657,1.343,3,3,3s3-1.343,3-3V6h30v4c0,1.657,1.343,3,3,3s3-1.343,3-3V6h7c1.104,0,2,0.896,2,2V15z"/>
          </svg>
          <p class="blog-date">${post.date}</p>
        </div>
        <p class="blog-text">${post.excerpt}</p>
        <p class="read-more"><a href="blog-post.html?id=${post.id}">Read more...</a></p>
      </div>
    </div>
  `;
}

function renderBlogSection() {
  const blogContainer = document.querySelector('.blog-feed');
  if (blogContainer) {
    blogContainer.innerHTML = BLOG_POSTS.map(post => createBlogCard(post)).join(
      ''
    );
  } else {
    console.log('Cards not renderings');
  }
}

function renderSingleBlogPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get('id'));
  const post = BLOG_POSTS.find(p => p.id === postId);

  if (post) {
    document.title = `${post.title} - La Trattoria Blog`;

    const content = `
      <article class="blog-post">
        <nav class="blog-nav">
          <a href="blogs.html" class="back-button">&larr; Back to All Posts</a>
        </nav>
        <h1>${post.title}</h1>
        <img src="${post.image}" alt="${post.title}" class="blog-image">
        <div class="blog-meta">
          <span class="blog-date">${post.date}</span>
          <span class="blog-comments">${post.commentCount} comments</span>
          <span class="blog-likes">${post.likeCount} likes</span>
        </div>
        <div class="blog-content">
          ${post.content}
        </div>
      </article>
    `;

    const blogPostContent = document.getElementById('blog-post-content');
    if (blogPostContent) {
      blogPostContent.innerHTML = content;
    }
  } else {
    const blogPostContent = document.getElementById('blog-post-content');
    if (blogPostContent) {
      blogPostContent.innerHTML = '<p>Blog post not found.</p>';
    }
  }
}

function init() {
  const currentPage = window.location.pathname;

  if (currentPage.includes('blogs.html')) {
    renderBlogSection();
  } else if (currentPage.includes('blog-post.html')) {
    renderSingleBlogPost();
  }
}

document.addEventListener('DOMContentLoaded', init);
