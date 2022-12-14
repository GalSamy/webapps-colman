const article = [
    {
        id : 1,
        title : "hello",
        content : "world"
    },
    {
        id : 2,
        title : "hello2",
        content : "world2"
    },
    {
        id : 3,
        title : "hello3",
        content : "world3"
    }
]

const getArticles = () => {
    return article;
}

const search = (str) => {
    return [article[1], article[2]];
}

module.exports = {
    getArticles,
    search
}