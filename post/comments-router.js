const router = require('express').Router()
const Posts = require('../data/db')


router.get('/:id/comments', (req, res) => {
    const postId = req.params.id

    Posts.findPostComments(postId)
        .then(comments => {
            if(!comments) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(comments)
            }

        })
        .catch(err => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
});

router.post('/:id/comments', (req, res) => {
    const comment = req.body
    const postId = req.params.id

    Posts.findById(postId)
        .then(post => {
            if(!post) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })

    if(!comment.text.trim()) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }
    else {
        Posts.insertComment(comment)
        .then(refObj => {
            res.status(201).json(refObj)
        })
        .catch()
    }
});















module.exports = router