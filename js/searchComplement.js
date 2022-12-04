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