const mongoose = require('mongoose');

// We connect to our local database here called `todos`
let configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, 
};
mongoose.connect('mongodb://localhost/todos', configOptions)
    .then((self) => {
        console.log('Yayyy Database is connected');
    })
    .catch(() => {
        console.log('Something went wrong with db connection!');
    });
