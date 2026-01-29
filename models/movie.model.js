const db = require('../config/database');

const findAll = callback => {
  const sql = 'SELECT * FROM movie';
  db.query(sql, callback);
};

const getById = (id, callback) => {
  const sql = 'SELECT * FROM movie WHERE id = ?';
  db.query(sql, [id], callback);
};

const create = (movie, callback) => {
  const sql =
    'INSERT INTO movie (title, yt_url, thumbnail, subtitles, stack, ia_type, status, director_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(
    sql,
    [
      movie.title,
      movie.yt_url,
      movie.thumbnail,
      movie.subtitles,
      movie.stack,
      movie.ia_type,
      movie.status,
      movie.director_id,
    ],
    callback
  );
};

const edit = (id, movie, callback) => {
  const sql =
    'UPDATE movie SET title = ?, yt_url = ?, thumbnail = ?, subtitles = ?, stack = ?, ia_type = ?, status = ?, director_id = ? WHERE id = ?';
  db.query(
    sql,
    [
      movie.title,
      movie.yt_url,
      movie.thumbnail,
      movie.subtitles,
      movie.stack,
      movie.ia_type,
      movie.status,
      movie.director_id,
      id,
    ],
    callback
  );
};

const deleteMovie = (id, callback) => {
  const sql = 'DELETE FROM movie WHERE id = ?';
  db.query(sql, [id], callback);
};

module.exports = {
  findAll,
  getById,
  create,
  edit,
  deleteMovie,
};
