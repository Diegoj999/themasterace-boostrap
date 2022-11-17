const contenedor = document.getElementById("contenedor");
const cartButton = document.querySelector(".formExtra__numProduct");

let carrito;

document.addEventListener("DOMContentLoaded", () => {
   let storageCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
   carrito = storageCarrito != null ? storageCarrito : [];
   cargarProductos();
})

const productos = [{
      id: 1,
      nombre: "Pc Armada Amd Ryzen 7 5700g Ram 32gb RTX 3050 8GB",
      img: "/assets/images/pc.webp",
      precio: 299999,
      desc: "PC AMD Ryzen 7",
      tipo: "pc"
   },
   {
      id: 2,
      nombre: "Notebook ASUS 15,6' FHD Core I3 1165g4 8GB SSD 256GB",
      img: "/assets/images/notebook.webp",
      precio: 140000,
      desc: "Notebook ASUS Core i3",
      tipo: "notebook"
   },
   {
      id: 3,
      nombre: "Placa de video Nvidia Gigabyte GeForce GTX 1660 SUPER",
      img: "/assets/images/componente1.webp",
      precio: 80000,
      desc: "Placa GTX 1660 SUPER",
      tipo: "componente"
   },
   {
      id: 4,
      nombre: "Pc Completa Intel I5 9na 16gb Ddr4 Hd 1tb Gtx 1650 4gb",
      img: "/assets/images/pc.webp",
      precio: 230000,
      desc: "PC INTEL",
      tipo: "pc"
   },
   {
      id: 5,
      nombre: "Apple Macbook Air 13 pulgadas Nvme 2.0 512GB 8GB RAM ",
      img: "/assets/images/notebook2.webp",
      precio: 400000,
      desc: "Macbook Air 512GB 8GB RAM",
      tipo: "notebook"
   },
   {
      id: 6,
      nombre: "Placa de video Nvidia Gigabyte GeForce RTX 3060Ti 8GB",
      img: "/assets/images/componente2.webp",
      precio: 180000,
      desc: "Placa RTX 3060Ti",
      tipo: "componente"
   },
   {
      id: 7,
      nombre: "Pc Intel Core i5-11600K 16GB DDR4 RTX3060 12GB 500GB",
      img: "/assets/images/pc2.jpg",
      precio: 500000,
      desc: "PC Intel Core i5 RTX3060",
      tipo: "pc"
   },
   {
      id: 8,
      nombre: "Notebook HP AMD Ryzen 7 5700u 12gb 256GB SSD 15.6'",
      img: "/assets/images/notebook3.webp",
      precio: 210000,
      desc: "Notebook HP",
      tipo: "notebook"
   },
   {
      id: 9,
      nombre: "Placa de video Zotac Nvidia Gigabyte RTX3080Ti 12GB",
      img: "/assets/images/componente3.webp",
      precio: 235000,
      desc: "Placa RTX 3080Ti",
      tipo: "componente"
   },
]

const cargarProductos = () => {

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
   actualizarContenido()
}

const actualizarContenido = () => {

   cartButton.innerText = carrito.length;

   const productCart = document.querySelectorAll(".productCard__btn");

   productCart.forEach(pr =>
      pr.addEventListener("click", (e) => {
         agregarAlCarrito(e.currentTarget.id);
      }))

}

const agregarAlCarrito = idBoton => {

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

   localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
}

const puntoEnMil = (number) => new Intl.NumberFormat('de-DE').format(number);