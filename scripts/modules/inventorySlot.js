import * as images from "./images.js";
class InventorySlot {
  constructor(game, x, y, width, height, color, image, selectedImage, index) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = color;
    this.game = game;
    this.image = image;
    this.selectedImage = selectedImage;
    this.selected = false;
  }
  draw(context) {
    this.selected
      ? context.drawImage(
          this.selectedImage,
          this.x,
          this.y,
          this.width,
          this.height
        )
      : context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  update(keys) {}
}

export default InventorySlot;
