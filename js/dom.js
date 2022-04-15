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

// CÓDIGO PARA DESAFÍO: INCORPORAR EVENTOS

let form = document.getElementById("form");
form.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
    e.preventDefault();
    formulario = e.target;
    nombre = formulario.children[0].children[0].value;
    correo = formulario.children[1].children[0].value;
    asunto = formulario.children[2].children[0].value;
    mensaje = formulario.children[3].children[1].value;
    console.log(`Datos del formulario ingresado:
    Nombre: ${nombre}
    Correo: ${correo}
    Asunto: ${asunto}
    Mensaje: ${mensaje}`);
    alert(`Muchas gracias ${nombre}, en breve nos contactaremos con vos!`)
}