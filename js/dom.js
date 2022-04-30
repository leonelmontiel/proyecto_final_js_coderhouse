// CÓDIGO PARA DESAFÍO COMPLEMENTARIO: INTERACTUAR CON HTML

let feriados = document.getElementById("feriados");

let identificadorIntervaloDeTiempo;

function repetirCadaSegundo() {
  identificadorIntervaloDeTiempo = setInterval(horarios, 3000);
}
let horarios1 = feriados.innerText;
let horarios2 = "Sábado de 10h a 16h";
let horarios3 = "FERIADOS CERRADO";

function horarios() {
    switch (feriados.innerText) {
        case horarios1:
            feriados.innerText = horarios2;
            break;
        case horarios2:
            feriados.innerText = horarios3;
            break;
        case horarios3:
            feriados.innerText = horarios1;
            break;
    }
}

repetirCadaSegundo();

//////////////////////////////

var formulario = document.getElementById("form");
formulario.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
    e.preventDefault();
    let form = e.target;
    let nombre = form.children[0].children[0].value;
    let correo = form.children[1].children[0].value;
    let asunto = form.children[2].children[0].value;
    let mensaje = form.children[3].children[1].value;
    //Cada vez que se envíe un formulario se va a almacenar en el localStorage
    almacenarForm(nombre, correo, asunto, mensaje); //en archivo database.js
    mostrarFormIngresado(nombre, correo, asunto, mensaje);
    console.log(`CANTIDAD DE FORMULARIOS EN BASE DE DATOS: ${cantFormularios()}`);//en archivo database.js
    succesAlert(`Formulario cargado con éxito!`, `Muchas gracias ${nombre}, en breve nos contactaremos con vos!`, 5000);
}

function mostrarFormIngresado(nombre, correo, asunto, mensaje) {
    console.log(`Datos del formulario ingresado:
    Nombre: ${nombre}
    Correo: ${correo}
    Asunto: ${asunto}
    Mensaje: ${mensaje}`);
}

// REEMPLAZAR IMAGEN PERFIL POR BOTÓN "INGRESAR" QUE LANCE UN MODAL