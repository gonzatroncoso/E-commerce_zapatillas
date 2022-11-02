// restar o sumar productos al contador
let menosBtn = document.querySelector(".input__restar");
let masBtn = document.querySelector(".input__sumar");
let usuarioInput = document.querySelector(".input__numero");
let usuarioInputNumero = 0;


masBtn.addEventListener("click", () =>{
    usuarioInputNumero ++;

    usuarioInput.value = usuarioInputNumero;
    console.log(usuarioInputNumero);
});

menosBtn.addEventListener("click", () =>{

    usuarioInputNumero --;
    if(usuarioInputNumero <= 0){
        usuarioInputNumero = 0;
    }
    usuarioInput.value = usuarioInputNumero;
    console.log(usuarioInputNumero);
});

// ---------------------------------------------------------------
// agrego los productos cuando presiono "añadir al carrito"

const agregarCarrito = document.querySelector(".detalles__boton");
let cartNotificacion = document.querySelector(".header__carta-notificacion")

let ultimoValor = parseInt(cartNotificacion.innerText);

agregarCarrito.addEventListener("click", () =>{
// SUMO LOS PRODUCTOS DEL CARRITO
    ultimoValor = ultimoValor + usuarioInputNumero;

    cartNotificacion.innerText = ultimoValor;
// CAMBIO DE ESTILOS
    cartNotificacion.style.display = "block";

// mostrar los productos del carrito (modal)
    mostrarProductoModal();


    //console.log(cartNotificacion)
});

// ---------------------------------------------------------
// MUESTRO EL MODAL CON LOS DETALLES DEL CARRITO
const cartIconoBtn = document.querySelector(".header__carta") 
const cartModal = document.querySelector(".carta-modal")
// let precioModal = document.querySelector(".carta-modal__precio");
let contenedorProducto = document.querySelector(".carta-modal__confirmacion-contenedor");

cartIconoBtn.addEventListener("click", () =>{
    cartModal.classList.toggle ("transicion");

    if (ultimoValor == 0){
        contenedorProducto.innerHTML = "<div> El carrito esta vacio.</div>";
    }else{
        mostrarProductoModal()
    }
// MUESTRA DEL TOTAL DE PRODUCTOS Y PRECIO EN EL MODAL
    // precioModal.innerHTML = "$15.000 x"+ ultimoValor +"<span> $"+ ultimoValor * 15.000 +".000</span>"
})

// ELIMINAR EL CONTENIDO DEL CARRITO
function eliminarProduct(){
    const eliminarProducto = document.querySelector(".carta-modal__borrar");
    eliminarProducto.addEventListener("click", () =>{
        contenedorProducto.innerHTML = "<div> El carrito esta vacio.</div>";
        ultimoValor = 0;
        cartNotificacion.innerText = ultimoValor;
    })
}
    
// CAMBIO DE IMAGENES (GALERIA). (mobile)
const imgContainer = document.querySelector(".imagenes__contenedor");
const imgAnteriorBtn = document.querySelector(".imagenes_anterior");
const imgPosteriorBtn = document.querySelector(".imagenes_posterior");
let imgIndex = 1;

const imgUrl = [
    "images/image-product-1.jpg",
    "images/image-product-2.jpg",
    "images/image-product-3.jpg",
    "images/image-product-4.jpg" 
]

imgPosteriorBtn.addEventListener("click", ()=>{
    siguienteImg(imgContainer);
})

imgAnteriorBtn.addEventListener("click", ()=>{
    anteriorImg(imgContainer);
})

// Muestrar y cerrar MODAL en version desktop.
const imgModal = document.querySelector(".modal-imagenes__back");
const cerrarModalBtn = document.querySelector(".modal-imagenes__cerrar");

imgContainer.addEventListener("click", ()=>{
    imgModal.style.display = "grid";
});

cerrarModalBtn.addEventListener("click", ()=>{
    imgModal.style.display = "none";
})

// ir cambiando las imagenes de la galeria en desktop
let miniaturas = document.querySelectorAll(".imagenes__miniaturas");

miniaturas = [...miniaturas]
miniaturas.forEach(miniatura => {
    miniatura.addEventListener("click", (e)=>{
        console.log(e.target.id);
        imgContainer.style.backgroundImage = `url("images/image-product-${e.target.id}.jpg")`
    });
});

// ir cambiando las imagenes de la galeria en desktop (DESDE MODAL)

let modalMiniaturas = document.querySelectorAll(".modal-imagenes__miniatura");
const modalImgContenedor = document.querySelector(".modal-imagenes__contenedor")

modalMiniaturas = [...modalMiniaturas]

modalMiniaturas.forEach(modalMiniatura => {
    modalMiniatura.addEventListener("click", (e)=>{
        console.log(e.target.id.slice(-1));
        modalImgContenedor.style.backgroundImage = `url("images/image-product-${e.target.id.slice(-1)}.jpg")`
    });
});

// cambio imagenes desde modal (desktop) mediante las flechitas.

const anteriorModalBtn = document.querySelector(".modal-imagen_anterior");
const posteriorModalBtn = document.querySelector(".modal-imagen_posterior");

posteriorModalBtn.addEventListener("click", ()=>{
    siguienteImg(modalImgContenedor);
})

anteriorModalBtn.addEventListener("click", ()=>{
    anteriorImg(modalImgContenedor);
})


// FUNCIONES
function mostrarProductoModal(){
    contenedorProducto.innerHTML = 
    `   <div class="carta-modal__detalles-contenedor">
          <img class="carta-modal__imagen" src="images/image-product-1-thumbnail.jpg" alt="imagen 1 de zapatillas">
          <div>
            <p class="carta-modal__productos">Nike Air Max 97</p>
            <p class="carta-modal__precio">$20.000 x3 <span>$60.000</span></p>
          </div>
          <img class="carta-modal__borrar" src="images/icon-delete.svg" alt="icono borrar">
        </div>

        <button class="carta-modal__eliminar">Eliminar </button> `

        eliminarProduct();

// MUESTRA DEL TOTAL DE PRODUCTOS Y PRECIO EN EL MODAL
    let precioModal = document.querySelector(".carta-modal__precio");
    precioModal.innerHTML = "$15.000 x"+ ultimoValor +"<span> $"+ ultimoValor * 15.000 +".000</span>"
}

//SIGUIENTE IMAGEN
function siguienteImg(containerImg){
    if (imgIndex == 4) {
        imgIndex = 1;
    }
    else{
        imgIndex++;
    }
    containerImg.style.backgroundImage = `url("images/image-product-${imgIndex}.jpg")`
}
//ANTERIOR IMAGEN
function anteriorImg(containerImg){
    if (imgIndex == 1) {
        imgIndex = 4;
    }
    else{
        imgIndex--;
    }
    containerImg.style.backgroundImage = `url("images/image-product-${imgIndex}.jpg")`
}