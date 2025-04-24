class Tile {
  constructor(
    game,
    x,
    y,
    width,
    height,
    color,
    image,
    health,
    crackingSprite,
    coords
  ) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = color;
    this.game = game;
    this.image = image;
    this.highlight = false;
    this.health = health;
    this.totalHealth = health;
    this.breaking = false;
    this.breakingFrame = 0;
    this.crackingSprite = crackingSprite;
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

    if (this.breaking) {
      context.drawImage(
        this.crackingSprite.sprite,
        this.breakingFrame * this.crackingSprite.width,
        0,
        this.crackingSprite.width,
        this.crackingSprite.height,
        this.x,
        this.y,
        this.width,
        this.height
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
    if (this.highlight && pos.isDown) {
      this.breaking = true;
    } else {
      this.breaking = false;
      this.health = this.totalHealth;
    }
    if (this.breaking && this.game.player.frameX == 3) {
      this.health -= this.game.player.damage;
      let healthPercentage = (this.health * 100) / this.totalHealth;
      switch (true) {
        case healthPercentage < 10:
          this.breakingFrame++;
          break;
        case healthPercentage < 20:
          this.breakingFrame++;

          break;
        case healthPercentage < 40:
          this.breakingFrame++;

          break;
        case healthPercentage < 60:
          this.breakingFrame++;

          break;
        case healthPercentage < 80:
          this.breakingFrame++;

          break;
      }
    }
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
