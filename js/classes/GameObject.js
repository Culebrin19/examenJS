import { IMAGE_SIZE } from "../sketch.js";

export class GameObject {
  constructor(x, y) {
    this.rowNumber = x;
    this.columnObjectNumber = y;
    this.coordXPixels = x * IMAGE_SIZE;
    this.coordYPixels = y * IMAGE_SIZE;
  }

  showObject(img) {
    if (this.coordXPixels == null || this.coordYPixels == null) {
      this.coordXPixels = this.rowNumber * IMAGE_SIZE;
      this.coordYPixels = this.columnObjectNumber * IMAGE_SIZE;
    }
    image(img, this.coordXPixels, this.coordYPixels);
  }
}
