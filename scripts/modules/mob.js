class Mob {
  constructor(
    game,
    x,
    y,
    width,
    height,
    sprite,
    jumpHeight,
    imageWidth,
    imageHeight
  ) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.maxFrameX = 5;
    this.frameX = 0;
    this.frameY = 0;
    this.sprite = sprite;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.speedX = 0;
    this.speedY = 0;
    this.jumpHeight = jumpHeight;
    this.game = game;
    this.count = 0;
    this.maxCount = 5;
    this.facingRight = true;
    this.onGround = false;
  }
  draw(context) {
    //this.drawHitBox(context);
    if (this.facingRight) {
      context.drawImage(
        this.sprite,
        this.frameX * this.imageWidth,
        this.frameY * this.imageHeight,
        this.imageWidth,
        this.imageHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else {
      context.save();
      context.scale(-1, 1);
      context.drawImage(
        this.sprite,
        this.frameX * this.imageWidth,
        this.frameY * this.imageHeight,
        this.imageWidth,
        this.imageHeight,
        -this.x - this.width,
        this.y,
        this.width,
        this.height
      );
      context.restore();
    }
    if (this.count >= this.maxCount) {
      this.getFrame();
      this.count = 0;
    } else {
      this.count++;
    }
  }
  update(keys) {
    this.y += this.speedY;
    if (!this.onGround) {
      if (this.speedY <= 20) {
        this.speedY += this.game.gravity;
      }
    } else {
      this.speedY = 0;
    }

    if (this.facingRight) {
      this.x += this.speedX;
    } else {
      this.x -= this.speedX;
    }

    for (const tile of this.game.tiles) {
      if (this.x + this.width >= tile.x && this.x <= tile.x + tile.width) {
        if (this.y + this.height >= tile.y && this.y <= tile.y + tile.height) {
          if (
            this.speedX > 0 &&
            this.game.checkCollision(this.leftRect(), tile.rightRect())
          ) {
            this.speedX = 0;
            this.x = tile.x + tile.width + 1;
          }
          if (
            this.speedX > 0 &&
            this.game.checkCollision(this.rightRect(), tile.leftRect())
          ) {
            this.speedX = 0;
            this.x = tile.x - this.topRect().width - 1;
          }
          if (this.game.checkCollision(this.topRect(), tile.bottomRect())) {
            this.speedY = 0;
            this.y = tile.y + tile.height + 1 - (this.topRect().y - this.y);
          }

          if (this.game.checkCollision(this.bottomRect(), tile.topRect())) {
            this.onGround = true;
            this.speedY = 0;
            this.y = tile.y - 1 - this.height;
            break;
          }
        }
      } else if (!this.game.checkCollision(this.bottomRect(), tile.topRect())) {
        this.onGround = false;
      }
    }
  }

  getFrame() {
    this.frameX += 1;
    if (this.frameX >= this.maxFrameX) this.frameX = 0;
  }

  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }

  drawHitBox(context) {
    context.strokeStyle = "black";
    context.lineWidth = "0.5";
    context.strokeRect(...Object.values(this.topRect()));
    context.strokeRect(...Object.values(this.leftRect()));
    context.strokeRect(...Object.values(this.rightRect()));
    context.strokeRect(...Object.values(this.bottomRect()));
    context.strokeStyle = "red";

    context.strokeRect(this.x, this.y, this.width, this.height);
  }

  topRect() {
    return { x: this.x, y: this.y + 9, width: this.width / 2, height: 5 };
  }

  rightRect() {
    return {
      x: this.x + this.width / 2 - 5,
      y: this.y + 14,
      width: 5,
      height: this.height - 10,
    };
  }

  leftRect() {
    return { x: this.x, y: this.y + 14, width: 5, height: this.height - 10 };
  }

  bottomRect() {
    return {
      x: this.x,
      y: this.y + this.height - 10,
      width: this.width / 2,
      height: 10,
    };
  }
}

export default Mob;
