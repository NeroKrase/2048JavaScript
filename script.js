let color2 = "#FF0000";
let color4 = "#FF8000";
let color8 = "#FFFF00";
let color16 = "#80FF00";
let color32 = "#00FF00";
let color64 = "#00FFFF";
let color128 = "#0080FF";
let color256 = "#0000FF";
let color512 = "#7F00FF";
let color1024 = "#FF007F";
let color2048 = "#FF00FF";

class Cell {
  constructor(posX, posY) {
    this._posX = posX;
    this._posY = posY;
    this._isEmpty = true;
    this._rectSize = 200;
    this._rectRound = 32;
  }
  spawn(value) {
    let playingField = document.querySelector("#canvas");
    let pen = playingField.getContext("2d");
    let currentColor = chooseColor(value);
    pen.fillStyle = "#000";
    pen.lineWidth = 2;
    pen.strokeStyle = currentColor;
    pen.shadowBlur = 10;
    pen.shadowColor = currentColor;
    roundRect(pen, this._posX, this._posY, this._rectSize, this._rectSize, this._rectRound, true);
    pen.fillStyle = currentColor;
    pen.font = "60px Times New Roman";
    pen.fillText(value, this._posX + this._rectSize/2 - 13, this._posY + this._rectSize/2 + 15);
  }
}

let cellsArray = [];
drawField();
spawnCell();

function chooseColor(value) {
  switch (value) {
    case 2:
      return color2;
      break;
    case 4:
      return color4;
      break;
    case 8:
      return color8;
      break;
    case 16:
      return color16;
      break;
    case 32:
      return color32;
      break;
    case 64:
      return color64;
      break;
    case 128:
      return color128;
      break;
    case 256:
      return color256;
      break;
    case 512:
      return color512;
      break;
    case 1024:
      return color1024;
      break;
    case 2048:
      return color2048;
      break;
    default:
      return "#fff";
      break;
  }
}

function spawnCell() {
  value = Math.random() < 0.1 ? 4 : 2;
  console.log(value);
  position = Math.floor(Math.random() * 16);
  cellsArray[position].spawn(value);
  console.log(position);
}

function drawField() {
  //Drawing variables
  let playingField = document.querySelector("#canvas");
  let pen = playingField.getContext("2d");
  let rectSize = 200;
  let posX = 5;
  let posY = 5;
  let rectRound = 32;
  let cell;
  pen.fillStyle = "#111";
  pen.strokeStyle = "#111";
  //Drawing cells
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      roundRect(pen, posX, posY, rectSize, rectSize, rectRound, true);
      cell = new Cell(posX, posY);
      cellsArray.push(cell);
      posX += 205;
    }
    posX = 5;
    posY += 205;
  }
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {
      tl: radius,
      tr: radius,
      br: radius,
      bl: radius
    };
  } else {
    var defaultRadius = {
      tl: 0,
      tr: 0,
      br: 0,
      bl: 0
    };
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}
