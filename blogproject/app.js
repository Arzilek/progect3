const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const blogPosts = [];

// Routes
app.get('/', (req, res) => {
  res.render('main', { blogPosts });
});

app.get('/post/:id', (req, res) => {
  const postId = req.params.id;
  const post = blogPosts[postId];
  res.render('post', { post });
});

app.get('/new', (req, res) => {
  res.render('newpost');
});

app.post('/new', (req, res) => {
  const { title, content } = req.body;
  blogPosts.push({ title, content });
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
