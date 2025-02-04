let dom = $(document); //Pasa todo el HTML en una variable.

dom.ready(iniciarEvento);



function iniciarEvento(){
    let rulet = $("#ruleta");
    rulet.click(CarreraCaballos);
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

const spinPath2 = [];
spinPath2.push(30);
spinPath2.push(31);
spinPath2.push(32);
spinPath2.push(41);
spinPath2.push(50);
spinPath2.push(49);
spinPath2.push(48);
spinPath2.push(39);

let caballo1 = 1;
let caballo2 = 9;
let caballo3 = 17;
let caballo4 = 25;
let caballo5 = 33;
let caballo6 = 41;
let currentIndex1 = 0; //camino red
let currentIndex2 = 4;
let currentIndex3 = 8;
let currentIndex4 = 12;
let currentIndex5 = 16;
let currentIndex6 = 20;
let currentIndex31 = 1; //camino green
let currentIndex32 = 5;
let currentIndex33 = 9;
let currentIndex34 = 13;
let currentIndex35 = 17;
let currentIndex36 = 21;
let currentIndex41 = 2; //camino blue
let currentIndex42 = 6;
let currentIndex43 = 10;
let currentIndex44 = 14;
let currentIndex45 = 18;
let currentIndex46 = 22;

let currentIndex21 = 0;
let currentIndex22 = 2;
let currentIndex23 = 4;
let currentIndex24 = 6;

let interval; 

function CarreraCaballos() {
    if (interval) clearInterval(interval); 

    let acabarCarrera = false;
    let steps = 40 + (Math.floor(Math.random() * 16)); 
    let speed = 1000; 

    interval = setInterval(() => {

        cells[spinPath[currentIndex1]].classList.remove('red'); //red
        cells[spinPath[currentIndex2]].classList.remove('red');
        cells[spinPath[currentIndex3]].classList.remove('red');
        cells[spinPath[currentIndex4]].classList.remove('red');
        cells[spinPath[currentIndex5]].classList.remove('red');
        cells[spinPath[currentIndex6]].classList.remove('red');
        cells[spinPath[currentIndex31]].classList.remove('greenyell'); //green
        cells[spinPath[currentIndex32]].classList.remove('greenyell');
        cells[spinPath[currentIndex33]].classList.remove('greenyell');
        cells[spinPath[currentIndex34]].classList.remove('greenyell');
        cells[spinPath[currentIndex35]].classList.remove('greenyell');
        cells[spinPath[currentIndex36]].classList.remove('greenyell');
        cells[spinPath[currentIndex41]].classList.remove('blue'); //blue
        cells[spinPath[currentIndex42]].classList.remove('blue');
        cells[spinPath[currentIndex43]].classList.remove('blue');
        cells[spinPath[currentIndex44]].classList.remove('blue');
        cells[spinPath[currentIndex45]].classList.remove('blue');
        cells[spinPath[currentIndex46]].classList.remove('blue');
        
        currentIndex1 = (currentIndex1 + 1) % spinPath.length;//red
        currentIndex2 = (currentIndex2 + 1) % spinPath.length;
        currentIndex3 = (currentIndex3 + 1) % spinPath.length;
        currentIndex4 = (currentIndex4 + 1) % spinPath.length;
        currentIndex5 = (currentIndex5 + 1) % spinPath.length;
        currentIndex6 = (currentIndex6 + 1) % spinPath.length;
        currentIndex31 = (currentIndex31 + 1) % spinPath.length;//green
        currentIndex32 = (currentIndex32 + 1) % spinPath.length;
        currentIndex33 = (currentIndex33 + 1) % spinPath.length;
        currentIndex34 = (currentIndex34 + 1) % spinPath.length;
        currentIndex35 = (currentIndex35 + 1) % spinPath.length;
        currentIndex36 = (currentIndex36 + 1) % spinPath.length;
        currentIndex41 = (currentIndex41 + 1) % spinPath.length;//blue
        currentIndex42 = (currentIndex42 + 1) % spinPath.length;
        currentIndex43 = (currentIndex43 + 1) % spinPath.length;
        currentIndex44 = (currentIndex44 + 1) % spinPath.length;
        currentIndex45 = (currentIndex45 + 1) % spinPath.length;
        currentIndex46 = (currentIndex46 + 1) % spinPath.length;

        cells[spinPath[currentIndex1]].classList.add('red');//red
        cells[spinPath[currentIndex2]].classList.add('red');
        cells[spinPath[currentIndex3]].classList.add('red');
        cells[spinPath[currentIndex4]].classList.add('red');
        cells[spinPath[currentIndex5]].classList.add('red');
        cells[spinPath[currentIndex6]].classList.add('red');
        cells[spinPath[currentIndex31]].classList.add('greenyell');//green
        cells[spinPath[currentIndex32]].classList.add('greenyell');
        cells[spinPath[currentIndex33]].classList.add('greenyell');
        cells[spinPath[currentIndex34]].classList.add('greenyell');
        cells[spinPath[currentIndex35]].classList.add('greenyell');
        cells[spinPath[currentIndex36]].classList.add('greenyell');
        cells[spinPath[currentIndex41]].classList.add('blue');//blue
        cells[spinPath[currentIndex42]].classList.add('blue');
        cells[spinPath[currentIndex43]].classList.add('blue');
        cells[spinPath[currentIndex44]].classList.add('blue');
        cells[spinPath[currentIndex45]].classList.add('blue');
        cells[spinPath[currentIndex46]].classList.add('blue');

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
button.addEventListener('click', spinRoulette);



