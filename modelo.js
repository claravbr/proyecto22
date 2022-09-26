function Juego(){
	this.partidas={};
    this.usuarios={}; //array asociativo

    this.agregarUsuario = function(nick){
        if (!this.usuarios[nick]){
            this.usuarios[nick] = new Usuario(nick,this)
        }
    }

    this.crearPartida=function(nick){
        //obtener codigo único
        //crear partida con propietario nick
        //devolver el codigo
        console.log("partida creada");
    }
}

function Usuario(nick,juego){
    this.nick = nick;
    this.juego = juego;
    this.crearPartida = function(){
        this.juego.crearPartida(this.nick)
    }
}

function Partida(){
    this.codigo;
}