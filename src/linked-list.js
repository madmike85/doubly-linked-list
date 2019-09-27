const Node = require('./node');

class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
    this.length = 0;
  }

  append(data) {
    let node = new Node(data);

    if (!this._head) {
      this._head = node;
      this._tail = node;
    } else {
      node.prev = this._tail;
      this._tail.next = node;
      this._tail = node;
    }
    this.length++;

    return this;
  }

  head() {
    return this._head ? this._head.data : null;
  }

  tail() {
    return this._tail ? this._tail.data : null;
  }

  at(index) {
    if (index > -1) {
      let current = this._head;
      let i = 0;

      while (current && i < index) {
        current = current.next;
        i++;
      }

      return current ? current.data : undefined;
    } else {
      return undefined;
    }
  }

  insertAt(index, data) {
    let current = this._head;
    let node = new Node(data);
    let i = 0;

    if (index === 0) {
      if (!this._tail) {
        this.append(data);
      } else {
        node.next = this._head;
        this._head.prev = node;
        this._head = node;
        this.length++;
      }

      return this;
    }

    while (i < index) {
      current = current.next;
      i++;
    }

    current.prev.next = node;
    node.prev = current.prev;
    current.prev = node;
    node.next = current;

    this.length++;
    return this;
  }

  isEmpty() {
    return this.length === 0;
  }

  clear() {
    this._head = null;
    this._tail = null;
    this.length = 0;
    return this;
  }

  deleteAt(index) {
    if (index === 0) {
      this._head = this._head.next;

      if (!this._head) this._tail = null;
      else this._head.prev = null;

      return this;
    }

    let current = this._head;
    let i = 0;

    while (current && i < index) {
      current = current.next;
      i++;
    }

    if (current) {
      current.prev.next = current.next;

      if (this._tail === current) this._tail = current.prev;
      else current.next.prev = current.prev;

      return this;
    }
  }

  reverse() {
    if (!this._head) {
      return null;
    }

    let current = this._head;
    this._tail = current;

    while (current) {
      let prev = current.prev;
      current.prev = current.next;
      current.next = prev;

      if (current.prev) {
        current = current.prev;
      } else {
        this._head = current;
        break;
      }
    }

    return this;
  }

  indexOf(data) {
    let current = this._head;
    let index = 0;

    while (current) {
      if (current.data === data) return index;

      current = current.next;
      index++;
    }

    return -1;
  }
}

module.exports = LinkedList;
