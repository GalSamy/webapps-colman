const express = require("express")
const {index, search}  = require("../controllers/articles")
const router = express.Router()

router.get("/articles",index)
router.get("/search", search)


module.exports = router
