

async function kruskal_generation(grid) {
  let edges = getEdges(grid);
  let sets = [];

  for(let i = 0; i < grid.length; i++) {
    sets[i] = [];

    for(let j = 0; j < grid[i].length; j++) {
      sets[i][j] = [];
  
      sets[i][j].push(grid[i][j]);
      grid[i][j].parent = grid[i][j];
    }
  }

  while(edges.length > 0) {
    let index = Math.floor(Math.random() * edges.length);
    let edge = edges[index];

    if(!edge[0].parent.equals(edge[1].parent)) {
      union(edge[0], edge[1], sets);

      edge[0].addNeighbor(edge[1]);
      edge[0].visited = true;
      edge[1].visited = true;
    }

    edges.splice(index, 1);
    await sleep(delay);
  }

  console.log("Finished Building kruskall maze!");
  finishedBuilding = true;
}

function getEdges(grid) {
  let edges = [];

  for(let y = 0; y < grid.length; y++) {
    for(let x = 0; x < grid[y].length; x++) {
      if(grid[y - 1]) {
        edges.push([grid[y - 1][x], grid[y][x]]);
      }

      if(grid[y][x - 1]) {
        edges.push([grid[y][x - 1], grid[y][x]]);
      }
    }
  }

  return edges;
}

function union(node1, node2, sets) {
  let parent1 = {
    x: node1.parent.position.x,
    y: node1.parent.position.y
  }

  let parent2 = {
    x: node2.parent.position.x,
    y: node2.parent.position.y
  }

  if(sets[parent1.y][parent1.x].length > sets[parent2.y][parent2.x].length) {
    for(let node of sets[parent2.y][parent2.x]) {
      node.parent = node1.parent;
    }

    sets[parent1.y][parent1.x] = sets[parent1.y][parent1.x].concat(sets[parent2.y][parent2.x]);
    sets[parent2.y][parent2.x] = [];
  } else {
    for(let node of sets[parent1.y][parent1.x]) {
      node.parent = node2.parent;
    }

    sets[parent2.y][parent2.x] = sets[parent2.y][parent2.x].concat(sets[parent1.y][parent1.x]);
    sets[parent1.y][parent1.x] = [];
  }
}