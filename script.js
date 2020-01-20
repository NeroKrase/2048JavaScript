//Cells colors
const color2 = "#FF0000",
  color4 = "#FF8000",
  color8 = "#FFFF00",
  color16 = "#80FF00",
  color32 = "#00FF00",
  color64 = "#00FFFF",
  color128 = "#0080FF",
  color256 = "#0000FF",
  color512 = "#7F00FF",
  color1024 = "#FF007F",
  color2048 = "#FF00FF";

//Canvas elements
const playingField = document.querySelector("#canvas"),
  ctx = playingField.getContext("2d");
frameRate = setInterval(drawField, 100 / 60);

//Const values
const rectSize = 200, //Cell size
  rectRound = 32, //Cell rondness
  step = 205, //Cell distance
  startX = 5, //Cells starting points
  startY = 5;
//Variable

//Cells array
let cellsArray = [];
cellsArray[0] = {
  x: Math.floor(Math.random() * 4) * step + startX,
  y: Math.floor(Math.random() * 4) * step + startY,
  value: getNumber(),
  isMoving: false,
  direction: "",
  getPos: function() {
    return [this.x, this.y];
  },
}
let cell;

document.addEventListener("DOMContentLoaded", () => {
  drawField();
})

document.addEventListener("keydown", (key) => {
  if (cellsArray.every(temp => temp.isMoving === false)) {
    for (cellAr of cellsArray) {
      let posArray = cellAr.getPos();
      let currentPositionX = cellAr.x - startX,
        currentPositionY = cellAr.y - startY;
      switch (key.code) {
        case "ArrowLeft":
          if (!cellsArray.every(temp => temp.x === startX)) {
            if (checkMovementLeft(posArray)) {
              if (currentPositionX % step === 0 && currentPositionX != 0 && currentPositionY % step == 0) {
                cellAr.direction = "left";
                cellAr.isMoving = true;
              }
            }
          }
          break;
        case "ArrowUp":
          if (!cellsArray.every(temp => temp.y === startY)) {
            if (checkMovementUp(posArray)) {
              if (currentPositionY % step === 0 && currentPositionY != 0 && currentPositionX % step == 0) {
                cellAr.direction = "up";
                cellAr.isMoving = true;
              }
            }
          }
          break;
        case "ArrowRight":
          if (!cellsArray.every(temp => temp.x === startX + step * 3)) {
            if (checkMovementRight(posArray)) {
              if (currentPositionX % step === 0 && currentPositionX != step * 3 && currentPositionY % step == 0) {
                cellAr.direction = "right";
                cellAr.isMoving = true;
              }
            }
          }
          break;
        case "ArrowDown":
          if (!cellsArray.every(temp => temp.y === startY + step * 3)) {
            if (checkMovementDown(posArray)) {
              if (currentPositionY % step === 0 && currentPositionY != step * 3 && currentPositionX % step == 0) {
                cellAr.direction = "down";
                cellAr.isMoving = true;
              }
            }
          }
          break;
        default:
          cellAr.direction = "";
          cellAr.isMoving = false;
          break;
      }
    }
  }
})

function checkMovementLeft(posArray) {
  let posX = posArray[0];
  switch (posX) {
    case startX:
      return false;
      break;
    case startX + step:
      posArray[0] -= step;
      for (cell of cellsArray) {
        if (cell.getPos().toString() === posArray.toString()) {
          return false;
        }
      }
      return true;
      break;
    case startX + step * 2:
      posArray[0] -= step;
      for (cell of cellsArray) {
        if (cell.getPos().toString() === posArray.toString()) {
          posArray[0] -= step;
          for (cell of cellsArray) {
            if (cell.getPos().toString() === posArray.toString()) {
              return false;
            }
          }
        }
      }
      return true;
      break;
    case startX + step * 3:
      posArray[0] -= step;
      for (cell of cellsArray) {
        if (cell.getPos().toString() === posArray.toString()) {
          posArray[0] -= step;
          for (cell of cellsArray) {
            if (cell.getPos().toString() === posArray.toString()) {
              posArray[0] -= step;
              for (cell of cellsArray) {
                if (cell.getPos().toString() === posArray.toString()) {
                  return false;
                }
              }
            }
          }
        }
      }
      return true;
      break;
    default:
      return false;
      break;
  }
}

