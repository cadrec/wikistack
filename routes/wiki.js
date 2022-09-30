const router = require('express').Router();
const addPage = require('../views/addPage');
const { Page, User } = require('../models');
const wikiPage = require('../views/wikiPage');
const main = require('../views/main');

router.get('/', async (req, res, next) => {
    const pages = await Page.findAll();
    res.send(main(pages));
})

router.post('/', async (req, res, next) => {
    try {
        const [user, created] = await User.findOrCreate({
            where: {
                name: req.body.author,
                email: req.body.email
            } 
        })

        const page = await Page.create({
            title: req.body.title,
            content: req.body.content,
            name: req.body.author
        })
        // const page = await Page.create(req.body);
        await page.setAuthor(user);

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
    try {
        //This is looking for the page of the slug
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        })
        //This is looking for the user based of the page.authorId 
        const authorId = await User.findOne({
            where: {
                id: page.authorId
            }
        })

        console.log("The author id >>>>", authorId.name);
        res.send(wikiPage(page, authorId.name));
    }
    catch(err){
        next(err);
    }
  });

// function generateSlug(title) {
//     return title.replace(/\s+/g, '_').replace(/\W/g, '');
// }

module.exports = router;