import { GameObject } from "./GameObject.js";
import { IMAGE_SIZE, WIDTH_CANVAS, HEIGHT_CANVAS, LIVES_PACMAN } from "../sketch.js";
import { Freezer } from "./Freezer.js";
import { Food } from "./Food.js";
import { PowerUp } from "./PowerUp.js";

/**
 * @class Goku
 * @extends GameObject
 */

export class Goku extends GameObject {
  constructor(y, x) {
    super(y, x);
    this.direction = 1;
    this.speedPacman = 32;
    this.score = 0;
    this.pacmanLive = LIVES_PACMAN;
    this.widthCanvasPacman = 128;
    this.pacmanDiametre = 32;

    this.powerUpActive = false;
    this.powerUpTimer = 0;
    this.powerUpDuration = 10000;
  }

  /**
   * @function moveRight mou cap a la dreta i comprova si colisiona amb una zombi o si es menja un food.
   * Té els següents parametres:
   * @param arrFood
   * @param arrRocks
   * @param arrZombi
   */
  moveRight(arrFood, arrRocks, arrZombi, arrPowerUp) {
    const temp = this.coordXPixels + this.speedPacman;
    if (temp >= WIDTH_CANVAS - IMAGE_SIZE || this.testCollideRock(arrZombi, temp, this.coordYPixels) && this.testCollideRock(arrRocks, temp, this.coordYPixels)) {
      console.log("Error, no es pot moure a la dreta");
    } else {
      this.direction = 1;
      this.coordXPixels = temp;
      this.eatFood(arrFood, arrZombi, arrPowerUp);
    }
  }

  /**
   * @function moveLeft mou cap a l'esquerra i comprova si colisiona amb una zombi o si es menja un food.
   * Té els següents parametres:
   * @param arrFood
   * @param arrRocks
   * @param arrZombi
   */
  moveLeft(arrFood, arrRocks, arrZombi, arrPowerUp) {
    const temp = this.coordXPixels - this.speedPacman;
    if (temp < 0 || this.testCollideRock(arrZombi, temp, this.coordYPixels) && this.testCollideRock(arrRocks, temp, this.coordYPixels)) {
      console.log("Error, no es pot moure a l'esquerra");
    } else {
      this.direction = 3;
      this.coordXPixels = temp;
      this.eatFood(arrFood, arrZombi, arrPowerUp);
    }
  }

  /**
   * @function moveUp mou cap a dalt i comprova si colisiona amb una zombi o si es menja un food.
   * Té els següents parametres:
   * @param arrFood
   * @param arrRocks
   * @param arrZombi
   */
  moveUp(arrFood, arrRocks, arrZombi, arrPowerUp) {
    const temp = this.coordYPixels - this.speedPacman;
    if (temp < 0 || this.testCollideRock(arrZombi, this.coordXPixels, temp) && this.testCollideRock(arrRocks, temp, this.coordYPixels)) {
      console.log("Error, no es pot moure a dalt");
    } else {
      this.direction = 2;
      this.coordYPixels = temp;
      this.eatFood(arrFood, arrZombi, arrPowerUp);
    }
  }

  /**
   * @function moveDown mou cap a baix i comprova si colisiona amb una zombi o si es menja un food.
   * Té els següents parametres:
   * @param arrFood
   * @param arrRocks
   * @param arrZombi
   */
  moveDown(arrFood, arrRocks, arrZombi, arrPowerUp) {
    const temp = this.coordYPixels + this.speedPacman;
    if (temp >= WIDTH_CANVAS - IMAGE_SIZE || this.testCollideRock(arrZombi, this.coordXPixels, temp) && this.testCollideRock(arrRocks, temp, this.coordYPixels)) {
      console.log("Error, no es pot moure a baix");
    } else {
      this.direction = 4;
      this.coordYPixels = temp;
      this.eatFood(arrFood, arrZombi, arrPowerUp);
    }
  }

  /**
   * @function testCollideRock comprova si colisiona amb una zombi.
   * En el cas de que si, mostra un missatge per consola de que ha colissionat amb una zombi i el mou a la posicio inicial.
   * Apart d'això, li resta una vida.
   * Té els següents parametres:
   * @param arrZombi
   * @param newX
   * @param newY
   * @returns {boolean}
   */
  testCollideRock(arrZombi, newX, newY) {
    for (const zombi of arrZombi) {
      if (newX === zombi.coordXPixels && newY === zombi.coordYPixels) {
        console.log("Has colisionat amb una zombi");
        this.pacmanLive--;
        alert("Has xocat amb una zombi, has perdut una vida, et queden " + this.pacmanLive + " vides")

        /**
         * En el cas de que les vides del pacman siguin 0, mostra un missatge per consola de que ha perdut totes les vides i li pregunta si vol tornar a jugar.
         * En el cas de que si, recarrega la pagina, en el cas de que no, para el joc.
         */
        if (this.pacmanLive <= 0) {
          if (confirm("Has perdut totes les vides, vols tornar a jugar?")) {
            window.location.reload(); 
          } else {
            noLoop(); 
          }
        }
        return true;
      }
    }
    return false;
  }


  // testCollideFood(arrFood) {
  //   for (let i = 0; i < arrFood.length; i++) {
  //     if (this.coordXPixels === arrFood[i].coordXPixels && this.coordYPixels === arrFood[i].coordYPixels) {
  //       console.log("Has menjat food");
  //       arrFood.splice(i, 1);
  //     }
  //   }
  // }

  /**
   * @function eatFood comprova si el pacman ha menjat un food o una cirera.
   * En el cas de que sigui un food, mostra un missatge per consola de que ha menjat un food/cirera i suma la puntuació.
   * Té els següents parametres:
   * @param arrFood
   * @param arrZombi
   */
  eatFood(arrFood, arrZombi, arrPowerUp) {
    /**
     * @var puntsExtra mutiplicara per 2 en el cas de que estigui true, i per 1  en el cas de que estigui false
     */
    let puntsExtra = this.doblePunts ? 2 : 1; 

    for (let i = 0; i < arrFood.length; i++) {
        if (this.coordXPixels === arrFood[i].coordXPixels && this.coordYPixels === arrFood[i].coordYPixels) {
            console.log("Has menjat food");
            this.score += arrFood[i].pointsFood * puntsExtra;
            arrFood.splice(i, 1);
            console.log(`Puntuacio actual: ${this.score}`);
            break;
        }
    }

    for (let i = 0; i < arrZombi.length; i++) {
        if (this.coordXPixels === arrZombi[i].coordXPixels && this.coordYPixels === arrZombi[i].coordYPixels) {
            console.log("Has xocat amb zombie, has perdut");
            arrZombi.splice(i, 1);
            this.pacmanLive--;
            return true;
        }
    }

    /**
     * Primer compriva si s'ha menjat algun power up, en el cas de que si, l'elimina, canviar a true el power up, mostra el missatge 
     * que esta ocult al index amb display none i despres de 10 segons el desactiva i oculta el missatge.
     */

    for (let i = 0; i < arrPowerUp.length; i++) {
        if (this.coordXPixels === arrPowerUp[i].coordXPixels && this.coordYPixels === arrPowerUp[i].coordYPixels) {
            console.log("Has recollit un Power-Up");
            arrPowerUp.splice(i, 1); 

            this.doblePunts = true;
            console.log("Doble de punts activat");
            document.getElementById("powerUpMessage").style.display = "block";

            setTimeout(() => {
                this.doblePunts = false;
                console.log("Doble de punts desactivat");
                document.getElementById("powerUpMessage").style.display = "none";
            }, 10000);

            break;
        }
    }
}
}
