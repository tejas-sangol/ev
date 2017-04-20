var Sequelize = require('sequelize');
var sequelize = new Sequelize({
  dialect:"sqlite",
  storage:"db"
  });

var user = sequelize.define('user',{
  id:{type:Sequelize.INTEGER,allowNull:false},
  name_ps:{type:Sequelize.STRING,allowNull:false},
  timestamp:{type:Sequelize.STRING,primaryKey:true},
  room:{type:Sequelize.STRING, allowNull:false}
})

sequelize.sync({force:true});

module.exports = user