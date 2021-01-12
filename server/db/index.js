const Sequelize = require("sequelize");
const db = new Sequelize('postgres://localhost:5432/shoppies', {
  logging: false
});

const Movie = db.define('movie', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imdbID: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = {
  db, Movie
};
