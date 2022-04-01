// SETUP
const stockCasuales = new Stock("Casuales");
const gestorStock = new GestorStock();
const gestorCompra = new GestorCompra();

const zapasBoedo39 = new Producto("Boedo", "Otoño", "Casuales", 39, "Negro", 5500);
const zapasBoedo40 = new Producto("Boedo", "Otoño", "Casuales", 40, "Marron", 5500);
const zapasBoedo41 = new Producto("Boedo", "Otoño", "Casuales", 41, "Blanco", 5500);

stockCasuales.agregarProducto(zapasBoedo39);
stockCasuales.agregarProducto(zapasBoedo40);
stockCasuales.agregarProducto(zapasBoedo41);

gestorStock.agregarStock(stockCasuales);

/////////////////////////////////////////////
let tipoDeseado = "CASUALES"; //en mayúsculas porque en el constructor del objeto Producto existe el método toUpperCase

gestorCompra.iniciarCompra();