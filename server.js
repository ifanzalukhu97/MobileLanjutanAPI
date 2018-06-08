let express = require('express')
let app = express()
const PORT = process.env.PORT || 5432

let AccountRouter = require('./controller/Account_controller.js')
let TransaksiRouter = require('./controller/Transaksi_controller')

app.use(AccountRouter.AccountCtrl)
app.use(TransaksiRouter)

app.get('/', (req, res) => {
	res.send('Hallo Mahasiswa')
})

app.listen(PORT, function () {
	console.log(`Server jalan di port ${PORT}`)
})
