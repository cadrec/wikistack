const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page',{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false 
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    }
})

const User = db.define('user',{
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate:{
            isEmail: true
        }
    }
})

// Page.addHook('beforeValidate', (page, options) => {
//     page.slug = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
// })

Page.beforeValidate((page) => {
    if(!page.slug){
        page.slug = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
    }
})

module.exports = {
    db,
    Page,
    User
}