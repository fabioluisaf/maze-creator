const size = 10;
const fr = 60;
const delay = 0 / fr; // in milliseconds

let grid;
let mazeHead;
let head;
let finishedBuilding;
let finishedSolving;

function setup() {
  createCanvas(900, 900);
  frameRate(fr);

  const amtX = width / size;
  const amtY = height / size;

  grid = createGrid(amtX, amtY);
  head = null;
  finishedBuilding = false;
  finishedSolving = false;
}

function draw() {
  background(0);
  
  for(let line of grid) {
    for(let node of line) {
      if(node.visited) {
        node.show(color(200, 200, 200));
        node.showNeighbors(color(200, 200, 200));
      }
    }
  }

  for(let line of grid) {
    for(let node of line) {
      if(node.visitedByPathFinder) {
        node.show(color(255, 100, 100, 100));
      } else if(node.gcost !== Infinity && node.hcost !== Infinity) {
        node.show(color(100, 255, 100, 100));
      }
    }
  }

  

  if(finishedSolving) {
    tracePath(grid[grid.length - 1][grid[0].length - 1], color(0, 200, 200));
  } else if(head) {
    tracePath(head, color(0, 200, 200));
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

function tracePath(node, color) {
  let walker = node;
    
  while(walker !== null) {
    walker.show(color);
    walker.connectTo(walker.predecessor, color);

    walker = walker.predecessor;
  }
}

function mousePressed() {
  // get the (x, y) position of the click
  let x = Math.floor(mouseX / size);
  let y = Math.floor(mouseY / size);

  // if it is outside the canvas, do nothing and return
  if (!grid[y] || !grid[y][x]) return;

  console.log(grid[y][x]);
}

async function sleep(ms) {
  if (delay === 0) return;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function reset() {
  const amtX = width / size;
  const amtY = height / size;

  grid = createGrid(amtX, amtY);

  finishedBuilding = false;
  finishedSolving = false;
  mazeHead = null;
  head = null;

  return grid;
}

function resetPathFinder() {
  finishedSolving = false;
  head = null;

  for(let line of grid) {
    for(let node of line) {
      node.gcost = Infinity;
      node.hcost = Infinity;
      node.visitedByPathFinder = false;
      node.predecessor = null;
    }
  }
}

async function solve() {
  if(finishedBuilding) {
    aStar(grid[0][0], grid[grid.length - 1][grid[0].length - 1], new Heap(), delay)
    .then((result) => {
      console.log(result);

      let visited = 0;
      let total = 0;

      for(let line of grid) {
        for(let node of line) {
          total++;

          if(node.visitedByPathFinder) {
            visited++;
          }
        }
      }

      const difficulty = (visited/total) * 10;

      console.log("I checked through " + visited + " nodes to solve this maze.\nThe difficulty rating is " + difficulty + " out of 10.");
    });
  } else {
    console.log("Still building maze!");
  }
}

async function dfs() {
  await dfs_generation(grid);
}

async function kruskal() {
  await kruskal_generation(grid);
}
