const contenedor = document.getElementById("contenedor");
const cartButton = document.querySelector(".formExtra__numProduct");

let carrito;

document.addEventListener("DOMContentLoaded", () => {
   fetchData();
   let storageCarrito = JSON.parse(localStorage.getItem("productos-carrito"));
   carrito = storageCarrito != null ? storageCarrito : [];

})

const fetchData = async () =>{
   try{
      const clasesDeContenedor = contenedor.classList
      const categoria = clasesDeContenedor[clasesDeContenedor.length - 1];

      const api =  categoria != "todos" ? '../api.json' : 'api.json';
       const res = await fetch(api);
       const data = await res.json();
 
       cargarProductos(data);
   }
   catch(error){
       console.log(error)
   }
}

const cargarProductos = (productos) => {

   contenedor.innerHTML = "";
   const clasesDeContenedor = contenedor.classList
   const categoria = clasesDeContenedor[clasesDeContenedor.length - 1];

   // Si la categoria es distinta a la clase todos, filtramos por categoria si no mandamos todos
   let productosFiltrados = categoria != "todos" ? productos.filter(pr => pr.tipo == categoria) : productos;

   productosFiltrados.forEach((pr) => {

      const {
         id,
         nombre,
         img,
         precio,
         desc,
         tipo
      } = pr;

      let image = categoria != "todos" ? `..${img}` : `.${img}`; // Para ver la imagen en distinta URL

      contenedor.innerHTML += `
                <div class="col-sm-12 col-md-5 col-lg-5 col-xl-3">
                     <div class="card productCard ${tipo}">
                        <img src=${image} class="productCard__img" alt="${desc}" />
                         <div class="card-body">
                            <h5 class="fs-3 productCard__title">$${puntoEnMil(precio)}</h5>
                            <p class="card-text productCard__info">${nombre}</p>
                            <button id="${id}" class="btn btn-primary d-block mx-auto productCard__btn">Añadir al Carrito</button>
                         </div>
                      </div>
                   </div>
        `
   })
   actualizarContenidoEn(productos)
}

const actualizarContenidoEn = (productos) => {

   cartButton.innerText = carrito.length;

   const productCart = document.querySelectorAll(".productCard__btn");

   productCart.forEach(pr =>
      pr.addEventListener("click", (e) => {
         agregarAlCarritoA(e.currentTarget.id, productos);
      }))

}

const agregarAlCarritoA = (idBoton, productos) => {

   const idB = parseInt(idBoton);
   const producto = productos.find(producto => producto.id === idB);

   if (carrito.some(pr => pr.id === idB)) {
      const index = carrito.findIndex(pr => pr.id === idB);
      carrito[index].cantidad++;
   } else {
      producto.cantidad = 1;
      carrito.push(producto);

   }
   //Plugin de notificacion
   new Notify('Añadiste un articulo', `Añadido ${producto.nombre} al carrito`, 'success');
   cartButton.innerText = carrito.length;

   localStorage.setItem("productos-carrito", JSON.stringify(carrito));
}

const puntoEnMil = (number) => new Intl.NumberFormat('de-DE').format(number);