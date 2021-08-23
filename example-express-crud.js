const { Router } = require('express');
const { Movie } = require('../models');

const router = new Router();

/* POST create movie */
router.post('/', async (req, res, next) => {
  const movie = await Movie.create(req.body);
  res.redirect('/movies/' + movie.id);
});

/* GET / retrieve movie to update */
router.get('/:id/edit', async (req, res, next) => {
  const movie = await Movie.findByPk(req.params.id);
  res.render('movies/edit', { movie, title: 'Edit Movie' });
});

/* PUT update movie */
router.put('/:id', async (req, res, next) => {
  const movie = await Movie.findByPk(req.params.id);
  await movie.update(req.body);
  res.redirect('/movies/' + movie.id);
});

/* Delete movie */
router.post('/movies/:id/delete', async (req, res) => {
  const movieToDelete = await Movie.findByPk(req.params.id);
  await movieToDelete.destroy();
  res.redirect('/movies');
});
