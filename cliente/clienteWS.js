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
			if (data.codigo != -1) {
				console.log("Usuario " + rest.nick + " crea partida codigo: " + data.codigo)
				iu.mostrarCodigo(data.codigo);
				iu.mostrarAbandonarPartida(data.codigo);
				cli.codigo = data.codigo;
			}
			else {
				console.log("No se ha podido crear partida");
				iu.mostrarModal("No se ha podido crear partida");
				iu.mostrarCrearPartida();
				rest.comprobarUsuario();
			}
		});
		this.socket.on("unidoAPartida", function (data) {
			console.log(data);
			if (data.codigo != -1) {
				console.log("Usuario " + rest.nick + " se une a partida: " + data.codigo);
				iu.mostrarCodigo(data.codigo);
				iu.mostrarAbandonarPartida(data.codigo);
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
			tablero.mostrarTablero(true);
			iu.mostrarModal("Ya puedes desplegar la flota");
			console.log("Ya puedes desplegar la flota");
		});
		
		this.socket.on("jugadorAbandona", function (data) {
			iu.mostrarHome();
			tablero.mostrarTablero(false);
			console.log("Jugador " + data.nick + " abandona la partida.");
			iu.mostrarModal("Jugador " + data.nick + " abandona la partida.");
		});
		this.socket.on("barcoColocado", function (res) {
			console.log("Barco " + res.barco + " colocado?: " + res.colocado);
			if (res.colocado) {
				let barco = tablero.flota[res.barco];
                tablero.puedesColocarBarco(barco, res.x, res.y, res.desplegados);
                console.log("El Barco " + res.barco + " es colocado en la posición (" + res.x + "," + res.y + ")");
                iu.mostrarModal("El Barco " + res.barco + " es colocado en la posición (" + res.x + "," + res.y + ")");
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
				iu.mostrarModal("A jugar, le toca a: " + res.turno);
			}
		});
		this.socket.on("esperandoRival", function () {
			console.log("Esperando rival");
			iu.mostrarModal("Esperando rival");
		});
		this.socket.on("disparo", function (res) {
			if (res.turno == rest.nick) {
                tablero.puedesDisparar(res.estado, res.x, res.y, 'computer-player');
            }
            else {
                tablero.puedesDisparar(res.estado, res.x, res.y, 'human-player');
            }
            let estado = undefined;
            switch (res.estado) {
                case "agua":
                    estado = "AGUA"
                    res.turno = res.atacado;
                    break;
                case "tocado":
                    estado = "TOCADO"
                    break;
                case "hundido":
                    estado = "HUNDIDO"
                    break;
            }
            console.log("Disparo de " + res.atacante + ": " + estado);
            iu.mostrarModal("Disparo de " + res.atacante + ": " + estado + "<br/>Turno de: " + res.turno);
		});
		this.socket.on("info", function (info) {
			console.log(info);
		});

		this.socket.on("salir", function (res) {
            tablero.mostrarTablero(false);
            if (res.nick == rest.nick) {
                console.log("Has salido del juego");
                iu.mostrarModal("Has salido del juego");
            } else {
                iu.mostrarHome();
                console.log("El usuario " + res.nick + " ha salido del juego.");
                iu.mostrarModal("El usuario " + res.nick + " ha salido del juego.");
            }
        });

		this.socket.on("finPartida", function (res) {
			tablero.mostrarTablero(false);
			console.log("Fin de la partida");
			console.log("Ganador: " + res.turno);
			iu.mostrarModal("Fin de la partida. Ganador: " + res.turno);
			iu.finPartida();
		})
	}
}