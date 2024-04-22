const { getAll, create, getOne, remove, update, setGenresToMovies, setActorToMovies, setDirectors } = require('../controllers/movie.controllers');
const express = require('express');

const routerMovie = express.Router();

routerMovie.route('/')
    .get(getAll)
    .post(create);

routerMovie.route('/:id/genres')
    .post(setGenresToMovies)

routerMovie.route('/:id/actors')
    .post(setActorToMovies)

routerMovie.route('/:id/directors')
    .post(setDirectors)

routerMovie.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerMovie;
