// DECLARAMOS LAS LISTAS 
//Y ALGUNAS VARIABLES 
let jugadoresActivos = [];
let descartes = [];
let jugadorActivo;
let tunoActual = 0;

class Jugador {
    //CONSTRUCTOR DE JUGADOR
    constructor(nombre) {
        this.nombre = nombre;
        this.turno = false;
        this.cartas = [];
        this.eliminado = false;
        this.puntos = 0;
        this.ganador = false;
        this.pasarTurno = 0;
        this.puntos = 0;
        this.desactivacion = 0;
    }

    // CUENTA LAS CARTAS QUE TIENE CADA JUGADOR
    calcularCartas() {
        return this.numCartas = this.cartas.length;
    }

    // COMPRUEBA SI NO ES BOMBA Y LA AÑADE EN CASO CONTRARIO
    // COMPRUEBA SI HAY UNA CARTA DE DESACTIVACIÓN
    // ADEMÁS SUMA LAS CARTAS NO BOMBAS
    robar(Carta) {
        if (Carta.tipo != "Bomba") {
            this.cartas.push(Carta);
            switch (Carta.tipo) {
                case "Pasar turno":
                    this.pasarTurno++;
                    break;
                case "Desactivacion":
                    this.desactivacion++;
                    break;
                case "Puntos":
                    this.puntos++;
                    break;

            }
        } else if (Carta.tipo = "Bomba") {
            if (this.desactivacion > 0) {
                this.desactivacion--;
                alert("¡POR LOS PELOS! \n TE SALVASTE DE LA BOMBA");
            } else {
                this.eliminado = true;
                alert("¡¡¡¡KATAPUUUUM!!!!! \n HAS MUERTO");
            }
        }
    }

    mostrarCartas() {
        //MOSTRAR LAS CARTAS DEL JUGADOR
        console.log("CARTAS DEL JUGADOR");
        this.cartas.forEach(carta => {
            console.log(carta);
        });
    }
    // EN EL EXTRAÑO CASO DE QUE LA PARTIDA
    // SE TERMINE POR FALTA DE CARTAS EN 
    // EL MAZO, ESTA FUNCIÓN COMPARA QUIÉN
    // TIENE MÁS CARTAS DE LOS 2 JUGADORES
    // compararPuntos(jugador2){
    //     if(this.puntos>jugador2.puntos){
    //         this.ganador=true;
    //     }else if(this.puntos<jugador2.puntos){
    //         jugador2.ganador=true;
    //     }else{
    //         alert("¡VAYA, ES UN EMPATE!")
    //     }
    // }
    compararPuntos() {
        /*
        EN ESTA FUNCIÓN VAMOS A DETERMINAR QUIEN ES EL GANADOR
        CON EL MÉTODO JOSE, el del año pasado, QUE FUNCIONA ASÍ:
        ESTABLECEMOS UNOS PUNTOS MÁXIMOS EN -1, Y RECORREMOS LA 
        LISTA DE JUGADORES, SI LOS PUNTOS DE ESE JUGADOR SON 
        MAYORES QUE LOS DEL MÁXIMO ENTONCES MAX = JUGADOR.PUNTOS
        Y GANADOR = JUGADOR CUYOS PUNTOS SEAN EL MÁXIMO Y ASÍ 
        HASTA QUE HAYAMOS RECORRIDO TODOS LOS JUGADORES.
        */
        let maxPuntos = -1;
        let jugadorGanador;
        jugadoresActivos.forEach(jugador => {
            if (jugador.eliminado == false) {
                jugador.puntos = jugador.cartas.filter(carta => carta.tipo === "Puntos")
                    .reduce((acumulado, carta) => acumulado + carta.puntos, 0);
                if (jugador.puntos > maxPuntos) {
                    maxPuntos = jugador.puntos;
                    jugadorGanador = jugador;
                }
            }
        });
        if (jugadorGanador) {
            alert(`HA GANADO ${jugadorGanador.nombre} CON ${jugadorGanador.puntos} PUNTOS!`);
            jugadorGanador.ganador = true;
        } else {
            alert("¡VAYA, ES UN EMPATE!");
        }
    }
}

// INICIALIZAMOS A LOS JUGADORES
jugadoresActivos.push(jugador1 = new Jugador("Jugador1"));
jugadoresActivos.push(jugador2 = new Jugador("Jugador2"));
jugadoresActivos.push(jugador3 = new Jugador("Jugador3"));

//FUNCIÓN QUE NOS PROPORCIONA EL PATH PARA LAS FOTOS DE CARTAS
function getRandomPathImg() {
    let random = Math.floor(Math.random() * 20) + 1;
    if (random < 10) {
        return `./img/card/robot_0${random}.png`;
    }
    return `./img/card/robot_${random}.png`;
}

// CLASE DE LA CARTA
class Carta {
    constructor(tipo, path, puntos) {
        this.tipo = tipo;
        this.path = path;
        this.puntos = puntos;
    }
}

