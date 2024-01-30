// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];

document.addEventListener('DOMContentLoaded', function() {   
    var jugarBtn = document.querySelector('button');
    var imagenes = document.querySelectorAll('#jugador img');
    var yaBtn = document.querySelector('h2 button');
    var resetBtn = document.querySelector('#historial + button');
    var nombreElegido = document.querySelector('input[name="nombre"]');
    var partidaActual = document.getElementById('actual');
    var partidaTotal = document.getElementById('total');
    var imgMaquina = document.querySelector('#maquina img');

    if (jugarBtn) {
        jugarBtn.addEventListener('click', function(event) {
            event.preventDefault();

            if (nombreElegido.classList.contains('fondoRojo')) {
                alert("Introduce un nombre correcto");
            }

            var partidas = document.querySelector('input[name="partidas"]');
            var total = document.getElementById('total');


            if (partidas && total) {
                var partidasTotal = parseInt(partidas.value, 10);
                if (partidasTotal < 0) {
                    partidas.classList.add('fondoRojo');
                    alert("Introduce un número de partidas que no sea negativo.");
            
                } else {
                    total.innerText = partidasTotal;
                    partidas.classList.remove('fondoRojo');
                    yaBtn.disabled = false;
                }

                
            }
            if (nombreElegido){
                nombreJugador = nombreElegido.value;
                if (nombreJugador.length > 3 && isNaN(nombreJugador[0])) {
                    nombreElegido.classList.remove('fondoRojo');
                } else {
                    nombreElegido.classList.add('fondoRojo');
                }
            }
        });
            imagenes.forEach(function(img, i) {
            img.addEventListener('click', function() {
                imagenes.forEach(function(imagen) {
                    imagen.classList.remove('seleccionado');
                    imagen.classList.add('noSeleccionado');
                });
                img.classList.remove('noSeleccionado');
                img.classList.add('seleccionado');

                console.log(posibilidades[i])
            });
            var rutaImagen = 'img/' + posibilidades[i] + 'Jugador.png';
            img.src = rutaImagen;
        });
    }
    if (yaBtn) {
        yaBtn.disabled = true;
        yaBtn.addEventListener('click', function(){
            var seleccionMaquina = posibilidades[Math.floor(Math.random() * posibilidades.length)];
            verSeleccionMaquina(seleccionMaquina, imgMaquina);
            var seleccionJugador;
            
            

        imagenes.forEach(function(img, i) {
            if (img.classList.contains('seleccionado')) {
                seleccionJugador = posibilidades[i];
            }
        });

        var resultado = mostrarResultado(seleccionJugador, seleccionMaquina);

        function mostrarResultado(seleccionJugador, seleccionMaquina) {
            console.log("Jugador:", seleccionJugador, "Máquina:", seleccionMaquina);
            var arrayJugador = posibilidades.indexOf(seleccionJugador);
            var arrayMaquina = posibilidades.indexOf(seleccionMaquina);

            if (arrayJugador === arrayMaquina) {
                return "Empate";
            } else if ((arrayJugador - 1 + posibilidades.length) % posibilidades.length === arrayMaquina) {
                return "Ganó: " + nombreJugador;
            } else {
                return "Gana la máquina";
            }
        }
            function verSeleccionMaquina(seleccion, imgMaquina) {
                if (imgMaquina) {
                     var rutaImgMaquina = 'img/' + seleccion + 'Ordenador.png';
                       imgMaquina.src = rutaImgMaquina;
                    }
            }
            function verHistorial(resultado) {
                var historialUl = document.getElementById('historial');
                if (historialUl) {
                    var li = document.createElement('li');
                    li.textContent = resultado;

                    
                    if (parseInt(partidaActual.innerText, 10) === parseInt(partidaTotal.innerText, 10)) {
                        yaBtn.disabled = true;
                        jugarBtn.disabled = true;
                        alert ("No te quedan partidas.");
                    } else {
                        partidaActual.innerText  = parseInt(partidaActual.innerText, 10) + 1;
                        historialUl.appendChild(li);
                    }    
                } else {
                    console.error("Error: No se encontró el elemento con id 'historial'");
                }
            }
            verHistorial(resultado);
        });
    }
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            var total = document.getElementById('total');
            partidaActual.innerText = '0';
            total.innerText = '0';
            jugarBtn.disabled = false;

            var historialUl = document.getElementById('historial');
                if(historialUl) {
                    var li = document.createElement('li');
                    li.textContent = 'Nueva partida';
                    historialUl.appendChild(li);
                } else {
                    console.error("No se encontró el elemento 'historial'");
                }
                if (imgMaquina) {
                    imgMaquina.src = 'img/defecto.png';
                }
            });
    }      
});

