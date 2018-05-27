const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const genres = require("./Genres/genres");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/api", genres);


// starting engine -  lol
app.listen(3000, (req,res,next) => {
    console.log("app running on port 3000");
})