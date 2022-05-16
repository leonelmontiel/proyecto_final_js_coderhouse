const enConstruccion = document.querySelectorAll(".constr");

enConstruccion.forEach(element => {
    element.onclick = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Esta sección está en construcción!',
        })
    }
});

function succesAlert(title, text, timer) {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: title,
        text: text,
        showConfirmButton: false,
        timer: timer
      })
}

function errorAlert(title, text, timer) {
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: title,
        text: text,
        showConfirmButton: false,
        timer: timer
      })
}