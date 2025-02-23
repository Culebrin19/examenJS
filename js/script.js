var torn = true; // boolean, si es fa click a una operacio, canvia de true (operador 1) a false (operador 2)
var operador1 = 0;
var operador2 = 0;
var resultat = 0;
var operacio = "";
var valorInicial = 0;


var operand1 = "0";

document.addEventListener("DOMContentLoaded", function () { // Imprimeix zero res mes carregar la pàgina
  operand1 = "0";
  document.getElementById("resultat").value = operand1;
});


function mostrar() {
  let tipus = document.getElementById("tipusCalculadora").value;  // agafa el tipus de calculadora que s'ha escrit
  let nom = document.getElementById("nom").value; // nom d'usuari

  // crea un localStorage per a guardar els valors
  localStorage.setItem("nomUsuari", nom);
  localStorage.setItem("tipusCalculadora", tipus);

  // depenent del tipus, porta a una pagina o una altra
  if (tipus == "normal") {
    window.location.href = "html/calculadora.html";
  } else if (tipus == "cientifica") {
    window.location.href = "html/calculadoraCientifica.html";
  } else {
    alert("Tipus de calculadora incorrecta");
  }
}

document.addEventListener("DOMContentLoaded", function () { // al carregar la pàgina, mostra el num d'usuari
  let nomUsuari = localStorage.getItem("nomUsuari");
  document.getElementById("usuari").innerHTML = "Usuari: " + nomUsuari;
});



function errors(missatge) { // li arriba per parametre el missatge d'error i mostra el missatge
  document.getElementById("errors").innerText = missatge + ",si no deixa continuar, fes enter a la URL per a poder continuar";
}

function opcio(parametreOperacio) { // li arriba per paramtre el valor que hia ficat dins de les funcions de opcio(), per exemple opcio("+") envia +
  operacio = parametreOperacio;
  torn = !torn; // canvia el torn 
}


function calcular() {
  let numero1 = parseFloat(operador1);  // agafa el valor de l'operador 1 i el converteix a float
  let numero2 = parseFloat(operador2);

  // NO ACABA DE FUNCIONAR AMB IF

  // if(operacio=="+"){
  //  resultat = numero1 + numero2;
  // }else if(operacio == "-"){
  //   resultat = numero1 - numero2;
  // }else if(operacio == "*"){
  //   resultat = numero1 * numero2;
  // }else{
  //   resultat = numero1 / numero2;
  // }

  switch (operacio) { // segons el cas, fa una cosa o una altra
    case "+":
      resultat = numero1 + numero2;
      break;
    case "-":
      resultat = numero1 - numero2;
      break;
    case "*":
      resultat = numero1 * numero2;
      break;
    case "/":
      resultat = numero1 / numero2;
      break;
  }

  document.getElementById("resultat").value = resultat;

}

function mostrarResultat() {
  calcular(); // crida a la funcio de dalt
  torn = true;  // per a que comenci amb el primer operador
  operacio = "";  // li esborro el cotingut de l'operacio
}


function potencia() {
  let mostrar = document.getElementById("resultat");
  let numero = parseFloat(mostrar.value); // guarda el valor de la pantalla a numero

  mostrar.value = Math.pow(numero, 2);  // eleva el numero a 2 hi ho mostra
}

// lo mateix que l'anterior funcio, pero fa la arrel quadrada
function realQuadrada() {
  let mostrar = document.getElementById("resultat");
  let numero = parseFloat(mostrar.value);

  mostrar.value = Math.sqrt(numero);
}

