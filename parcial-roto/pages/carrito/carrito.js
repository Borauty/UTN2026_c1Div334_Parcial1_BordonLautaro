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
            tabla.innerHTML += `
            <tr>
            <td>${carrito[index].nombre}</td>
            <td>${carrito[index].cantidad}</td>
            <td>${carrito[index].precio}</td>
            </tr>`;
            let precioProd = parseInt(carrito[index].precio.replace("$", ""));
            totalPrecio += precioProd * carrito[index].cantidad;
        }
        total.innerHTML = `<h2 id="valor-final">El valor final a pagar es de: $${totalPrecio}</h2>`
    } else {
        tabla.innerHTML = `<tr class="fila-header-carrito">
                    <td class="celda-header-tabla-carrito">Nombre del producto</td>
                    <td class="celda-header-tabla-carrito">Cantidad</td>
                    <td class="celda-header-tabla-carrito">Precio unitario</td>
                    </tr>`
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