// MAZO/DECK O BARAJA, DE DONDE SE ROBA
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
            for (let i = 0; i <= 8; i++) {
                this.cartas.push(new Carta("Bomba", "../img/bomba/bomba.png", 0));
            }
            for (let i = 0; i <= 10; i++) {
                this.cartas.push(new Carta("Pasar turno", "../img/pasarTurno/pasarTurno.png", 0));
            }
            for (let i = 0; i <= 8; i++) {
                this.cartas.push(new Carta("Desactivacion", "../img/herramienta/herramienta.png", 0));
            }
            for (let i = 0; i <= 34; i++) {
                let puntosRandom = Math.floor(Math.random() * 11);
                this.cartas.push(new Carta("Puntos", getRandomPathImg(), puntosRandom));
            }
        }
    }
    // MUESTRA LAS CARTAS QUE HAY EN EL ARRAY
    mostrarCartas() {
        console.log("VAMOS A MOSTRAR LAS CARTAS");
        for (let i = 0; i < this.cartas.length; i++) {
            console.log(this.cartas[i]);
        }
    }

    // BARAJA LAS CARTAS USANDO EL ALGORITMO DE FISHER YATES
    // Y LOS CAMBIA USANDO UNA DECONSTRUCCIÓN DEL ARRAY
    // QUE HE DESCUBIERTO EN KEEPCODING C:
    barajar() {
        for (let i = this.cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]];
        }
    }

    //ELIMINA LA ÚLTIMA CARTA DEL MAZO
    // PARA CUANDO SE LLAME A ROBAR
    // ADEMÁS DEVUELVE LA CARTA ELIMINADA
    quitarCarta() {
        return this.cartas.pop();
    }
}

// FUNCIÓN QUE INCREMENTA EL TURNO
// ESTÁ FUNCIÓN NO ME FUNCIONA
function pasarTurno() {
    tunoActual++;
    resaltarNombre(tunoActual);
    // ESTO DEBE DE HACER ALGO MÁS
}

// SELECCIONO LOS BOTONES DEL DOM 
let botonRobar = document.getElementById("btnRobar");
botonRobar.classList.add("btnAccion");
botonRobar.addEventListener("click", robar);

let botonPasarTurno = document.getElementById("btnPasar");
botonPasarTurno.addEventListener("click", pasarTurno);


// ESTA FUNCIÓN CALCULA LOS PUNTOS TOTALES
// Y ACTUALIZA EL NÚMERO DE CARTAS DE 
// CADA JUGADOR Y LO IMPRIME EN EL DOM
function actualizarEstadisticas(jugador, turno) {

    // REDUCE VALE PARA IR SUMANDO LOS PUNTOS DE CADA 
    //CARTA EN CASO DE QUE LA CARTA SEA DE TIPO PUNTOS,
    // LO CUAL SE COMPRUEBA CON EL FILTER.
    jugador.puntos = jugador.cartas.filter(carta => carta.tipo === "Puntos").reduce((acumulado, carta) => acumulado + carta.puntos, 0);

    // TURNO + 1 PORQUE JUGADORES EMPIEZAN 
    //EN 1 Y EL ARRAY COMO ES NATURAL EN 0
    document.getElementById(`J${turno + 1}NumCartas`).textContent = `⚪️ Número de cartas: ${jugador.calcularCartas()}`;
    document.getElementById(`J${turno + 1}Puntos`).textContent = `⚪️ Puntos totales: ${jugador.puntos}`;
    document.getElementById(`J${turno + 1}saltoTurno`).textContent = `⚪️ Cartas salto turno: ${jugador.pasarTurno}`;
    document.getElementById(`J${turno + 1}Desactivacion`).textContent = `⚪️ Cartas desactivación: ${jugador.desactivacion}`;
}

// FUNCIÓN QUE CAMBIA EL COLOR DEL H2 DE LA CABECERA
function resaltarNombre(turnoActual) {

    // HACEMOS SELECCIÓN DE TODOS LOS H2 DE LAS CABECERAS  
    // NOS DEVUELVE UNA LISTA DE LOS NODOS QUE SE PUEDE ITERAR
    // c COMO UNA LISTA NORMAL
    let cabecerasJugadores = document.querySelectorAll('.cabeceraJugador h2');

    cabecerasJugadores.forEach((h2, posicion) => {
        // SI LA POSICIÓN DEL ARRAY COINCIDE CON EL TURNO ACTUAL
        // ES EL TURNO DEL JUGADOR
        if (posicion === turnoActual) {
            h2.classList.add('jugadorActivo');
        } else {
            // EN CASO CONTRARIO LE QUITAMOS EL AMARILLO
            h2.classList.remove('jugadorActivo');
        }
    });
}

// ESTA FUNCIÓN DESHABILITA LOS BOTONES CUANDO SE TERMINA LA PARTIDA
function deshabilitarBotones() {
    botonRobar.disabled = true;
    botonPasarTurno.disabled = true;
   
    botonPasarTurno.classList.remove("btnAccion");
    botonRobar.classList.remove("btnAccion");
}

