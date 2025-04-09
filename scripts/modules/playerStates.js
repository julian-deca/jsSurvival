class State {
  constructor(state, game) {
    this.game = game;
    this.state = state;
  }
}

export class Run extends State {
  constructor(game) {
    super("RUN", game);
  }
  enter() {
    this.game.player.speedX = 3;
    this.game.player.frameX = 0;
    this.game.player.maxFrameX = 6;
    this.game.player.frameY = 2;
    this.game.player.maxCount = 5;
  }
  handleInput(keys) {
    if (
      !(
        keys.includes("ArrowRight") ||
        keys.includes("KeyD") ||
        keys.includes("ArrowLeft") ||
        keys.includes("KeyA")
      )
    ) {
      this.game.player.setState("IDLE");
    }
    if (
      keys.includes("ArrowUp") ||
      keys.includes("KeyW") ||
      keys.includes("Space")
    ) {
      if (this.game.player.onGround) {
        this.game.player.setState("JUMP");
      }
    }
    if (keys.includes("KeyC")) {
      this.game.player.setState("ATTACK");
    }
  }
}

export class Idle extends State {
  constructor(game) {
    super("IDLE", game);
  }
  enter() {
    this.game.player.speedX = 0;
    this.game.player.frameX = 0;
    this.game.player.maxFrameX = 4;
    this.game.player.frameY = 0;
    this.game.player.maxCount = 15;
  }
  handleInput(keys) {
    if (
      keys.includes("ArrowRight") ||
      keys.includes("KeyD") ||
      keys.includes("ArrowLeft") ||
      keys.includes("KeyA")
    ) {
      this.game.player.setState("RUN");
    }
    if (
      keys.includes("ArrowUp") ||
      keys.includes("KeyW") ||
      keys.includes("Space")
    ) {
      if (this.game.player.onGround) {
        this.game.player.setState("JUMP");
      }
    }
    if (keys.includes("KeyC")) {
      this.game.player.setState("ATTACK");
    }
  }
}

export class Jump extends State {
  constructor(game) {
    super("JUMP", game);
  }
  enter() {
    this.game.player.speedY -= 10;
    this.game.player.inAir = true;
    this.game.player.frameX = 0;
    this.game.player.maxFrameX = 4;
    this.game.player.frameY = 3;
    this.game.player.maxCount = 10;
  }
  handleInput(keys) {
    if (
      keys.includes("ArrowRight") ||
      keys.includes("KeyD") ||
      keys.includes("ArrowLeft") ||
      keys.includes("KeyA")
    ) {
      this.game.player.speedX = 3;
    } else if (this.game.player.speedX > 0) {
      this.game.player.speedX -= 1;
    }
    if (keys.includes("KeyC")) {
      this.game.player.setState("ATTACK");
    }
    if (this.game.player.speedY >= 0) {
      this.game.player.setState("FALL");
    }
  }
}

export class Fall extends State {
  constructor(game) {
    super("FALL", game);
  }
  enter() {
    this.game.player.inAir = true;
    this.game.player.frameX = 0;
    this.game.player.maxFrameX = 4;
    this.game.player.frameY = 4;
    this.game.player.maxCount = 10;
  }
  handleInput(keys) {
    if (
      keys.includes("ArrowRight") ||
      keys.includes("KeyD") ||
      keys.includes("ArrowLeft") ||
      keys.includes("KeyA")
    ) {
      this.game.player.speedX = 3;
    } else if (this.game.player.speedX > 0) {
      this.game.player.speedX -= 1;
    }
    if (keys.includes("KeyC")) {
      this.game.player.setState("ATTACK");
    }
    if (this.game.player.onGround) {
      this.game.player.setState("IDLE");
    }
  }
}

export class Attack extends State {
  constructor(game) {
    super("ATTACK", game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrameX = 7;
    this.game.player.frameY = 5;
    this.game.player.maxCount = 4;
  }
  handleInput(keys) {
    if (this.game.player.frameX >= this.game.player.maxFrameX - 1) {
      this.game.player.setState("IDLE");
    }
    if (this.game.player.onGround) {
      this.game.player.speedX = 0;
    }
    if (
      keys.includes("ArrowUp") ||
      keys.includes("KeyW") ||
      keys.includes("Space")
    ) {
      if (this.game.player.onGround) {
        this.game.player.setState("JUMP");
      }
    }
  }
}
