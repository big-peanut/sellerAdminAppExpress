const Sequelize=require('sequelize')

const sequelize=new Sequelize('selleritems','root','12345678',{dialect:'mysql',host:'localhost'})

module.exports=sequelize