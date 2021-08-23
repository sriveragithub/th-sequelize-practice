const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Person extends Sequelize.Model {}
  Person.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "firstName"!',
        },
        notEmpty: {
          msg: '"firstName" cannot be an empty string!'
        }
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "lastName"!',
        },
        notEmpty: {
          msg: '"lastName" cannot be an empty string!',
        }
      },
    },
  }, {
      timestamps: false, // disable timestamps
      freezeTableName: true, // disables pluralization of table name
      // modelName: 'person', // renames model while also accounting for freezeTableName setting
      // tableName: 'my_person_table', // table name change
      sequelize
    });

  return Person;
};