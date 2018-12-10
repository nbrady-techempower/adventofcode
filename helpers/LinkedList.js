/**
 * LinkedList data structure compromised of contiguous {Node}s.
 *
 * For now, we won't exidxe the {Node} class.
 *
 * This is a WIP for help with adventofcode challenges.
 *
 * // TODO: WARNING
 * This started out as a normal class but I hacked a lot of
 * things in depending on the challenge. Some of these methods
 * will break other methods. I'll work on this eventually, but
 * don't use!!!!
 *
 */

const JSBI = require('jsbi.mjs');

class Node {

  constructor(value, opts = {}) {
    this.value = value;
    this.next = null;
  }

}

class LinkedList {

  constructor(value, opts = {}) {
    if (value !== undefined) {
      const node = new Node(value);
      this.head = node;
      this.tail = node;
      this.length = 1;
    } else {
      this.length = 0;
    }
    this.tempHash = {};
  }

  getNodeAt(idx) {
    let node = this.head;
    let i = 0;
    for (let key in this.tempHash) {
      if (idx >= +key) {
        i = +key;
        node = this.tempHash[key];
      } else {
        break;
      }
    }

    for (; i < idx; i++) {
      if (!node) return;
      if (i && i % 25000 === 0) {
        this.tempHash[i] = node;
      }
      node = node.next;
    }
    return node;
  }

  /**
   * Returns a LinkedList created from the values in {arr}
   *
   * @param arr
   */
  static fromArray(arr) {
    const list = new LinkedList();
    arr.forEach((value) => list.push(value));
    return list;
  }

  /**
   * Returns an array created from the values in each Node
   * of a LinkedList. The LinkedList remains intact.
   *
   * @param list
   */
  static toArray(list) {
    return list.reduce((acc, value) => acc.push(value) || acc, []);
  }

  /**
   * Removes all Nodes in this list, replacing with a new LinkedList
   * with an optional {value}
   *
   * @param value
   */
  clear(value) {
    delete this.head;
    delete this.tail;
    this.length = 0;
  }

  /**
   * Returns a copy of this LinkedList
   */
  clone() {

  }

  /**
   * Appends a copy of {list} to this list
   * @param list
   */
  concat(list) {

  }

  /**
   * Returns {true} if each {Node.value} passed the
   * callback predicate.
   *
   * @param cb - a callback function that will be passed 2 params:
   *   1) the value of the current node
   *   2) the index of the current node
   */
  every(cb) {
    let curr = this.head;
    let idx = 0;
    while (curr) {
      if (!cb(curr.value, idx)) return false;
      curr = curr.next;
      idx++;
    }
    return true;
  }

  /**
   * Returns a new LinkedList where each {Node.value} passed the
   * callback predicate.
   *
   * @param cb - a callback function that will be passed 2 params:
   *   1) the value of the current node
   *   2) the index of the current node
   */
  filter(cb) {

  }

  /**
   * Returns an Array of values where cb(value) evaluates to true
   *
   * @param cb - a callback function that will be passed 2 params:
   *   1) the value of the current node
   *   2) the index of the current node
   */
  findAll(cb) {

  }

  /**
   * Returns the first value where cb(value) evaluates to true
   *
   * @param cb - a callback function that will be passed 2 params:
   *   1) the value of the current node
   *   2) the index of the current node
   */
  findFirst(cb) {

  }

  /**
   * Returns the first value where cb(value) evaluates to true
   *
   * @param cb - a callback function that will be passed 2 params:
   *   1) the value of the current node
   *   2) the index of the current node
   */
  findLast(cb) {

  }

  /**
   * Iterates over each {Node} of the list, executing {cb} with
   * each value and index.
   *
   * Note: Unlike {Array.forEach()} this returns the list for chaining.
   *
   * @param cb - a callback function that will be passed 2 params:
   *   1) the value of the current node
   *   2) the index of the current node
   */
  forEach(cb) {
    let curr = this.head;
    let idx = 0;
    while (curr) {
      cb(curr.value, idx);
      curr = curr.next;
      idx++;
    }
    return this;
  }

  /**
   * Gets the value of the Node at a certain index in the LinkedList.
   *
   * Note: This could be much more time consuming than using an Array.
   *   Getting and setting by index/index isn't ideal for LinkedLists.
   *
   * @param idx
   */
  get(idx) {

  }

