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
    },

    crearEnCantidad: function(tipo, marca, modelo, talle, color, precio, cantidad) {
        let enCantidad = [];
        for (let i = 0; i < cantidad; i++) {
            let prod = this.crear(tipo, marca, modelo, talle, color, precio);
            enCantidad.push(prod);
        }
        return enCantidad;
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

    agregarProductoEnCantidad(listaProductos) {
        this.productos = this.productos.concat(listaProductos);
    }

    borrarProductoID(_id) {
        let index = this.productos.findIndex(prod => prod.id == _id);
        console.log(index)
        this.productos.splice(index, 1);
    }
}

//////////////////////////////////////////////

class GestorStock {

    agregarStock(stock) {
        localStorage.setItem(`Stock${stock.tipo}`, JSON.stringify(stock));
        this.crearAllStocksSiNoHay();
        let allStocks = JSON.parse(localStorage.getItem(`allStocks`));
        allStocks.push(stock);
        localStorage.setItem(`allStocks`, JSON.stringify(allStocks));
    }

    crearAllStocksSiNoHay() {
        !localStorage.getItem(`allStocks`) && localStorage.setItem(`allStocks`, JSON.stringify([]));
    }
    
    borrarProductoID(_id) {
        let productos = JSON.parse(localStorage.getItem(`Stocks`));
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
        let localStocks = JSON.parse(localStorage.getItem("allStocks"));
        localStocks.forEach(stock => {
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

const casuales39 = factoryCalzado.crearEnCantidad("Casual", "Boedo", "Otoño", 39, "Negro", 5500, 4); //tipo, marca, modelo, talle, color, precio
const casuales40 = factoryCalzado.crearEnCantidad("Casual", "Boedo", "Shiva", 40, "Marron", 5500, 3);
const casuales41 = factoryCalzado.crearEnCantidad("Casual", "Boedo", "Kelyx", 41, "Blanco", 5500, 1);
const deportivas38 = factoryCalzado.crearEnCantidad("Deportivo", "Boedo", "Redragon", 41, "Blanco", 8700, 8);
const deportivas40 = factoryCalzado.crearEnCantidad("Deportivo", "Boedo", "Verano", 41, "Negro", 8700, 2);
const deportivas41 = factoryCalzado.crearEnCantidad("Deportivo", "Boedo", "Running", 41, "Azul", 8700, 3);
const mocasines40 = factoryCalzado.crearEnCantidad("Mocasin", "Boedo", "Glaciar", 41, "Blanco", 11500, 4);
const mocasines43 = factoryCalzado.crearEnCantidad("Mocasin", "Boedo", "Chili Peppers", 41, "Marron", 11500, 5);
const mocasines44 = factoryCalzado.crearEnCantidad("Mocasin", "Boedo", "Apa Beer", 41, "Negro", 11500, 2);
const nauticas38 = factoryCalzado.crearEnCantidad("Nautico", "Boedo", "Shiva", 41, "Blanco", 6200, 1);
const nauticas40 = factoryCalzado.crearEnCantidad("Nautico", "Boedo", "Chili Peppers", 41, "Marron", 6200, 2);
const nauticas43 = factoryCalzado.crearEnCantidad("Nautico", "Boedo", "Apa Beer", 41, "Negro", 6200, 2);


stockCasuales.agregarProductoEnCantidad(casuales39);
stockCasuales.agregarProductoEnCantidad(casuales40);
stockCasuales.agregarProductoEnCantidad(casuales41);
stockDeportivas.agregarProductoEnCantidad(deportivas38);
stockDeportivas.agregarProductoEnCantidad(deportivas40);
stockDeportivas.agregarProductoEnCantidad(deportivas41);
stockMocasines.agregarProductoEnCantidad(mocasines40);
stockMocasines.agregarProductoEnCantidad(mocasines43);
stockMocasines.agregarProductoEnCantidad(mocasines44);
stockNauticas.agregarProductoEnCantidad(nauticas38);
stockNauticas.agregarProductoEnCantidad(nauticas40);

//stockCasuales.borrarProductoID(3);

gestorStock.agregarStock(stockCasuales);
gestorStock.agregarStock(stockDeportivas);
gestorStock.agregarStock(stockMocasines);
gestorStock.agregarStock(stockNauticas);

//gestorStock.borrarProductoID(3);



/////////////////////////////////////////////

/* let precioCasuales = gestorStock.precioDeModelo_En_("OTOÑO", stockCasuales.productos);

let divPrecio = document.getElementById("precio");
divPrecio.innerText = `$${precioCasuales}`;

let botonComprar = document.getElementById("btnCompra");
botonComprar.onclick = () => {
    gestorCompra.iniciarCompra();
} */



///////////////////////////////////////////