function tractarUn() {
  if (torn) { // torn per defecte a true
    if (operador1.length >= 6) {  // en el cas de ser més llarg o igual a 6, envia el missatge a la funcio errors
      errors("Massa digits");
      return;
    }
    operador1 = operador1 + "1";  // en el cas de que no doni error, concatena el numero 1 
    resultat = document.getElementById("resultat").value = operador1; // mostro el valor per pantalla
    document.getElementById("resultat").value = operador1 + " " + operacio;
  } else {  // lo mateix que l'anterior pero amb l'operador 2
    if (operador2.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador2 = operador2 + "1";
    resultat = document.getElementById("resultat").value = operador2;
    document.getElementById("resultat").value = operador1 + " " + operacio + " " + operador2; // concateno operador1, operacio i operador2
  }
}

function tractarDos() {
  if (torn) {
    if (operador1.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador1 = operador1 + "2";
    pantalla = document.getElementById("resultat").value = operador1;
    document.getElementById("resultat").value = operador1 + " " + operacio;
  } else {
    if (operador2.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador2 = operador2 + "2";
    resultat = document.getElementById("resultat").value = operador2;
    document.getElementById("resultat").value = operador1 + " " + operacio + " " + operador2;
  }
}

function tractarTres() {
  if (torn) {
    if (operador1.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador1 = operador1 + "3";
    resultat = document.getElementById("resultat").value = operador1;
    document.getElementById("resultat").value = operador1 + " " + operacio;
  } else {
    if (operador2.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador2 = operador2 + "3";
    resultat = document.getElementById("resultat").value = operador2;
    document.getElementById("resultat").value = operador1 + " " + operacio + " " + operador2;
  }
}

function tractarQuatre() {
  if (torn) {
    if (operador1.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador1 = operador1 + "4";
    resultat = document.getElementById("resultat").value = operador1;
    document.getElementById("resultat").value = operador1 + " " + operacio;
  } else {
    if (operador2.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador2 = operador2 + "4";
    resultat = document.getElementById("resultat").value = operador2;
    document.getElementById("resultat").value = operador1 + " " + operacio + " " + operador2;
  }
}

function tractarCinc() {
  if (torn) {
    if (operador1.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador1 = operador1 + "5";
    pantalla = document.getElementById("resultat").value = operador1;
    document.getElementById("resultat").value = operador1 + " " + operacio;
  } else {
    if (operador2.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador2 = operador2 + "5";
    pantalla = document.getElementById("resultat").value = operador2;
    document.getElementById("resultat").value = operador1 + " " + operacio + " " + operador2;
  }
}

function tractarSis() {
  if (torn) {
    if (operador1.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador1 = operador1 + "6";
    pantalla = document.getElementById("resultat").value = operador1;
    document.getElementById("resultat").value = operador1 + " " + operacio;
  } else {
    if (operador2.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador2 = operador2 + "6";
    pantalla = document.getElementById("resultat").value = operador2;
    document.getElementById("resultat").value = operador1 + " " + operacio + " " + operador2;
  }
}

function tractarSet() {
  if (torn) {
    if (operador1.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador1 = operador1 + "7";
    pantalla = document.getElementById("resultat").value = operador1;
    document.getElementById("resultat").value = operador1 + " " + operacio;
  } else {
    if (operador2.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador2 = operador2 + "7";
    pantalla = document.getElementById("resultat").value = operador2;
    document.getElementById("resultat").value = operador1 + " " + operacio + " " + operador2;
  }
}

function tractarVuit() {
  if (torn) {
    if (operador1.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador1 = operador1 + "8";
    pantalla = document.getElementById("resultat").value = operador1;
    document.getElementById("resultat").value = operador1 + " " + operacio;
  } else {
    if (operador2.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador2 = operador2 + "8";
    pantalla = document.getElementById("resultat").value = operador2;
    document.getElementById("resultat").value = operador1 + " " + operacio + " " + operador2;
  }
}

function tractarNou() {
  if (torn) {
    if (operador1.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador1 = operador1 + "9";
    document.getElementById("resultat").value = operador1 + " " + operacio;
  } else {
    if (operador2.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador2 = operador2 + "9";
    pantalla = document.getElementById("resultat").value = operador2;
    document.getElementById("resultat").value = operador1 + " " + operacio + " " + operador2;
  }
}

function tractarZero() {
  if (torn) {
    if (operador1.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador1 = operador1 + "0";
    pantalla = document.getElementById("resultat").value = operador1;
    document.getElementById("resultat").value = operador1 + " " + operacio;
  } else {
    if (operador2.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador2 = operador2 + "0";
    pantalla = document.getElementById("resultat").value = operador2;
    document.getElementById("resultat").value = operador1 + " " + operacio + " " + operador2;
  }
}

// el codi es el mateix que qualsevol altra funcio de tracticar, solament he afegit una condicio per saltar error
function tractarDecimals() {
  if (torn) {
    if (operador1.includes(".")) { // si té un punt, envio missatje a errors() i faig return per parar
      errors("Ja conté un punt");
      return;
    }
    if (operador1.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador1 = operador1 + ".";
    pantalla = document.getElementById("resultat").value = operador1;
    document.getElementById("resultat").value = operador1 + " " + operacio;
  } else {
    if (operador2.includes(".")) {
      errors("Ja conté un punt");
      return;
    }
    if (operador2.length >= 6) {
      errors("Massa digits");
      return;
    }
    operador2 = operador2 + ".";
    pantalla = document.getElementById("resultat").value = operador2;
    document.getElementById("resultat").value = operador1 + " " + operacio + " " + operador2;
  }
}

function guardar() {
  let guardat = document.getElementById("resultat").value;  // agafo lo que hi ha per pantalla
  let guardatNum = parseFloat(guardat); // passo de string a numero
  sessionStorage.setItem("guardat", guardatNum);  // ho guardo en sessionStorage
}

function mostrarValor() {
  let valorGuardat = sessionStorage.getItem("guardat"); // agafo el valor guardat
  if (valorGuardat != null || valorGuardat != " ") {  // si no està buit, el mostro per pantalla
    document.getElementById("resultat").value = valorGuardat;
  } else {
    errors("No hi ha cap valor guardat"); // si està buit, envio missatge d'error
  }
}

function esborrarValor() {
  sessionStorage.removeItem("guardat"); // buido el sessionStorage
}


function esborrar() { // fico que totes les variables estiguin buides
  operador1 = "";
  operador2 = "";
  operacio = "";
  torn = true;  // torn per defecte, operador1

  document.getElementById("resultat").value = "0";  // mostro zero per pantalla
}

function esborrarUltim() {  // fa casi lo mateix que la anterior funcio, solament que esborra l'ultim numero
  if (torn) {
    operador1 = operador1.slice(0, -1);
    document.getElementById("resultat").value = operador1;
  } else {
    operador2 = operador2.slice(0, -1);
    document.getElementById("resultat").value = operador2;
  }
}

function goBack() { // tira enrere en l'historial
  window.history.back();
}

function goForward() {  // tira endavant en l'historial
  window.history.forward();
}

