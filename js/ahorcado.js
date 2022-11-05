var diccionario = [["atlantico", "Un océano"], ["ordenador", "Una máquina"], ["laurel", "Un árbol"], ["plaza", "Espacio público"], 
["rueda", "Gran invento"], ["cereza", "Una fruta"], ["petanca", "Un juego"]];
var palabra = ""; var palabra_guiones = ""; var intentos = 0; var intentos_permitidos = 7;
generar_palabra();

function generar_palabra(){
  var i = Math.floor(Math.random()*diccionario.length);
  palabra = diccionario[i][0].toUpperCase();
  palabra_guiones = palabra.replace(/./g, "_ ");
  intentos = 0;

  var palabra_html = document.getElementById("palabra");
  palabra_html.innerHTML = palabra_guiones;

  var tipopalabra_html = document.getElementById("tipopalabra");
  tipopalabra_html.innerHTML = diccionario[i][1];
}

String.prototype.replace_letra = function(index, character) {
  return this.substring(0, index) + character + this.substring(index+character.length); 
}

function marcar_letra(letra){
  if(palabra.indexOf(letra) == -1){
    intentos = intentos + 1;
    var boton = document.getElementById("letra_"+letra);
    boton.setAttribute("class", "btn btn-danger");
    boton.setAttribute("disabled", "true");

    var img = document.getElementById("img");
    img.setAttribute("src", "img/img_"+intentos+".png");

    if(intentos == intentos_permitidos){
      var mensaje_html = document.getElementById("mensaje");
      mensaje_html.innerHTML = "FALLASTE, INTENTALO NUEVAMENTE";
      mensaje_html.setAttribute("class", "text-danger");

      abecedario = document.getElementsByClassName("btn");
      for (var i = 0; i < abecedario.length; ++i) {
        abecedario[i].setAttribute("disabled", "true");
      }
    }
  }else{
    for (let i = 0; i < palabra.length; i++) {
      if (palabra[i] == letra) {
        palabra_guiones = palabra_guiones.replace_letra(i*2, letra);

        var palabra_html = document.getElementById("palabra");
        palabra_html.innerHTML = palabra_guiones;
      }
    }

    if(palabra_guiones.indexOf("_") == -1){
      var mensaje_html = document.getElementById("mensaje");
      mensaje_html.innerHTML = "BIEN HECHO, GANASTE";
      mensaje_html.setAttribute("class", "text-success");

      abecedario = document.getElementsByClassName("btn");
      for (var i = 0; i < abecedario.length; ++i) {
        abecedario[i].setAttribute("disabled", "true");
      }

      var img = document.getElementById("img");
      img.setAttribute("src", "img/ganaste.gif");
    }
  }
}

function nuevo_intento(){
  location.reload();
}

