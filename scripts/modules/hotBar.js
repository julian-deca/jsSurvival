import * as images from "./images.js";
import InventorySlot from "./inventorySlot.js";
import Item from "./item.js";
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

      if (i == 0) {
        const item = new Item(
          this.game,
          slotWidth,
          slotWidth,
          images.woodenPicaxeSprite,
          true,
          10,
          "PICKAXE"
        );
        inventorySlot.addItem(item);
        inventorySlot.selected = true;
      }
      if (i == 1) {
        const item = new Item(
          this.game,
          slotWidth,
          slotWidth,
          images.woodenAxeSprite,
          true,
          10,
          "AXE"
        );
        inventorySlot.addItem(item);
        inventorySlot.selected = true;
      }
      if (i == 2) {
        const item = new Item(
          this.game,
          slotWidth,
          slotWidth,
          images.woodenSwordSprite,
          true,
          15,
          "SWORD"
        );
        inventorySlot.addItem(item);
        inventorySlot.selected = true;
      }

      this.slots.push(inventorySlot);
    }
  }
  update(wheel) {
    if (this.wheel != wheel)
      this.slots.map((slot) => {
        if (slot.index == wheel) {
          if (slot.item && slot.item.isLayer) {
            slot.game.player.addHandItem(slot.item);
          } else {
            this.game.player.removeHandItem();
          }
          slot.selected = true;
        } else {
          slot.selected = false;
        }
      });
    this.wheel = wheel;
    this.slots.forEach((slot) => {
      slot.update();
    });
  }
}

export default HotBar;
