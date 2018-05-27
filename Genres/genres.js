const express = require("express");
const Joi = require("joi");

const genres = express.Router();

const genresList = [{name: "comedy",id:1}, {name: "sci-fic",id:2}, {name: "Action",id:3}, {name: "Thriller",id:4}, {name: "Mystery",id:5}];

genres.get("/genres", (req, res, next) => {
    res.status(200).json({
        result: genresList,
    });
});

genres.get("/genres/:id", (req, res, next) => {
    const genre = genresList.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(400).send("Genre not found");
    res.status(200).json({
        result: genre,
    });
});

genres.post("/genres", (req, res, next) => {
    const joiSchema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, joiSchema);
    if(result.error) return res.status(400).send(result.error.details[0].message);
    const name = req.body.name;
    res.status(200).json({
        name,
    });
    genresList.push({name, id: genresList.length + 1});
});

genres.put("/genres/:id", (req, res, next) => {
    const genre = genresList.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(400).send("Genre not found");
    
    genre.name = req.body.name;
    res.send(genre);
});

genres.delete("/genres/:id", (req, res, next) => {
    const genre = genresList.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(400).send("Genre not found");
    
    genresList.splice(genresList.indexOf(genre), 1);
    res.status(200).send(genre);
});

module.exports = genres;