// Creacion del juego secreto

let numeroSecreto = 0;
let intentos = 0;
let listasNumerosSorteados = [];
let numeroMaximo = 20;
// --- NUEVA VARIABLE PARA EL MÁXIMO DE INTENTOS ---
let maximosIntentos = 5; // ¡Aquí puedes cambiar el número de intentos que quieras!

// Esta es la funcion para poder cambiar el titulo y el parrafo. Despues asignamos nomas al h1 y p
function asignarTextoElemento(elemento, texto) {
    let elementoHtml = document.querySelector(elemento);
    elementoHtml.innerHTML = texto;
    return;
};

// Esta funcion verifica los intentos del usuario (forzamos la busqueda de un numero con parseInt)
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);

     console.log(intentos); // Puedes descomentar esto para ver los intentos en consola

    if (numeroDeUsuario === numeroSecreto) {; // Forzamos con === a que sea igual en tipo tambien
        asignarTextoElemento('p', `¡Acertaste el número secreto en ${intentos} ${(intentos === 1) ? 'vez!' : 'veces!'} Felicitaciones`);
        // Deshabilita el botón de intentar para que no se pueda seguir intentando después de acertar
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else { // El usuario no acertó
        if (numeroDeUsuario < numeroSecreto) {
            asignarTextoElemento('p', "El número secreto es mayor");
        } else {
            asignarTextoElemento('p', "El número secreto es menor");
        }
        intentos++; // Incrementa los intentos

        // --- VERIFICAR SI SE ALCANZÓ EL LÍMITE DE INTENTOS ---
        if (intentos > maximosIntentos) {
            asignarTextoElemento('p', `¡Agotaste el número máximo de ${maximosIntentos} intentos! El número secreto era ${numeroSecreto}.`);
            document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita el botón de reiniciar
            document.getElementById('valorUsuario').setAttribute('disabled', 'true'); // Deshabilita la caja de texto para que no pueda ingresar más números
        } else {
            limpiarCaja(); // Solo limpia la caja si aún quedan intentos
        }
    }
    return // Esto es la forma rapida de devolver lo que exigimos
};

// Funcion para limpiar resultado una vez que se intentó
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

// Funcion para generar numero aleatorio entre 1 y 10
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

     console.log(numeroGenerado); // Puedes descomentar esto para ver el número secreto en consola
     console.log(listasNumerosSorteados); // Puedes descomentar esto para ver la lista de números sorteados

    // Si ya sorteamos todos los numeros
    if (listasNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
        return null; // Devuelve null si no hay más números para sortear
    } else {
        // Si el numero generado esta incluido en la lista
        if (listasNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto(); // Vuelve a llamar para generar otro número
        } else {
            listasNumerosSorteados.push(numeroGenerado);
            return numeroGenerado
        };
    };
};

// Condiciones iniciales
function condicionesIniciales() {
    // Abreviatura para cambiar textos
    asignarTextoElemento('h1', '¡Adivina el número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}. Tienes ${maximosIntentos} intentos.`); // Mensaje actualizado
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    // Asegurarse de que la caja de texto esté habilitada al iniciar/reiniciar
    document.getElementById('valorUsuario').removeAttribute('disabled');
}

// Esto reinicia el juego
function reiniciarJuego() {
    // Limpiar caja
    limpiarCaja();
    // Reiniciar todas las condiciones iniciales (mensaje, número secreto, intentos)
    condicionesIniciales();
    // Deshabilitar el botón de nuevo juego hasta que se acierte o se acaben los intentos
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

// Llama a las condiciones iniciales para empezar el juego al cargar la página
condicionesIniciales();
