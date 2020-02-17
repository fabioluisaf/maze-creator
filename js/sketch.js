const len = 25;
const fr = 60;
const delay = 1000 / fr; // in milliseconds
const hasDiagonals = false;

let field;
let maze;
let mazeHead;

function setup() {
  createCanvas(700, 700);
  frameRate(fr);

  const amtX = width / len;
  const amtY = height / len;
  let grid = initializeGrid(amtX, amtY, hasDiagonals);

  maze = graphFromNodeset(grid, hasDiagonals);
  field = new Graph(grid, hasDiagonals);

  dfs_generation(field, maze);
}

function draw() {
  background(0);
  maze.show(color(200, 200, 200));
  if (mazeHead) mazeHead.show(color(0, 200, 0));
}

// takes as input a 2 graphs where field represents
// the canvas (each node is neighbor to all its surrounding
// nodes) and maze is where the dfs traversal tree is stored
async function dfs_generation(field, maze) {
  let stack = new Stack();
  stack.enstack(field.nodes[0][0]);

  while (!stack.isEmpty()) {
    u = stack.top();
    u.visited = true;

    let unvisited = u.getUnvisitedNeighbors();

    if (unvisited.length !== 0) {
      let randIndex = Math.floor(random() * unvisited.length);
      let v = unvisited[randIndex];

      stack.enstack(v);

      let mazeU = maze.getNode(u.pos.x, u.pos.y);
      let mazeV = maze.getNode(v.pos.x, v.pos.y);

      mazeU.addNeighbor(mazeV);

      mazeU.visited = true;
      mazeV.visited = true;
    } else {
      stack.destack();
    }

    mazeHead = stack.top();
    await sleep(delay);
  }
}

// creates a grid such that all nodes are neighbors to
// all of its surrounding nodes
function initializeGrid(amtX, amtY, hasDiagonals) {
  let grid = [];

  for (let y = 0; y < amtY; y++) {
    grid[y] = [];

    for (let x = 0; x < amtX; x++) {
      grid[y].push(new Node(createVector(x * len, y * len), len, hasDiagonals));

      // top and left neighbors
      if (grid[y - 1]) {
        grid[y][x].addNeighbor(grid[y - 1][x]);
      }

      if (grid[y][x - 1]) {
        grid[y][x].addNeighbor(grid[y][x - 1]);
      }

      // top-left and top-right neighbors
      if (hasDiagonals && grid[y - 1] && grid[y - 1][x - 1]) {
        grid[y][x].addNeighbor(grid[y - 1][x - 1]);
      }

      if (hasDiagonals && grid[y - 1] && grid[y - 1][x + 1]) {
        grid[y][x].addNeighbor(grid[y - 1][x + 1]);
      }
    }
  }

  return grid;
}

// creates a graph from a nodeset but does not
// preserve any edges
function graphFromNodeset(grid, hasDiagonals) {
  let maze = new Graph([], hasDiagonals);

  for (let y = 0; y < grid.length; y++) {
    maze.nodes[y] = [];

    for (let x = 0; x < grid[y].length; x++) {
      maze.nodes[y].push(new Node(grid[y][x].pos, len, hasDiagonals));
    }
  }

  return maze;
}

async function sleep(ms) {
  if (delay === 0) return;
  return new Promise((resolve) => setTimeout(resolve, ms));
}
