const playerSprite = document.getElementById("playerSprite");
const playerHair = document.getElementById("playerHair");
const playerPants = document.getElementById("playerPants");

const woodenPicaxe = document.getElementById("woodenPicaxe");
const woodenAxe = document.getElementById("woodenAxe");
const woodenSword = document.getElementById("woodenSword");

const dirtImage = document.getElementById("dirtImage");
const stoneImage = document.getElementById("stoneImage");

const inventoryFrame = document.getElementById("inventoryFrame");
const selectedInventoryFrame = document.getElementById(
  "selectedInventoryFrame"
);

const grassImage = document.getElementById("grassImage");
const carpinchoSprite = document.getElementById("carpinchoSprite");

const crackingImage = document.getElementById("crackingImage");

const playerSkin = {
  sprite: playerSprite,
  width: 80,
  height: 64,
  hair: playerHair,
  pants: playerPants,
};
const carpinchoSkin = { sprite: carpinchoSprite, width: 64, height: 64 };

const woodenPicaxeSprite = { sprite: woodenPicaxe, width: 80, height: 64 };
const woodenAxeSprite = { sprite: woodenAxe, width: 80, height: 64 };
const woodenSwordSprite = { sprite: woodenSword, width: 80, height: 64 };
const crackingSprite = { sprite: crackingImage, width: 307, height: 1024 };

export {
  carpinchoSkin,
  dirtImage,
  grassImage,
  playerSkin,
  woodenAxe,
  woodenPicaxeSprite,
  woodenSword,
  inventoryFrame,
  selectedInventoryFrame,
  stoneImage,
  crackingSprite,
  woodenAxeSprite,
  woodenSwordSprite,
};
