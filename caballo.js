
let dom = $(document); //Pasa todo el HTML en una variable.

dom.ready(iniciarEvento);

const MULT_NORMAL = 2; MULT_ESPECIAL = 3; MULT_MUYESPECIAL = 5, MULT_RARISIMO = 10, MULT_LOCURA = 50; // Constantes de los multiplicadores
const PORC_NORMAL = 51, PORC_ESPECIAL = 91, PORC_MUYESPECIAL = 96, PORC_RARISIMO = 99; // Constantes para los porcentajes
const TIEMPO_ESPERA_FIN_CARRERA = 2500;
const spansGanador = Array.from(document.querySelectorAll('.ganador_o_perdedor')); // Guarda en el array todos los spans con la id "ganador_o_perdedor"
const botonesApuesta = document.querySelectorAll('.aposCab'); // Guarda todos los botones con la clase 'aposCab'

var dineroActual = 5000; // Dinero del jugador, al principio se le otorga 100
var apuestaActual = 0; // Dinero que el jugador apuesta
var multiplicador = 0; // Multiplicador de la apuestas
var caballoApostado = 0; // Caballo por el que apuesta el jugador
var apuestaRealizada = false;
var idGanador = 0;

function iniciarEvento(){
    actualizarDineroTotal();
    actualizarValorApuesta();
    crearMultiplicador();

    $(".aposCab").click(apostarPorCaballo); // Controla las apuestas en los caballos
    $(".buttonAPOSTARX").click(apostar);
    $(".button-reset").click(resetApuesta);
}

function resetApuesta(){
    sumarDinero(apuestaActual, false);
    apuestaActual = 0;
    actualizarValorApuesta();
}

function aumentarApuesta(addApuesta){
    apuestaActual += addApuesta;
    actualizarValorApuesta();
}

function actualizarValorApuesta(){
    $("#apuestaActual").text(apuestaActual);
    apuestaRealizada = true;
}

function restarDinero(removeMoney){
    dineroActual -= removeMoney
    actualizarDineroTotal();
}

function sumarDinero(addMoney, addMultiplicador){
    if(addMultiplicador){
        dineroActual += addMoney * multiplicador;
    } else {
        dineroActual += addMoney;
    }
    
    actualizarDineroTotal();
}

function actualizarDineroTotal(){
    $("#actualMoney").text(dineroActual);
}

function crearMultiplicador(){
    var porcentaje = 0;
    porcentaje = getRandom(1, 101); // Crea un numero entre 1 y 100
    tipoMultiplicador(porcentaje);
}

function tipoMultiplicador(porcentaje){
    if(porcentaje < PORC_NORMAL){
        multiplicador = MULT_NORMAL; // 50% de multiplicador normal (x1)
    }
    else if(porcentaje < PORC_ESPECIAL){
        multiplicador = MULT_ESPECIAL; // 40% de multiplicador especial (x2)
    }
    else if(porcentaje < PORC_MUYESPECIAL){
        multiplicador = MULT_MUYESPECIAL; // 5% de multiplicador muy especial (x3)
    }
    else if(porcentaje < PORC_RARISIMO){
        multiplicador = MULT_RARISIMO; // 3% de multiplicador rarisimo (x5)
    }
    else{
        multiplicador = MULT_LOCURA; // 2% de multiplicador locura (x10)
    }
    asignarMultiplicador()
}

