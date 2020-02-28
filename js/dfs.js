

async function dfs_generation(grid) {
  let stack = new Stack();
  stack.push(grid[0][0]);

  while (!stack.isEmpty()) {
    let u = stack.top();
    let unvisited = unvisitedNeighbors(u, grid);

    u.visited = true;
    
    if(unvisited.length !== 0) {
      let index = Math.floor(Math.random() * unvisited.length);
      let v = unvisited[index];

      v.addNeighbor(u);
      stack.push(v);
    } else {
      stack.pop();
    }

    mazeHead = stack.top();
    await sleep(delay);
  }

  console.log("Finished Building DFS maze!");
  finishedBuilding = true;
}

function unvisitedNeighbors(u, grid) {
  let unvisited = [];
  let neighbors = [];

  if(grid[u.position.y - 1]) {
    neighbors.push(grid[u.position.y - 1][u.position.x]);
  }

  if(grid[u.position.y + 1]) {
    neighbors.push(grid[u.position.y + 1][u.position.x]);
  }

  if(grid[u.position.y][u.position.x - 1]) {
    neighbors.push(grid[u.position.y][u.position.x - 1]);
  }

  if(grid[u.position.y][u.position.x + 1]) {
    neighbors.push(grid[u.position.y][u.position.x + 1]);
  }

  for(let neighbor of neighbors) {
    if(!neighbor.visited) {
      unvisited.push(neighbor);
    }
  }

  return unvisited;
}