const db = require('./db');
const { Movie, Person } = db.models;
const { Op } = db.Sequelize;

// async IIFE
// Why: populate the new table with seed info so that we can test
(async () => {
  await db.sequelize.sync({ force: true });

  try {
    // create() is convenient when you just need to create and save a new record at once (within an Express POST route handler, for example).
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

    // build() is useful when you need to manipulate instances in any way before storing them. build() would also be useful when you need a model instance to bind to a template (for example, a "New Record" form or page). You can create then save a database object from the data bound to the template.
    const movie3 = await Movie.build({
      title: 'Toy Story 3',
      runtime: 103,
      releaseDate: '2010-06-18',
      isAvailableOnVHS: false,
    });
    movie3.title = 'Updated Title' // can manipulate object before saving
    await movie3.save() // build makes the entry, save persists it to the db
    console.log(movie3.toJSON());

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
    
    const person3 = await Person.create({
      firstName: 'Cheech',
      lastName: 'Hanks',
    });
    console.log(person3.toJSON());

    // findByPk
    const movieById = await Movie.findByPk(1);
    console.log(movieById.toJSON());

    // findOne
    const personByFirstName = await Person.findOne({ where: { firstName: 'Brad' } });
    console.log(personByFirstName.toJSON());

    // findAll
    const movies = await Movie.findAll();
    console.log( movies.map(movie => movie.toJSON()));

    // findAll with filters
    const people = await Person.findAll({
      where: {
        lastName: 'Hanks'
      }
    });
    // SELECT * FROM People WHERE lastName = 'Hanks';
    console.log( people.map(person => person.toJSON()) );

    // return only certain columns
    const moviesAnd = await Movie.findAll({
      attributes: ['id', 'title'], // return only these attributes
      where: {
        isAvailableOnVHS: true
      }
    });
    console.log( moviesAnd.map(movie => movie.toJSON()) );

    // using operators
    // https://sequelize.org/master/manual/model-querying-basics.html#operators
    const moviesGte = await Movie.findAll({
      attributes: ['id', 'title'],
      where: {
        releaseDate: {
          [Op.gte]: '2004-01-01' // greater than or equal to the date
        },
        runtime: {
          [Op.gt]: 95, // greater than 95
        },
      },
      order: [['id', 'DESC']] // IDs in descending order
    });
    console.log( moviesGte.map(movie => movie.toJSON()) );

    const moviesReleaseAsc = await Movie.findAll({
      attributes: ['id', 'title', 'releaseDate'],
      where: {
        releaseDate: {
          [Op.gte]: '1995-01-01'
        }
      },
      order: [['releaseDate', 'ASC']], // dates in ascending order
    });
    console.log( moviesReleaseAsc.map(movie => movie.toJSON()) );

    // update record
    // const toyStory3 = await Movie.findByPk(3);
    // toyStory3.isAvailableOnVHS = true;
    // await toyStory3.save();

    // OR:

    // const toyStory3 = await Movie.findByPk(3);
    // await toyStory3.update({
    //   isAvailableOnVHS: true,
    // });
    // console.log( toyStory3.get({ plain: true }) );

    // updating with the fields option
    const toyStory3 = await Movie.findByPk(3);
    await toyStory3.update({
      title: 'Trinket Tale 3', // this will be ignored if not in fields
      isAvailableOnVHS: true,
    }, { fields: ['isAvailableOnVHS'] }); // fields tells update which attribute to update
    console.log( toyStory3.get({ plain: true }) );

    // delete records
    const toyStory = await Movie.findByPk(1);
    await toyStory.destroy()
    const allMovies = await Movie.findAll();
    console.log( allMovies.map(movie => movie.toJSON()) );


  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const errors = err.errors.map(err => err.message)
      console.error('Validation errors: ', errors)
    } else {
      throw err
    }
  }
})();