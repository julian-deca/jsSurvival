class Tile {
  constructor(game, x, y, width, height, color, image, health) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = color;
    this.game = game;
    this.image = image;
    this.highlight = false;
    this.health = health;
  }
  draw(context) {
    context.fillStyle = this.color;
    this.image
      ? context.drawImage(this.image, this.x, this.y, this.width, this.height)
      : context.fillRect(this.x, this.y, this.width, this.height);

    context.strokeStyle = "rgb(184, 187, 160)";
    context.lineWidth = "2";

    if (this.highlight) {
      context.strokeRect(
        this.x + 1,
        this.y + 1,
        this.width - 2,
        this.height - 2
      );
    }
    //context.strokeRect(this.x, this.y, this.width, this.height);

    //this.drawHitBox(context);
    //context.strokeRect(this.topRect(context))
  }
  update(keys, pos) {
    this.x += this.game.screenScrollX;
    this.y += this.game.screenScrollY;

    this.highlight = this.game.checkCollisionPoint(
      { x: this.x, y: this.y, width: this.width, height: this.height },
      pos
    );
  }
  drawHitBox(context) {
    context.strokeStyle = "blue";
    context.lineWidth = "0.9";
    context.strokeRect(...Object.values(this.topRect()));
    context.strokeRect(...Object.values(this.leftRect()));
    context.strokeRect(...Object.values(this.rightRect()));
    context.strokeRect(...Object.values(this.bottomRect()));
  }

  topRect() {
    return { x: this.x, y: this.y, width: this.width, height: 10 };
  }

  rightRect() {
    return {
      x: this.x + this.width - 5,
      y: this.y + 5,
      width: 5,
      height: this.height - 10,
    };
  }

  leftRect() {
    return { x: this.x, y: this.y + 5, width: 5, height: this.height - 10 };
  }

  bottomRect() {
    return {
      x: this.x,
      y: this.y + this.height - 5,
      width: this.width,
      height: 5,
    };
  }
}

export default Tile;
