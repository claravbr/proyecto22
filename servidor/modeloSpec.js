let modelo = require("./modelo.js");

describe("El juego...", function () {
	var miJuego;
	var user1, user2, partida;

	beforeEach(function () {
		miJuego = new modelo.Juego();
		miJuego.test = true;
		miJuego.agregarUsuario("pepe");
		miJuego.agregarUsuario("luis");
		res = miJuego.jugadorCreaPartida("pepe");
	});

	//Agregar un jugador a la partida
	it("Agregar un jugador a la partida", function () {
		user2 = miJuego.obtenerUsuario("luis");
		expect(miJuego.unirseAPartida(res.codigo, user2)).toEqual(res.codigo);
	});

	describe("El juego...", function () {

		beforeEach(function () {
			miJuego.jugadorSeUneAPartida("luis", res.codigo);
			user1 = miJuego.obtenerUsuario("pepe");
			user2 = miJuego.obtenerUsuario("luis");
			partida = miJuego.obtenerPartida(res.codigo);
		});

		it("comprobamos los nick de los usuarios", function () {
			expect(user1.nick).toEqual("pepe");
			expect(user2.nick).toEqual("luis");
		});

		it("luis y pepe estan en la patida", function () {
			expect(partida.jugadores.length).toEqual(2);
			expect(partida.estoy("pepe")).toEqual(true);
			expect(partida.estoy("luis")).toEqual(true);
		});


		it("Comprobar que los nick de usuarios están en la partida", function () {
			expect(partida.jugadores[0].nick).toEqual(user1.nick);
			expect(partida.jugadores[1].nick).toEqual(user2.nick);
		});

		//Comprobar que tienen tablero propio y tablero rival
		it("Comprobar que cada usuario tiene 2 tableros de 10x10", function () {
			expect(user1.tableroPropio).toBeDefined();
			expect(user2.tableroPropio).toBeDefined();
			expect(user1.tableroRival).toBeDefined();
			expect(user2.tableroRival).toBeDefined();


			expect(user1.tableroPropio.casillas.length).toEqual(10);
			expect(user2.tableroPropio.casillas.length).toEqual(10);

			//habría que recorrer las 10 columnas
			expect(user1.tableroPropio.casillas[0].length).toEqual(10);
			expect(user1.tableroRival.casillas[0].length).toEqual(10);
			expect(user2.tableroPropio.casillas[0].length).toEqual(10);
			expect(user2.tableroRival.casillas[0].length).toEqual(10);

			//habría que recorrer las 10 columnas
			for (x = 0; x < 10; x++) {
				expect(user1.tableroPropio.casillas[x].length).toEqual(10);
			}

			//habría que recorrer todo el tablero
			expect(user1.tableroPropio.casillas[0][0].contiene.esAgua()).toEqual(true);
		});

		it("los dos jugadores tienen flota (4 barcos, tam 1, 2, 3 y 4)", function () {
			expect(user1.flota).toBeDefined();
			expect(user2.flota).toBeDefined();

			expect(Object.keys(user1.flota).length).toEqual(4);
			expect(Object.keys(user2.flota).length).toEqual(4);

			expect(user1.flota["b1"].tam).toEqual(1);
			expect(user1.flota["b2"].tam).toEqual(2);
			expect(user1.flota["b3"].tam).toEqual(3);
			expect(user1.flota["b4"].tam).toEqual(4);

			expect(user2.flota["b1"].tam).toEqual(1);
			expect(user2.flota["b2"].tam).toEqual(2);
			expect(user2.flota["b3"].tam).toEqual(3);
			expect(user2.flota["b4"].tam).toEqual(4);
		});

		//comprobar que la partida esta en fase desplegando
		it("La partida está en fase desplegando", function () {
			expect(partida.esJugando()).toEqual(false);
			expect(partida.esDesplegando()).toEqual(true);
		});


		describe("A jugar!", function () {
			beforeEach(function () {
				user1.colocarBarco("b1", 0, 0);
				user1.colocarBarco("b2", 0, 1); // 0,0 1,0
				user1.colocarBarco("b3", 0, 2);
				user1.colocarBarco("b4", 0, 3); // 0,1 1,1 2,1 3,1
				user1.barcosDesplegados();
				user2.colocarBarco("b1", 0, 0);
				user2.colocarBarco("b2", 0, 1); // 0,0 1,0
				user2.colocarBarco("b3", 0, 2);
				user2.colocarBarco("b4", 0, 3); // 0,1 1,1 2,1 3,1
				user2.barcosDesplegados();
			})

			//comprobar que la partida esta en fase jugando
			it("La partida está en la fase jugando", function () {
				expect(partida.esJugando()).toEqual(true);
				expect(partida.esDesplegando()).toEqual(false);
			});

			it("Comprobar que las flotas están desplegadas", function () {
				expect(user1.todosDesplegados()).toEqual(true);
				expect(user2.todosDesplegados()).toEqual(true);
				expect(partida.flotasDesplegadas()).toEqual(true);
				expect(partida.esJugando()).toEqual(true);
			});

			it("Comprobar jugada que Pepe gana", function () {
				expect(partida.turno.nick).toEqual("pepe");
				expect(user2.flota["b1"].estado).toEqual("intacto");
				user1.disparar(0, 0);
				expect(user2.flota["b1"].estado).toEqual("hundido");

				expect(user2.flota["b2"].estado).toEqual("intacto");
				user1.disparar(0, 1);
				expect(user2.flota["b2"].estado).toEqual("tocado");
				user1.disparar(1, 1);
				expect(user2.flota["b2"].estado).toEqual("hundido");

				expect(user2.flota["b3"].estado).toEqual("intacto");
				user1.disparar(0, 2);
				expect(user2.flota["b3"].estado).toEqual("tocado");
				user1.disparar(1, 2);
				expect(user2.flota["b3"].estado).toEqual("tocado");
				user1.disparar(2, 2);
				expect(user2.flota["b3"].estado).toEqual("hundido");

				expect(user2.flota["b4"].estado).toEqual("intacto");
				user1.disparar(0, 3);
				expect(user2.flota["b4"].estado).toEqual("tocado");
				user1.disparar(1, 3);
				expect(user2.flota["b4"].estado).toEqual("tocado");
				user1.disparar(2, 3);
				expect(user2.flota["b4"].estado).toEqual("tocado");
				user1.disparar(3, 3);
				expect(user2.flota["b4"].estado).toEqual("hundido");

				expect(partida.esFinal()).toEqual(true);
				expect(user2.flotaHundida()).toEqual(true);
				expect(user1.flotaHundida()).toEqual(false);
			});

			it("Comprobar el cambio de turno", function () {
				expect(partida.turno.nick).toEqual(user1.nick);
				user1.disparar(7, 7);
				expect(partida.turno.nick).toEqual(user2.nick);
			});

			it("Comprobar que no se puede puede disparar sin turno", function () {
				expect(partida.turno.nick).toEqual(user1.nick);
				user2.disparar(0, 0);
				expect(user1.flota["b2"].estado).toEqual("intacto");
			});
		});
	});
});