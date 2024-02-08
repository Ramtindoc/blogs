const express = require("express");
const router = express.Router()
const blogController = require('../controllers/blogController')

  // home route
router.get("/blogs",blogController.blog_index)

  // route with id for body
  router.get("/form/:id",blogController.blog_details)

  // create blogs
    router.get("/form",blogController.blog_create_get);

  // post request to response
  router.post("/form",blogController.blog_create_post);

  // route delete 
    router.delete("/form/:id",blogController.blog_delete)


  module.exports = router