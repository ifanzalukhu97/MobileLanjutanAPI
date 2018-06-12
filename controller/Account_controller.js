let express = require('express')
let bodyParser = require('body-parser')
let app = express()

let Account = require('../models/Account')

var urlencodedParser = bodyParser.urlencoded({
	extended: false
})

let AccountCtrl = express.Router()
var useraktif = {
	norekening: 12
}

// Router untuk login account
AccountCtrl.post('/login', urlencodedParser, (req, res) => {
	var username = req.body.username
	var noHp = req.body.noHp

	Account.findOne({
			where: {
				username: username,
				nohp: noHp
			}
		}).then(hasil => {

			useraktif.norekening = hasil.norekening
			hasil.dataValues["message"] = "ok"
			res.json(hasil)
		})
		.catch(err => {
			res.json({
				"message": "failed"
			})
		})

})

// Router untuk cek saldo
AccountCtrl.post('/ceksaldo', urlencodedParser, (req, res) => {
	var pin = req.body.pin
	var norekening = req.body.norekening

	Account.findOne({
		attributes: ['saldo'],
		where: {
			norekening: norekening,
			pin: pin
		}
	}).then(hasil => {
		hasil.dataValues["message"] = "ok"
		res.json(hasil)
	}).catch(err => {
		res.json({
			"message": "failed"
		})
	})

})

// Router untuk ganti pin
AccountCtrl.put('/gantipin', urlencodedParser, (req, res) => {
	var pinLama = req.body.pinlama
	var pinBaru = req.body.pinbaru

	Account.update({
		pin: pinBaru
	}, {
		where: {
			norekening: useraktif.norekening,
			pin: pinLama
		}
	}).then(hasil => {
		console.log(hasil)
		res.send('update PIN berhasil')
	})
})

module.exports = {
	AccountCtrl: AccountCtrl,
	useraktif: useraktif
}
