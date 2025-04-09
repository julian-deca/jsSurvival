class Layer {
  constructor(player, sprite, handItem = false) {
    this.player = player;

    this.sprite = sprite;

    this.handItem = handItem;
  }
  draw(context, frameX, frameY) {
    if (!this.player.facingRight) {
      context.drawImage(
        this.sprite,
        frameX * this.player.imageWidth,
        frameY * this.player.imageHeight,
        this.player.imageWidth,
        this.player.imageHeight,
        this.player.x - this.player.width / 2 + this.player.topRect().width / 2,
        this.player.y,
        this.player.width,
        this.player.height
      );
    } else {
      context.save();
      context.scale(-1, 1);
      context.drawImage(
        this.sprite,
        frameX * this.player.imageWidth,
        frameY * this.player.imageHeight,
        this.player.imageWidth,
        this.player.imageHeight,
        -this.player.x -
          this.player.width / 2 -
          this.player.topRect().width / 2,
        this.player.y,
        this.player.width,
        this.player.height
      );
      context.restore();
    }
  }
}

export default Layer;
