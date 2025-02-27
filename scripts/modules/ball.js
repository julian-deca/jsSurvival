class Ball {
  constructor(pong, x, y, radius, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
    this.pong = pong;
  }
  draw(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
  }
  update(keys) {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.checkCollisionY()) {
      this.speedY = -this.speedY;
    }
  }
  limitRight() {
    if (this.x - this.radius > this.pong.width) {
      return true;
    }
    return false;
  }
  limitLeft() {
    if (this.x + this.radius < 0) {
      return true;
    }
    return false;
  }
  changeDirectionX(value) {
    if (value <= 35 && value >= -35) {
      this.speedX = value;
      this.speedY = this.speedY * 0.1 + this.speedY;
    } else {
      this.speedX = -this.speedX;
    }
    const randomColor =
      this.pong.colors[(this.pong.colors.length * Math.random()) | 0];
    this.color = randomColor;
    console.log(this.speedY);
    //this.speedY = this.speedY + this.speedY*.1
  }

  checkCollisionY() {
    if (this.y + this.radius > this.pong.height || this.y - this.radius < 0) {
      return true;
    }
    return false;
  }
  reset(speedX, speedY, x, y) {
    this.speedX = speedX;
    this.speedY = speedY;
    this.x = x;
    this.y = y;
    this.color = "black";
  }
}

export default Ball;
