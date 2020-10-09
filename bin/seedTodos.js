
const mongoose = require("mongoose");
const TodoModel = require("../models/Todo.model"); // import model

require("../config/db.config"); // ensure you're connected to the db

TodoModel.insertMany([
    {
        name: "Mongoose", description: "There's a goose on the loose"
    },
    {
        name: "React", description: "Catch the goose faster"
    }
])
    .then(() => {
        console.log("Data was added!");
        mongoose.connection.close(); // ensure you've closed the db connection!
    })
    .catch((err) => {
        console.log("Something went wrong", err);
    });