## Binary Search Tree

A Binary Search Tree (BST) is a binary tree with 2 simple, yet important, properties.

---

## Overview

A Binary Search Tree (BST) is a tree that respects the two BST properties:

- The left child has a value less than the node.
- The right child has a value greater than the node.

Typically, the first data structure we might think of when inserting, deleting, and searching for elements would be a `map`. However, we may want more...

What if we want to know the minimum and maximum values within our data set or what element comes before or after our current element (without requiring sorting)? Finally, we might want to traverse our dataset as well. With these things in mind, a standard `std::map` would not suffice.

Now, we introduce the *Binary Search Tree*. It is a tree-like structure that inserts elements based on the value of each element. Elements with a higher value go down the tree on the right side, and lower values go to the left.

Worst time complexity for basic operations: $O(n)$

```
  1
   \
    2
     \
      3
       \
        4
```

Best time complexity for basic operations: $O(log(n))$

```
      4
     / \
    2   5
   / \   \
  1   3   6
```

---

## Operations:

### 1. Search:

- Start from the root.
- If the current node is `null` or matches the key, return the node.
- Otherwise, if the key is smaller than the current node's key, search in the left child, else search in the right child.

```cpp
search(node, key):
  if node == nil or node.key == key:
    return node
  if key < node.key:
    return search(node.left, key)
  else:
    return search(node.right, key)
```

Wrapper function:

```cpp
find(key):
  return search(root, key) != nil
```

### 2. Find Minimum / Maximum

- To find the minimum: Traverse left until you reach the leftmost node.
- To find the maximum: Traverse right until you reach the rightmost node.

```cpp
min(node):
  while node.left != nil:
    node = node.left
  return node

max(node):
  while node.right != nil:
    node = node.right
  return node
```

### 3. Successor / Predecessor

- **Successor**: Find the next largest node (node's right child minimum or parent's ancestor).
- **Predecessor**: Find the next smallest node (node's left child maximum or parent's ancestor).

```cpp
successor(node):
  if node.right != nil:
    return min(node.right)
  parent = node.parent
  while parent != nil && node == parent.right:
    node = parent
    parent = parent.parent
  return parent

predecessor(node):
  if node.left != nil:
    return max(node.left)
  parent = node.parent
  while parent != nil && node == parent.left:
    node = parent
    parent = parent.parent
  return parent
```

### 4. Traversal

- **In-order Traversal**: Visit left subtree, current node, right subtree. Results in sorted order for a BST.

```cpp
in_order(node, list):
  if node != nil:
    in_order(node.left, list)
    list.append(node.key)
    in_order(node.right, list)
```

- **Pre-order Traversal**: Visit current node, left subtree, right subtree.

```cpp
pre_order(node, list):
  if node != nil:
    list.append(node.key)
    pre_order(node.left, list)
    pre_order(node.right, list)
```

- **Post-order Traversal**: Visit left subtree, right subtree, current node.

```cpp
post_order(node, list):
  if node != nil:
    post_order(node.left, list)
    post_order(node.right, list)
    list.append(node.key)
```

### 5. Insert

- Start from the root and find the correct spot.
- Insert the node as a left or right child based on comparisons.

```cpp
insert(value):
  if find(value):
    return false  // value already exists
  node = new Node(value)
  if root == nil:
    root = node
    return true

  current = root
  while current != nil:
    if value < current.key:
      current = current.left
    else:
      current = current.right
  node.parent = previous
  if value < previous.key:
    previous.left = node
  else:
    previous.right = node
  return true
```

### 6. Delete

- If the node has two children, replace it with its successor (next largest).
- If the node has one or no children, just remove it.

```cpp
delete(value):
  node = search(root, value)
  if node == nil:
    return false

  if node has two children:
    successor_node = successor(node)
    node.key = successor_node.key
    delete(successor_node)

  else:
    child = node.left if node.left != nil else node.right
    if child != nil:
      replace_node_with_child(node, child)
    else:
      remove_node(node)

  return true
```

### 7. Additional Notes

- **Balance**: The BST can become unbalanced, leading to inefficient operations (like a linked list). To ensure efficiency, use self-balancing trees like AVL or Red-Black Trees.
- **Complexity**: Most operations (search, insert, delete, etc.) have a time complexity of O(h), where `h` is the height of the tree. In the worst case, `h` could be equal to the number of nodes (O(n)) in an unbalanced tree.

This pseudocode covers the essential operations of a Binary Search Tree (BST) while maintaining simplicity and clarity.

If you want to see a real example check out my source code:

- Example 1.
- Example 2.