import Layer from "./playerLayer.js";
class HandItemLayer extends Layer {
  constructor(player, sprite, damage, type) {
    super(player, sprite, true);
    this.damage = damage;
    this.type = type;
  }
}

export default HandItemLayer;
