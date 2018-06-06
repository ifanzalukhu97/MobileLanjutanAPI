const Sequelize = require('sequelize')
const sequelize = new Sequelize({
	database: 'mobile_banking',
	username: 'root',
	password: null,
	host: 'localhost',
	dialect: 'mysql',
	operatorsAliases: false
})

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established succesfully.')
	})
	.catch(err => {
		console.error('Unable to connect to database: ', err);
	})

module.exports = sequelize
