class Formulario {
    constructor(nombrePersona, email, asunto, mensaje) {
        this.nombre = nombrePersona;
        this.email = email;
        this.asunto = asunto;
        this.mensaje = mensaje;
    }
}

 function almacenarForm(nombre, correo, asunto, mensaje) {    
    crearBaseFormSiNoHay(); // creo una nueva base de datos de formularios si no existiese en el localStorage
    const newForm = new Formulario(nombre, correo, asunto, mensaje);
    const baseDatos = JSON.parse(localStorage.getItem(`Formularios`)); //solicito el array de fomrularios alojado en el localStorage
    baseDatos.push(newForm); //agrego el nuevo formulario    
    localStorage.setItem(`Formularios`, JSON.stringify(baseDatos)); //actualizo la base de datos de formularios en el localStorage
}

function crearBaseFormSiNoHay() {
    /* ANTES:
        if (localStorage.getItem(`Formularios`)) {
            localStorage.setItem(`Formularios`, JSON.stringify([]));
        } */
    !localStorage.getItem(`Formularios`) && localStorage.setItem(`Formularios`, JSON.stringify([]));
}

const cantFormularios = () => {
    return JSON.parse(localStorage.getItem(`Formularios`)).length;
}

class Calzado {
    constructor(id, tipo, marca, modelo, talle, color, precio) {
        this.id = id;
        this.tipo = tipo.toUpperCase();
        this.marca = marca.toUpperCase();
        this.modelo = modelo.toUpperCase();
        this.talle = talle;
        this.color = color.toUpperCase();
        this.precio = precio;
    }
}

// objeto con patrón Singleton para que solo exista una instancia de factoryCalzado, la cual gestiona y actualiza los ID
const factoryCalzado = {

    _lastID: 0, // propiedad que recuerda la última id
    get lastID() {
        return this._lastID;
    },
    set lastID(value) {
        this._lastID = value;
    },
    
    crear: function(tipo, marca, modelo, talle, color, precio) {
        let id = this.lastID + 1;
        this.lastID = id;
        return new Calzado(id, tipo, marca, modelo, talle, color, precio);
    }
}

////////////////////////////////////////////

class Stock {
    constructor(tipo) {
        this.tipo = tipo.toUpperCase();
        this.productos = [];
    }

    agregarProducto(prod) {
        // desestructurando el objeto prod
        let {tipo, marca, modelo} = prod;
        if (tipo === this.tipo) {
            // no puedo desestructurar en el parámetro porque necesito todo el objeto completo para pushear en la lista productos
            this.productos.push(prod);
            console.log(`El calzado ${marca} ${modelo} fue agregado al stock de tipo ${this.tipo}`);
        } else {
            console.log(`El calzado ${marca} ${modelo} no fue agregado al stock porque no es un par de ${this.tipo}`);
        }
    }

    agregarMismoProductoEnCantidad(calzado, cantidad) {
        for (let i = 0; i < cantidad; i++) {
            //let conIDMod = calzado.setID(calzado.id + 1);
            this.agregarProducto(calzado);
        }
    }
}

//////////////////////////////////////////////

class GestorStock {
    constructor() {
        this.stocks = []; // lista de de stocks (lista de listas)
    }

    agregarStock(stock) {
        this.stocks.push(stock);
        localStorage.setItem(`Stocks`, JSON.stringify(this));
    }    

    // DEVUELVEN UNA LISTA

    productosTipo_(tipo) {
        return this.stockDeTipo_(tipo).productos;
    }

    // DEVUELVEN UN STRING CON INFORMACIÓN PARTICULAR

    tiposStock() {
        return this.stocks.map(stock => stock.tipo);
    }

    // DEVUELVEN UNA LISTA TRANSFORMADA PARA UTILIZAR SUS ELEMENTOS EN UN STRING

    modelosEn_(listaProductos) {
        return listaProductos.map((prod) => prod.modelo);
        // funciona si hago = listaProductos.map(({modelo}) => modelo);  ??
    }

