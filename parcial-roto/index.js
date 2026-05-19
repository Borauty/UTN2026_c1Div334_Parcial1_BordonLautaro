//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    return carrito;
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function sumarAlCarrito(e) {
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    let productoHTML = elementoClickeado.closest("li");

    let nombre = productoHTML.querySelector(".nombre-producto").textContent;

    let precio = productoHTML.querySelector(".precio-producto").textContent;

    let carrito = obtenerCarrito();

    let cantidad = 0;

    let producto = {
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
    };
    let prodEstaCarrito = false;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre == nombre) {
            cantidad = carrito[i].cantidad;
            prodEstaCarrito = true;
            carrito[i].cantidad ++;
                break;
        };
    };
    if (!prodEstaCarrito) {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    guardarCarrito(carrito);
    alert("Se agrego un/una: " + nombre)
    console.log(carrito)
}

function restarDelCarrito(e) {
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    let productoHTML = elementoClickeado.closest("li");

    let nombre = productoHTML.querySelector(".nombre-producto").textContent;

    let precio = productoHTML.querySelector(".precio-producto").textContent;

    let carrito = obtenerCarrito();


    let prodEsta = carrito.find(prod => 
        prod.nombre == nombre
    )

    if (!prodEsta) {
        alert("El producto " + nombre + " no esta en el carrito")
    }


    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre == nombre) {
            if (carrito[i].cantidad == 1) {
                carrito.splice(i, 1)
            } else {
                carrito[i].cantidad --;
            }
        };
    };
    if (prodEsta) {
        alert("un/una: " + nombre + " fue eliminado del carrito")
    }
    guardarCarrito(carrito);
    console.log(carrito)

    }

    //--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
    window.addEventListener("DOMContentLoaded", () => {
        const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
        const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");
        botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
        botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
    });
