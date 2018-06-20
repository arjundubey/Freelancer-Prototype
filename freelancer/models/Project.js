const Sequelize = require('sequelize');
var Bid = require('../models/Bid');
var User = require('../models/User');

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

const Project = sequelize.define('projects', {
  id : { type: Sequelize.INTEGER, autoIncrement: true , primaryKey : true },
  name: Sequelize.STRING,
  user_id: Sequelize.STRING,
  win_bid_id : Sequelize.INTEGER,
  slug: Sequelize.STRING,
  description: Sequelize.TEXT,
  file: Sequelize.STRING,
  min_budget: Sequelize.DOUBLE,
  max_budget: Sequelize.DOUBLE,
  skills: Sequelize.TEXT,
  status: Sequelize.STRING,
  bid_winner: Sequelize.INTEGER
});


Project.hasMany(Bid, {foreignKey: 'project_id', sourceKey: 'id'});

Bid.belongsTo( Project, {foreignKey: 'project_id'});



module.exports = Project;