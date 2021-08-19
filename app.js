const Sequelize = require("sequelize");

// Why: creating sequelize instance to create a movies database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "movies.db",
});

// Why: creating a new table in sequelize and setting it's columns
class Movie extends Sequelize.Model {}
Movie.init(
  {
    title: Sequelize.STRING,
  },
  { sequelize }
);

// async IIFE
// Why: populate the new table with seed info so that we can test
(async () => {
  await sequelize.sync({ force: true }); // tells the database to drop the table before creating new table IF NOT EXISTS

  try {
    const movieInstances = await Promise.all([
      Movie.create({
        title: 'Toy Story'
      }),
      Movie.create({
        title: 'The Incredibles'
      }),
    ])
    const moviesJSON = movieInstances.map(movie => movie.toJSON())
    console.log(moviesJSON);
  } catch (err) {
    console.error("Error connecting to the database: ", err);
  }
})();
