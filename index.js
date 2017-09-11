var banco = {
   		saldo_bancario: 0,
   		clientes: [],
   		registrados: [],
};

var Cliente = function(cpf, nome, senha,saldo,status){
   	this.cpf = cpf;
   	this.nome = nome;
  	this.senha = senha;
   	this.saldo = saldo;
    this.status = status;
};
function registra(cpf, nome, senha,saldo){
	var pessoa = new Cliente(
		cpf,
		nome,
		senha,
		saldo,
		"Aberta",
		);
	banco.registrados.push(nome);
	banco.clientes.push(pessoa);
	console.log(banco.clientes);
}
function deposito(cpf,senha,valor){
	for (var i = banco.clientes.length - 1; i >= 0; i--) {
		if (cpf == banco.clientes[i].cpf && senha == banco.clientes[i].senha && banco.clientes[i].status == "Aberta") {
			banco.clientes[i].saldo += valor;
			banco.saldo_bancario += valor;
			console.log("Deposito efetuado com sucesso");
			console.log(banco.clientes);
		}else{
			console.log("Alguma informação foi repassada incorretamente ou sua conta foi fechada")
		}
	}
}
function Saque(cpf,senha,valor){
	for (var i = banco.clientes.length - 1; i >= 0; i--) {
		if (cpf == banco.clientes[i].cpf && senha == banco.clientes[i].senha && banco.clientes[i].status == "Aberta") {
			banco.clientes[i].saldo -= valor;
			banco.saldo_bancario -= valor;
			console.log("Saque efetuado com sucesso");
			console.log(banco.clientes);
		}else{
			console.log("Alguma informação foi repassada incorretamente")
		}
	}
}
function ver_conta(cpf,senha){
	for (var i = banco.clientes.length - 1; i >= 0; i--) {
		if (cpf == banco.clientes[i].cpf && senha == banco.clientes[i].senha) {
			console.log("Nome: "+banco.clientes[i].nome);
			console.log("Senha: "+banco.clientes[i].senha);
			console.log("Cpf: "+banco.clientes[i].cpf);
			console.log("Status da Conta: "+banco.clientes[i].status);
		}else{
			console.log("Alguma informação foi repassada incorretamente")
		}
	}
}
function fechar_conta(cpf,senha){
	for (var i = banco.clientes.length - 1; i >= 0; i--) {
		if (cpf == banco.clientes[i].cpf && senha == banco.clientes[i].senha) {
			banco.clientes[i].status = "Fechada";
			console.log("Sua conta foi fechada com sucesso");
		}else{
			console.log("Alguma informação foi repassada incorretamente")
		}
	}
}
function ver_saldo(){
	console.log("Saldo do banco: R$ "+banco.saldo_bancario);
}
function ver_clientes(){
	for (var i = banco.registrados.length - 1; i >= 0; i--) {
		console.log("Nome: "+banco.registrados[i]);
	}
}
function transferir(cpf1,senha1,valor,cpf2,senha2){
	var sucesso = 0;
	for (var i = banco.clientes.length - 1; i >= 0; i--) {
		if (banco.clientes[i].cpf == cpf1 && banco.clientes[i].senha == senha1 && banco.clientes[i].status == "Aberta") {
			banco.clientes[i].saldo -= valor;
			sucesso += 1;
		}
	}
	for (var j = banco.clientes.length - 1; j >= 0; j--) {
		if (banco.clientes[j].cpf == cpf2 && banco.clientes[j].senha == senha2 && banco.clientes[j].status == "Aberta") {
			banco.clientes[j].saldo += valor;
			sucesso += 1;
		}
	}
	if (sucesso == 2 ) {
		console.log("Transferencia Completa");
		console.log(banco.clientes);
	}else{
		console.log("Erro ao fazer Transferencia por favor verifique as informação se estão corretas");
	}
}