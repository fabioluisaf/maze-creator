const size = 25;
const fr = 60;
const delay = 1000 / fr; // in milliseconds

let grid;
let mazeHead;

function setup() {
  createCanvas(700, 700);
  frameRate(fr);

  const amtX = width / size;
  const amtY = height / size;

  grid = createGrid(amtX, amtY);

  dfs_generation(grid, mazeHead);
}

function draw() {
  background(0);
  
  for(let line of grid) {
    for(let node of line) {
      if(node.visited) {
        node.show(color(200, 200, 200));
        node.connectToParent(color(200, 200, 200));
      }
    }
  }

  if (mazeHead) mazeHead.show(color(128,0,128));
}

function createGrid(amtX, amtY) {
  let grid = [];

  for (let y = 0; y < amtY; y++) {
    grid[y] = [];

    for (let x = 0; x < amtX; x++) {
      let position = createVector(x, y);
      grid[y][x] = new Node(position, size);
    }
  }

  return grid;
}

async function sleep(ms) {
  if (delay === 0) return;
  return new Promise((resolve) => setTimeout(resolve, ms));
}
