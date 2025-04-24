import * as images from "./images.js";
class InventorySlot {
  constructor(
    game,
    x,
    y,
    width,
    height,
    color,
    image,
    selectedImage,
    index,
    item = null
  ) {
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
    this.item = item;
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

    if (this.item) {
      this.item.draw(context);
    }
  }
  update(keys) {}
  addItem(item) {
    this.item = item;
    this.item.x = this.x;
    this.item.y = this.y;
  }
}

export default InventorySlot;
