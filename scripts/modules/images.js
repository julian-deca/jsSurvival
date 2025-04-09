const playerSprite = document.getElementById("playerSprite");
const playerHair = document.getElementById("playerHair");
const playerPants = document.getElementById("playerPants");

const woodenPicaxe = document.getElementById("woodenPicaxe");
const woodenAxe = document.getElementById("woodenAxe");
const woodenSword = document.getElementById("woodenSword");

const dirtImage = document.getElementById("dirtImage");
const grassImage = document.getElementById("grassImage");
const carpinchoSprite = document.getElementById("carpinchoSprite");

const playerSkin = {
  sprite: playerSprite,
  width: 80,
  height: 64,
  hair: playerHair,
  pants: playerPants,
};
const carpinchoSkin = { sprite: carpinchoSprite, width: 64, height: 64 };

export { carpinchoSkin, dirtImage, grassImage, playerSkin };
