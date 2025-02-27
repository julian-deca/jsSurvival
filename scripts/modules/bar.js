class Bar {
  constructor(pong, x, y, width, height, color, speed, up, down) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = color;
    this.speed = speed;
    this.up = up;
    this.down = down;
    this.pong = pong;
  }
  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.strokeRect(this.x, this.y, this.width, this.height);
  }
  update(keys, canvas) {
      if (keys.includes(this.up)) {
        this.y -= this.speed;
      }

      if (keys.includes(this.down)) {
        this.y += this.speed;
      }
   
  }

  checkCollisionY() {
    if (this.y + this.height > this.pong.height || this.y < 0) {
      return true;
    }
    return false;
  }
  reset(y) {
    this.y = y;
  }
}

export default Bar;
