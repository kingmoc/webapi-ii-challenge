const router = require('express').Router()
const Posts = require('../data/db')

router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json( { error: "The posts information could not be retrieved." })
        })
});

router.get('/:id', (req, res) => {
    const postId = req.params.id

    Posts.findById(postId)
        .then(post => {
            if(!post) {
                res.status(404).json({ message: "The post with the specified ID does not exist." }) 
            } else {
                res.status(200).json(post)
            }
        })
        .catch(err => {
            res.status(500).json({error: "The post information could not be retrieved."})
        })
});

router.post('/', (req, res) => {
    const postInfo = req.body

    if(!postInfo.title.trim()) {
        res.status(400).json({ errorMessage: "Please provide title for the post." })
    } 
    else if(!postInfo.contents.trim()) {
        res.status(400).json({ errorMessage: "Please provide contents for the post." })
    }

    Posts.insert(postInfo)
        .then(refOb => {
            Posts.findById(refOb.id)
                .then(post => {
                    res.status(201).json(post)
                })
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
});

router.delete('/:id', (req, res) => {
    const postId = req.params.id
    let savedPost = []

    Posts.findById(postId)
        .then(post => {
           savedPost = post
        })

    Posts.remove(postId)
        .then(num => {
            if(num === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            else {
                res.status(200).json(savedPost)
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post could not be removed" })
        })
});




module.exports = router