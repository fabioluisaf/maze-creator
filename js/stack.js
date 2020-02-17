class Stack {
  constructor() {
    this.dataset = [];
  }

  enstack(data) {
    this.dataset.push(data);
  }

  destack() {
    return this.dataset.pop();
  }

  top() {
    return this.dataset[this.dataset.length - 1];
  }

  isEmpty() {
    return this.dataset.length === 0;
  }
}
