const express = require('express');
const router = express.Router();
const multer = require('multer');
const Post = require('../models/Post');
const authenticate = require('../middleware/authenticate');

const storage = multer.memoryStorage(); // Store the uploaded file in memory
const upload = multer({ storage: storage });

// CREATE POST
router.post('/blog', upload.single('photo'), async (req, res) => {
  const { title, description, username } = req.body;

  // Split the description into paragraphs
  // const paragraphs = description.split("\n\n"); // Split by newline character

  // Get the uploaded file from memory
  const file = req.file;

  try {
    let newPost;

    if (file) {
      newPost = new Post({
        title: title,
        description: description, // Store the paragraphs array
        photo: {
          data: file.buffer, // Set the photo data to the uploaded file's buffer data
          contentType: file.mimetype, // Set the photo content type
        },
        username: username,
      });
    } else {
      newPost = new Post({
        title: title,
        description: paragraphs, // Store the paragraphs array
        username: username,
      });
    }

    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json(err);
  }
});

// GET ALL POSTS
router.get('/blog', async (req, res) => {
  try {
    const posts = await Post.find();
    const modifiedPosts = posts.map(post => {
      let modifiedPost = {
        _id: post._id,
        title: post.title,
        description: post.description.join('\n'), // Join the paragraphs array into a single string
      };

      if (post.photo && post.photo.data) {
        modifiedPost.photo = `data:${post.photo.contentType};base64,${post.photo.data.toString('base64')}`;
      }

      return modifiedPost;
    });
    res.status(200).json(modifiedPosts);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json(err);
  }
});

// DELETE POST
router.delete('/blog/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