  /**
   * Returns true if any of the Nodes in this list contain {value}
   * @param value
   */
  includes(value) {
    let curr = this.head;
    while (curr) {
      if (curr.value === value) return true;
      curr = curr.next;
    }
    return false;
  }

  /**
   * Inserts a new Node with {value} at index {idx}
   * in the list.
   *
   * @param value
   * @param idx - 0-based. {idx} of 0 will create a new head for this
   *   list. {idx} at or greater than the length or no idx given will
   *   append to the list.
   */
  insert(value, idx) {
    if (idx === 0) return this.unshift(value);

    let node = this.getNodeAt(idx - 1);
    if (!node) return this.push(value);

    let newNode = new Node(value);
    let temp = node.next;
    node.next = newNode;
    newNode.next = temp;
    this.length++;

    for (let key in this.tempHash) {
      if (+key >= idx) {
        // this.tempHash[+key+1] = this.tempHash[key];
        delete this.tempHash[key];
      }
    }
  }

  /**
   * Returns {true} if the list is empty.
   */
  isEmpty() {
    return (this.length === 0);
  }

  /**
   * Iterates over each {Node} of the list, executing {cb} with
   * each value and index, and updating the value of each {Node}
   * with the return value of {cb}
   *
   * Note: Like {Array.map()} this will return a new LinkedList.
   *
   * @param cb - a callback function
   */
  map(cb) {
    let list = new LinkedList();
    this.forEach((val, idx) => {
      list.push(cb(val, idx));
    });
    return list;
  }

  /**
   * Removes the last item in the list and returns its value.
   */
  pop() {

  }

  /**
   * Pushes a Node with {value} to the end of the list.
   *
   * @param value
   */
  push(value) {
    const node = new Node(value);
    if (this.isEmpty()) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.length++;
    this.tail = node;
  }

  /**
   * Iterates over each {Node} of the list, executing {cb} with
   * each value and index, and updating the value of each {Node}
   * with the return value of {cb}
   *
   * @param cb - a callback function that will be passed 3 params:
   *   1) the current value of the accumulater
   *   2) the value of the current Node
   *   3) the index of the current Node
   * @param startValue - the starting value of the accumulater
   */
  reduce(cb, startValue = 0) {
    let acc = startValue;
    this.forEach((value, idx) => {
      acc = cb(acc, value, idx);
    });
    return acc;
  }

  removeAt(idx) {
    for (let key in this.tempHash) {
      if (idx > +key) {
        this.tempHash[+key-1] = this.tempHash[key];
        delete this.tempHash[key];
      }
    }
    this.tempHash = {};
    if (idx === 0) {
      if (this.head && this.head.value) {
        const temp = this.head.value;
        this.head = this.head.next;
        this.length--;
        return temp;
      }
    }
    let node = this.getNodeAt(idx-1);
    if (node && node.next) {
      const temp = node.next.value;
      node.next = node.next.next;
      this.length--;
      if (idx-1 === 0) {
        this.head = node;
      }
      return temp;
    }


  }

  removeAll(cb) {

  }

  removeFirst(cb) {

  }

  removeLast(cb) {

  }

  /**
   * Reverses the order of the list as a new LinkedList.
   */
  reverse() {

  }

  /**
   * Removes the first Node in the LinkedList and returns its value.
   */
  shift() {

  }

  /**
   * Sets the value of the Node at a certain index in the LinkedList.
   *
   * Note: This could be much more time consuming than using an Array.
   *   Getting and setting by index/index isn't ideal for LinkedLists.
   *
   * @param idx
   */
  set(idx) {

  }

  /**
   * Removes Nodes at index {start} to index {end} and returns the
   * removed Nodes as a new LinkedList. If no {end} is given, it should return
   * the remainder of the LinkedList. If no {start} or {end} is given, it should
   * return a copy of the LinkedList.
   *
   * @param start
   * @param end
   */
  slice(start, end) {

  }

  /**
   * Returns all the values of this list as a concatenated string.
   */
  toString(separator) {
    return this.reduce((acc, value) => acc + (separator||'') + value, '');
  }

  /**
   * Adds a new value to the front of the list.
   *
   * @param value
   */
  unshift(value) {
    for (let key in this.tempHash) {
      this.tempHash[+key+1] = this.tempHash[key];
      delete this.tempHash[key];
    }
    const node = new Node(value);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.length++;
  }

}

module.exports = LinkedList;
