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
		console.log('Berhasil terhubung ke database')
	})
	.catch(err => {
		console.error('Gagal terhubung ke database: ', err);
	})

module.exports = sequelize
