const Sequelize = require('sequelize')
const sequelize = require('../config/Mysql')

const VA = sequelize.define('va', {
	no_va: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	nominal: Sequelize.INTEGER,
	keterangan: Sequelize.STRING
}, {
	createdAt: false,
	updatedAt: false,
})

module.exports = VA
