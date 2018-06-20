const Sequelize = require('sequelize');
const User = require('./User');


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


const Bid = sequelize.define('bids', {
  id : { type: Sequelize.INTEGER, autoIncrement: true , primaryKey : true },
  project_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER,
  description: Sequelize.TEXT,
  price: Sequelize.DOUBLE,
  time: Sequelize.STRING,

});

 
module.exports = Bid;