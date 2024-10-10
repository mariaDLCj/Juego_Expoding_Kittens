
let jugadoresActivos = [];
let jugadorActivo;

class Jugador {
    //LOS ESTAMOS INICIALIZANDO EN TURNO
    constructor(nombre) {
        this.nombre = nombre;
        this.turno = false;
        this.cartas = [];
        this.eliminado = false;
        this.puntos = 0;
        this.ganador = false;
        this.numCartas = 0;
    }

    // CUENTA LAS CARTAS QUE TIENE CADA JUGADOR
    calcularCartas() {
        this.numCartas = this.cartas.length;
    }

    // COMPRUEBA SI NO ES BOMBA Y LA AÑADE EN CASO CONTRARIO
    // COMPRUEBA SI HAY UNA CARTA DE DESACTIVACIÓN
    robar(Carta) {
        if (Carta.tipo != "Bomba") {
            this.cartas.push(Carta);
        } else {
            if (this.cartas.includes(Carta.tipo == "Desctivador")) {
                console.log("Te has salvado de la bomba");
            } else {
                this.eliminado = true;
                console.log("KATAPUM - Has muerto");
            }
        }
    }

    // CUENTA CUANTOS SALTOS DE TURNO HAY
    contarSaltar() {
        // USAR LA FUNCION DE filter para saber cuantas hay
    } // hacer lo mismo con la de Desactivar

    // MUESTRA EL NOMBRE DEL JUGADOR
    mostrarNombre() {
        console.log(this.nombre);
    }

    turnoActivo() {
        this.turno = true;
    }

    mostrarCartas() {
        //MOSTRAR LAS CARTAS DEL JUGADOR
        console.log("CARTAS DEL JUGADOR")
        for (let i = 0; i < this.cartas.length; i++) {
            console.log(this.cartas[i]);
        }
    }
}

jugadoresActivos.push(jugador1 =  new Jugador("Jugador1"));
jugadoresActivos.push( jugador2 =new Jugador("Jugador2"));
jugadoresActivos.push( jugador3= new Jugador("Jugador3"));

// CLASE DE LA CARTA
class Carta {
    constructor(tipo, path, puntos) {
        this.tipo = tipo;
        this.path = path;
        this.puntos = puntos;
    }
}

// MAZO/DECK O BARAJA DE DONDE SE ROBA
class Mazo {
    constructor() {
        this.cartas = [];
        this.inicializar();
    }

    /*
        COMPRUEBA SI EL ARRAY DE CARTAS DE LA CLASE ESTÁ VACÍO
        EN CUYO CASO LO INICIALIZA METIENDO LAS CARTAS EN EL ARRAY
    */
    inicializar() {
        if (this.cartas.length == 0) {
            for (let i = 0; i <= 6; i++) {
                this.cartas.push(new Carta("Bomba", "path", 0));
            }
            for (let i = 0; i <= 10; i++) {
                this.cartas.push(new Carta("Pasar turno", "path", 0));
            }
            for (let i = 0; i <= 10; i++) {
                this.cartas.push(new Carta("Desactivacion", "path", 0));
            }
            for (let i = 0; i <= 34; i++) {
                let puntosRandom = Math.floor(Math.random() * 11);
                this.cartas.push(new Carta("Puntos", "path", puntosRandom));
            }
        }
    }
    // MEUSTRA LAS CARTAS QUE HAY EN EL ARRAY
    mostrarCartas() {
        console.log("VAMOS A MOSTRAR LAS CARTAS");
        for (let i = 0; i < this.cartas.length; i++) {
            console.log(this.cartas[i]);
        }
    }
    // BARAJA LAS CARTAS USANDO EL ALGORITMO DE FISHER YATES
    // Y LOS CAMBIA USANDO UNA DECONSTTUCCIÓN DEL ARRAY LO 
    // QUE NOS PERMITE AHORRAR ALGO DE LÍNEAS Y PERSONALMENTE
    // VEO MÁS CLARO

    barajar() {
        for (let i = this.cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]];
        }
    }

    //ELIMINA LA ÚLTIMA CARTA DEL MAZO
    // PARA CUANDO SE LLAME A ROBAR
    quitarCarta() {
        return this.cartas.pop();
    }
}

function robar() {
    alert("Hola")

    // console.log("MOSTRANDO LOS JUGADORES ACTIVOS")
    // for (let i = 0; i < jugadoresActivos.length; i++) {
    //     //I+1 PARA QUE SEA JUGADOR1/2/3 Y LO AÑADIMOS AL ARRAY
    //     console.log(jugadoresActivos[i]);
    // }

    //1º VER EL TURNO DEL JUGADOR  - 
    //crear un array de jugadores - CREADO
    // cómo pasar el número del array/cómo pasar turno
    //2º SE QUITA UNA CARTA DEL MAZO - 
    //3º SE AÑADE CARTA AL JUGADOR

    // SABER EL JUGADOR del cual es el turno
    // let jugador=jugadoresActivos[0]; // TURNO DEL JUGADOR1

    console.log("CARTA DUERA DEL MAZO")
    mazo1.mostrarCartas();
    let cartaRobada = mazo1.cartas.pop();
    // el jugador roba la última carta y la alñade con el métod de robar
    console.log("JUGADOR ROBA CARTA")
    jugador1.robar(cartaRobada);
    console.log(cartaRobada)
    console.log("LA MEUSTRO EN EL JUGADOR")
    console.log(jugador1.mostrarCartas());

}

let mazo1 = new Mazo();
mazo1.inicializar();
//mazo1.mostrarCartas();
mazo1.barajar();
//mazo1.mostrarCartas();

//robar();

function getRandomPathImg(){
    let random = Math.floor(Math.random() * 20) + 1;
    if (random < 10) {
        return `./img/card/robot_0${random}.png`;
    }
    return `./img/card/robot_${random}.png`;

    
}


// CREACIÓN DEL DOM 

let botonRobar = document.querySelector("#btnRobar");
botonRobar.addEventListener("click",robar());
