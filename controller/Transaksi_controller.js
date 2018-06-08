const Sequelize = require('sequelize')
let express = require('express')
let bodyParser = require('body-parser')
let app = express()

const Op = Sequelize.Op

var AccountCtrl = require('./Account_controller')

let Transaksi = require('../models/Transaksi')
let Account = require('../models/Account')

const sequelize = require('../config/Mysql')

var urlencodedParser = bodyParser.urlencoded({
	extended: false
})

let TransaksiCtrl = express.Router()

// Router untuk tes/debug
TransaksiCtrl.get('/tes', (req, res) => {
	Transaksi.findAll({
		attributes: ['id', 'nominal', 'jenis_transaksi'],
		where: {
			tanggal: {
				[Op.like]: "2018-07%"
			}
		}
	}).then(hasil => {
		res.send(hasil)
	})
})

// Router untuk transfer antar rekeing
TransaksiCtrl.post('/transfer', urlencodedParser, (req, res) => {
	var norekening = AccountCtrl.useraktif.norekening
	var norektujuan = req.body.norektujuan
	var pin = req.body.pin
	var nominal = parseInt(req.body.nominal)
	var tanggal = new Date().toJSON().slice(0, 10)

	Account.findOne({
		where: {
			norekening: norekening,
			pin: pin
		}
	}).then(hasil => {

		Transaksi.create({
				tanggal: tanggal,
				nominal: nominal,
				jenis_transaksi: 'uang masuk',
				no_rekening: norektujuan
			})
			.then(hasil => {
				Account.findOne({
					attributes: ['saldo'],
					where: {
						norekening: norektujuan
					}
				}).then(hasil => {
					Account.update({
						saldo: parseInt(hasil.saldo) + nominal
					}, {
						where: {
							norekening: norektujuan
						}
					})
				})

				Transaksi.create({
					tanggal: tanggal,
					nominal: nominal,
					jenis_transaksi: 'transfer',
					no_rekening: norekening
				})
			}).then(hasil => {
				Account.findOne({
					attributes: ['saldo'],
					where: {
						norekening: norekening
					}
				}).then(hasil => {
					Account.update({
						saldo: parseInt(hasil.saldo) - nominal
					}, {
						where: {
							norekening: norekening
						}
					})
				})

				res.send('transfer berhasil')
			})
	})
})

TransaksiCtrl.post('/mutasi', urlencodedParser, (req, res) => {
	var norekening = AccountCtrl.useraktif.norekening
	var pin = req.body.pin
	var bulan = req.body.bulan

	Transaksi.findAll({
		attributes: ['id', 'nominal', 'jenis_transaksi'],
		where: {
			tanggal: {
				[Op.like]: `2018-${bulan}%`
			},
			no_rekening: norekening
		}
	}).then(hasil => {
		res.send(hasil)
	})

})

module.exports = TransaksiCtrl
