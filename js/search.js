const bSearch = document.querySelector(".bSearch");
const myModal = document.getElementById("exampleModal");
const modalContainer = document.getElementById("modal-container")
const modalInput = document.getElementById("inputModal");
const btnModal = document.getElementById("btnModal");
const btnCerrar = document.querySelector(".btnCerrar");
const spinnerModal = document.getElementById("spinnerModal");
spinnerModal.style.display = "none"

document.addEventListener("DOMContentLoaded", () => {
    
    let storageCarrito = JSON.parse(localStorage.getItem("productos-carrito"));
    carrito = storageCarrito != null ? storageCarrito : [];
    actualizarNumerito()
 
 })

bSearch.addEventListener("focus", ()=>{
   bSearch.dataset.bsTarget = "#exampleModal";
   bSearch.setAttribute('data-bs-toggle', "modal");
   modalContainer.innerHTML = "Busqueda exacta por nombre";
})

btnCerrar.addEventListener("click", ()=>{
   modalContainer.innerHTML = "";
   modalInput.value = "";
})

btnModal.addEventListener("click", (e)=>{
    let patt = new RegExp(/^[A-Za-z0-9\s]+$/g);
 
 
    if(patt.test(modalInput.value)){
       spinnerModal.style.display = "block"
       fetchDataSearch()
    }
    else{
       modalContainer.innerHTML = "Caracteres invalidos";
    }
 })

const fetchDataSearch = async () =>{
    try{

        const clasesDeContenedor = contenedor.classList
        const categoria = clasesDeContenedor[clasesDeContenedor.length - 1];
  
        const api =  categoria != "todos" ? '../api.json' : 'api.json';

        const res = await fetch(api);
        const data = await res.json();

        conseguirProductos(data);
    }
    catch(error){
        console.log(error)
    }
 }

function conseguirProductos(productos){
   btnModal.disabled = true;
   return new Promise((resolve, reject) =>{
      setTimeout(()=>{
         resolve( productosSearch(modalInput.value, productos))
      }, 2000)
   })
}

function productosSearch(string, productos){

      modalContainer.innerHTML = "";
      const clasesDeContenedor = modalContainer.classList
      const categoria = clasesDeContenedor[clasesDeContenedor.length - 1];
      spinnerModal.style.display = "none"

      let productosFiltrados = string =! "" ? productos.filter(pr => pr.nombre.toUpperCase().includes(string.toUpperCase())) : productos

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
 
       modalContainer.innerHTML += `
                 <div class="col-12 gap-5 mt-4 ps-5">
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
    btnModal.disabled = false;

    if(productosFiltrados.length === 0){
      modalContainer.innerHTML = "Sin resultados";
   }
   actualizarContenidoEn(productos)
}