import { GameObject } from "./GameObject.js";
import { IMAGE_SIZE, WIDTH_CANVAS, HEIGHT_CANVAS, LIVES_PACMAN } from "../sketch.js";
import { Freezer } from "./Freezer.js";
import { All } from "./All.js";
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
   * @function moveRight mou cap a la dreta i comprova si colisiona amb una zombi o si es menja un all/ampolla.
   * Té els següents parametres:
   * @param arrall
   * @param arrRocks
   * @param arrZombi
   */
  moveRight(arrall, arrRocks, arrZombi, arrAmpolla, arrAll) {
    const temp = this.coordXPixels + this.speedPacman;
    if (temp >= WIDTH_CANVAS - IMAGE_SIZE || this.testCollideRock(arrZombi, arrRocks, temp, this.coordYPixels)) {
      console.log("Error, no es pot moure a la dreta");
    } else {
      this.direction = 1;
      this.coordXPixels = temp;
      this.eatall(arrall, arrZombi, arrAmpolla, arrAll);
    }
  }

  /**
   * @function moveLeft mou cap a l'esquerra i comprova si colisiona amb una zombi o si es menja un all/ampolla.
   * Té els següents parametres:
   * @param arrall
   * @param arrRocks
   * @param arrZombi
   */
  moveLeft(arrall, arrRocks, arrZombi, arrAmpolla, arrAll) {
    const temp = this.coordXPixels - this.speedPacman;
    if (temp < 0 || this.testCollideRock(arrZombi, arrRocks, temp, this.coordYPixels)) {
      console.log("Error, no es pot moure a l'esquerra");
    } else {
      this.direction = 3;
      this.coordXPixels = temp;
      this.eatall(arrall, arrZombi, arrAmpolla, arrAll);
    }
  }

  /**
   * @function moveUp mou cap a dalt i comprova si colisiona amb una zombi o si es menja un all/ampolla.
   * Té els següents parametres:
   * @param arrall
   * @param arrRocks
   * @param arrZombi
   */
  moveUp(arrall, arrRocks, arrZombi, arrAmpolla, arrAll) {
    const temp = this.coordYPixels - this.speedPacman;
    if (temp < 0 || this.testCollideRock(arrZombi, arrRocks, this.coordXPixels, temp)) {
      console.log("Error, no es pot moure a dalt");
    } else {
      this.direction = 2;
      this.coordYPixels = temp;
      this.eatall(arrall, arrZombi, arrAmpolla, arrAll);
    }
  }

  /**
   * @function moveDown mou cap a baix i comprova si colisiona amb una zombi o si es menja un all/ampolla.
   * Té els següents parametres:
   * @param arrall
   * @param arrRocks
   * @param arrZombi
   */
  moveDown(arrall, arrRocks, arrZombi, arrAmpolla, arrAll) {
    const temp = this.coordYPixels + this.speedPacman;
    if (temp >= WIDTH_CANVAS - IMAGE_SIZE || this.testCollideRock(arrZombi, arrRocks, this.coordXPixels, temp)) {
      console.log("Error, no es pot moure a baix");
    } else {
      this.direction = 4;
      this.coordYPixels = temp;
      this.eatall(arrall, arrZombi, arrAmpolla, arrAll);
    }
  }

  /**
   * @function testCollideRock comprova si colisiona amb una zombi i roca. En el cas de zomi, resta vida, en el cas de roca
   * solament surt un console log de que no pot tirar en aquella posicio, pero no li resta cap vida
   * Té els següents parametres:
   * @param arrZombi
   * @param arrRocks
   * @param newX
   * @param newY
   * @returns {boolean}
   */
  testCollideRock(arrZombi, arrRocks, newX, newY) {
    for (const zombi of arrZombi) {
      if (newX === zombi.coordXPixels && newY === zombi.coordYPixels) {
        console.log("Has colisionat amb una zombi");
        this.pacmanLive--;
        alert("Has xocat amb una zombi, has perdut una vida, et queden " + this.pacmanLive + " vides")

        /**
         * En el cas de que les vides del simon siguin 0, mostra un missatge per consola de que ha perdut totes les vides i li pregunta si vol tornar a jugar.
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

    for (const rock of arrRocks) {
      if (newX === rock.coordXPixels && newY === rock.coordYPixels) {
          console.log("Error, una roca pel cami");
          return true;
      }
  }
    return false;
  }

  /**
   * @function eatall comprova si simon ha menjat/colissionat amb alguna ampolla/zombi/all, en base a que sigui, fa una cosa o una altra.
   * En el cas de que sigui un all, mostra un missatge per consola de que ha menjat all i suma la puntuació.
   * Té els següents parametres:
   * @param arrall
   * @param arrZombi
   * @param arrAmpolla
   * @param arr
   */
  eatall(arrall, arrZombi, arrAmpolla, arrAll) {
    /**
     * @var puntsExtra mutiplicara per 2 en el cas de que estigui true, i per 1  en el cas de que estigui false
     */
    let puntsExtra = this.doblePunts ? 2 : 1; 

    for (let i = 0; i < arrall.length; i++) {
        if (this.coordXPixels === arrall[i].coordXPixels && this.coordYPixels === arrall[i].coordYPixels) {
            console.log("Has menjat all");
            this.score += arrall[i].pointsall * puntsExtra;
            arrall.splice(i, 1);
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

    for (let i = 0; i < arrAmpolla.length; i++) {
        if (this.coordXPixels === arrAmpolla[i].coordXPixels && this.coordYPixels === arrAmpolla[i].coordYPixels) {
            console.log("Has recollit un Power-Up");
            arrAmpolla.splice(i, 1); 

            this.doblePunts = true;
            document.getElementById("powerUpMessage").style.display = "block";

            setTimeout(() => {
                this.doblePunts = false;
                console.log("Power up acabat");
                document.getElementById("powerUpMessage").style.display = "none";
            }, 10000);

            break;
        }
    }

    for (let i = 0; i < arrAll.length; i++) {
        if (this.coordXPixels === arrAll[i].coordXPixels && this.coordYPixels === arrAll[i].coordYPixels) {
            console.log("Has menjat All");
            this.score += arrAll[i].pointsAll * puntsExtra;
            arrAll.splice(i, 1);
            console.log(`Puntuacio actual: ${this.score}`);
            break;
        }
    }
}
}
