class State {
  constructor(state, game, carpincho) {
    this.game = game;
    this.state = state;
    this.carpincho = carpincho;
  }
}

export class Walk extends State {
  constructor(game, carpincho) {
    super("WALK", game, carpincho);
  }
  enter() {
    this.carpincho.speedX = 1;
    this.carpincho.frameX = 0;
    this.carpincho.maxFrameX = 7;
    this.carpincho.frameY = 8;
    this.carpincho.maxCount = 6;
  }
  handleInput(keys) {
    if (this.carpincho.frameX >= this.carpincho.maxFrameX - 1) {
      const rand = Math.random();
      if (rand > 0.99) {
        this.carpincho.setState("IDLE");
      } else if (rand >= 0.98) {
        this.carpincho.setState("SIT");
      } else if (rand >= 0.97) {
        this.carpincho.setState("LEANDOWN");
      }
    }
  }
}

export class Idle extends State {
  constructor(game, carpincho) {
    super("IDLE", game, carpincho);
  }
  enter() {
    this.carpincho.speedX = 0;
    this.carpincho.frameX = 0;
    this.carpincho.maxFrameX = 7;
    this.carpincho.frameY = 1;
    this.carpincho.maxCount = 6;
  }
  handleInput(keys) {
    if (this.carpincho.frameX >= this.carpincho.maxFrameX - 1) {
      const rand = Math.random();
      if (rand > 0.99) {
        this.carpincho.setState("WALK");
      } else if (rand > 0.98) {
        this.carpincho.setState("SIT");
      } else if (rand >= 0.97) {
        this.carpincho.setState("LEANDOWN");
      } else if (rand >= 0.96) {
        this.carpincho.facingRight = !this.carpincho.facingRight;
      }
    }
  }
}

export class Sit extends State {
  constructor(game, carpincho) {
    super("SIT", game, carpincho);
  }
  enter() {
    this.carpincho.speedX = 0;
    this.carpincho.frameX = 0;
    this.carpincho.maxFrameX = 3;
    this.carpincho.frameY = 2;
    this.carpincho.maxCount = 6;
  }
  handleInput(keys) {
    if (this.carpincho.frameX >= this.carpincho.maxFrameX - 1) {
      this.carpincho.setState("SITIDLE");
    }
  }
}

export class SitIdle extends State {
  constructor(game, carpincho) {
    super("SITIDLE", game, carpincho);
  }
  enter() {
    this.carpincho.speedX = 0;
    this.carpincho.frameX = 0;
    this.carpincho.maxFrameX = 7;
    this.carpincho.frameY = 3;
    this.carpincho.maxCount = 6;
  }
  handleInput(keys) {
    if (this.carpincho.frameX >= this.carpincho.maxFrameX - 1) {
      const rand = Math.random();
      if (rand > 0.99) {
        this.carpincho.setState("STAND");
      }
    }
  }
}

export class Stand extends State {
  constructor(game, carpincho) {
    super("STAND", game, carpincho);
  }
  enter() {
    this.carpincho.speedX = 0;
    this.carpincho.frameX = 0;
    this.carpincho.maxFrameX = 3;
    this.carpincho.frameY = 4;
    this.carpincho.maxCount = 6;
  }
  handleInput(keys) {
    if (this.carpincho.frameX >= this.carpincho.maxFrameX - 1) {
      this.carpincho.setState("IDLE");
    }
  }
}

export class LeanDown extends State {
  constructor(game, carpincho) {
    super("LEANDOWN", game, carpincho);
  }
  enter() {
    this.carpincho.speedX = 0;
    this.carpincho.frameX = 0;
    this.carpincho.maxFrameX = 4;
    this.carpincho.frameY = 5;
    this.carpincho.maxCount = 6;
  }
  handleInput(keys) {
    if (this.carpincho.frameX >= this.carpincho.maxFrameX - 1) {
      this.carpincho.setState("MUNCH");
    }
  }
}
export class Munch extends State {
  constructor(game, carpincho) {
    super("MUNCH", game, carpincho);
  }
  enter() {
    this.carpincho.speedX = 0;
    this.carpincho.frameX = 0;
    this.carpincho.maxFrameX = 7;
    this.carpincho.frameY = 6;
    this.carpincho.maxCount = 6;
  }
  handleInput(keys) {
    if (this.carpincho.frameX >= this.carpincho.maxFrameX - 1) {
      const rand = Math.random();
      if (rand > 0.99) {
        this.carpincho.setState("LEANUP");
      }
    }
  }
}

export class LeanUp extends State {
  constructor(game, carpincho) {
    super("LEANUP", game, carpincho);
  }
  enter() {
    this.carpincho.speedX = 0;
    this.carpincho.frameX = 0;
    this.carpincho.maxFrameX = 4;
    this.carpincho.frameY = 7;
    this.carpincho.maxCount = 6;
  }
  handleInput(keys) {
    if (this.carpincho.frameX >= this.carpincho.maxFrameX - 1) {
      this.carpincho.setState("IDLE");
    }
  }
}
