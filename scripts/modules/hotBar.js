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
    this.wheel = 0;
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
        images.selectedInventoryFrame,
        i
      );
      this.slots.push(inventorySlot);
    }
  }
  update(wheel) {
    if (this.wheel != wheel)
      this.slots.map((slot) => {
        if (slot.index == wheel) {
          slot.selected = true;
        } else {
          slot.selected = false;
        }
      });
    this.wheel = wheel;
  }
}

export default HotBar;
