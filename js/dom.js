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

//USO LOCALSTORAGE Y JSON para actualizar la base de datos de Formularios
class Formulario {
    constructor(nombrePersona, asunto, email, mensaje) {
        this.nombre = nombrePersona;
        this.asunto = asunto;
        this.email = email;
        this.mensaje = mensaje;
    }
}

let formulario = document.getElementById("form");
formulario.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
    e.preventDefault();
    let form = e.target;
    let nombre = form.children[0].children[0].value;
    let correo = form.children[1].children[0].value;
    let asunto = form.children[2].children[0].value;
    let mensaje = form.children[3].children[1].value;
    //Cada vez que se envíe un formulario se va a almacenar en el localStorage
    almacenarForm(nombre, correo, asunto, mensaje);
    console.log(`Datos del formulario ingresado:
    Nombre: ${nombre}
    Correo: ${correo}
    Asunto: ${asunto}
    Mensaje: ${mensaje}`);
    console.log(`CANTIDAD DE FORMULARIOS EN BASE DE DATOS: ${cantFormularios()}`);
    alert(`Muchas gracias ${nombre}, en breve nos contactaremos con vos!`)
}

function almacenarForm(nombre, correo, asunto, mensaje) {    
    crearBaseFormSiNoHay(); // creo una nueva base de datos de formularios si no existiese en el localStorage
    const newForm = new Formulario(nombre, asunto, correo, mensaje);
    const baseDatos = JSON.parse(localStorage.getItem(`Formularios`)); //solicito el array de fomrularios alojado en el localStorage
    baseDatos.push(newForm); //agrego el nuevo formulario    
    localStorage.setItem(`Formularios`, JSON.stringify(baseDatos)); //actualizo la base de datos de formularios en el localStorage
}

function crearBaseFormSiNoHay() {
    if (localStorage.getItem(`Formularios`) == null) {
        localStorage.setItem(`Formularios`, JSON.stringify([]));
    }
}

const cantFormularios = () => {
    return JSON.parse(localStorage.getItem(`Formularios`)).length;
}




// REEMPLAZAR IMAGEN PERFIL POR BOTÓN "INGRESAR" QUE LANCE UN MODAL