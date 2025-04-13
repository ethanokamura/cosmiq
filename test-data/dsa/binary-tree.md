---
title: Binary Trees
description: The foundation of simple binary trees.
tags:
  - data-structure
  - binary-tree
published: true
lang: cpp
course: trees
order: 1
---
# Binary Tree
A simple structure

---
## Overview

A **binary tree** is a hierarchical data structure in which each node has at most two children, referred to as the **left child** and the **right child**. These children themselves are binary trees, making binary trees a **recursive data structure**.

### Example of a Binary Tree:

```
        5
       / \
      3   8
     / \   \
    2   4   10
```

In this tree:
- The node with the value **5** is the **root** node.
- The node with the value **3** is the **left child** of the root (5), and the node with the value **8** is the **right child** of the root.
- Similarly, the node with the value **2** is the **left child** of the node with the value **3**, and the node with the value **4** is the **right child** of the node with the value **3**.
- The node with the value **10** is the **right child** of the node with the value **8**.
- The nodes with values **2**, **4**, and **10** are called **leaves** because they sit at the bottom of the tree and have no children.

---

## Binary Tree Representation in an Array

A binary tree can be represented in an array in a specific way. The root is placed at index `0`, its left child at index `1`, and its right child at index `2`. This pattern continues, so for any node at index `i`, its left child is at index `2i + 1` and its right child is at index `2i + 2`.

For the first binary tree above, it can be represented in an array as follows:

```
[ 5, 3, 8, 2, 4, null, 10 ]
```

- The root node (5) is at index `0`.
- The left child of the root (3) is at index `1`, and the right child of the root (8) is at index `2`.
- The left child of node 3 (2) is at index `3`, and the right child of node 3 (4) is at index `4`.
- Node 8 has only one child, the right child (10), which is at index `6`.
- The `null` value represents the absence of a node in the position where a child would be.

---

## Nearly Complete Binary Tree

The binary tree we saw above is considered **nearly complete** because it still has an open space at its lowest level. In a nearly complete binary tree, all levels are fully filled except possibly for the last level, which is filled from left to right.

### Example:

```
         10
        /  \
       /    \
      3      8
     / \    / \
    2   4  3   1
```

This is a **complete binary tree**, where all the nodes are filled, and no positions are left empty.

---

## Complete Binary Tree Representation in an Array

A **complete binary tree** can also be represented as an array. The tree above would be represented as:

```
[ 10, 3, 8, 2, 4, 3, 1 ]
```

This array corresponds directly to the tree structure, and the rules for the positions of children (left and right) in the array still apply.

- The root node (10) is at index `0`.
- The left child of the root (3) is at index `1`, and the right child of the root (8) is at index `2`.
- The left child of node 3 (2) is at index `3`, the right child of node 3 (4) is at index `4`.
- The left child of node 8 (3) is at index `5`, and the right child of node 8 (1) is at index `6`.

---

## Summary of Binary Tree Properties:

- A **binary tree** allows each node to have at most two children.
- The structure is hierarchical and recursive in nature.
- Binary trees are often used in algorithms that require searching, sorting, and efficient data storage.
- A **complete binary tree** is a binary tree where all levels are fully filled except possibly the last, which is filled from left to right.
- A **nearly complete binary tree** is similar but may have gaps at the lowest level.

Understanding binary trees is essential because they form the foundation for more advanced tree structures, such as **binary search trees**, **AVL trees**, **red-black trees**, and **heaps**, which are used in many different applications ranging from databases to memory management.
