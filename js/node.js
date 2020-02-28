class Node {
  constructor(position, size) {
    this.position = position;
    this.size = size;
    this.visited = false;
    this.neighbors = [];
    this.parent = null;
    this.predecessor = null;
    this.gcost = Infinity;
    this.hcost = Infinity;
    this.visitedByPathFinder = false;
  }

  show(color) {
    noStroke();
    fill(color);

    square((this.position.x * this.size) + 1, (this.position.y * this.size) + 1, this.size - 2);
  }

  showNeighbors(color) {
    for(let neighbor of this.neighbors) {
      noStroke();
      fill(color);

      rectMode(CORNERS);
      rect((this.position.x * this.size) + 1, 
           (this.position.y * this.size) + 1, 
           (neighbor.position.x * neighbor.size) + neighbor.size - 1, 
           (neighbor.position.y * neighbor.size) + neighbor.size - 1);
      rectMode(CORNER);
    }
  }

  connectTo(other, color) {
    if(other) {
      noStroke();
      fill(color);

      rectMode(CORNERS);
      rect((this.position.x * this.size) + 1, 
           (this.position.y * this.size) + 1, 
           (other.position.x * other.size) + other.size - 1, 
           (other.position.y * other.size) + other.size - 1);
      rectMode(CORNER);
    }
  }

  addNeighbor(other) {
    if(!this.neighbors.includes(other)) {
      this.neighbors.push(other);
    }

    if(!other.neighbors.includes(this)) {
      other.neighbors.push(this);
    }
  }

  equals(other) {
    return this.position.x === other.position.x && this.position.y === other.position.y;
  }

  fcost() {
    return this.gcost + this.hcost;
  }
}
