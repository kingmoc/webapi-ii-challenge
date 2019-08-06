const router = require('express').Router()
const Posts = require('../data/db')

router.get('/', (req, res) => {
    res.send('Router Works')
});




module.exports = router