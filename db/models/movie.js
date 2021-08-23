const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {}
  Movie.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "title"!',
        },
        notEmpty: {
          msg: '"title" cannot be an empty string!'
        }
      },
    },
    runtime: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "runtime"!',
        },
        min: {
          args: 1,
          msg: 'Please provide a value greater than "0" for "runtime"',
        }
      },
    },
    releaseDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "releaseDate"!',
        },
        isAfter: {
          args: '1895-12-27',
          msg: 'Please provide a value on or after "1895-12-28" for "releaseDate"',
        }
      },
    },
    isAvailableOnVHS: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
      // timestamps: false, // disable timestamps
      // freezeTableName: true, // disables pluralization of table name
      // modelName: 'movie', // renames model while also accounting for freezeTableName setting
      // tableName: 'my_movies_table', // table name change
      paranoid: true, // enable "soft" deletes + creates deleted_at column; When running queries, Sequelize will automatically filter out records whose deletedAt column values are not null. Those records will no longer be included in future queries.
      sequelize
    });

  return Movie;
};