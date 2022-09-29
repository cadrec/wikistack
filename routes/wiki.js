const router = require('express').Router();
const addPage = require('../views/addPage');
const { Page } = require('../models');

router.get('/', (req, res, next) => {
    res.send('Redirected');
})

router.post('/', async (req, res, next) => {
    try {
        const page = await Page.create({
            title: req.body.title,
            content: req.body.content,
            name: req.body.author
        })
    }
    catch(e) {
        next(e);
    }
})

router.get('/add', (req, res, next) => {
    res.send(addPage());
})

// function generateSlug(title) {
//     return title.replace(/\s+/g, '_').replace(/\W/g, '');
// }

module.exports = router;