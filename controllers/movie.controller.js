const Movie = require('../models/movie.model');

const getAllMovies = (req, res) => {
  Movie.findAll((error, result) => {
    if (error) {
      console.error('❌ Erreur lors de la requête SQL:', error.message);
      return res.status(500).send('Erreur serveur');
    }

    res.status(200).json(result);
  });
};

const getMovieById = (req, res) => {
  const { id } = req.params;

  Movie.getById(id, (error, result) => {
    if (error) {
      console.error('❌ Erreur lors de la requête SQL:', error.message);
      return res.status(500).send('Erreur serveur');
    }
    if (result.length === 0) {
      return res.status(404).send('Movie non trouvé');
    }
    res.json(result[0]);
  });
};

const createMovie = (req, res) => {
  const movie = {
    title: req.body.title,
    yt_url: req.body.yt_url,
    thumbnail: req.body.thumbnail,
    subtitles: req.body.subtitles,
    stack: req.body.stack,
    ia_type: req.body.ia_type,
    status: req.body.status,
    director_id: req.body.director_id,
  };

  Movie.create(movie, (error, result) => {
    if (error) {
      console.error('❌ SQL Error:', error.message);
      return res.status(500).send('Erreur serveur');
    }

    res.status(201).json({
      id: result.insertId,
      ...movie,
    });
  });
};

const updateMovie = (req, res) => {
  const { id } = req.params;

  const movie = {
    title: req.body.title,
    yt_url: req.body.yt_url,
    thumbnail: req.body.thumbnail,
    subtitles: req.body.subtitles,
    stack: req.body.stack,
    ia_type: req.body.ia_type,
    status: req.body.status,
    director_id: req.body.director_id,
  };

  Movie.edit(id, movie, (error, result) => {
    if (error) {
      console.error('❌ Erreur SQL:', error.message);
      return res.status(500).send('Erreur serveur');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Movie non trouvé');
    }

    res.status(200).json({ id: Number(id), ...movie });
  });
};

const deleteMovie = (req, res) => {
  const { id } = req.params;

  Movie.deleteMovie(id, (error, result) => {
    if (error) {
      console.error('❌ Erreur SQL:', error.message);
      return res.status(500).send('Erreur serveur');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Movie non trouvé');
    }

    res.status(204).send();
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
