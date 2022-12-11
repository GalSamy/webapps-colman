const Articles = require("../models/article");

const index = (req,res) => {
    res.render('../views/articles.ejs', {articles : Articles.getArticles()});
}

const search = (req,res) => {
    res.render('../views/articles.ejs', {articles : Articles.search("query")});
}

module.exports = {
    index,
    search
}