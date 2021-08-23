const db = require('./db');
const { Movie, Person } = db.models;

// async IIFE
// Why: populate the new table with seed info so that we can test
(async () => {
  await db.sequelize.sync({ force: true });

  try {
    const movie = await Movie.create({
      title: 'Toy Story',
      runtime: 81,
      releaseDate: '1995-11-22',
      isAvailableOnVHS: true,
    });
    console.log(movie.toJSON());

    const movie2 = await Movie.create({
      title: 'The Incredibles',
      runtime: 115,
      releaseDate: '2004-04-14',
      isAvailableOnVHS: true,
    });
    console.log(movie2.toJSON());

    const person = await Person.create({
      firstName: 'Tom',
      lastName: 'Hanks',
    });
    console.log(person.toJSON());

    const person2 = await Person.create({
      firstName: 'Brad',
      lastName: 'Pitt',
    });
    console.log(person2.toJSON());

  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const errors = err.errors.map(err => err.message)
      console.error('Validation errors: ', errors)
    } else {
      throw err
    }
  }
})();