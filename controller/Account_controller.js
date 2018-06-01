let express = require('express')
let bodyParser = require('body-parser')
let app = express()

let Account = require('../models/Account')
let db = require('../config/Mysql')

var urlencodedParser = bodyParser.urlencoded({
	extended: false
})

let AccountCtrl = express.Router()

// Router untuk login account
AccountCtrl.post('/login', urlencodedParser, (req, res) => {
	var username = req.body.username
	var noHp = req.body.noHp

	let query = 'SELECT * FROM account WHERE username = ? AND nohp = ?'
	db.query(query, [username, noHp], (err, hasil) => {
		if (err) throw err

		res.json(hasil)
	})
})

// Router untuk cek saldo
AccountCtrl.post('/ceksaldo', urlencodedParser, (req, res) => {
	var pin = req.body.pin
	var norekening = req.body.norekening

	let query = 'SELECT saldo FROM account WHERE norekening = ? AND pin = ?'
	db.query(query, [norekening, pin], (err, hasil) => {
		if (err) throw err

		res.json(hasil)
	})
})


module.exports = AccountCtrl
