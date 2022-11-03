let productos = [
    {nombre: "PC GAMER Ryzen 7 RTX 3060Ti", precio: 299999, tipo: "PC"},
    {nombre: "Notebook ASUS i7 16GB RAM RTX 2060", precio: 149999, tipo:"notebook"},
    {nombre: "Placa de video RTX 3070ti 10GB", precio: 169999, tipo: "componente" },
    {nombre: "Placa de video RTX 3060ti 8GB", precio: 129999, tipo: "componente" },
    {nombre: "Placa de video RTX 3080ti 12GB", precio: 299999, tipo: "componente" },
    {nombre: "Disco sólido interno WD 500GB", precio: 12000, tipo: "componente" }, 
    {nombre: "Notebook Gamer ASUS AMD Ryzen 6800H 16 GB RTX 3060", precio: 500000, tipo: "notebook" }

]

let presupuestoTotal = parseInt(prompt("¿Cual es tu presupuesto?"));
let gastoTotal = 0;
presupuestoTotal = Number.isNaN(presupuestoTotal) ? 0 : presupuestoTotal;  


const elegirProductos = () =>{
 
    let seguirComprando;

    do{
        pedirProducto();
        seguirComprando = confirm("Desea seguir comprando?");
    }while(seguirComprando);

    console.log(`Terminaste con tus compras el gasto total fue: $${puntoEnMiles(gastoTotal)}, quedaste con $${puntoEnMiles(presupuestoTotal)}`)

}

const pedirProducto = ()=>{

    let producto;
    let esProductoValido;
    do{
        producto =  prompt("Elige el producto: PC o Notebook o Componente");

        producto = producto !== null ? producto.toUpperCase() : null;

        esProductoValido = producto=="PC" || producto=="NOTEBOOK" || producto=="COMPONENTE";
    }
    while(!esProductoValido)

    const productosFiltrados = productos.filter(pr => pr.tipo.toUpperCase() === producto);
    const nombreProductos = productosFiltrados.map((pr, id) => `${id+1}. ${pr.nombre} $${puntoEnMiles(pr.precio)}`);

    const productosAMostrar = nombreProductos.join(" \n");

    let productoElegido = parseInt(prompt(`Elige segun el número. Presupuesto: $${puntoEnMiles(presupuestoTotal)}\n${productosAMostrar}`));

    // Si el producto es mayor a 0 y la posicion es distinto a undefined
    if(productoElegido > 0 && productosFiltrados.at(productoElegido-1) != undefined){
        ejecutarCompraCon(productosFiltrados.at(productoElegido-1));
    }else{
        console.log("No existe ese articulo, compra cancelada");
    }
}

  

const  ejecutarCompraCon = (producto)=>{

    if(presupuestoTotal >= producto.precio){
        presupuestoTotal -= producto.precio;
        gastoTotal += producto.precio;
        console.log(`Felicidades compraste ${producto.nombre} quedaste con $${puntoEnMiles(presupuestoTotal)}`);
    }else{
        console.log("Dinero insuficiente ese articulo cuesta $" + puntoEnMiles(producto.precio));
    }
}

const puntoEnMiles = (num) => new Intl.NumberFormat('de-DE').format(num);

elegirProductos();
