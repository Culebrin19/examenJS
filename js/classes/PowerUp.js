import { GameObject } from "./GameObject.js";

/**
 * @class PowerUp representa un objecte especial que activa un efecte temporal en el joc.
 */
export class PowerUp extends GameObject {
  constructor(y, x) {
    super(y, x);
  }

  toString() {
    console.log(`PowerUp at row: ${this.coordY} column: ${this.coordX}`);
    return `PowerUp`;
  }
}
