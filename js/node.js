class Node {
  constructor(pos, len, hasDiags) {
    this.pos = pos;
    this.len = len;
    this.diags = hasDiags
    this.visited = false;
    this.neighbors = [];
  }

  show(color) {
    noStroke();
    fill(color);

    if (this.diags) {
      // 3/5 was an arbitrary number chosen to make the nodes
      // not as thicc
      const diameter = (3 * this.len) / 5;

      ellipse(this.pos.x + diameter / 2, this.pos.y + diameter / 2, diameter, diameter);
    } else {
      rect(this.pos.x + 1, this.pos.y + 1, this.len - 2, this.len - 2);
    }
  }

  connectToNeighbors(color) {
    for (let n of this.neighbors) {
      if (this.diags) {
        // 3/5 was an arbitrary number chosen to make the
        // lines between two nodes a bit thinner
        const radius = ((3 * this.len) / 5) / 2;

        stroke(color);
        strokeWeight(radius);
        line(this.pos.x + radius, this.pos.y + radius, n.pos.x + radius, n.pos.y + radius);
      } else {
        rectMode(CORNERS);
        rect(this.pos.x + 1, this.pos.y + 1, n.pos.x + n.len - 1, n.pos.y + n.len - 1);
        rectMode(CORNER);
      }
    }
  }

  equals(other) {
    return this.pos.x === other.pos.x && this.pos.y === other.pos.y;
  }

  addNeighbor(other) {
    this.neighbors.push(other);
    other.neighbors.push(this);
  }

  getUnvisitedNeighbors() {
    let unvisited = [];

    for (let n of this.neighbors) {
      if (!n.visited) {
        unvisited.push(n);
      }
    }

    return unvisited;
  }
}
