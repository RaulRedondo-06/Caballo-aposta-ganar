let dom = $(document); //Pasa todo el HTML en una variable.

dom.ready(iniciarEvento);

const MULT_NORMAL = 1; MULT_ESPECIAL = 2; MULT_MUYESPECIAL = 3, MULT_RARISIMO = 5, MULT_LOCURA = 10; // Constantes de los multiplicadores
const PORC_NORMAL = 51, PORC_ESPECIAL = 91, PORC_MUYESPECIAL = 96, PORC_RARISIMO = 99; // Constantes para los porcentajes
const spansGanador = Array.from(document.querySelectorAll('.ganador_o_perdedor')); // Guarda en el array todos los spans con la id "ganador_o_perdedor"
const botonesApuesta = document.querySelectorAll('.aposCab'); // Guarda todos los botones con la clase 'aposCab'

var dineroActual = 100; // Dinero del jugador, al principio se le otorga 100
var apuestaActual = 0; // Dinero que el jugador apuesta
var multiplicador = 0; // Multiplicador de la apuestas
var caballoApostado = 0; // Caballo por el que apuesta el jugador

function iniciarEvento(){
    let rulet = $("#ruleta");
    rulet.click(CarreraCaballos);
    actualizarDineroTotal();
    actualizarValorApuesta();
    crearMultiplicador();

    $(".aposCab").click(realizarApuesta);
}

function resetApuesta(){
    apuestaActual = 0;
    actualizarValorApuesta();
}

function aumentarApuesta(addApuesta){
    if(dineroActual > apuestaActual + addApuesta){ // La apuesta solo aumentara si el jugador tiene el suficiente dinero para hacerla
        apuestaActual += addApuesta;
    } else{
        // Avisar jugador de que no tiene suficiente dinero
    }
    
    actualizarValorApuesta();
}

function actualizarValorApuesta(){
    $("#apuestaActual").text(apuestaActual);
}

function restarDinero(removeMoney){
    dineroActual -= removeMoney
    actualizarDineroTotal();
}

function sumarDinero(addMoney){
    dineroActual += addMoney;
    actualizarDineroTotal();
}

function actualizarDineroTotal(){
    $("#actualMoney").text(dineroActual);
}

function crearMultiplicador(){
    var porcentaje = 0;
    porcentaje = getRandom(1, 101);
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
    for(var i = 0; i < spansGanador.length(); i++){
        if(idGanador == i && caballoApostado == id){
            spansGanador(i).textContent = 'Has ganado';
        }

        if(caballoApostado != idGanador && caballoApostado == i){
            spansGanador(i).textContent = 'Has perdido';
        }
    }
}

function apuestaRealizada(){
    console.log('Has pulsado el boton ${valor}');
}

const table = document.getElementById('caballos');
const button = document.getElementById('ruleta');

const tableSize = 8;
const cells = Array.from(table.getElementsByTagName('td'));

const recorrido1 = [];
const recorrido2 = [];
const recorrido3 = [];
const recorrido4 = [];
const recorrido5 = [];
const recorrido6 = [];

for (let i = 1; i < tableSize-1; i++) recorrido1.push(i); 
for (let i = 1; i < tableSize-1; i++) recorrido2.push(tableSize + i); 
for (let i = 1; i < tableSize-1; i++) recorrido3.push(2 * tableSize + i); 
for (let i = 1; i < tableSize-1; i++) recorrido4.push(3 * tableSize + i); 
for (let i = 1; i < tableSize-1; i++) recorrido5.push(4 * tableSize + i); 
for (let i = 1; i < tableSize-1; i++) recorrido6.push(5 * tableSize + i); 

let caballo1 = 1;
let caballo2 = 9;
let caballo3 = 17;
let caballo4 = 25;
let caballo5 = 33;
let caballo6 = 41;

let interval; 

function CarreraCaballos() {
    if (interval) clearInterval(interval); 

    let acabarCarrera = false;
    let speed = 100; 

    let avanzar1;
    let avanzar2;
    let avanzar3;
    let avanzar4;
    let avanzar5;
    let avanzar6;

    interval = setInterval(() => {

        avanzar1 = getRandom(0, 10);
        avanzar2 = getRandom(0, 10);
        avanzar3 = getRandom(0, 10);
        avanzar4 = getRandom(0, 10);
        avanzar5 = getRandom(0, 10);
        avanzar6 = getRandom(0, 10);


        if (avanzar1 <= 1){
            cells[recorrido1[caballo1]].appendChild('<img src="img/camino_no_caballo.png">');
            caballo1 = (caballo1 + 1);
            cells[recorrido1[caballo1]].appendChild('<img src="img/camino_caballo.png">');
        }
        if (avanzar2 <= 1){
            cells[recorrido2[caballo2]].replaceWith("src", "img/camino_no_caballo.png");
            caballo2 = (caballo2 + 1);
            cells[recorrido2[caballo2]].replaceWith("src", "img/camino_caballo.png");
        }
        if (avanzar3 <= 1){
            cells[recorrido3[caballo3]].attr("src", "img/camino_no_caballo.png");
            caballo3 = (caballo3 + 1);
            cells[recorrido3[caballo3]].attr("src", "img/camino_caballo.png");
        }
        if (avanzar4 <= 1){
            cells[recorrido4[caballo4]].setAttribute("src", "img/camino_no_caballo.png");
            caballo4 = (caballo4 + 1);
            cells[recorrido4[caballo4]].setAttribute("src", "img/camino_caballo.png");
        }
        if (avanzar5 <= 1){
            cells[recorrido5[caballo5]].setAttribute("src", "img/camino_no_caballo.png");
            caballo5 = (caballo5 + 1);
            cells[recorrido5[caballo5]].setAttribute("src", "img/camino_caballo.png");
        }
        if (avanzar6 <= 1){
            cells[recorrido6[caballo6]].setAttribute("src", "img/camino_no_caballo.png");
            caballo6 = (caballo6 + 1);
            cells[recorrido6[caballo6]].setAttribute("src", "img/camino_caballo.png");
        }


        if(caballo1 == 6){
            acabarCarrera = true;
        }
        if(caballo2 == 14){
            acabarCarrera = true;
        }
        if(caballo3 == 22){
            acabarCarrera = true;
        }
        if(caballo4 == 30){
            acabarCarrera = true;
        }
        if(caballo5 == 38){
            acabarCarrera = true;
        }
        if(caballo6 == 46){
            acabarCarrera = true;
        }
        
        
        if (acabarCarrera) {
            clearInterval(interval); // Detener la carrera
        }
    }, speed);
}
//8==============D