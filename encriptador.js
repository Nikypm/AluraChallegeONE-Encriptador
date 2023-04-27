window.onload = function () {
    const encriptarBtn = document.getElementById("encriptar");
    const desencriptarBtn = document.getElementById("desencriptar");
    const mensajeTextarea = document.getElementById("mensaje");
    const mensajeResultado = document.getElementById("mensaje-resultado");
    const imgM = document.querySelector(".msg");
    const botonCopiar = document.getElementById('boton-copiar');

    encriptarBtn.addEventListener('click', function () {
        let texto = mensajeTextarea.value.trim();
        if (/[áéíóúÁÉÍÓÚ^$.*+?=!:|\\/()\[\]{}A-Z]/g.test(texto)) {
            var alertBox = document.getElementById("alertBox");
            alertBox.innerHTML = '<div class="alert alert-warning mb-2" role="alert">El mensaje no debe contener letras con acentos ni caracteres especiales ni mayúsculas.</div>';
            alertBox.style.display = "block";

            setTimeout(function () {
                alertBox.style.display = "none";
            }, 2000);

            return;
        }

        let textoEncriptado = encriptar(texto);
        mensajeResultado.value = textoEncriptado;

        if (mensajeResultado.value.trim() === "") {
            imgM.style.display = "flex";
            mensajeResultado.style.display = "none";
            botonCopiar.style.display = "none";
        } else {
            imgM.style.display = "none";
            mensajeResultado.style.display = "block";
            botonCopiar.style.display = "block";
        }
    });

    desencriptarBtn.addEventListener('click', function () {
        let textoEncriptado = mensajeTextarea.value.trim();

        if (/[áéíóúÁÉÍÓÚ^$.*+?=!:|\\/()\[\]{}A-Z]/g.test(textoEncriptado)) {
            var alertBox = document.getElementById("alertBox");
            alertBox.innerHTML = '<div class="alert alert-warning mb-2" role="alert">El mensaje no debe contener letras con acentos ni caracteres especiales ni mayúsculas.</div>';
            alertBox.style.display = "block";

            setTimeout(function () {
                alertBox.style.display = "none";
            }, 2000);

            return;
        }

        let textoDesencriptado = desencriptar(textoEncriptado);
        mensajeResultado.value = textoDesencriptado;

        if (mensajeResultado.value.trim() === "") {
            imgM.style.display = "flex";
            mensajeResultado.style.display = "none";
            botonCopiar.style.display = "none";
        } else {
            imgM.style.display = "none";
            mensajeResultado.style.display = "block";
            botonCopiar.style.display = "block";
        }
    });

    if (botonCopiar && document.queryCommandSupported("copy")) {
        botonCopiar.addEventListener('click', function () {
            let textoCopiado = mensajeResultado;
            copiarTexto(textoCopiado);
        });
    }

    mensajeResultado.addEventListener('input', function () {
        if (mensajeResultado.value === '') {
            imgM.style.display = 'flex';
            mensajeResultado.style.display = "none";
            botonCopiar.style.display = "none";
        } else {
            imgM.style.display = 'none';
            mensajeResultado.style.display = "block";
            botonCopiar.style.display = "block";
        }
    });

};

function mostrarImagen() {
    if (mensajeResultado.value === "") {
        imgM.style.display = "flex";
        mensajeResultado.style.display = "none";
        botonCopiar.style.display = "none";
    } else {
        imgM.style.display = "none";
        mensajeResultado.style.display = "block";
        botonCopiar.style.display = "block";
    }
}


function copiarTexto(texto) {
    texto.select();
    document.execCommand("copy");
    var alertBox = document.getElementById("alertBox");
    alertBox.innerHTML = '<div class="alert alert-success mb-2" role="alert">Texto copiado</div>';

    alertBox.style.display = "block";

    setTimeout(function () {
        alertBox.style.display = "none";
    }, 2000);

    window.getSelection().removeAllRanges();
}

function encriptar(texto) {
    let textoEncriptado = texto
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');

    return textoEncriptado;
}

function desencriptar(textoEncriptado) {
    let mensajeOriginal = textoEncriptado.replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");
    return mensajeOriginal.trim();
}

