class Game {
  constructor() {
    this.gameBoard = new GameBoard();
    this.pacman = new Pacman();
  }

  startGame() {
    createCanvas(WIDTH_CANVAS, HEIGHT_CANVAS);
  }

  finishGame() {
    console.log("Fin del juego");
  }
}
