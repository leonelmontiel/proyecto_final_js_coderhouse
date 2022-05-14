let carrito = {} 
const templateFooter = document.getElementById('template-footer').content

productos.addEventListener('click', e => {
    addCarrito(e)
})
coleccion.addEventListener('click', e => {
    addCarrito(e)
})

const addCarrito = e => {
    /* console.log(e.target);
    console.log(e.target.classList.contains('btn-success')); */
    if(e.target.classList.contains('btn-success')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = prod => {
    const producto = {
        id: prod.querySelector('.btn-success').dataset.id,
        marca: prod.querySelector('#prod-brand').textContent,
        modelo: prod.querySelector('#prod-model').textContent,
        talle: prod.querySelector('#prod-size').textContent,
        color: prod.querySelector('#prod-color').textContent,
        precio: prod.querySelector('#prod-price').textContent,
        cantidad: 1
    }
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}

    console.log(carrito);
}