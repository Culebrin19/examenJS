import { GameObject } from "./classes/GameObject.js";
import { Goku } from "./classes/Goku.js";
import { Food } from "./classes/Food.js";
import { ErrorPacman } from "./classes/ErrorPacman.js";
import { Freezer } from "./classes/Freezer.js";
import { PowerUp } from "./classes/PowerUp.js";

/**
 * @constant map es el mapa del joc, cada número representa un objtecte diferent
 */
const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 11, 2, 0, 1],
  [1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 11, 0, 0, 6, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 2, 1, 1, 1, 0, 14, 1],
  [1, 11, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 11, 0, 0, 2, 1, 0, 1, 1, 0, 11, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 15, 2, 0, 2, 0, 0, 0, 0, 11, 0, 2, 4, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const ROWS = 14;
const COLUMNS = 14;
export const IMAGE_SIZE = 32;
export const WIDTH_CANVAS = 448;
export const HEIGHT_CANVAS = 448; // IMAGE_SIZE * ROWS
const extraSize = 80;
export const LIVES_PACMAN = 3;

let imgRock;
let imgEsferas;
let soundFood;
let soundPacman;
let numberErrorSound;

let imgGoku;
let imgFreezer;
let myGoku;
let imgPowerUp;
let imgTemplo;

const timerSecond = 0;
let timer = 0;
let startTimeGame = 0;
const endTimeGame = 0;
const numeroEsferes = 0;
let numeroEsferesRecollides = 0;

let powerUpActive = false;
let powerUpTimer = 0;
const powerUpDuration = 10000;

const arrRocks = [];
const arrFood = [];
const arrCireres = [];
const arrPowerUp = [];
const arrFreezer = [];
const arrTemplo = [];
let numberImagesLoaded = 0;
console.log("Boff");

/**
 * @function preload carrega totes les imatges i els sons del joc
 */
function preload() { // tot lo pesat a preload
  // eslint-disable-next-line sonarjs/no-use-of-empty-return-value
  imgRock = loadImage("../img/roca.png", handleImage("roca"), handleError);
  imgEsferas = loadImage("../img/esferas.png", handleImage, handleError);
  imgGoku = loadImage("../img/goku.png", handleImage, handleError);
  imgFreezer = loadImage("../img/freezer4.png", handleImage, handleError);
  soundFood = loadSound("../img/sounds/pacman_eatfruit.wav");
  soundPacman = loadSound("../img/sounds/pacman.mp3", handleSound, handleErrorSound);
  imgPowerUp = loadImage("../img/rayo.png", handleImage, handleError);
  imgTemplo = loadImage("../img/templo.png", handleImage, handleError);
}

/**
 * @function handleSound mostra un missatge per consola si s'ha carregat correctament el so
 */
function handleSound() {
  console.error("S'ha carregat correctament el so");
}

/**
 * @function handleErrorSound mostra un missatge per consola si s'ha produit un error al carregar el so
 */
function handleErrorSound() {
  console.error("S'ha produit un errror al carregar el so");
  numberErrorSound++;
}

/**
 * @param msg
 * @function handleError mostra un missatge per consola si s'ha produit un error al carregar la imatge
 */
function handleError(msg) {
  console.error(`Error al carregar imatge ${msg}`);
  try {
    throw new ErrorPacman(2, "Error carregar imatge");
  } catch (error) {
    console.error(error.toString());
  }
  showError();
}

/**
 * @param msg
 * @function handleImage mostra un missatge per consola si s'ha carregat correctament la imatge
 */
function handleImage(msg) {
  console.error(`Images carregada correctament ${msg}`);
  numberImagesLoaded++;
}

/**
 * @function setup inicialitza el joc una sola vegada.
 * Crea les roques, el food, el pacman i les cireres, mirant la posico per la qual va i en base
 * al número que està assignat, fica una imatge o una altra .
 * També comença el temps del joc.
 */
function setup() { // s'executa una vegada
  // numberImagesLoaded = 4; i numberErrorSound = 0;
  createCanvas(WIDTH_CANVAS, HEIGHT_CANVAS + extraSize).parent("sketch-pacman");
  for (let filaActual = 0; filaActual < ROWS; filaActual++) {
    for (let columnaActual = 0; columnaActual < COLUMNS; columnaActual++) {
      if (map[filaActual][columnaActual] === 1) {
        const roca = new GameObject(filaActual, columnaActual);
        console.log(`He creat roca a posicio fila ${filaActual}i columna ${columnaActual}`);
        arrRocks.push(roca);
      } else if (map[filaActual][columnaActual] === 2) {
        const menjar = new Food(filaActual, columnaActual); // GameObject(filaActual, columnaActual);
        console.log(`He creat food a posicio fila ${filaActual}i columna ${columnaActual}`);
        arrFood.push(menjar);
      } else if (map[filaActual][columnaActual] === 3) {
        myGoku = new Goku(filaActual, columnaActual);
        console.log(`He creat pacman a posicio fila ${filaActual}i columna ${columnaActual}`);
      } else if (map[filaActual][columnaActual] === 11) {
        const freezer = new Freezer(filaActual, columnaActual);
        console.log(`He creat menjar en la posicio fila ${filaActual}i columna ${columnaActual}`);
        arrFreezer.push(freezer);
      } else if (map[filaActual][columnaActual] === 6) {
        myGoku = new Goku(filaActual, columnaActual);
        const powerUp = new PowerUp(filaActual, columnaActual);
        arrPowerUp.push(powerUp);
      } else if (map[filaActual][columnaActual] === 15) {
        const templo = new GameObject(filaActual, columnaActual);
        console.log(`He creat templo a posicio fila ${filaActual}i columna ${columnaActual}`);
        arrTemplo.push(templo);
      }
      console.log(arrRocks.length);
    }
    startTimeGame = millis();
  }
}

/**
 * @function testCollideRock comprova si el pacman colisiona amb una roca.
 * En el cas de que si, mostra un missatge per consola de que ha colissionat amb una roca.
 */
if (myGoku) {
  for (let i = 0; i < arrRocks.length; i++) {
    if (myGoku.coordXPixels === arrRocks[i].coordXPixels && myGoku.coordYPixels === arrRocks[i].coordYPixels) {
      console.log("Error, colisiona amb una roca");
    }
  }
}

/**
 * @function testCollideFood comprova si el pacman colisiona amb un menjar.
 * En el cas de que si si, mostra un missatge per consola de que ha colissionat amb un menjar
 * i elimina el food en la posicio que ha colisionat.
 */
for (let i = 0; i < arrFood.length; i++) {
  if (myGoku.coordXPixels === arrFood[i].coordXPixels && myGoku.coordYPixels === arrFood[i].coordYPixels) {
    myGoku.testCollideRock(arrFood[i]);
    soundFood.play();
    numeroEsferesRecollides++;
  }
}

for (let i = 0; i < arrPowerUp.length; i++) {
  if (myGoku.coordXPixels === arrPowerUp[i].coordXPixels && myGoku.coordYPixels === arrPowerUp[i].coordYPixels) {
    myGoku.testCollideRock(arrPowerUp[i]);
    soundFood.play();
  }
}

/**
 * @function testCollideCherry comprova si el pacman colisiona amb una cirera. Igual que en la funció anterior,
 * al colissionar mostra un error i elimina la cirera de la posicio que ha colisionat.
 */
for (let i = 0; i < arrFreezer.length; i++) {
  if (myGoku.coordXPixels === arrFreezer[i].coordXPixels && myGoku.coordYPixels === arrFreezer[i].coordYPixels) {
    myGoku.testCollideRock(arrFreezer[i]);
    soundFood.play();
  }
}

/**
 * @function draw s'executa en bucle (no para) i pinta tots els objectes del joc.
 * Per exemple el fons, les roques, food, el text de la puntuació i el temps,etc.
 * @function testFinishGame es crida per comprovar si el joc ha acabat.
 */
function draw() {
  background(171, 248, 168);
  arrRocks.forEach((roca) => roca.showObject(imgRock));
  arrFood.forEach((menjar) => menjar.showObject(imgEsferas));
  arrFreezer.forEach((freezer) => freezer.showObject(imgFreezer));
  myGoku.showObject(imgGoku);
  arrPowerUp.forEach((powerUp) => powerUp.showObject(imgPowerUp));
  arrFreezer.forEach((freezer) => freezer.showObject(imgFreezer));
  arrTemplo.forEach((templo) => templo.showObject(imgTemplo));
  textSize(20);
  textAlign(LEFT, CENTER);
  timer = floor((millis() - startTimeGame) / 1000);
  text(`Puntuació: ${myGoku.score}`, 10, HEIGHT_CANVAS + 30);
  text(`Temps: ${timer}`, 10, HEIGHT_CANVAS + 60);

  testFinishGame();
}

/**
 * @function keyPressed permet moure el pacman en les base a les tecles que es prem.
 * Si es prem alguna que no es, mostra un error per consola.
 */
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    myGoku.moveRight(arrFood, arrRocks, arrFreezer, arrPowerUp);
    soundPacman.play();
  } else if (keyCode === LEFT_ARROW) {
    myGoku.moveLeft(arrFood, arrRocks, arrFreezer, arrPowerUp);
    soundPacman.play();
  } else if (keyCode === UP_ARROW) {
    myGoku.moveUp(arrFood, arrRocks, arrFreezer, arrPowerUp);
    soundPacman.play();
  } else if (keyCode === DOWN_ARROW) {
    myGoku.moveDown(arrFood, arrRocks, arrFreezer, arrPowerUp);
    soundPacman.play();
  } else {
    console.log("Error de tecla");
    const error = new ErrorPacman(1, "Error de tecla");
    error.toString();
  }
}

