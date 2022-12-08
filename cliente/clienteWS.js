function ClienteWS() {
	this.socket;
	this.codigo;

	//enviar peticiones
	this.conectar = function () {
		this.socket = io();
		this.servidorWS();
	}
	this.crearPartida = function () {
		this.socket.emit("crearPartida", rest.nick);
	}
	this.unirseAPartida = function (codigo) {
		this.socket.emit("unirseAPartida", rest.nick, codigo);
	}
	this.abandonarPartida = function () {
		this.socket.emit("abandonarPartida", rest.nick, cws.codigo);
	}
	//	this.colocarBarco=function(nombre,x,y)
	// 	this.barcosDesplegados=function()
	//  this.disparar=function(x,y)
	this.usuarioSale=function(){
        this.socket.emit("usuarioSale", rest.nick);
    }
    this.colocarBarco=function(nombre, x, y){ //{nicK:rest.nick, nombre:nombre, x:x, y:y}
        this.socket.emit("colocarBarco", rest.nick, nombre, x, y);
    }
    this.barcosDesplegados=function(){
        this.socket.emit("barcosDesplegados", rest.nick);
    }
    this.disparar=function(x,y){
        this.socket.emit("disparar", rest.nick, x, y);
    }

	//gestionar peticiones
	this.servidorWS = function () {
		let cli = this;
		this.socket.on("partidaCreada", function (data) {
			console.log(data);
			if (data.codigo != -1) {
				console.log("Usuario " + rest.nick + " crea partida codigo: " + data.codigo)
				iu.mostrarCodigo(data.codigo);
				cli.codigo = data.codigo;
			}
			else {
				console.log("No se ha podido crear partida");
				iu.mostrarModal("No se ha podido crear partida");
				//iu.mostrarCrearPartida();
				rest.comprobarUsuario();
			}
		});
		this.socket.on("unidoAPartida", function (data) {
			console.log(data);
			if (data.codigo != -1) {
				console.log("Usuario " + rest.nick + " se une a partida: " + data.codigo);
				iu.mostrarCodigo(data.codigo);
				cli.codigo = data.codigo;
			}
			else {
				console.log("No se ha podido unir a partida");
			}
		});
		this.socket.on("actualizarListaPartidas", function (lista) {
			if (!cli.codigo) {
				iu.mostrarListaDePartidasDisponibles(lista);
			}
		});
		this.socket.on("faseDesplegando", function (data) {
			tablero.flota = data.flota;
			tablero.elementosGrid();
			tablero.mostrarFlota(); //data.flota;
			console.log("Ya puedes desplegar la flota");
		});
		
		this.socket.on("jugadorAbandona", function (data) {
			iu.mostrarModal("Jugador " + data.nick + " abandona la partida.");
			iu.finPartida();
		});
		this.socket.on("barcoColocado", function (res) {
			console.log("Barco " + res.barco + " colocado?: " + res.colocado);
			if (res.colocado) {
				tablero.terminarDeColocarBarco(barco, res.x, res.y);
				cli.barcosDespegados();
			} else {
				iu.mostrarModal("No se puede colocar barco");
			}
		});
		this.socket.on("aJugar", function () {
			iu.mostrarModal("A jugar!");
			//tablero.mostrar(true);
		});
		this.socket.on("aJugar", function (res) {
			if (res.fase == "jugando") {
				console.log("A jugar, le toca a: " + res.turno);
			}
		});
		this.socket.on("esperandoRival", function () {
			console.log("Esperando rival");
		});
		this.socket.on("disparo", function (res) {
			console.log(res.impacto);
			console.log("Turno: " + res.turno);
			if (res.atacante == res.nick) {
				tablero.updateCell(res.x, res.y, res.impacto, 'computer-player');
			} else {
				tablero.updateCell(res.x, res.y, res.impacto, 'human-player');
			}
		});
		this.socket.on("info", function (info) {
			console.log(info);
		});
		this.socket.on("finPartida", function (res) {
			console.log("Fin de la partida");
			console.log("Ganador: " + res.turno);
			iu.mostrarModal("Fin de la partida. Ganador: " + res.turno);
			iu.finPartida();
		})
	}
}