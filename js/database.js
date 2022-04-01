class Producto {
    constructor(marca, modelo, tipo, talle, color, precio) {
        this.marca = marca.toUpperCase();
        this.modelo = modelo;
        this.tipo = tipo.toUpperCase();
        this.talle = talle;
        this.color = color.toUpperCase();
        this.precio = precio;
        this.vendido = false;
    }

    vender() {
        this.vendido = true;
    }
}

let infoProducto = (producto) => {

    for (let propiedad in producto) {
        console.log(`${propiedad}: ${producto[propiedad]}`);
    }

}

////////////////////////////////////////////

class Stock {
    constructor(tipo) {
        this.tipo = tipo.toUpperCase();
        this.productos = [];
    }

    agregarProducto(prod) {
        if (prod.tipo == this.tipo) {
            this.productos.push(prod);
            console.log(`El producto ${prod.marca} ${prod.modelo} fue agregado al stock`);
        }  else {
            console.log(`El producto ${prod.marca} ${prod.modelo} no fue agregado al stock porque no es un par de ${this.tipo}`);
        }
    }
}

/* console.log("Stock de tipo: " + stockCasuales.tipo);
console.log(`En stock hay ${stockCasuales.productos.length} producto/s disponible/s`);
stockCasuales.agregarProducto(zapasBoedo40);
console.log(`En stock hay ${stockCasuales.productos.length} producto/s disponible/s`); */

//////////////////////////////////////////////

class GestorStock {
    constructor() {
        this.stocks = [];
    }

    agregarStock(stock) {
        this.stocks.push(stock);
    }

    hayTalle_En(talle, tipo) {
        let stockTipo = this.stockDeTipo(tipo);
        return stockTipo.productos.some(calzado => calzado.talle == talle);
        // retorna true si el talle deseado del tipo deseado se encuentra en stock
    }

    stockDeTipo(tipo) {
        return this.stocks.find(stock => stock.tipo == tipo);
        // suponiendo que trabajamos solo con un stock de cada tipo, devuelve el stock del tipo buscado
    }

    hayColor_En(color, tipo) {
        let stockTipo = this.stockDeTipo(tipo);
        return stockTipo.productos.some(calzado => calzado.color == color);
    }
}

//////////////////////////////////////////////

class GestorCompra {  

    iniciarCompra() {
        this.seleccionarTalle();
    }

    seleccionarTalle() {
        let talle = parseInt(prompt(`- Zapatillas BOEDO edición otoño -

Elegí el talle: (disponibles desde 39 a 41)`));

        this.consultarTalle(talle, tipoDeseado); //el tipoDeseado viene de afuera para hacer la prueba
    }

    consultarTalle(talle, tipo) {
        if (gestorStock.hayTalle_En(talle, tipo)) {
            alert(`Tenemos el talle ${talle} en Stock!`);
            this.seleccionarColor();
        } else {
            alert(`Por el momento no tenemos el talle ${talle} en Stock, por favor, elegí otro`);
            this.seleccionarTalle();
        }
    }

    seleccionarColor() {
        let color = prompt(`Elegí el color (Negro, Blanco, Marron): `).toUpperCase();

        this.consultarColor(color, tipoDeseado);
    }

    consultarColor(color, tipo) {
        if (gestorStock.hayColor_En(color, tipo)) {
            alert(`Tenemos el color ${color} en Stock!`);
            this.mostrarPrecio();
        } else {
            alert(`Por el momento no tenemos el color ${color} en Stock, por favor, elegí otro`);
            this.seleccionarColor();
        }
    }

    mostrarPrecio() {
        alert(`• Precio de las zapatillas BOEDO Edición Otoño: $5.500
• IVA: 21%

El precio final de las zapatillas BOEDO Edición Otoño + IVA es: $${this.precioFinalConIVA(5500, 21)}`); //en este caso el iva es de 21
    //Acá más adelante jugaré con las propiedades de los objetos para tomar la info que necesite
    }

    ivaDel(porcentaje) {
        return 1 + (porcentaje/100); //calculo el valor a multiplicar con el precio del producto
    }

    precioFinalConIVA(precioProducto, porcentaje) {
        return precioProducto * this.ivaDel(porcentaje);
    }
}