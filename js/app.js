const PRIMERPC = 250000;
const SEGUNDAPC = 109000;
const TERCERAPC = 300000;
let consumo = 0;

let nombre = prompt("Ingrese su nombre");
let presupuesto = parseInt(prompt("Ingrese su presupuesto"));

let seguirComprando = true;

function comprarPC(){
    let producto;

    while(seguirComprando){

     producto = parseInt(prompt("Ingrese su Producto \nPC 1: $250.000\nPC 2: $109.000\nPC 3: $300.000"));
    
     switch(producto){

        case 1:
            if(presupuesto >= PRIMERPC){
                presupuesto -= PRIMERPC;
                consumo += PRIMERPC;
            }
            else{
                console.log("Saldo insuficiente para comprar la primer PC");
                return;
            }
            break;

        case 2:
            if(presupuesto >= SEGUNDAPC){
                presupuesto -= SEGUNDAPC;
                consumo += SEGUNDAPC;
            }
            else{
                console.log("Saldo insuficiente para comprar la Segunda PC");
                return;
            }
            break;

        case 3:
            if(presupuesto >= TERCERAPC){
                presupuesto -= TERCERAPC;
                consumo += TERCERAPC;
            }
            else{
                console.log("Saldo insuficiente para Tercera PC");
                return;
            }
            break;

            default: console.log("PC inexistente");
     }
     seguirComprando = confirm(`¿Desea seguir comprando? PRESUPUESTO: $${presupuesto}`);
    } 
}

function terminarCompra(){

    comprarPC()
    if(consumo>0){
        console.log(`Felicidades ${nombre} tus compras fueron realizadas y quedaste con un presupuesto de $${presupuesto}, gastaste $${consumo}`);
    }
    else{
        console.log("No compraste nada");
    }
}

terminarCompra();




