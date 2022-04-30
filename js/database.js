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

/* class Calzado {
    constructor(tipo, marca, modelo, talle, color, precio) {
        this.id = 0;
        this.tipo = tipo.toUpperCase();
        this.marca = marca.toUpperCase();
        this.modelo = modelo.toUpperCase();
        this.talle = talle;
        this.color = color.toUpperCase();
        this.precio = precio;
    }

    setID(id) {
        this.id = id;
    }
}

class CalzadoCasual extends Calzado {
    constructor(marca, modelo, talle, color, precio) {
        super("CASUAL", marca, modelo, talle, color, precio);
    }
}

class CalzadoDeportivo extends Calzado {
    constructor(marca, modelo, talle, color, precio) {
        super("DEPORTIVO", marca, modelo, talle, color, precio);
    }
}

class CalzadoMocasin extends Calzado {
    constructor(marca, modelo, talle, color, precio) {
        super("MOCASIN", marca, modelo, talle, color, precio);
    }
}

class FactoryCalzado {    
    crearCalzado(tipo, marca, modelo, talle, color, precio) {
        switch (tipo) {
            case (tipo.toUpperCase() === "CASUAL"):
                return new CalzadoCasual(marca, modelo, talle, color, precio);
            case (tipo.toUpperCase() === "DEPORTIVO"):
                return new CalzadoDeportivo(marca, modelo, talle, color, precio);
            case (tipo.toUpperCase() === "MOCASIN"):
                return new CalzadoMocasin(marca, modelo, talle, color, precio);
            default:
                console.log('Error');
        }        
    }
}

let infoCalzado = (calzado) => {

    for (let propiedad in calzado) {
        console.log(`${propiedad}: ${calzado[propiedad]}`);
    }

} */


////////////////////////////////////////////

class Stock {
    constructor(tipo) {
        this.tipo = tipo.toUpperCase();
        this.productos = [];
    }

    agregarProducto(prod) {
        // desestructurando el objeto prod
        let {marca, modelo, tipo} = prod;
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
            let conIDMod = calzado.setID(calzado.id + 1);
            this.agregarProducto(conIDMod);
        }
    }
}

//////////////////////////////////////////////

class GestorStock {
    constructor() {
        this.stocks = [];
    }

