function ServidorWS() {
	//enviar peticiones
	this.enviarAlRemitente = function (socket, mensaje, datos) {
		socket.emit(mensaje, datos);
	}
	this.enviarATodosEnPartida = function (io, codigo, mensaje, datos) {
		io.sockets.in(codigo).emit(mensaje, datos);
	}
	this.enviarATodos = function (socket, mens, datos) {
		socket.broadcast.emit(mens, datos);
	}

	//gestionar peticiones
	this.lanzarServidorWS = function (io, juego) {
		let cli = this;
		io.on('connection', (socket) => {
			console.log('Usuario conectado');
			socket.on("crearPartida", function (nick) {
				let res = juego.jugadorCreaPartida(nick);
				let codigoStr = res.codigo.toString();
				socket.join(codigoStr);
				//cli.enviarAlRemitente(socket,"partidaCreada",res);
				cli.enviarATodosEnPartida(io, codigoStr, "partidaCreada", res)
				let lista = juego.obtenerPartidasDisponibles();
				cli.enviarATodos(socket, "actualizarListaPartidas", lista);
			});
			socket.on("unirseAPartida", function (nick, codigo) {
				let codigoStr = codigo.toString();
				socket.join(codigoStr);
				let res = juego.jugadorSeUneAPartida(nick, codigo);
				cli.enviarAlRemitente(socket, "unidoAPartida", res);
				let partida = juego.obtenerPartida(codigo);
				if (partida.esDesplegando()) {
					let usr = juego.obtenerUsuario(nick);
					let flota = usr.obtenerFlota();
					let res = {};
					res.flota = flota;
					cli.enviarATodosEnPartida(io, codigo, "faseDesplegando", res);
				}

			});
			socket.on("abandonarPartida", function (nick, codigo) {
                let res = { nick:nick, codigo:codigo};
                cli.enviarATodosEnPartida(io, codigo, "jugadorAbandona", res);
                juego.jugadorAbandonaPartida(nick, codigo);
			});

			socket.on("colocarBarco", function (nick, nombre, x, y) {
				let jugador = juego.obtenerUsuario(nick);
				if (jugador) {
					console.log(nick+" "+nombre+" "+x+" "+y);
					jugador.colocarBarco(nombre,x,y)
					let desplegado = jugador.obtenerBarcoDesplegado(nombre);
					let res = { barco:nombre, x:x, y:y, colocado:desplegado }
					cli.enviarAlRemitente(socket, "barcoColocado", res);
				}
			});

			socket.on("barcosDesplegados", function (nick) {
				let jugador = juego.obtenerUsuario(nick);
				if (jugador) {
					let partida = jugador.partida;
					jugador.barcosDesplegados();
					let codigoStr = partida.codigo.toString();
					if (partida && partida.esJugando()) {
						let res = {fase:partida.fase, turno:partida.turno.nick};
						cli.enviarATodosEnPartida(io, codigoStr, "aJugar", res);
					}
				}
			});

			socket.on("disparar", function (nick, x, y) {
				let jugador = juego.obtenerUsuario(nick);
				let partida = jugador.partida;

				if (jugador && partida.esJugando() && partida.turno.nick == nick) {
					jugador.disparar(x, y);
					let estado = jugador.obtenerEstadoMarcado(x, y);
					let codigoStr = partida.codigo.toString();
					let res = { impacto: estado, x: x, y: y, turno: partida.turno.nick };

					cli.enviarATodosEnPartida(io, codigoStr, "disparo", res);

					if (partida.esFinal()) {
						cli.enviarATodosEnPartida(io, partida.codigo.toString(), "finPartida", res);
					}
				} else {
					cli.enviarAlRemitente(socket, "turno", res);
				}
			});
		});
	}
}

module.exports.ServidorWS = ServidorWS;