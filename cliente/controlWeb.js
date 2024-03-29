function ControlWeb() {

    this.mostrarAgregarUsuario = function () {
        $("#mAU").remove();
        $("#mH").remove();
        $("#mCP").remove();
        $("#mLPD").remove();
        $("#mGC").remove();
        var cadena = '<div class="row" id="mAU">';
        cadena = cadena + '<div class="card bg-light" style="width:500px; margin: auto auto">';
        cadena = cadena + '<div class="card-body">';
        cadena = cadena + '<h2>Inicio de sesión</h2>';
        cadena = cadena + '<input type="text" class="form-control mb-2 mr-sm-2" id="usr" placeholder="Introduce tu nick (max 6 letras)" required>';
        cadena = cadena + '<button id="btnAU" class="btn btn-primary mb-2 mr-sm-2">Iniciar Sesión</button>';
        cadena = cadena + '<br><br>';
        cadena = cadena + '<p>Otros métodos de inicio de sesión:</p>';
        cadena = cadena + '<a href="/auth/google"><img src="cliente/img/icons8-logo-de-google-96.svg" alt="Google" width="50" height="50"></a>';
        cadena = cadena + '<a href="/auth/twitter"><img src="cliente/img/icons8-twitter-96.svg" alt="Twitter" width="50" height="50"></a>';
        cadena = cadena + '<a href="/auth/github"><img src="cliente/img/Octicons-mark-github.svg.png" alt="Github" width="50" height="50"></a>';
        cadena = cadena + '<div id="nota"></div>';
        cadena = cadena + '</div></div>'


        $("#agregarUsuario").append(cadena);  

        $("#btnAU").on("click", function (e) {
            if ($('#usr').val() === '' || $('#usr').val().length > 6) {
                e.preventDefault();
                $('#nota').append('Nick inválido');
            }
            else {
                var nick = $('#usr').val();
                $("#mAU").remove();
                rest.agregarUsuario(nick);
            }
        });
    }
    this.mostrarComprobarCookie = function () {
        $('#mCC').remove();
        
        if ($.cookie("nick")) {
            rest.nick = $.cookie("nick");
            rest.comprobarUsuario(); 
        }
        else {
            this.mostrarAgregarUsuario();     
        }
    }

    this.mostrarHome = function () {
        $('#mH').remove();
        $('#gC').remove();
        $("#mGC").remove();
        var cadena = '<div class="row" id="mH">';
        cadena = cadena + '<div class="col">';
        cadena = cadena + '<div class="card bg-light" style=" margin: auto auto" id="card-bienvenido">';
        cadena = cadena + '<div class="card-body">';
        cadena = cadena + '<h1>Bienvenid@!</h1>';
        rest.nick = $.cookie("nick"); 
        cadena = cadena + rest.nick;
        cadena = cadena + '<div id="codigo"></div>';
        cadena = cadena + '<button id="btnCC" class="btn btn-primary mb-2 mr-sm-2" style="margin-left:15px">Salir</button>';
        cadena = cadena + '</div></div>';
        cadena = cadena + '</div></div>';
        
        $("#agregarUsuario").append(cadena);
       
        this.mostrarCrearPartida();
        rest.obtenerListaPartidasDisponibles();

        $("#btnCC").on("click", function (e) {
            $("#mCP").remove();
            $("#mLPD").remove();
            $('#mH').remove();
            $("#mGC").remove();
            cws.salirUsuario();
            $.removeCookie("nick");
            iu.mostrarComprobarCookie();
        });

    }
    this.mostrarCrearPartida = function () {
        $("#mCP").remove();
        $('#gC').remove();
        $("#mGC").remove();
        var cadena = '<div class="row" id="mCP">';
        cadena = cadena + '<div class="col">'
        cadena = cadena + '<div class="card bg-light" style=" margin: auto auto" id="card-bienvenido">';
        cadena = cadena + '<div class="card-body">';
        cadena = cadena + '<button id="btnCP" class="btn btn-primary">Crear partida</button>';
        cadena = cadena + '</div></div>';
        cadena = cadena + '</div></div>';

        $("#crearPartida").append(cadena);
        $("#btnCP").on("click", function (e) {
            $("#mCP").remove();
            $("#mLPD").remove();
            cws.crearPartida();
        });
    }
    this.mostrarCodigo = function (codigo) {
        let cadena = "Codigo de la partida: " + codigo;
        $("#codigo").append(cadena);
    }
    this.finPartida = function () {
        $("#codigo").remove();
        this.mostrarHome();  
    }
    this.mostrarEsperando = function(){
        $("#mGC").remove();
        var cadena = '<div class="row" id="mGC">';
        cadena = cadena + '<h3> Esperando rival... </h3>';
        cadena = cadena + '<img src="https://media1.giphy.com/media/3oz8xRQiRlaS1XwnPW/giphy.gif?cid=6c09b952ea1e887ae5a0a396c9f4158a79b3afd7a79ee259&rid=giphy.gif&ct=g width="400" height="400">';
        $('#listaPartidasDisp').append(cadena);
    }

    this.mostrarAbandonarPartida = function (codigo) {
        $("#mAP").remove();
        var cadena = '<div class="row" id="mCP">';
        cadena = cadena + '<div class="col-12">'
        cadena = cadena + '<div class="card bg-light" style=" margin: auto auto" id="card-bienvenido">';
        cadena = cadena + '<div class="card-body">';
        cadena = cadena + '<button id="btnAP" class="btn btn-primary">Abandonar</button>';
        cadena = cadena + '</div></div>';
        cadena = cadena + '</div></div>';

        $("#abandonarPartida").append(cadena);
        $("#btnAP").on("click", function (e) {
            $("#mAP").remove();
            $("#mLPD").remove();
            $("#mH").remove();
            $("#mGC").remove();
            $("#codigo").remove();
            cws.abandonarPartida(codigo);
        });
    }

    this.mostrarListaDePartidas = function (lista) {
        $("#mLP").remove();
        $("#mGC").remove();
        var cadena = '<div class="row" id="mLP">';
        cadena = cadena + '<div class="col-8">';
        cadena = cadena + '<h2>Partidas</h2>';
        cadena = cadena + '<ul class="list-group">';

        for (i = 0; i < lista.length; i++) {
            cadena = cadena + '<li class="list-group-item">' + lista[i].codigo + ' Propietario: ' + lista[i].owner + '</li>';
        }
        cadena = cadena + "</ul>";
        cadena = cadena + '</div>';
        cadena = cadena + '</div>';
        $('#listaPartidas').append(cadena);
    }

    this.mostrarListaDePartidasDisponibles=function(lista){
		$('#mLPD').remove();
		let cadena="<div class='row' id='mLPD'>";
		cadena=cadena+"<div class='col'>";
        cadena = cadena + '<div class="card bg-light" style=" margin: auto auto" id="card-bienvenido">';
        cadena = cadena + '<div class="card-body">';
		cadena=cadena+"<h2>Lista de partidas disponibles</h2>";
		cadena=cadena+'<ul class="list-group">';
		for(i=0;i<lista.length;i++){
		    cadena = cadena+'<li class="list-group-item"><a href="#" value="'+lista[i].codigo+'"> Sala '+(1+i)+' - Propietario: '+lista[i].owner+'</a></li>';
        }
		cadena=cadena+"</ul>";
		cadena=cadena+"</div></div>"
        cadena=cadena+"</div></div>"
		$('#listaPartidasDisp').append(cadena);

		$(".list-group a").click(function(){
	        codigo=$(this).attr("value");
   	
	        if (codigo){
	            $('#mLPD').remove();
	            $('#mCP').remove();
                $("#mGC").remove();
                cws.unirseAPartida(codigo);
	        }
	    });	
	}

    this.mostrarModal = function (msg) {
        $('#mM').remove();
        $("#mGC").remove();
        var cadena = "<p id='mM'>" + msg + "</p>";
        $('#contenidoModal').append(cadena);
        $('#miModal').modal("show");
    }

    this.mostrarModalGanador = function (msg) {
        $('#mM').remove();
        $("#mGC").remove();
        var cadena = "<p id='mM'>" + msg + "</p>";
        var cadena = cadena + '<img src="https://media0.giphy.com/media/2gtoSIzdrSMFO/giphy.gif" alt="Gif ganador" width="450">';
        $('#contenidoModal').append(cadena);
        $('#miModal').modal("show");
    }


}