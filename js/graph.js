class Graph {
  constructor(nodeSet, hasDiags) {
    this.nodes = nodeSet;
    this.diags = hasDiags;
  }

  show(col) {
    for (let y = 0; y < this.nodes.length; y++) {
      for (let x = 0; x < this.nodes[y].length; x++) {
        if (this.nodes[y][x].visited) {
          this.nodes[y][x].show(col);
          this.nodes[y][x].connectToNeighbors(col);
        }
      }
    }
  }

  getNode(x, y) {
    for (let line of this.nodes) {
      for (let node of line) {
        if (node.pos.x === x && node.pos.y === y) {
          return node;
        }
      }
    }

    return null;
  }
}
