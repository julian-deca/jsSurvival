import * as images from "./images.js";
class Item {
  constructor(
    game,
    width,
    height,
    image,
    isLayer = false,
    damage = 0,
    type,
    x = -1,
    y = -1
  ) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.game = game;
    this.image = image;
    this.isLayer = isLayer;
    (this.damage = damage), (this.type = type);
  }
  draw(context) {
    this.isLayer
      ? context.drawImage(
          this.image.sprite,
          0,
          this.image.height,
          this.image.width,
          this.image.height,
          this.x - this.width / 3,
          this.y - this.height / 2 - this.height / 3,
          this.width * 2,
          this.height * 2
        )
      : context.drawImage(
          this.image.sprite,
          this.x,
          this.y,
          this.width,
          this.height
        );
  }
  update(keys) {}
}

export default Item;