    tallesEn_(listaProductos) {
        return listaProductos.map((prod) => prod.talle);
    }

    coloresEn_(listaProductos) {
        return listaProductos.map((prod) => prod.color);
    }

    // DEVUELVEN UN VALOR DE VERDAD DADA UNA CONDICIÓN

    hayCalzadoTipo_(tipo) {
        return this.stockDeTipo_(tipo) != undefined;
    }

    hayModelo_En_(modelo, listaProductos) {
        return this.algunoConModelo_En_(modelo, listaProductos) != undefined;
        // funcionaría de la misma manera si solo hago = return !this.algunoConModelo_En_(modelo, listaProductos);  ??
    }

    hayTalle_En_(talle, listaProductos) {
        return this.algunoConTalle_En_(talle, listaProductos) != undefined;
    }

    hayColor_En_(color, listaProductos) {
        return this.algunoConColor_En_(color, listaProductos) != undefined;
    }

    // DEVUELVEN UNA LISTRA FILTRADA CON PRODUCTOS SEGÚN UNA CONDICIÓN DADA

    productosModelo_En_(modelo, listaProductos) {
        return listaProductos.filter(prod => prod.modelo == modelo);
    }

    productosTalle_En_(talle, listaProductos) {
        return listaProductos.filter(prod => prod.talle == talle);
    }

    productosColor_En_(color, listaProductos) {
        return listaProductos.filter(prod => prod.color == color);
    }

    getNuevosIngresos() {
        let deCadaTipo = [];
        let localStocks = JSON.parse(localStorage.getItem("Stocks"));
        let {stocks} = localStocks;
        stocks.forEach(stock => {
            let {productos} = stock;
            deCadaTipo.push(productos[0]);
        });
        
        return deCadaTipo;
    }

    // DEVUELVEN UN OBJETO

    stockDeTipo_(tipo) {
        return this.stocks.find(stock => stock.tipo == tipo);
        // suponiendo que trabajamos solo con un stock de cada tipo, devuelve el stock del tipo buscado
    }

    algunoConModelo_En_(modelo, listaProductos) {
        return listaProductos.find(prod => prod.modelo == modelo); 
    }

    algunoConTalle_En_(talle, listaProductos) {
        return listaProductos.find(prod => prod.talle === talle);
    }

    algunoConColor_En_(color, listaProductos) {
        return listaProductos.find(prod => prod.color === color);
    }

    //

    precioDeModelo_En_(modeloProducto, listaProductos) {
        return listaProductos.find(prod => prod.modelo == modeloProducto).precio;
    }
}

//////////////////////////////////////////////

class GestorCompra {

    iniciarCompra() {
        this.seleccionarCalzado();
    }

    /* generadorDeListado(listaTexto) {
        let stringResultante = ``;
        listaTexto.forEach(texto => {
            stringResultante += `• ${texto} \n`
        });
        return stringResultante;
        /* devuelve:
        • String
        • String
        • ... 
    } 
    */

    tipoDeProductos_(listaProductos) {
        return listaProductos[0].tipo;
    }

    modeloDeProductos_(listaProductos) {
        return listaProductos[0].modelo;
    }

    talleDeProductos_(listaProductos) {
        return listaProductos[0].talle;
    }

    productoFinalEn_(listaProductos) {
        return listaProductos[0];
    }

    ////////    

    ivaDel(porcentaje) {
        return 1 + (porcentaje / 100); //calculo el valor a multiplicar con el precio del calzado
    }

    precioFinalConIVA(precioProducto, porcentaje) {
        return precioProducto * this.ivaDel(porcentaje);
    }
}

//////////////////////////////////////////////////////////////////////////////////
////////////////////////////  SETUP Y FLUJO DE USUARIO //////////////////////////
/////////////////////////////////////////////////////////////////////////////////

/* function crearStocksSiNoHay() {
    !localStorage.getItem(`Stocks`) && localStorage.setItem(`Stocks`, JSON.stringify([]));
} */

// SETUP

