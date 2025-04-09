import * as images from "./images.js";
import InventorySlot from "./inventorySlot.js";
class HotBar {
  constructor(game, x, y, width, space) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.game = game;
    this.slots = [];
    this.space = space;
    this.height = this.width / this.space;
    this.createSlots();
  }
  draw(context) {
    this.slots.forEach((slot) => slot.draw(context));
  }
  createSlots() {
    for (let i = 0; i < this.space; i++) {
      const slotWidth = this.width / this.space;
      const inventorySlot = new InventorySlot(
        this.game,
        this.x + slotWidth * i,
        this.y,
        slotWidth,
        this.height,
        "black",
        images.inventoryFrame,
        images.selectedInventoryFrame
      );
      this.slots.push(inventorySlot);
    }
  }
  update(keys) {}
}

export default HotBar;
