const Sequelize = require('sequelize')
const sequelize = require('../config/Mysql')

const Account = sequelize.define('account', {
	norekening: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	username: Sequelize.STRING,
	nama: Sequelize.STRING,
	email: Sequelize.STRING,
	nohp: Sequelize.STRING,
	pin: Sequelize.STRING,
	saldo: Sequelize.INTEGER
}, {
	createdAt: false,
	updatedAt: false,
})

module.exports = Account
