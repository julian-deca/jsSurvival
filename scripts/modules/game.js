import Player from "./player.js";
import Tile from "./tile.js";
import * as images from "./images.js";
import Carpincho from "./carpincho.js";

class Game {
  constructor(width, height, grid) {
    this.width = width;
    this.height = height;
    this.pause = true;
    this.floor = this.height - 60;
    this.gravity = 0.4;
    this.grid = grid;
    this.screenScrollX = 0;
    this.screenScrollY = 0;
    this.screenThresholdX = 200;
    this.screenThresholdY = 200;

    this.player = new Player(
      this,
      this.width / 2 - 10,
      (this.height / this.grid[0].length) * 25,
      80,
      64,
      images.playerSkin.sprite,
      10,
      images.playerSkin.width,
      images.playerSkin.height,
      [images.playerSkin.hair, images.playerSkin.pants],
      5
    );
    this.carpincho = new Carpincho(
      this,
      100,
      100,
      64,
      64,
      images.carpinchoSkin.sprite,
      10,
      images.carpinchoSkin.width,
      images.carpinchoSkin.height
    );
    this.tiles = [];
    this.mobs = [this.carpincho];
    this.carpinchos = [this.carpincho];
    this.devGrid = [];
    this.devMode = false;
    this.mapGrid();
  }
  draw(context) {
    this.mobs.forEach((object) => object.draw(context));
    this.tiles.forEach((tile) => tile.draw(context));
    this.player.draw(context);
    if (this.devMode) {
      this.tiles.forEach((tile) => tile.drawHitBox(context));
      this.mobs.forEach((object) => object.drawHitBox(context));
      this.player.drawHitBox(context);
      this.showDevGrid(context);
    }
  }
  update(keys, wheel, pos) {
    if (!this.pause) {
      this.mobs.forEach((object) => object.update(keys));
      this.player.update(keys, wheel, pos);
      this.tiles.forEach((tile) => tile.update(keys, pos));
    }
    if (keys.includes("KeyP")) {
      this.pause = this.pause == true ? false : true;
      keys.splice(keys.indexOf("KeyP"), 1);
    }
    if (keys.includes("KeyO")) {
      this.devMode = this.devMode == true ? false : true;
      keys.splice(keys.indexOf("KeyO"), 1);
    }
  }
  showDevGrid(context) {
    this.devGrid.forEach((devTile) => {
      context.strokeStyle = "red";
      context.lineWidth = "0.1";
      context.strokeRect(...devTile);
    });
  }
  checkCollision(rectOne, rectTwo) {
    if (
      rectOne.x + rectOne.width >= rectTwo.x &&
      rectOne.x <= rectTwo.x + rectTwo.width
    ) {
      if (
        rectOne.y + rectOne.height >= rectTwo.y &&
        rectOne.y <= rectTwo.y + rectTwo.height
      ) {
        return true;
      }
    }
    return false;
  }

  checkCollisionPoint(rect, point) {
    if (rect.x + rect.width >= point.x && rect.x <= point.x) {
      if (rect.y + rect.height >= point.y && rect.y <= point.y) {
        return true;
      }
    }
    return false;
  }

  mapGrid() {
    const size = 28;
    this.grid.forEach((row, i) => {
      row.forEach((tile, j) => {
        this.devGrid.push([j * size, i * size, size, size]);
        switch (tile) {
          case "00":
            break;
          case "01":
            this.tiles.push(
              new Tile(
                this,
                j * size,
                i * size,
                size,
                size,
                "black",
                images.grassImage,
                100,
                images.crackingSprite
              )
            );
            break;
          case "02":
            this.tiles.push(
              new Tile(
                this,
                j * size,
                i * size,
                size,
                size,
                "black",
                images.dirtImage,
                100,
                images.crackingSprite
              )
            );
            break;
          case "03":
            this.tiles.push(
              new Tile(
                this,
                j * size,
                i * size,
                size,
                size,
                "black",
                images.stoneImage,
                500,
                images.crackingSprite
              )
            );
            break;
        }
      });
    });
    this.pause = false;
  }
}

export default Game;
