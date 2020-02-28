class Node {
  constructor(position, size) {
    this.position = position;
    this.size = size;
    this.visited = false;
    this.parent = null;
  }

  show(color) {
    noStroke();
    fill(color);

    square((this.position.x * this.size) + 1, (this.position.y * this.size) + 1, this.size - 2);
  }

  connectToParent(color) {
    if(this.parent) {
      noStroke();
      fill(color);

      rectMode(CORNERS);
      rect((this.position.x * this.size) + 1, 
           (this.position.y * this.size) + 1, 
           (this.parent.position.x * this.size) + this.size - 1, 
           (this.parent.position.y * this.size) + this.size - 1);
      rectMode(CORNER);
    }
  }

  setParent(other) {
    if(other) {
      this.parent = other;
    }
  }
}
