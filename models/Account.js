let Account = function ({
	norekening,
	username,
	nama,
	email,
	nohp,
	pin,
	saldo
} = {}) {
	this.norekening = norekening;
	this.username = username;
	this.nama = nama;
	this.email = email;
	this.nohp = nohp;
	this.pin = pin;
	this.saldo = saldo;
}

module.exports = Account;
