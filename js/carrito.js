let carrito;
const contenedorTotal = document.querySelector("#total");
const botonVaciar = document.querySelector(".carrito__acciones__vaciar")
const cartButton = document.querySelector(".formExtra__numProduct");
const contenedorCarritoProductos = document.querySelector(".carrito__productos");
const botonComprar = document.querySelector(".carrito__acciones__comprar");
const contenedor = document.querySelector("#modal-container")
const contenedorAcciones = document.querySelector(".carrito__acciones");

document.addEventListener("DOMContentLoaded", () =>{
    let storageCarrito = JSON.parse(localStorage.getItem("productos-carrito"));
    carrito = storageCarrito != null ? storageCarrito : [];
    actualizarCarrito();
})

const actualizarCarrito = () => {

   if (carrito.length > 0) {

      contenedorCarritoProductos.innerHTML = "";

      carrito.forEach(producto => {

         const {
            id,
            nombre,
            img,
            precio,
            desc,
            cantidad
         } = producto;

         const div = document.createElement("div");

         div.classList.add("carrito__producto");
         div.innerHTML = `
        <img class="carrito__img" src="..${img}" alt="${desc}" />
        <div class="carrito__nombre">
            <small>Nombre</small>
            <h3>${nombre}</h3>
        </div>
        <div class="carrito__cantidad">
            <small>Cantidad</small>
            <h3>${cantidad}</h3>
        </div>
        <div class="carrito__precio">
            <small>Precio</small>
            <h3>$${puntoEnMil(precio)}</h3>
        </div>
        <div class="carrito__subtotal">
            <small>SubTotal</small>
            <h3>$${puntoEnMil(precio * cantidad)}</h3>
        </div>

        <button class="carrito__producto__eliminar" id="${id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
      </svg></button>
        `;
         contenedorCarritoProductos.append(div);
      })
   } else {
      contenedorCarritoProductos.innerHTML = `
        <h4 class="carrito__vacio">NO TIENES ARTICULOS EN EL CARRITO</h4>`
   }
   actualizarContenido()
}

botonVaciar.addEventListener("click", () => {
   carrito.length = 0;
   localStorage.setItem("productos-carrito", JSON.stringify(carrito));
   actualizarCarrito();
});

const actualizarContenido = () => {
   cartButton.innerText = carrito.length;
   actualizarTotal()
   actualizarBotonesEliminar();
   actualizarBotonAcciones();

}

const actualizarBotonAcciones = () =>{
    if(carrito.length > 0){
        contenedorAcciones.style.display = "flex"
    }
    else{
        contenedorAcciones.style.display = "none"
    }
}

const actualizarTotal = () => {
   const totalCalculado = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
   contenedorTotal.innerText = `$${puntoEnMil(totalCalculado)}`;
}

const actualizarBotonesEliminar = () => {
   botonesEliminar = document.querySelectorAll(".carrito__producto__eliminar");

   botonesEliminar.forEach(boton => {
      boton.addEventListener("click", (e) => {
         const idBoton = e.currentTarget.id;
         const index = carrito.findIndex(producto => producto.id == idBoton);

         carrito.splice(index, 1);
         actualizarCarrito();

         localStorage.setItem("productos-carrito", JSON.stringify(carrito));
      });
   });
}


botonComprar.addEventListener("click", ()=>{
        carrito.length = 0;
        localStorage.setItem("productos-carrito", JSON.stringify(carrito));
        actualizarCarrito();

        Swal.fire({
            title: 'Compra exitosa',
            text: 'Felicidades tu compra fue realizada con éxito',
            icon: 'success',
            timer: '5000',
            confirmButtonText: 'OK'
          })
    });

