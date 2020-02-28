class Stack {
  constructor() {
    this.dataset = [];
  }

  push(data) {
    this.dataset.push(data);
  }

  pop() {
    return this.dataset.pop();
  }

  top() {
    return this.dataset[this.dataset.length - 1];
  }

  contains(element) {
    return this.dataset.includes(element);
  }

  isEmpty() {
    return this.dataset.length === 0;
  }
}