/**
 * @function showError mostra una imatge d'error en cas de que no es pugui carregar una imatge.
 */
function showError() {
  // console.error("Error carregar imatge");
  const errorImage = new ErrorPacman(3, "Error carregar imatge");
  errorImage.toString();
  const parent = document.getElementById("error-holder");
  const node = document.createElement("img");
  node.setAttribute("src", "../img/error.png");
  node.setAttribute("alt", "Imatge error");
  parent.appendChild(node);
  noLoop();
  // remove();
}

/**
 * @function testFinishGame comprova si el joc ha acabat.
 * Pot acabar quan no queda més food, quan arriba al temps indicat o quan es queda sense vides.
 */
function testFinishGame() {

  let foodRecollit = arrFood.length === 0;
  let frezzersRecollit = arrFreezer.length === 0;

  /**
   * @constant temple comprova si el pacman ha arribat al templo
   * rep cada element de l'array arrTemplo, le fico un alias de templo i compro si està en la mateixa posocio que el temple
   */
  let temple = arrTemplo.some(templo =>
    myGoku.coordXPixels === templo.coordXPixels && myGoku.coordYPixels === templo.coordYPixels
  );

  /**
   * @constant arrFood.length que està dins de la variable recollit, comprova si no queda menjar
   * i després si està en la posicio del temple, en el cas de que si, acaba el jox.
   */
  if (foodRecollit && frezzersRecollit && temple) {
    noLoop();
    const theConfirm = confirm("Has recollit tot el food i has arribat al temple, vols tornar a començar?");
    if (theConfirm) {
      window.location.reload();
    } else {
      alert("Fi del joc! Gràcies per jugar.");
    }
  } else if (timer >= 90) {
    // test lose game
    confirm("Fi del joc, has perdut");
    window.location.reload();
  }
}

globalThis.setup = setup;
globalThis.draw = draw;
globalThis.preload = preload;
globalThis.keyPressed = keyPressed;
