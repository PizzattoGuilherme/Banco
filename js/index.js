$(document).ready(function(){
   	$(".modal").modal();
   	var cont = 0;
   	var banco = {
   		saldo_bancario: 0,
   		clientes: [],
   	};

   	var Cliente = function(cpf, nome, telefone, email, saldo, status){
   		this.cpf = cpf;
   		this.nome = nome;
   		this.telefone = telefone;
   		this.email = email;
   		this.saldo = saldo;
         this.status = status;
   	};
   	$("#register_acount").click(function(){
   		event.preventDefault();
   		var client = new Cliente(
   			$("#register_cpf").val(),
   			$("#register_name").val(),
   			$("#register_telephone").val(),
   			$("#register_email").val(), 
   			parseInt($("#register_saldo").val()), 
            "open"
   		);
   		banco.saldo_bancario += parseInt($("#register_saldo").val());
   		banco.clientes.push(client);
   		$("#registerClients").append("<li>"+banco.clientes[cont].nome+"</li>");
   		cont+= 1;
   		console.log(banco.clientes);
   		$("#creat_cont").modal('close');
   	});
   	$("#see_saldo_banck").click(function(){
   		$("#banck_value").html("R$ "+banco.saldo_bancario);
   	});
   	$("#efetue_deposit").click(function(){
   		var cpf = $("#validate_cpf").val();
   		var money = parseInt($("#deposit_value").val());
   		for (var i = banco.clientes.length - 1; i >= 0; i--) {
   			if (banco.clientes[i].cpf == cpf && banco.clientes[i].status == "open") {
   				banco.clientes[i].saldo += money;
   				banco.saldo_bancario += money;
   				setTimeout(function(){$("#erro_deposit").html("Depositado Com Sucesso");}, 1000);
   				setTimeout(function(){$("#erro_deposit").html("");}, 10000);
   			}else{
   				setTimeout(function(){$("#erro_deposit").html("Conta Não Cadastrada/Fechada ou Cpf Invalido");}, 1000);
   				setTimeout(function(){$("#erro_deposit").html("");}, 10000);
   			}
   			console.log(banco.clientes);
   		};
   	});
   	$("#efetue_retire").click(function(){
   		var cpf = $("#validate_cpf_retire").val();
   		var money = parseInt($("#retire_value").val());
   		for (var i = banco.clientes.length - 1; i >= 0; i--) {
   			if (banco.clientes[i].cpf == cpf && banco.clientes[i].status == "open") {
   				banco.clientes[i].saldo -= money;
   				banco.saldo_bancario -= money;
   				setTimeout(function(){$("#erro_retire").html("Retirado Com Sucesso");}, 1000);
   				setTimeout(function(){$("#erro_retire").html("");}, 10000);
   			}else{
   				setTimeout(function(){$("#erro_retire").html("Conta Não Cadastrada/Fechada ou Cpf Invalido");}, 1000);
   				setTimeout(function(){$("#erro_retire").html("");}, 10000);
   			}
   			console.log(banco.clientes);
   		};
   	});
   	$("#charge").click(function(){
   		var cpf = $("#charge_cpf").val();
   		for (var i = banco.clientes.length - 1; i >= 0; i--) {
   			if (banco.clientes[i].cpf == cpf) {
   				$("#see_name").html("Nome: "+banco.clientes[i].nome);
   				$("#see_cpf").html("Cpf: "+banco.clientes[i].cpf);
   				$("#see_telephone").html("Telefone: "+banco.clientes[i].telefone);
   				$("#see_email").html("Email: "+banco.clientes[i].email);
   				$("#see_saldo").html("Saldo: "+banco.clientes[i].saldo);
               $("#see_status").html("Status: ".banco.clientes[i].status);
   				if (banco.clientes[i].saldo > 0) {
   					$("#see_saldo").css('color','green');
   				}else{
   					$("#see_saldo").css('color','red');
   				}
   				$("#charge_count").modal('close');
   			}else{
   				$("#erro_charge").html("Erro ao logar");
   			}
   		};
   	});
   	$("#make_transision").click(function(){
   		var cont1 = -1;
   		var cont2 = -1;
   		var cpf1 = $("#transfer_cpf").val();
   		var cpf2 = $("#transfer_cpf2").val();
   		var money = parseInt($("#transfer_money").val());
   		for (var i = banco.clientes.length - 1; i >= 0; i--) {
   			if (banco.clientes[i].cpf == cpf1 && banco.clientes[i].status == "open") {
   				cont1 = i;
   			}
   		}
   		for (var j = banco.clientes.length - 1; j >= 0; j--) {
   			alert(j);
   			if (banco.clientes[j].cpf == cpf2 && banco.clientes[j].status == "open") {
   				cont2 = j;
   			}
   		}
   		if (cont1 != -1 && cont2 != -1) {
   			banco.clientes[cont1].saldo -= money;
   			banco.clientes[cont2].saldo += money;
   			setTimeout(function(){$("#erro_transision").html("Sucesso Ao completar A transação");}, 1000);
            setTimeout(function(){$("#erro_transision").html("");}, 2000);
   			
   		}else{
   			setTimeout(function(){$("#erro_transision").html("Ero Ao completar A transação");}, 1000);
            setTimeout(function(){$("#erro_transision").html("");}, 2000);
            ;
   		}
   		console.log(banco.clientes);
   	});
      $("#make_close").click(function(){
         var cont = -1;
         var cpf = $("#close_cpf").val();
         for (var i = banco.clientes.length - 1; i >= 0; i--) {
            if (banco.clientes[i].cpf == cpf && banco.clientes[i].status == "open") {
               cont = i;
            }
         }
         if (cont != -1) {
            banco.clientes[cont].status = "closed";
            setTimeout(function(){$("#erro_close").html("Conta Fechada Com Sucesso");}, 1000);
            setTimeout(function(){$("#erro_close").html("");}, 2000);
         }else{
            setTimeout(function(){$("#erro_close").html("Erro ao fechar a conta");}, 1000);
            setTimeout(function(){$("#erro_close").html("");}, 2000);
         }
         
         console.log(banco.clientes);
      });
});