function checkLeftCell(cellInfoArray) {
  let posX = cellInfoArray[0];
  let val = cellInfoArray[2];
  switch (posX) {
    case startX:
      return false;
      break;
    case startX + step:
      cellInfoArray[0] -= step;
      for (cell of cellsArray) {
        if (cell.getPos().toString() === cellInfoArray.toString() && cell.value === val) {
          return true;
        }
      }
      return false;
      break;
    case startX + step * 2:
      cellInfoArray[0] -= step;
      for (cell of cellsArray) {
        if (cell.getPos().toString() === cellInfoArray.toString()) {
          cellInfoArray[0] -= step;
          for (cell of cellsArray) {
            if (cell.getPos().toString() === cellInfoArray.toString() && cell.value === val) {
              return true;
            }
          }
        }
      }
      return false;
      break;
    case startX + step * 3:
      cellInfoArray[0] -= step;
      for (cell of cellsArray) {
        if (cell.getPos().toString() === cellInfoArray.toString()) {
          cellInfoArray[0] -= step;
          for (cell of cellsArray) {
            if (cell.getPos().toString() === cellInfoArray.toString()) {
              cellInfoArray[0] -= step;
              for (cell of cellsArray) {
                if (cell.getPos().toString() === cellInfoArray.toString() && cell.value === val) {
                  return true;
                }
              }
            }
          }
        }
      }
      return false;
      break;
    default:
      return false;
      break;
  }
}

function checkMovementUp(posArray) {
  let posY = posArray[1];
  switch (posY) {
    case startY:
      return false;
      break;
    case startY + step:
      posArray[1] -= step;
      for (cell of cellsArray) {
        if (cell.getPos().toString() === posArray.toString()) {
          return false;
        }
      }
      return true;
      break;
    case startY + step * 2:
      posArray[1] -= step;
      for (cell of cellsArray) {
        if (cell.getPos().toString() === posArray.toString()) {
          posArray[1] -= step;
          for (cell of cellsArray) {
            if (cell.getPos().toString() === posArray.toString()) {
              return false;
            }
          }
        }
      }
      return true;
      break;
    case startY + step * 3:
      posArray[1] -= step;
      for (cell of cellsArray) {
        if (cell.getPos().toString() === posArray.toString()) {
          posArray[1] -= step;
          for (cell of cellsArray) {
            if (cell.getPos().toString() === posArray.toString()) {
              posArray[1] -= step;
              for (cell of cellsArray) {
                if (cell.getPos().toString() === posArray.toString()) {
                  return false;
                }
              }
            }
          }
        }
      }
      return true;
      break;
    default:
      return false;
      break;

  }
}

function checkMovementRight(posArray) {
  let posX = posArray[0];
  switch (posX) {
    case startX + step * 3:
      return false;
      break;
    case startX + step * 2:
      posArray[0] += step;
      for (cell of cellsArray) {
        if (cell.getPos().toString() === posArray.toString()) {
          return false;
        }
      }
      return true;
      break;
    case startX + step:
      posArray[0] += step;
      for (cell of cellsArray) {
        if (cell.getPos().toString() === posArray.toString()) {
          posArray[0] += step;
          for (cell of cellsArray) {
            if (cell.getPos().toString() === posArray.toString()) {
              return false;
            }
          }
        }
      }
      return true;
      break;
    case startX:
      posArray[0] += step;
      for (cell of cellsArray) {
        if (cell.getPos().toString() === posArray.toString()) {
          posArray[0] += step;
          for (cell of cellsArray) {
            if (cell.getPos().toString() === posArray.toString()) {
              posArray[0] += step;
              for (cell of cellsArray) {
                if (cell.getPos().toString() === posArray.toString()) {
                  return false;
                }
              }
            }
          }
        }
      }
      return true;
      break;
    default:
      return false;
      break;

  }
}

function checkMovementDown(posArray) {
  let posY = posArray[1];
  switch (posY) {
    case startY + step * 3:
      return false;
      break;
    case startY + step * 2:
      posArray[1] += step;
      for (cell of cellsArray) {
        if (cell.getPos().toString() === posArray.toString()) {
          return false;
        }
      }
      return true;
      break;
    case startY + step:
      posArray[1] += step;
      for (cell of cellsArray) {
        if (cell.getPos().toString() === posArray.toString()) {
          posArray[1] += step;
          for (cell of cellsArray) {
            if (cell.getPos().toString() === posArray.toString()) {
              return false;
            }
          }
        }
      }
      return true;
      break;
    case startY:
      posArray[1] += step;
      for (cell of cellsArray) {
        if (cell.getPos().toString() === posArray.toString()) {
          posArray[1] += step;
          for (cell of cellsArray) {
            if (cell.getPos().toString() === posArray.toString()) {
              posArray[1] += step;
              for (cell of cellsArray) {
                if (cell.getPos().toString() === posArray.toString()) {
                  return false;
                }
              }
            }
          }
        }
      }
      return true;
      break;
    default:
      return false;
      break;
  }
}

