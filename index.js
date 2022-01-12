const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Import Models
const Post = require('./src/models/post');

// Define application
const app = express()

// Define DB connection
const db = mongoose.connect('mongodb://localhost:27017/First-node-api-db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
    res.send({ ping: 'pong' })
})

//Operations: Create, Read, Update, Delete
app.post('/posts', function (req, res) {
    //Get values from request payload
    const title = req.body.title
    const author = req.body.author
    const content = req.body.content

    //Assign values to Post Model
    var post = new Post
    post.title = title
    post.author = author
    post.content = content

    //Save the Post
    post.save = function (error, savedPost) {
        if (error) {
            //send error response
            res.status(400).send({ error: 'Unable to save Post' })
        }
        else {
            //send success response
            res.status(200).send(savedPost)
        }
    }
})
// to get list of all the posts which we just posted by post method
app.get("/posts", (req, res) => {

    Post.find({}, (error, posts) => {
        if (error) {
            // error mesg
            res.status(422).send({ error: "Unable to fetch Post" })
        }
        else {
            // send success response
            res.status(200).send(posts)

        }
    })
})

// Tasks for me
// 1. Creating API to get details of a single Post
app.get('/posts/:id', (req, res)=>{
    const {id} = req.params;
    Post.findById(id, (error, Singlepost_deleted)=>{
      if(error) {
        // sends error response
        res.status(422).send({ error: 'Unable to fetch post '})
      } else {
        // sends success response
        res.status(200).send(Singlepost_deleted)
      }
    });
  });
  
  // 2. Creating API to update a Post
  app.patch('/posts/:id', (req, res)=>{
    const {id} = req.params;
   Post.findByIdAndUpdate(id, req.body, {new:true}, (error, updated_post)=>{
      if(error) {
        // sends error response
        res.status(422).send({ error: 'Error in updating post '})
      } else {
        // sends success response
        res.status(200).send(updated_post)
      }
    });
  });
  
  // 3. Creating API to delete a Post
  app.delete('/posts/:id', (req, res)=>{
    const {id} = req.params;
    Post.findByIdAndDelete(id, (error,post_deleted )=>{
      if(error) {
        // sends error response
        res.status(422).send({ error: 'Unable to delete post '})
      } else {
        // sends success response
        res.status(200).send(post_deleted)
      }
    });
  });

app.listen(3001, function () {
    console.log('Server is running')
})