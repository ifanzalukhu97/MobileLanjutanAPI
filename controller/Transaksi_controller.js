const Sequelize = require('sequelize')
let express = require('express')
let bodyParser = require('body-parser')
let app = express()

const Op = Sequelize.Op

var AccountCtrl = require('./Account_controller')

let Transaksi = require('../models/Transaksi')
let Account = require('../models/Account')
let Va = require('../models/VA')

const sequelize = require('../config/Mysql')

var urlencodedParser = bodyParser.urlencoded({
	extended: false
})

let TransaksiCtrl = express.Router()

// Router untuk tes/debug
TransaksiCtrl.get('/tes', (req, res) => {
	Va.findOne({
		where: {
			no_va: 1234567890
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

// Router untuk mutasi
TransaksiCtrl.post('/mutasi', urlencodedParser, (req, res) => {
	var norekening = req.body.norekening
	var pin = req.body.pin
	var bulan = req.body.bulan

	Transaksi.findAll({
			attributes: ['id', 'tanggal', 'nominal', 'jenis_transaksi'],
			where: {
				tanggal: {
				[Op.like]: `2018-${bulan}%`
				},
				no_rekening: norekening
			}
		}).then(hasil => {
			res.json(hasil)
		})
		.catch(err => {
			res.send("error")
		})

})

// Route cek nova
TransaksiCtrl.post('/cekva', urlencodedParser, (req, res) => {
	nova = parseInt(req.body.nova)

	Va.findOne({
			where: {
				no_va: nova
			}
		}).then(hasil => {

			if (hasil == null) {
				res.json({
					message: "kosong"
				})
			}

			hasil.dataValues["message"] = "ok"
			res.send(hasil)
		})
		.catch(err => {
			res.json({
				message: "error"
			})
		})

})

// Route transaksiva
TransaksiCtrl.post('/transaksiva', urlencodedParser, (req, res) => {
	var pin = req.body.pin
	var norek = req.body.norek
	var nominal = parseInt(req.body.nominal)
	var nova = req.body.nova
	var ket = req.body.ket
	var tanggal = new Date().toJSON().slice(0, 10)

	Account.findOne({
		where: {
			norekening: norek,
			pin: pin
		}
	}).then(hasil => {

		if (hasil !== null) {
			Transaksi.create({
				tanggal: tanggal,
				nominal: nominal,
				jenis_transaksi: ket + " VA " + nova,
				no_rekening: norek
			}).then(hasil => {
				res.json({
					// berhasil input ke table transaksi
					message: "ok"
				})
			}).catch(err => {
				res.json({
					// gagal input ke table transaksi
					message: "gagal"
				})
			})
		} else {
			console.log(hasil)
			res.json({
				// norek dan pin tidak sesuai
				message: "kosong"
			})
		}
	}).catch(err => {
		res.json({
			// format pin dan norek tidak sesuai
			message: "error"
		})
	})

})


module.exports = TransaksiCtrl
