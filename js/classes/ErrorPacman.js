export class ErrorPacman extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }

  toString() {
    console.log(`S'ha produit un error en el codi ${
      this.code}missatge error: ${this.message}Pila: ${this.stack}`);
  }

  /**
   * Error 1, tecla no reconeguda
   */
}
