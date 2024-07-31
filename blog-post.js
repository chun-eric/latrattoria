'use strict';

import { BLOG_POSTS } from './constants.js';

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  const post = BLOG_POSTS.find(post => post.id === parseInt(postId));

  if (post) {
    document.title = `${post.title} - La Trattoria Blog`;

    const content = `
    <article class="single-blog-post">
        <nav class="blog-nav">
          <a href="blogs.html" class="back-button">&larr; Back to All Posts</a>
        </nav>
        <h2>${post.title}</h2>
        <img src="${post.image}" alt="${post.title}" class="blog-image">
        <div class="blog-meta">
          <span class="blog-date">${post.date} <i class="fa-regular fa-calendar-days"></i></i></span>
          <span class="blog-comments">${post.commentCount} <i class="fa-regular fa-comment"></i></span>
          <span class="blog-likes">${post.likeCount} <i class="fa-solid fa-thumbs-up"></i></span>
        </div>
        <div class="blog-content">
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

  const form = document.getElementById('comment-form');
  const commentsList = document.querySelector('.comments-list');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const comment = document.getElementById('comment').value;
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    newComment.innerHTML = `
      <div class="comment-header">
        <h4 class="comment-author">${name}</h4>
        <span class="comment-date">${date}</span>
      </div>
      <p class="comment-content">${comment}</p>
    `;

    commentsList.prepend(newComment);
    form.reset();
  });
});