// IMPRIME EN EL DOM LAS DOS ÚLTIMAS CARTAS DESCARTADAS
function actualizarDescarte() {
    // PARA ACCEDER A LOS HIJOS DE DESCARTE
    let listaDescarte = document.getElementById("listaDescarte").children;

    if (descartes.length > 0) {
        listaDescarte[0].textContent = descartes[descartes.length - 1].tipo; // Última carta descartada
    }

    if (descartes.length > 1) {
        listaDescarte[1].textContent = descartes[descartes.length - 2].tipo; // Penúltima carta descartada
    }
}

// "FUNCIÓN" QUE MUEVE EL JUEGO ENTERO,
// EN ELLA SE PASA EL TURNO, SE ROBA LA CARTA,
// SE AÑADE LA CARTA AL JUGADOR Y SE COMPRUEBAN
// LOS FINES DE PARTIDA. 

//PD: si se acaba por que gane un jugador sólo
// hay que pulsar el botón 3 o 4 veces hasta que 
// aparece el alert correspondiente, aunque no se
// siga la ejecución de los jugadores
function robar() {

    // REGULA QUE SE VUELVA AL JUGADOR DE LA POS 0
    if (tunoActual >= jugadoresActivos.length) {
        tunoActual = 0;
    }

    // FORMAS DE COMPROBAR FIN DE PARTIDA
    // SI SÓLO QUEDA UN JUGADOR GANA
    if (jugadoresActivos.length === 1) {
        // LA POSICIÓN 0 POR QUE SÓLO QUEDA 1
        alert(`GAME OVER¡ ${jugadoresActivos[0].nombre} ha ganado!`);
        deshabilitarBotones();
        return; // Termina la ejecución de la función
    }

    // SI EL MAZO SE QUEDA SIN CARTAS GANA EL JUGADOR CON MÁS PUNTOS
    if (mazo1.cartas.length === 0) {
        alert("La partida ha terminado. No quedan más cartas en el mazo.");
        deshabilitarBotones();
        compararPuntos();
        return;
    }

    jugadorActivo = jugadoresActivos[tunoActual];
    jugadorActivo.turno = true;

    if (jugadorActivo.eliminado == false) {
        console.log("\n-------------------------------------");
        console.log(`JUGADOR ACTIVO ES:  ${jugadorActivo.nombre}`);
        console.log("-------------------------------------");

        let cartaRobada = mazo1.cartas.pop();
        //METEMOS LA CARTA ROBADA EN LA PILA DE DESCARTES
        descartes.push(cartaRobada);
        console.log("JUGADOR ROBA CARTA");
        // JUGADOR SE LE AÑADE LA CARTA QUE ROBA
        jugadorActivo.robar(cartaRobada);

        // PARA QUE CAMBIE LA IMAGEN
        let imgCartaRobada = document.getElementById("imgCartaRobada");
        imgCartaRobada.src = cartaRobada.path;

        // ACTUALIZAMOS LOS PUNTOS Y EL DESCARTE
        actualizarEstadisticas(jugadorActivo, tunoActual);
        actualizarDescarte();
        console.log("-------------------------------------");

        console.log("------------CARTA ROBADA------------");
        console.log(cartaRobada);
        console.log("-------------------------------------");
        console.log("-----------CARTAS JUGADOR-----------");
        console.log(jugadorActivo.mostrarCartas());
        console.log("-------------------------------------\n");
    } else {
        // COMPROBAR SI QUEDA UNO 
        if (jugadoresActivos.length === 1) {
            alert(`GAME OVER¡${jugadoresActivos[0].nombre} ha ganado!`);
            deshabilitarBotones();
            return; 
        }
        jugadoresActivos.splice(tunoActual, 1);
        tunoActual--;
    }
    // SE DESHABILITA EL BOTÓN EN EL TURNO DEL QUE LO PULSÓ
    botonPasarTurno.classList.add("btonDeshabilitado");
    jugadorActivo.turno = false;
    // CON ESTO LE ESTOY PASANDO EL TURNO AL QUE TODAVÍA NO HA TOCADO EL BOTÓN
    tunoActual++;
    if (jugadorActivo.eliminado == false) {
        resaltarNombre(tunoActual);
    }
    if (tunoActual >= jugadoresActivos.length) {
        tunoActual = 0; // Reiniciar si llega al final del array
    }
    jugadorActivo = jugadoresActivos[tunoActual];
    jugadorActivo.turno = true;
    // CORROBORO SI EL QUE NO LO HA PULSADO TIENE CARTAS SUFICIENTES O NO
    if (jugadorActivo.pasarTurno > 0) {
        botonPasarTurno.disabled = false;
        botonPasarTurno.classList.add("btnAccion");
    }
}

let mazo1 = new Mazo();
console.log("INICIALIZANDO CARTAS")
mazo1.inicializar();
mazo1.mostrarCartas();
console.log("BARAJANDO LAS CARTAS")
mazo1.barajar();
mazo1.mostrarCartas();



