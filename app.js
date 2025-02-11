const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const { result } = require("lodash");
const blogRoutes = require("./router/blogRoutes");
const Blog = require("./model/blog");

app.set("view engine", "ejs");

// Connect To MongoDB
const dbURL =
  "mongodb+srv://<username>@<password>.cgkzupl.mongodb.net/nodejs-course?retryWrites=true&w=majority";

const main = async () => {
  await mongoose.connect(dbURL);

  // Middleware and static files
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("tiny"));

  // create a new query
  app.get("/c-weblog", (req, res) => {
    const blog = new Blog({
      title: "Python",
      snippet: "Python is a popular programming language.",
      body: "Python can be used on a server to create web applications.",
    });
    blog
      .save()
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  });

  app.get("/all-weblogs", (req, res) => {
    Blog.find()
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  });

  app.get("/single-weblog", (req, res) => {
    Blog.findById("65aa4ef84b4cadedcf9e54e7")
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  });

  // deleting document by id
  app.get("/d-single-weblog", (req, res) => {
    Blog.findByIdAndDelete("65b380c3f267e366aa32b7ff")
      .then((result) => {
        if (result) {
          res.send(`Document Deleted : ${result}`);
        } else {
          res.send(`Document Not Founded !!`);
        }
      })
      .catch((err) => console.log(err));
  });

  // deleting all document
  app.get("/d-all-weblog", (req, res) => {
    Blog.deleteMany({})
      .then((result) => {
        if (result) {
          res.send(`Document Deleted : ${result}`);
        } else {
          res.send(`Document Not Founded !!`);
        }
      })
      .catch((err) => console.log(err));
  });

  app.get("/", (req, res) => {
    res.redirect("/blogs");
  });

  app.get("/about", (req, res) => {
    res.render("about", { title: "about" });
  });

  // form route
  app.use(blogRoutes);

  app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
  });

  app.listen(3000);
  console.log("App running on 3000");
};

main();