    agregarStock(stock) {
        this.stocks.push(stock);
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

    generadorDeListado(listaTexto) {
        let stringResultante = ``;
        listaTexto.forEach(texto => {
            stringResultante += `• ${texto} \n`
        });
        return stringResultante;
        /* devuelve:
        • String
        • String
        • ... */
    }

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

    seleccionarCalzado() {
        let tipo = prompt(`Por favor, ingresá el tipo de calzado que deseas comprar:
${this.generadorDeListado(gestorStock.tiposStock())}`).toUpperCase();

        this.consultarTipo_(tipo);
    }

    consultarTipo_(tipo) {
        let listaProductosTipo = [];
        if (gestorStock.hayCalzadoTipo_(tipo)) {
            alert(`Elegiste el tipo ${tipo}!`);
            listaProductosTipo = gestorStock.productosTipo_(tipo);
            console.log(listaProductosTipo);
            this.seleccionarModeloEn_(listaProductosTipo);
        } else {
            alert(`Por el momento no tenemos el tipo ${tipo} en Stock, por favor, elegí otro`);
            this.seleccionarCalzado();
        }
    }

    seleccionarModeloEn_(listaProductosTipo) {
        let modelo = prompt(`Por favor, ingresá el modelo del calzado ${this.tipoDeProductos_(listaProductosTipo)} que deseas comprar:
${this.generadorDeListado(gestorStock.modelosEn_(listaProductosTipo))}`).toUpperCase();

        this.consultarModelo_En_(modelo, listaProductosTipo);
    }

    consultarModelo_En_(modelo, listaProductosTipo) {
        let listaProductosModelo = [];
        if (gestorStock.hayModelo_En_(modelo, listaProductosTipo)) {
            alert(`Elegiste el modelo ${modelo}!`);
            listaProductosModelo = gestorStock.productosModelo_En_(modelo, listaProductosTipo);
            this.seleccionarTalleEn_(listaProductosModelo);
        } else {
            alert(`Por el momento no tenemos el modelo ${modelo} en Stock, por favor, elegí otro`);
            this.seleccionarModeloEn_(listaProductosTipo);
        }
    }

    seleccionarTalleEn_(listaProductosModelo) {
        let talle = parseInt(prompt(`Por favor, ingresá el talle del calzado BOEDO ${this.modeloDeProductos_(listaProductosModelo)} ${this.tipoDeProductos_(listaProductosModelo)} que deseas comprar:
${this.generadorDeListado(gestorStock.tallesEn_(listaProductosModelo))}`));

        this.consultarTalle_En_(talle, listaProductosModelo);
    }

    consultarTalle_En_(talle, listaProductosModelo) {
        let listaProductosTalle = [];
        if (gestorStock.hayTalle_En_(talle, listaProductosModelo)) {
            alert(`Elegiste el talle ${talle}!`);
            listaProductosTalle = gestorStock.productosTalle_En_(talle, listaProductosModelo);
            this.seleccionarColorEn_(listaProductosTalle);
        } else {
            alert(`Por el momento no tenemos el talle ${talle} en Stock, por favor, elegí otro`);
            this.seleccionarTalleEn_(listaProductosModelo);
        }
    }

    seleccionarColorEn_(listaProductosTalle) {
        let color = prompt(`Elegí el color para las BOEDO ${this.modeloDeProductos_(listaProductosTalle)} ${this.talleDeProductos_(listaProductosTalle)} ${this.tipoDeProductos_(listaProductosTalle)}:
${this.generadorDeListado(gestorStock.coloresEn_(listaProductosTalle))}`).toUpperCase();

        this.consultarColor_En_(color, listaProductosTalle);
    }

    consultarColor_En_(color, listaProductosTalle) {
        let listaProductosColor = [];
        if (gestorStock.hayColor_En_(color, listaProductosTalle)) {
            alert(`Elegiste el color ${color}!`);
            listaProductosColor = gestorStock.productosColor_En_(color, listaProductosTalle);
            this.mostrarPrecioDe_(this.productoFinalEn_(listaProductosColor));
        } else {
            alert(`Por el momento no tenemos el color ${color} en Stock, por favor, elegí otro`);
            this.seleccionarColorEn_(listaProductosTalle);
        }
    }

    mostrarPrecioDe_(calzado) {
        const precio = calzado.precio;
        alert(`Estás por comprar las BOEDO ${calzado.modelo} de tipo ${calzado.tipo} en color ${calzado.color} talle ${calzado.talle}!
• PRECIO: $${precio}

El precio final del calzado + IVA del 21% es: $${this.precioFinalConIVA(precio, 21)}`); //en este caso el iva es de 21
        //Acá más adelante jugaré con las propiedades de los objetos para tomar la info que necesite
    }

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

// SETUP
/* const factory = new FactoryCalzado();
const stockCasuales = new Stock("Casuales");
const stockDeportivas = new Stock("Deportivas");
const stockMocasines = new Stock("Mocasines");
const gestorStock = new GestorStock();
const gestorCompra = new GestorCompra();

const zapasBoedo39 = factory.crearCalzado("Casual", "Boedo", "Otoño", 39, "Negro", 5500);
const zapasBoedo40 = factory.crearCalzado("Casual", "Boedo", "Shiva", 40, "Marron", 5500);
const zapasBoedo41 = factory.crearCalzado("Casual", "Boedo", "Kelyx", 41, "Blanco", 5500);
const deportivas38 = factory.crearCalzado("Deportivo", "Boedo", "Redragon", 41, "Blanco", 8700);
const deportivas40 = factory.crearCalzado("Deportivo", "Boedo", "Verano", 41, "Negro", 8700);
const deportivas41 = factory.crearCalzado("Deportivo", "Boedo", "Running", 41, "Azul", 8700);
const mocasines40 = factory.crearCalzado("Mocasin", "Boedo", "Glaciar", 41, "Blanco", 11500);
const mocasines43 = factory.crearCalzado("Mocasin", "Boedo", "Chili Peppers", 41, "Marron", 11500);
const mocasines44 = factory.crearCalzado("Mocasin", "Boedo", "Apa Beer", 41, "Negro", 11500);

stockCasuales.agregarMismoProductoEnCantidad(zapasBoedo39, 5);
stockCasuales.agregarMismoProductoEnCantidad(zapasBoedo40, 8);
stockCasuales.agregarMismoProductoEnCantidad(zapasBoedo41, 3);
stockDeportivas.agregarMismoProductoEnCantidad(deportivas38, 2);
stockDeportivas.agregarMismoProductoEnCantidad(deportivas40, 5);
stockDeportivas.agregarMismoProductoEnCantidad(deportivas41, 6);
stockMocasines.agregarMismoProductoEnCantidad(mocasines40, 4);
stockMocasines.agregarMismoProductoEnCantidad(mocasines43, 2);
stockMocasines.agregarMismoProductoEnCantidad(mocasines44, 2);

gestorStock.agregarStock(stockCasuales);
gestorStock.agregarStock(stockDeportivas);
gestorStock.agregarStock(stockMocasines); */



/////////////////////////////////////////////

/* let precioCasuales = gestorStock.precioDeModelo_En_("OTOÑO", stockCasuales.productos);

let divPrecio = document.getElementById("precio");
divPrecio.innerText = `$${precioCasuales}`;

let botonComprar = document.getElementById("btnCompra");
botonComprar.onclick = () => {
    gestorCompra.iniciarCompra();
} */



///////////////////////////////////////////

