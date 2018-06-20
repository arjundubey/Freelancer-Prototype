const Sequelize = require('sequelize');
const Bid = require('./Bid');
const Project = require('./Project');

var sequelize = new Sequelize(process.env.DB,process.env.DB_USER,process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 0,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

const User = sequelize.define('users', {
  id : { type: Sequelize.INTEGER, autoIncrement: true , primaryKey : true },
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  avatar: Sequelize.STRING,
  skills: Sequelize.STRING,
  phone: Sequelize.STRING,
  about: Sequelize.TEXT,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  type: Sequelize.STRING

});


User.hasMany(Bid, {foreignKey: 'user_id', sourceKey: 'id'});
User.hasMany(Project, {foreignKey: 'user_id', sourceKey: 'id'});

Bid.belongsTo( User, {foreignKey: 'user_id'});
Project.belongsTo( User, {foreignKey: 'user_id'});


module.exports = User;