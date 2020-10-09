const express = require("express");

// when routes are split up in multiple files, we need a router!
const router = express.Router();

const TodoModel = require("../models/Todo.model");

// instead of app.get, it's router.get!!
router.get('/', (req, res) => {
    TodoModel.find()
        .then((todos) => {
            res.render('landing.hbs', { todos });
        })
        .catch((err) => {
            console.log("Something went wrong", err);
        });
});

// the two routes below have the same URL location, but one handles get requests and the other post requests!
router.get("/add-form", (req, res) => {
    res.render("add-form.hbs");
});

router.post("/add-form", (req, res) => {
    console.log(req.body); // body keyword is added by the body-parser!
    TodoModel.create(req.body)
        .then(() => {
            console.log("Data added");
            res.redirect("/"); // redirect the user on POST request to the url in params!
        })
        .catch((err) => {
            console.log("Something went wrong", err);
        });
});

router.get("/todo/:id", (req, res) => {
    let id = req.params.id;

    TodoModel.findById(id)
        .then((todo) => {
            res.render("todo-detail", { todo });
        })
        .catch((err) => {
            console.log("Something went wrong", err);
        });
});

router.get("/todo/:id/delete", (req, res) => {
    let id = req.params.id;
    TodoModel.findByIdAndDelete(id)
        .then(() => {
            console.log("Todo deleted");
            res.redirect("/");
        })
        .catch((err) => {
            console.log("Something went wrong", err);
        });
});

router.get("/todo/:id/edit", (req, res) => {
    let id = req.params.id;
    TodoModel.findById(id)
        .then((todo) => {
            res.render("edit-form", { todo });
        })
        .catch((err) => {
            console.log("Something went wrong", err);
        });
});

router.post("/todo/:id/edit", (req, res) => {
    let id = req.params.id;

    TodoModel.findByIdAndUpdate(id, { $set: req.body })
        .then(() => {
            console.log("data updated");
            res.redirect("/todo/" + id);
        })
        .catch((err) => {
            console.log("Something went wrong", err);
        });
});

module.exports = router;