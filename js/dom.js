let feriados = document.getElementById("feriados");

let identificadorIntervaloDeTiempo;

function repetirCadaSegundo() {
  identificadorIntervaloDeTiempo = setInterval(mandarMensaje, 3000);
}
let text1 = feriados.innerText;
let text2 = "Sábado de 10h a 16h";
let text3 = "FERIADOS CERRADO";

function mandarMensaje() {
    switch (feriados.innerText) {
        case text1:
            feriados.innerText = text2;
            break;
        case text2:
            feriados.innerText = text3;
            break;
        case text3:
            feriados.innerText = text1;
            break;
    }
}

repetirCadaSegundo();