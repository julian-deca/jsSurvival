class MouseMovement {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isDown = false;
  }

  getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }
  update() {
    canvas.addEventListener("mousedown", (e) => {
      const pos = this.getMousePos(canvas, e);
      this.x = pos.x;
      this.y = pos.y;
      this.isDown = true;
    });
    canvas.addEventListener("mouseup", (e) => {
      const pos = this.getMousePos(canvas, e);
      this.x = pos.x;
      this.y = pos.y;
      this.isDown = false;
    });
  }
}

export default MouseMovement;
