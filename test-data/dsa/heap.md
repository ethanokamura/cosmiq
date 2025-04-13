---
title: Heap (Binary)
description: A nearly complete binary tree that respects the heap property.
tags:
  - data-structure
  - heap
  - binary-tree
published: true
lang: cpp
course: trees
order: 5
---
# Heaps
A nearly complete binary tree that respects the heap property.

---

To clear up confusion, a **nearly complete** binary tree is complete at every level except for the last.

**NOTE:** The last level is contiguous (left to right).

The tree on the left is nearly complete, while the tree on the right is incomplete:
```
         10              10
       /    \           /  \
      5      8         3    8
     / \    /              / \
    2   1  3              3   1
```
The heap is a **"lazy"** data structure.

Normally in life, being lazy is seen as a bad thing. However, in programming, we try to be as lazy as possible.

Now, let's create a **priority queue** using a heap data structure.

---

## Our Heap
Our heap will be **partially ordered**, meaning each value in a node is at most the value of its parent node.

For this, an **array** will be sufficient to store our data.

The array must have two attributes:
1. Length of the array
2. Heap size of the Array

### Navigation:
To make navigation easier, we need some helper functions to find the parent and child of elements in the array.

Given index $i$:

$$
\text{parent}(i) = \lfloor{i \over 2}\rfloor
$$

$$
\text{left}(i) = 2i
$$

$$
\text{right}(i) = 2i + 1
$$

This allows us to navigate the array as if it were a tree.

### Heap Properties:
Similarly to how a binary search tree must follow the BST properties... All heaps must abide by the heap property.

Min Heap:
$$
A \lfloor \text{parent}(i) \rfloor \leq A \lfloor i \rfloor
$$

Max Heap:
$$
A \lfloor \text{parent}(i) \rfloor \geq A \lfloor i \rfloor
$$

Note, in this example, we are implementing a minimum heap.

---

## Priority Queue
A **priority queue** is a queue where the element with the highest priority is removed first. Unlike a normal queue, which follows a **FIFO (First In, First Out)** system, a priority queue allows elements to be ranked so that a higher-priority element is dequeued before a lower-priority one.

For now, we will create a **minimum priority queue**, meaning the lower the element's ID, the faster it will be removed. To increase an element's priority, we decrease its key value.

Since the heap is implemented using an array, our queue will have a **fixed size**.

In our queue, we need the following functions:
1. `Heapify()` – to preserve the heap property.
2. `Heapsort()` – to convert the heap into a sorted array.
3. `HeapInsert()` – to add new values.
4. `ExtractMin()` – to remove the highest-priority element.
5. `DecreaseKey()` – to increase an element’s priority by decreasing its key value.

Additionally, we need helper functions to track **relations** within the heap (such as left, right, and parent nodes).

The **left** and **right** nodes are the children of the current node. For example, **2 (left) and 3 (right)** are child nodes of **1**:
```
    1
   / \
  2   3
```
These **left, right, and parent** functions are included in the Git repository linked below.

One important note: Our heap will only store **integer values**! While this structure can work with other data types, we will use integers for simplicity.

---

### Heap Insert
One of the first things we need to do is insert values into the heap. To do this, we follow these steps:

1. Ensure the heap is not already **full** (since we are working with arrays).
2. Increase the **size** of the heap.
    - We use a private variable, `size`, to track the number of elements currently in the heap. This is **different** from the heap's capacity!
3. Insert the new value at the **end** of the heap.
4. Decrease the key’s value to ensure the heap remains partially ordered as expected.
    - Notice that we **increase** the value of the inserted data before decreasing it. More on this later.
5. Return **true** upon successful insertion.

```cpp
bool heap_insert(int val) {
  if (is_full()) return false;
  size++;
  arr[size - 1] = val + 1;
  decrease_key(size - 1, val);  // Implement this function next
  return true;
}
```

---

### Decrease Key (Promoting an Element)
After inserting a new element, we may need to **restructure** the heap to maintain its properties. The `decrease_key()` function takes two parameters: 
- The **index** of the element to update.
- The **new value** (lower priority number).

Steps to implement `decrease_key()`:
1. Ensure the **new value** is actually smaller than the current value.
2. Assign the new value to the **specified index**.
3. While the index is **not at the root** and the current value is **smaller** than its parent, swap them.
4. Update the index to point to its new position.
5. Repeat until the heap is properly structured.

**NOTE:** You can use the built-in `swap()` function from `<utility>`.
```cpp
void decrease_key(int index, int val) {
  if (index < 0 || index >= size || arr[index] <= val) return;
  arr[index] = val;
  while (index > 0 && arr[parent(index)] > arr[index]) {
    std::swap(arr[index], arr[parent(index)]);
    index = parent(index);
  }
}
```

---

### Heapify
`Heapify()` is **one of the most important** functions in this data structure. It serves as the **backbone** of the heap system.

The goal of `heapify()` is to **move higher-priority elements** to the front of the heap.

Steps:
1. Identify the **smallest** value among the current node and its children.
2. If the current node is **not the smallest**, swap it with the smallest child.
3. Recursively call `heapify()` on the swapped index.

Here’s the implementation:
```cpp
void heapify(int index) {
  int min = min_of_three(index, left(index), right(index));
  if (min != index) {
    std::swap(arr[index], arr[min]);
    heapify(min);
  }
}
```
**NOTE:** The `min_of_three()` function returns the smallest of three integers. Check the Git repository below for its implementation.

---

### Extract Min
A **priority queue** isn't useful if we can't remove the **highest-priority** element! To do this, we use `extract_min()`.

Steps:
1. Ensure the heap **isn't empty**.
2. Store the **highest-priority element** (root of the tree).
3. Move the last element to the **root**.
4. Decrease the heap size.
5. Call `heapify()` to restore the heap structure.

```cpp
int extract_min() {
  if (is_empty()) return 0;
  int min = arr[0];
  arr[0] = arr[size - 1];
  size--;
  heapify(0);
  return min;
}
```

---

### Heap Sort
At some point, we may need to **completely sort** the heap. To do this, we implement `heap_sort()`, which:
- **Creates a copy** of the heap.
- **Sorts** the elements.
- **Returns** the sorted array.

This function sorts elements in **descending** order (lowest to highest priority).

Steps:
1. If the heap is **empty**, return an empty array.
2. Copy the heap into a temporary array.
3. Swap elements to sort them.
4. Restore the original heap after sorting.
5. Return the **sorted array** and its size.

```cpp
// Sorts the heap and returns an array and its size
std::pair<int*, int> heap_sort() {
  if (is_empty()) return std::pair<int*, int>(nullptr, 0);
  int* temp_arr = new int[size];
  for (int i = 0; i < size; i++) temp_arr[i] = arr[i];
  int* old_arr = arr;
  arr = temp_arr;
  int old_size = size;
  for (int i = size - 1; i >= 0; i--) {
    std::swap(arr[0], arr[i]);
    size--;
    heapify(0);
  }
  size = old_size;
  std::pair<int*, int> _pair(arr, size);
  arr = old_arr;
  return _pair;
}
```

---

## Conclusion
We have successfully implemented the **core functions** of a **priority queue** using a heap! Be sure to **test** your code and verify its functionality.

Check out the source code [here](https://github.com/ethanokamura/dsa/tree/main/trees/heap).