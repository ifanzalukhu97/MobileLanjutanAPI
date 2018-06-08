const Sequelize = require('sequelize')
const sequelize = require('../config/Mysql')

const Transaksi = sequelize.define('transaksi', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	tanggal: Sequelize.STRING,
	nominal: Sequelize.INTEGER,
	jenis_transaksi: Sequelize.STRING,
	no_rekening: Sequelize.STRING
}, {
	createdAt: false,
	updatedAt: false,
})

module.exports = Transaksi
