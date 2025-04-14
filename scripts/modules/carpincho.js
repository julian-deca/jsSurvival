import Mob from "./mob.js";
import {
  Walk,
  Idle,
  Sit,
  SitIdle,
  Stand,
  LeanDown,
  Munch,
  LeanUp,
} from "./carpinchoStates.js";

class Carpincho extends Mob {
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
    this.states = {
      WALK: new Walk(this.game, this),
      IDLE: new Idle(this.game, this),
      SIT: new Sit(this.game, this),
      SITIDLE: new SitIdle(this.game, this),
      STAND: new Stand(this.game, this),
      LEANDOWN: new LeanDown(this.game, this),
      MUNCH: new Munch(this.game, this),
      LEANUP: new LeanUp(this.game, this),
    };
    this.setState("WALK");
  }
  draw(context) {
    super.draw(context);
  }
  update() {
    this.x += this.game.screenScrollX;
    this.y += this.game.screenScrollY;

    this.currentState.handleInput();

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
            this.facingRight = !this.facingRight;
            this.x = tile.x + tile.width + 1;
          }
          if (
            this.speedX > 0 &&
            this.game.checkCollision(this.rightRect(), tile.leftRect())
          ) {
            this.facingRight = !this.facingRight;

            this.x = tile.x - this.topRect().width - 1;
          }
          if (this.game.checkCollision(this.topRect(), tile.bottomRect())) {
            this.speedY = 0;
            this.y = tile.y + tile.height + 1 - (this.topRect().y - this.y);
          }

          if (this.game.checkCollision(this.bottomRect(), tile.topRect())) {
            this.onGround = true;
            this.speedY = 0;
            this.y = tile.y + 9 - this.height;
            break;
          }
        }
      } else if (!this.game.checkCollision(this.bottomRect(), tile.topRect())) {
        this.onGround = false;
      }
    }
  }

  topRect() {
    return { x: this.x, y: this.y + 25, width: this.width, height: 5 };
  }

  rightRect() {
    return {
      x: this.x + this.width - 5,
      y: this.y + 28,
      width: 5,
      height: this.height - 25 - 15,
    };
  }

  leftRect() {
    return {
      x: this.x,
      y: this.y + 28,
      width: 5,
      height: this.height - 28 - 15,
    };
  }

  bottomRect() {
    return {
      x: this.x,
      y: this.y + this.height - 20,
      width: this.width,
      height: 10,
    };
  }
}
export default Carpincho;
