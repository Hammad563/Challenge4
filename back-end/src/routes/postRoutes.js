const express = require('express');
const { postComment } = require('../controllers/comment');
const { createPost, fetchPosts, deletePost, details } = require('../controllers/postController');
const auth = require('../utils/auth');
const router = express.Router();
// post routes
router.post('/createPost',auth,createPost);
router.get('/posts/:id/:page',auth, fetchPosts);
router.get('/delete/:id',auth,deletePost);
router.get('/details/:id',auth,details);
router.post('/comment', auth, postComment)

module.exports = router