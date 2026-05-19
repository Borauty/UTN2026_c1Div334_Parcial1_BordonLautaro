function obtenerCarrito() 
{
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    return carrito;
}

function cargarProductosCarrito() 
{   
    let totalPrecio = 0;
    let total = document.getElementById("valor-final");
    let tabla = document.getElementById("tabla-carrito");
    let carrito = obtenerCarrito();
    if (carrito.length > 0) {
        for (let index = 0; index < carrito.length; index++) {
            tabla.innerHTML +=
                `<li class="bloque-item">
            <p class="nombre-item">
                ${carrito[index].nombre}
            </p>
            <p class="cantidad-item">
                ${carrito[index].cantidad}
            </p>
            <p class="precio-item">
                ${carrito[index].precio}
            </p>
            </li>`;
            let precioProd = parseInt(carrito[index].precio.replace("$", ""));
            totalPrecio += precioProd * carrito[index].cantidad;
        }
        total.innerHTML = `<h2 id="valor-final">El valor final a pagar es de: $${totalPrecio}</h2>`
    } else {
        tabla.innerHTML = `No hay productos en el carrito`
        total.innerHTML = `<h2 id="valor-final">El valor final a pagar es de: $0</h2>`

    }
}

function limpiarCarrito() 
{
    let carrito = obtenerCarrito();

    carrito = []

    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarProductosCarrito();
    alert("Carrito limpiado correctamente");

}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});