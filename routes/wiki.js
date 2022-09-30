const router = require('express').Router();
const addPage = require('../views/addPage');
const { Page, User } = require('../models');
const wikiPage = require('../views/wikiPage');
const main = require('../views/main');
const userList = require('../views/userList');
const userPages = require('../views/userPages');

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

router.get('/users', async (req, res, next) => {
    try{
        const user = await User.findAll();
        res.send(userList(user));
    }
    catch(err){
        next(err);
    }
})

router.get('users/id', async (req, res, next) => {
    try{
        const authorName = await User.findOne({
            where: {
                name: req.params.author
            }
        })
        const pages = await Page.findAll()
        console.log("pages >>>>>>", authorName);
        res.send(userPages(authorName, pages));
    }
    catch(err){
        next(err);
    }
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

        //console.log("The author id >>>>", authorId.name);
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