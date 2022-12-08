function ClienteRest() {
	this.nick;
	this.agregarUsuario = function (nick) {
		let cli = this;
		$.getJSON("/agregarUsuario/" + nick, function (data) {
			//se ejecuta cuando conteste el servidor
			console.log(data);
			if (data.nick != -1) {
				console.log("Usuario " + data.nick + " registrado")
				cli.nick = data.nick;
				//ws.nick=data.nick;
				$.cookie("nick", data.nick);
				cws.conectar();
				iu.mostrarHome();//iu.mostrarHome(data.nick)
			}
			else {
				console.log("No se ha podido registrar el usuario")
				iu.mostrarModal("El nick ya está en uso");
				iu.mostrarAgregarUsuario();
			}
		});
	}
	this.comprobarUsuario = function () {
		$.getJSON("/comprobarUsuario/" + this.nick, function (data) {
			if (data.nick != -1) {
				console.log("Usuario " + data.nick + " activo.");
				cws.conectar();
				iu.mostrarHome();
			}
			else {
				console.log("Usuario " + data.nick + " no está activo.");
				iu.mostrarAgregarUsuario()
			}
		});
	}
	this.crearPartida = function () {
		var cli = this;
		let nick = cli.nick;
		$.getJSON("/crearPartida/" + nick, function (data) {
			console.log(data);
			if (data.codigo != -1) {
				console.log("Usuario " + nick + " crea partida codigo: " + data.codigo)
				iu.mostrarCodigo(data.codigo);
			}
			else {
				console.log("No se ha podido crear partida")
			}
		});
	}
	this.unirseAPartida = function (codigo) {
		let cli = this;
		$.getJSON("/unirseAPartida/" + cli.nick + "/" + codigo, function (data) {
			//se ejecuta cuando conteste el servidor
			console.log(data);
			if (data.codigo != -1) {
				console.log("Usuario " + cli.nick + " se une a partida codigo: " + data.codigo);
				iu.mostrarCodigo(data.codigo);
			}
			else {
				console.log("No se ha podido unir a partida");
			}
		});
	}
	this.obtenerListaPartidas = function () {
		let cli = this;
		//obtenerPartidasDisponibles
		$.getJSON("/obtenerPartidas", function (lista) {
			console.log(lista);
			iu.mostrarListaDePartidas(lista);
		});
	}
	this.obtenerListaPartidasDisponibles = function () {
		let cli = this;
		$.getJSON("/obtenerPartidasDisponibles", function (lista) {
			console.log(lista);
			iu.mostrarListaDePartidasDisponibles(lista);
		});
	}
	this.usuarioSale = function () {
		let nick = this.nick;
		$.getJSON("/salir/" + nick, function () {
			$.removeCookie("nick");
			iu.comprobarCookie();
		})
	}
}

