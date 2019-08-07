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




module.exports = router