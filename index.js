const express = require("express");
const Mongoose = require("mongoose");
const PORT = 9110;
const ADDRESS = "localhost";
const app = express();

app.use(express.json());
// app.use(express.urlencoded({extended: true}));
require('./books')(app);

Mongoose.connect("mongodb://localhost/express", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Now Connected to Mongodb"))
    .catch(err => console.error("something went wrong", err));


app.listen((ADDRESS,PORT), () => {
    console.log(`server is listening on port: http://${ADDRESS}: ${PORT}`);
  });

