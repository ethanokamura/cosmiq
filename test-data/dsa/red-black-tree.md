# Red Black Trees
The Red-Black Tree (RBT) is a lazily-structured "self-healing" tree.

---
A Red-Black Tree is a self-balancing binary search tree (BST) that ensures efficient operations for insertion, deletion, and lookup in $O(log(n))$ time. It achieves balance through color-coding and specific rules that restrict the tree's shape.

## RBT Properties

A valid Red-Black Tree must have the following properties:

1. Every node is either red or black.
2. The root node is always black.
3. Every leaf (`nil`) is always black.
4. Red nodes cannot have red children (no two consecutive red nodes).
5. For any node `x`, every descending path from `x` to a leaf (`nil`) contains the same number of black nodes.
   - This ensures balance by controlling the depth.

Furthermore:

- Key-bearing nodes (non-`nil`) are considered **internal nodes**.
- Each red node has two black children (where one or both can be `nil`).
- To maintain a valid black height (BH), red nodes must be inserted along different-length paths.

## Why Use a Red-Black Tree?

- Keeps the tree **approximately balanced**, ensuring $O(log(n))$ operations (insertion, deletion, and search).
- Unlike an AVL Tree, which is more strictly balanced, RBTs require fewer rotations during insertion and deletion.

Fun Fact: RBTs are used to implement data structures like `std::map` and `std::set`.

Red-Black Trees with `n` internal nodes (non-leaf, non-`nil`) and height `h` satisfy the following inequality: $h \leq 2 \log(n+1)$

where the height of the tree is its longest depth, meaning it determines the worst-case runtime.

**Remarks:**

- Any binary tree satisfies $(h \geq \lfloor \log(n) \rfloor)$.
- A Red-Black Tree satisfies $(\lfloor \log(n) \rfloor \leq h \leq 2\log(n+1))$.
- The height of the tree $(h = \theta(\log(n)))$.
- Therefore, BST operations on these trees have a cost of $(\theta(\log(n)))$ (balanced tree).

## Main Operations

The main operations in a Red-Black Tree are as follows:

1. Insertion
2. Deletion
3. Rotation

Each operation can optionally use helper functions such as `insertFixup()`, `deleteFixup()`, or `transplant()`.

## Insertion

For insertion, we use two functions: `insert()` and `insertFixup()` (a helper function).

Inserting a node into an RBT is very similar to inserting into a plain Binary Search Tree (BST). However, in an RBT, a regular insertion will likely violate RBT properties.

To fix this, a helper function ensures the tree's integrity.

### General Idea:

1. Insert the node like a normal BST.
2. Color the new node red.
3. Fix violations using rotations and recoloring to restore the RBT properties.

### Insertion Cases:

Given node `z`:

1. `z` is the `root`.
2. `z.uncle` is colored `RED`.
3. `z.uncle` is colored `BLACK` and forms a triangle (more on this later).
4. `z.uncle` is colored `BLACK` and forms a line (more on this later).

Since inserting a node into an RBT is very similar to inserting in a regular BST, let's look at the pseudocode:

```cpp
insert(T, z):
  y = nil
  x = root
  while x != nil
    y = x
    if z.key < x.key
      x = x.left
    else
      x = x.right
  z.parent = y
  if y == nil
    root = z
  else if z.key < y.key
    y.left = z
  else
    y.right = z
  z.left = nil
  z.right = nil
  z.color = RED
  insertFixup(T, z)
```

The main changes are the recoloring of the new node and the final instruction calling `insertFixup()`.

Now, let's look at the helper function:

```cpp
insertFixup(T, z):
  while z.parent != nil && z.parent.color == RED
    if z.parent == z.parent.parent.left
      y = z.parent.parent.right
      if y.color == RED  // Case 2
        z.parent.color = BLACK
        y.color = BLACK
        z.parent.parent.color = RED
        z = z.parent.parent
      else
        if z == z.parent.right  // Case 3
          z = z.parent
          leftRotate(T, z)
        // Case 4
        z.parent.color = BLACK
        z.parent.parent.color = RED
        rightRotate(T, z.parent.parent)
    else
      y = z.parent.parent.left
      if y.color == RED  // Case 2
        z.parent.color = BLACK
        y.color = BLACK
        z.parent.parent.color = RED
        z = z.parent.parent
      else
        if z == z.parent.left  // Case 3
          z = z.parent
          rightRotate(T, z)
        // Case 4
        z.parent.color = BLACK
        z.parent.parent.color = RED
        leftRotate(T, z.parent.parent)
  root.color = BLACK
```

## Deletion

Deleting a node from a Red-Black Tree is not as straightforward as insertion.

The main idea is:

1. **Transplant** (replaces subtrees efficiently).
2. **Delete** (removes the node).
3. **DeleteFixup** (fixes any violations).

### Delete Cases:

1. Node `z` has no children → simply remove it.
2. Node has one child → use `transplant()` to replace it with its child.
3. Node has two children → find the successor (smallest in right subtree) and use `transplant()` to replace `z` with the successor.

At the end, we call `deleteFixup()` to restore RBT properties.

```cpp
delete(T, k):
  z = find(k)
  y = z
  y_og_color = y.color

  if z.left == nil  // Case 1
    x = z.right
    transplant(T, z, z.right)
  else if z.right == nil  // Case 2
    x = z.left
    transplant(T, z, z.left)
  else  // Case 3
    y = min(z.right)
    y_og_color = y.color
    x = y.right
    
    if y.parent == z
      x.parent = y
    else
      transplant(y, y.right)
      y.right = z.right
      y.right.parent = y

    transplant(T, z, y)
    y.left = z.left
    y.left.parent = y
    y.color = z.color

  if y_og_color == BLACK
    deleteFixup(T, x)
```

## Transplant

The `transplant()` function replaces one subtree with another while maintaining tree structure. It is commonly used during deletion.

### Why use `transplant()`?

- It simplifies handling deletion cases.
- It efficiently replaces nodes without manually updating multiple pointers.

### How `transplant()` works:

1. Replace one node `u` with another node `v`.
2. Update `u`'s parent to point to `v`.

```cpp
transplant(T, u, v):
  if u.parent == nil  // u is root
    root = v
  else if u == u.parent.left  // u is a left child
    u.parent.left = v
  else  // u is a right child
    u.parent.right = v
  v.parent = u.parent
```

## Delete Fixup

`deleteFixup()` rebalances the tree after deletion. It handles four cases:

1. `w` is `RED`.
2. `w` is `BLACK`, and both its children are `BLACK`.
3. `w` is `BLACK`, its left child is `RED`, and its right child is `BLACK`.
4. `w` is `BLACK`, and its right child is `RED`.

```cpp
deleteFixup(T, x):
  while x != root and x.color == BLACK
    if x == x.parent.left
      w = x.parent.right
      if w.color == RED  // Case 1
        w.color = BLACK
        x.parent.color = RED
        leftRotate(x.parent)
        w = x.parent.right
      if w.left.color == BLACK and w.right.color == BLACK  // Case 2
        w.color = RED
        x = x.parent
      else
        if w.right.color == BLACK  // Case 3
          w.left.color = BLACK
          w.color = RED
```

And just like that, you should now be familiar with the basics of the Red-Black Tree structure and properties!

If you want to see it in action my source code is avaliable [here](https://github.com/ethanokamura/dsa/tree/main/trees/rbt).