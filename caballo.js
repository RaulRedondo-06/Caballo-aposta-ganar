let dom = $(document);

dom.ready(inicializarEventos);

var dineroActual = 100;
var apuestaActual = 0;

function inicializarEventos(){
    actualizarDineroTotal();
    actualizarValorApuesta();
}

function resetApuesta(){
    apuestaActual = 0;
    actualizarValorApuesta();
}

function aumentarApuesta(addApuesta){
    apuestaActual += addApuesta;
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