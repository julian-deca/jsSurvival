import { Run, Idle, Jump, Fall, Attack } from "./playerStates.js";
import Mob from "./mob.js";
import * as images from "./images.js";
import Layer from "./playerLayer.js";
import HotBar from "./hotBar.js";
class Player extends Mob {
  constructor(
    game,
    x,
    y,
    width,
    height,
    sprite,
    jumpHeight,
    imageWidth,
    imageHeight,
    layerImages
  ) {
    super(
      game,
      x,
      y,
      width,
      height,
      sprite,
      jumpHeight,
      imageWidth,
      imageHeight
    );
    this.maxFrameX = 4;
    this.layers = [];
    layerImages.forEach((image) => {
      this.layers.push(new Layer(this, image));
    });
    this.states = {
      RUN: new Run(this.game),
      IDLE: new Idle(this.game),
      JUMP: new Jump(this.game),
      FALL: new Fall(this.game),
      ATTACK: new Attack(this.game),
    };
    this.count = 0;
    this.maxCount = 15;
    this.facingRight = true;
    this.currentState = this.states["IDLE"];
    this.onGround = false;
    this.hotBar = new HotBar(game, this.game.width / 2 - 360 / 2, 20, 360, 9);
  }
  draw(context) {
    if (!this.facingRight) {
      context.drawImage(
        this.sprite,
        this.frameX * this.imageWidth,
        this.frameY * this.imageHeight,
        this.imageWidth,
        this.imageHeight,
        this.x - this.width / 2 + this.topRect().width / 2,
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
        -this.x - this.width / 2 - this.topRect().width / 2,
        this.y,
        this.width,
        this.height
      );
      context.restore();
    }
    this.layers.forEach((layer) => {
      layer.draw(context, this.frameX, this.frameY);
    });
    this.hotBar.draw(context);
    if (this.count >= this.maxCount) {
      this.getFrame();
      this.count = 0;
    } else {
      this.count++;
    }
  }
  update(keys, wheel) {
    if (
      (this.x + this.width > this.game.width - this.game.screenThresholdX &&
        this.facingRight) ||
      (this.x < this.game.screenThresholdX && !this.facingRight)
    ) {
      if (this.facingRight) {
        this.x -= this.speedX;
        this.game.screenScrollX = -this.speedX;
      } else {
        this.x += this.speedX;
        this.game.screenScrollX = this.speedX;
      }
    } else {
      this.game.screenScrollX = 0;
    }

    if (
      this.y + this.height > this.game.height - this.game.screenThresholdY ||
      this.y < this.game.screenThresholdY
    ) {
      this.y -= this.speedY;
      this.game.screenScrollY = -this.speedY;
    } else {
      this.game.screenScrollY = 0;
    }

    this.y += this.speedY;
    if (!this.onGround) {
      if (this.speedY <= 20) {
        this.speedY += this.game.gravity;
      }
    } else {
      this.speedY = 0;
    }
    this.currentState.handleInput(keys);
    if (keys.includes("KeyD") || keys.includes("ArrowRight")) {
      this.facingRight = true;
    } else if (keys.includes("KeyA") || keys.includes("ArrowLeft")) {
      this.facingRight = false;
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
            this.x = tile.x + tile.width + 1;
          }
          if (
            this.speedX > 0 &&
            this.game.checkCollision(this.rightRect(), tile.leftRect())
          ) {
            this.x = tile.x - this.topRect().width;
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

    for (const mob of this.game.mobs) {
      if (this.x + this.width >= mob.x && this.x <= mob.x + mob.width) {
        if (this.y + this.height >= mob.y && this.y <= mob.y + mob.height) {
          if (
            this.speedX > 0 &&
            this.game.checkCollision(this.leftRect(), mob.rightRect())
          ) {
            this.x = mob.rightRect().x + mob.rightRect().width + 1;
          }
          if (
            this.speedX > 0 &&
            this.game.checkCollision(this.rightRect(), mob.leftRect())
          ) {
            this.x = mob.x - this.topRect().width - 1;
          }
          if (this.game.checkCollision(this.topRect(), mob.bottomRect())) {
            this.speedY = 0;
            this.y = mob.y + mob.height + 1 - (this.topRect().y - this.y);
          }

          if (this.game.checkCollision(this.bottomRect(), mob.topRect())) {
            this.onGround = true;
            this.speedY = 0;
            this.y = mob.topRect().y - 1 - this.height;
            break;
          }
        }
      }
    }
    this.hotBar.update(wheel);
  }

  getFrame() {
    super.getFrame();
  }

  setState(state) {
    super.setState(state);
  }

  drawHitBox(context) {
    super.drawHitBox(context);
  }

  topRect() {
    return { x: this.x, y: this.y + 20, width: this.width / 4, height: 5 };
  }

  rightRect() {
    return {
      x: this.x + this.width / 4 - 5,
      y: this.y + 24,
      width: 5,
      height: this.height - 25,
    };
  }

  leftRect() {
    return {
      x: this.x,
      y: this.y + 24,
      width: 5,
      height: this.height - 25,
    };
  }

  bottomRect() {
    return {
      x: this.x + 5,
      y: this.y + this.height - 10,
      width: this.width / 4 - 10,
      height: 10,
    };
  }
}

export default Player;
