let mysql = require('mysql')
let conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'mobile_banking'
})

conn.connect()

module.exports = conn