function getNumber() {
  value = Math.random() < 0.1 ? 4 : 2;
  return value;
}

function drawCell(cell) {
  let currentColor = chooseColor(cell.value);
  ctx.fillStyle = "#000";
  ctx.lineWidth = 2;
  ctx.strokeStyle = currentColor;
  ctx.shadowBlur = 0;
  ctx.shadowColor = currentColor;
  roundRect(ctx, cell.x, cell.y, rectSize, rectSize, rectRound, true);
  ctx.fillStyle = currentColor;
  ctx.font = "60px Times New Roman";
  ctx.fillText(cell.value, cell.x + rectSize / 2 - 13, cell.y + rectSize / 2 + 15);
}

function getPosition() {
  let found = false;
  let position = [];
  let x;
  let y;
  while (!found) {
    found = true;
    x = Math.floor(Math.random() * 4) * step + startX;
    y = Math.floor(Math.random() * 4) * step + startX;
    for (cellAr of cellsArray) {
      if (cellAr.x === x && cellAr.y === y) {
        found = false;
        break;
      }
    }
  }
  position.push(x);
  position.push(y);
  return position;
}

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

function drawField() {
  //Drawing variables
  let posX = 5;
  let posY = 5;
  ctx.fillStyle = "#111";
  ctx.strokeStyle = "#111";
  ctx.shadowBlur = 0;
  ctx.shadowColor = "rgba(0, 0, 0, 0)";
  ctx.lineWidth = 1;
  //Drawing cells
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      roundRect(ctx, posX, posY, rectSize, rectSize, rectRound, true);
      posX += step;
    }
    posX = 5;
    posY += step;
  }
  for (cellAr of cellsArray) {
    drawCell(cellAr);
  }

  for (let i = 0; i < cellsArray.length; i++) {
    if (cellsArray[i].isMoving) {
      let cellX = cellsArray[i].x;
      let cellY = cellsArray[i].y;
      let cellValue = cellsArray[i].value;
      let direction = cellsArray[i].direction;
      let isMoving = true;
      let prevX = cellX;
      let prevY = cellY;
      let curPosX = cellX - startX;
      let curPosY = cellY - startY;

      cellsArray.splice(i, 1);

      if (direction === "right" && cellX != step * 3 + startX) {

        if (checkMovementRight([cellX, cellY]) || curPosX % step != 0) {
          cellX += 5;
        } else {
          isMoving = !isMoving;
        }
      }
      if (direction === "left" && cellX != startX) {
        if (checkMovementLeft([cellX, cellY]) || curPosX % step != 0) {
          cellX -= 5;
        } else if (checkLeftCell([cellX, cellY, cellValue]) && curPosX % step === 0) {
          cellX -= step;
          cellValue = cellValue * 2;
          for (let j = 0; j < cellsArray.length; j++) {
            if (cellsArray[j].getPos().toString() === [cellX, cellY].toString()) {
              cellsArray.splice(j, 1);
            }
          }
        } else {
          isMoving = !isMoving;
        }
      }
      if (direction === "up" && cellY != startY) {
        if (checkMovementUp([cellX, cellY]) || curPosY % step != 0) {
          cellY -= 5;
        } else {
          isMoving = !isMoving;
        }
      }
      if (direction === "down" && cellY != step * 3 + startY) {
        if (checkMovementDown([cellX, cellY]) || curPosY % step != 0) {
          cellY += 5;
        } else {
          isMoving = !isMoving;
        }
      }


      let newCell = {
        x: cellX,
        y: cellY,
        value: cellValue,
        isMoving: isMoving,
        direction: direction,
        getPos: function() {
          return [this.x, this.y];
        },
      }

      cellsArray.splice(i, 0, newCell);

      if (prevX === cellX && prevY === cellY) {
        cellsArray[i].isMoving = false;
        if (cellsArray.every(temp => temp.isMoving === false)) {
          let newCellPosition = getPosition();
          cell = {
            x: newCellPosition[0],
            y: newCellPosition[1],
            value: getNumber(),
            isMoving: false,
            direction: "",
            getPos: function() {
              return [this.x, this.y];
            },
          };
          cellsArray.push(cell);
        }
      }
    }
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
