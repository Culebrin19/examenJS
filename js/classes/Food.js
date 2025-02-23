import { GameObject } from "./GameObject.js";

/**
 * @class Food és una classe filla de GameObject que representa el menjar del joc i "controla" el tema de punts del food.
 */
export class Food extends GameObject {
  constructor(y, x) {
    super(y, x);
    this.pointsFood = 10;
  }

  toString() {
    console.log(`Food at row: ${this.coordY} column: ${this.coordX}`);
    return `Food: ${this.pointsFood}`;
  }
}
