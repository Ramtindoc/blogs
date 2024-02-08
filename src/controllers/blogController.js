const Blog = require("../model/blog");

const blog_index = (req, res) => {
    Blog.find()
      .sort({ createdAt: -1 })
      .then((blogs) => {
        res.render("index", { title: "HomePage", blog:blogs });
      });
  };

const blog_details = (req, res) =>{
    const id = req.params.id;
  
    Blog.findById(id).then(result => {
      res.render("details" ,{blog: result , title:"blog detalis"})
  
    }) 
   .catch(err =>{
     console.log(err);
      })
}
const blog_create_get = (req, res) =>{
    res.render("create", { title: "creat a blogs" });
}

const blog_create_post = (req, res) =>{
    const weblog = new Blog(req.body);

    weblog
      .save()
      .then((result) => {
        console.log(result);
        res.redirect("/blogs");
      })
      .catch((err) => {
        console.log(err);
      });
}
const blog_delete = (req, res) =>{
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then(result => {
          res.json({ redirect:'/blogs'})
        })
        .catch(err => console.log(err))
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}