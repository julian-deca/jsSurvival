import Game from "/scripts/modules/game.js";
import readCsv from "./modules/files.js";
import MouseMovement from "./modules/mouseMovement.js";
const title = document.getElementById("title");
const canvas = document.getElementById("canvas");
//const scoreRight = document.getElementById("score-right");
//const scoreLeft = document.getElementById("score-left");
const context = canvas.getContext("2d");
const WIDTH = 800;
const HEIGHT = 400;
canvas.height = HEIGHT;
canvas.width = WIDTH;
title.innerText = "";

const keys = [];

document.addEventListener("keydown", (e) => {
  if (!keys.includes(e.code)) keys.push(e.code);
});
document.addEventListener("keyup", (e) => {
  keys.splice(keys.indexOf(e.code), 1);
});

readCsv("assets/grids/grid.csv").then((grid) => {
  const game = new Game(WIDTH, HEIGHT, grid);
  const mouse = new MouseMovement(0, 0);
  function draw() {
    mouse.update();
    // console.log(mouse.x);
    context.clearRect(0, 0, WIDTH, HEIGHT);
    game.draw(context);
    game.update(keys);

    window.requestAnimationFrame(draw);
  }

  draw();
});