const stockCasuales = new Stock("Casual");
const stockDeportivas = new Stock("Deportivo");
const stockMocasines = new Stock("Mocasin");
const stockNauticas = new Stock("Nautico");
const gestorStock = new GestorStock();
const gestorCompra = new GestorCompra();

const casuales39 = factoryCalzado.crear("Casual", "Boedo", "Otoño", 39, "Negro", 5500); //tipo, marca, modelo, talle, color, precio
const casuales40 = factoryCalzado.crear("Casual", "Boedo", "Shiva", 40, "Marron", 5500);
const casuales41 = factoryCalzado.crear("Casual", "Boedo", "Kelyx", 41, "Blanco", 5500);
const deportivas38 = factoryCalzado.crear("Deportivo", "Boedo", "Redragon", 41, "Blanco", 8700);
const deportivas40 = factoryCalzado.crear("Deportivo", "Boedo", "Verano", 41, "Negro", 8700);
const deportivas41 = factoryCalzado.crear("Deportivo", "Boedo", "Running", 41, "Azul", 8700);
const mocasines40 = factoryCalzado.crear("Mocasin", "Boedo", "Glaciar", 41, "Blanco", 11500);
const mocasines43 = factoryCalzado.crear("Mocasin", "Boedo", "Chili Peppers", 41, "Marron", 11500);
const mocasines44 = factoryCalzado.crear("Mocasin", "Boedo", "Apa Beer", 41, "Negro", 11500);
const nauticas38 = factoryCalzado.crear("Nautico", "Boedo", "Shiva", 41, "Blanco", 6200);
const nauticas40 = factoryCalzado.crear("Nautico", "Boedo", "Chili Peppers", 41, "Marron", 6200);
const nauticas43 = factoryCalzado.crear("Nautico", "Boedo", "Apa Beer", 41, "Negro", 6200);

stockCasuales.agregarProducto(casuales39);
stockCasuales.agregarProducto(casuales40);
stockCasuales.agregarProducto(casuales41);
stockDeportivas.agregarProducto(deportivas38);
stockDeportivas.agregarProducto(deportivas40);
stockDeportivas.agregarProducto(deportivas41);
stockMocasines.agregarProducto(mocasines40);
stockMocasines.agregarProducto(mocasines43);
stockMocasines.agregarProducto(mocasines44);
stockNauticas.agregarProducto(nauticas38);
stockNauticas.agregarProducto(nauticas40);
stockNauticas.agregarProducto(nauticas43);

/* stockCasuales.agregarMismoProductoEnCantidad(casuales39, 5);
stockCasuales.agregarMismoProductoEnCantidad(casuales40, 8);
stockCasuales.agregarMismoProductoEnCantidad(casuales41, 3);
stockDeportivas.agregarMismoProductoEnCantidad(deportivas38, 2);
stockDeportivas.agregarMismoProductoEnCantidad(deportivas40, 5);
stockDeportivas.agregarMismoProductoEnCantidad(deportivas41, 6);
stockMocasines.agregarMismoProductoEnCantidad(mocasines40, 4);
stockMocasines.agregarMismoProductoEnCantidad(mocasines43, 2);
stockMocasines.agregarMismoProductoEnCantidad(mocasines44, 2);
stockNauticas.agregarMismoProductoEnCantidad(nauticas38, 4);
stockNauticas.agregarMismoProductoEnCantidad(nauticas40, 6);
stockNauticas.agregarMismoProductoEnCantidad(nauticas43, 2); */

gestorStock.agregarStock(stockCasuales);
gestorStock.agregarStock(stockDeportivas);
gestorStock.agregarStock(stockMocasines);
gestorStock.agregarStock(stockNauticas);



/////////////////////////////////////////////

/* let precioCasuales = gestorStock.precioDeModelo_En_("OTOÑO", stockCasuales.productos);

let divPrecio = document.getElementById("precio");
divPrecio.innerText = `$${precioCasuales}`;

let botonComprar = document.getElementById("btnCompra");
botonComprar.onclick = () => {
    gestorCompra.iniciarCompra();
} */



///////////////////////////////////////////