function asignarMultiplicador(){
    $("#multiplicador").text(multiplicador);
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function actualizarGanadores(idGanador){
    for(var i = 0; i < spansGanador.length; i++){
        if(idGanador == i && caballoApostado == idGanador){
            spansGanador[i].textContent = 'Has ganado';
        }

        if(caballoApostado != idGanador && caballoApostado == i){
            spansGanador[i].textContent = 'Has perdido';
        }
    }
    setTimeout(() => {
        for(var i = 0; i < spansGanador.length; i++){
            spansGanador[i].textContent = '';
        }
    }, TIEMPO_ESPERA_FIN_CARRERA);
}

function apostarPorCaballo(){
    caballoApostado = $(this).data('valor');
    console.log('Has pulsado un boton de apuesta. Apuesta: ' + caballoApostado);
    if(apuestaActual > 0){
        cerrarApuestas();
        startRace();
    } else{
        $(this).text('Apuesta algo');
        $(this).css('font-size', '80%');
        setTimeout(() => {
            $(this).text('Apostar');
            $(this).css('font-size', '100%');
        }, 2250);
    }
}

function apostar(){
    valorBoton = $(this).data('valor');
    let textoOriginal = $(this).text();

    if(valorBoton === 1001 && dineroActual > 0){
        sumarDinero(apuestaActual, false);
        apuestaActual = 0; // Reseteamos la apuesta
        valorBoton = dineroActual; // Hacemos que el valor de la apuesta sea igual a todo el dinero que tiene el jugador
    }

    if(dineroActual >= valorBoton){ // La apuesta solo aumentara si el jugador tiene el suficiente dinero para hacerla
        aumentarApuesta(valorBoton);
        if(apuestaRealizada){
            restarDinero(valorBoton);
            apuestaRealizada = false;
        }
        
    } else{
        $(this).text('Dinero insuficiente');
        
        setTimeout(() => {
            $(this).text(textoOriginal);
        }, 2250);
    }
}

function cerrarApuestas(){
    for(let i = 0; i < botonesApuesta.length; i++){
        botonesApuesta[i].disabled = true;
        botonesApuesta[i].classList.add('botones-desabilitados');
    }

    /*setTimeout(() => {
        abrirApuestas();
    }, 3000);*/
    
}

function abrirApuestas(){
    setTimeout(() => {
        for(let i = 0; i < botonesApuesta.length; i++){
            botonesApuesta[i].disabled = false;
            botonesApuesta[i].classList.remove('botones-desabilitados');
        }
    }, TIEMPO_ESPERA_FIN_CARRERA);
}


// Función para generar una velocidad aleatoria dentro de un rango
function getRandomSpeed(min, max) {
    return Math.random() * (max - min) + min;  // Devuelve un valor aleatorio entre min y max
}

// Función para iniciar la carrera
function startRace() {
    const trackWidth = document.querySelector('.track').offsetWidth - 75;

    // Recorremos todos los corredores (cada .runner tiene su propio id único)
    const runners = document.querySelectorAll('.runner');
    let speeds = []; // Guardamos las velocidades para cada corredor
    let currentPositions = []; // Guardamos las posiciones actuales de los corredores
    let raceInProgress = true; // Bandera que indica si la carrera está en curso
    let winner = null; // Variable para almacenar el ganador

    // Inicializamos las posiciones y velocidades de cada corredor
    runners.forEach((runner, index) => {
        speeds[index] = getRandomSpeed(2, 25);  // Asignamos una velocidad aleatoria inicial a cada corredor
        currentPositions[index] = 0; // Todos comienzan en la posición 0
        runner.style.left = '0px'; // Aseguramos que todos comienzan en el inicio de la pista
    });

    // Empezamos el movimiento de los corredores
    const interval = setInterval(() => {
        if (!raceInProgress) {
            clearInterval(interval); // Detenemos el intervalo cuando la carrera ha finalizado
            return;
        }

        // Recorremos todos los corredores
        runners.forEach((runner, index) => {
            // Actualizamos la velocidad de cada corredor cada segundo (puede ser más frecuente si se desea)
            speeds[index] = getRandomSpeed(2, 25);  // Cada segundo cambia la velocidad del corredor

            const currentLeft = currentPositions[index]; // Obtener la posición actual del corredor
            const newLeft = currentLeft + speeds[index]; // Aumentar la posición según la velocidad
            currentPositions[index] = newLeft; // Actualizamos la posición en el arreglo

            runner.style.left = `${newLeft}px`; // Actualizamos la posición en la pista

            // Verificamos si el corredor ha llegado a la meta
            if (newLeft >= trackWidth && winner === null) {
                // Si el corredor llega y no hay un ganador aún, lo designamos como el ganador
                winner = index;
                idGanador = winner;
                raceInProgress = false; // Detenemos la carrera
                console.log(`El corredor ${idGanador} ha ganado la carrera!`);
                finalizarCarrera();
            }
        });
    }, 100); // Actualiza la posición de los corredores cada segundo
}

function devolverCaballosAlInicio(){
    const runners = document.querySelectorAll('.runner');
    setTimeout(() => {
        runners.forEach((runners) => {
            console.log("Reiniciando caballos...")
            runners.style.left = '0px'; // Aseguramos que todos comienzan en el inicio de la pista
        });
    }, TIEMPO_ESPERA_FIN_CARRERA);
    
}

function finalizarCarrera(){
    actualizarGanadores(idGanador);

    if(caballoApostado == idGanador){ // Si el jugador gana la apuesta...
        sumarDinero(apuestaActual, true); // Le damos lo apostado, pero multiplicado
    }

    apuestaActual = 0;
    actualizarValorApuesta();
    crearMultiplicador();
    devolverCaballosAlInicio();
    abrirApuestas();
}
