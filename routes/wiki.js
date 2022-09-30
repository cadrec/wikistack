const router = require('express').Router();
const addPage = require('../views/addPage');
const { Page } = require('../models');
const wikiPage = require('../views/wikiPage');
const main = require('../views/main');

router.get('/', async (req, res, next) => {
    const pages = await Page.findAll();
    res.send(main(pages));
})

router.post('/', async (req, res, next) => {
    try {
        const page = await Page.create({
            title: req.body.title,
            content: req.body.content,
            name: req.body.author
        })
        res.redirect(`/wiki/${page.slug}`);
    }
    catch(e) {
        next(e);
    }
})

router.get('/add', (req, res, next) => {
    res.send(addPage());
})

router.get('/:slug', async (req, res, next) => {
    //res.send(`hit dynamic route at ${req.params.slug}`);
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        })
        // console.log('page', page);
        // console.log(req.body);
        res.send(wikiPage(page));
    }
    catch(err){
        next(err);
    }
  });

// function generateSlug(title) {
//     return title.replace(/\s+/g, '_').replace(/\W/g, '');
// }

module.exports = router;