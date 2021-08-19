const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db'
});

// async IIFE
(async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection to database successful!');
  } catch (err) {
    console.error('Error connecting to the database: ', err)
  }
})();