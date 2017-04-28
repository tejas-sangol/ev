var Sequelize = require('sequelize');
var sequelize = new Sequelize({
	 dialect: "sqlite",
	storage:"./database.sqlite"
});

var user = sequelize.define('user',{
  key:{type:Sequelize.STRING,primaryKey:true},
  id:{type:Sequelize.INTEGER,allowNull:false},
  timestamp:{type:Sequelize.STRING,allowNull:false},
  room:{type:Sequelize.STRING, allowNull:false},
  name_ps:{type:Sequelize.STRING, allowNull:false}
})

sequelize.sync({force:true});

module.exports = user
