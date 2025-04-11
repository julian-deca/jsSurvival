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

let wheel = 0;
let pos = { x: 0, y: 0, isDown: false };

document.addEventListener("keydown", (e) => {
  if (!keys.includes(e.code)) keys.push(e.code);
});
document.addEventListener("keyup", (e) => {
  keys.splice(keys.indexOf(e.code), 1);
});
document.addEventListener("wheel", (e) => {
  if (e.wheelDeltaY < 0) {
    wheel -= 1;
    if (wheel < 0) {
      wheel = 8;
    }
  } else {
    wheel += 1;
    if (wheel > 8) wheel = 0;
  }
});
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  pos.x = x;
  pos.y = y;
});
canvas.addEventListener("mousedown", (e) => {
  pos.isDown = true;
});
canvas.addEventListener("mouseup", (e) => {
  pos.isDown = false;
});

readCsv("assets/grids/grid.csv").then((grid) => {
  const game = new Game(WIDTH, HEIGHT, grid);
  const mouse = new MouseMovement(0, 0);
  function draw() {
    // mouse.update();
    // console.log(mouse.x);
    context.clearRect(0, 0, WIDTH, HEIGHT);
    game.draw(context);
    game.update(keys, wheel, pos);

    window.requestAnimationFrame(draw);
  }

  draw();
});
