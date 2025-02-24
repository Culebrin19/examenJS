import { GameObject } from "./GameObject.js";

/**
 * @class All és una classe filla de GameObject que representa el menjar del joc i "controla" el tema de punts del All.
 */
export class All extends GameObject {
  constructor(y, x) {
    super(y, x);
    this.pointsAll = 10;
  }

  toString() {
    console.log(`All at row: ${this.coordY} column: ${this.coordX}`);
    return `All: ${this.pointsAll}`;
  }
}
