# Breadth First Search
A single shortest path algorithm.

---
## Overview:
Given a graph $G$:

- Start node $s$ where ($s \in V$)
- Explore the edges of $G$ to discover every node that is reachable from $s$ (i.e., find the shortest path to each node)
- Compute the distance from $s$ to all reachable nodes
- Generate a BFS tree that outlines the paths
- Expand the frontier:
    - It discovers all nodes at distance $k$ from the current node before moving on to nodes at distance $k+1$, $k+2$, etc.
    - A queue is used to record nodes that will be explored later.
- Finds the shortest path from the starting node to every other node.

---

## Node Data:

Each node will be colored to record its status:

1. **White** - undiscovered
2. **Grey** - in progress
3. **Black** - complete

Alternatively, the statuses can be simplified to just "discovered" or "not discovered" (a boolean).

### Each Node Will Contain:

- **distance** $d[]$ (distance from the start node)
- **parent** $p[]$ (predecessor node)
- **color** $color[]$ or **is_discovered**

**Note:** A vertex can only be discovered once. Once it is discovered, it cannot be rediscovered.

---

## Algorithm:

Here’s how the algorithm works:

1. Initialize the distance, parent, and color arrays with default values.
2. Set the starting node and insert it into the queue.
3. While the queue is not empty, explore adjacent nodes and calculate their distances:
    1. Create an adjacency list for the current node.
    2. Loop through the adjacency list and:
        - Mark the node as discovered
        - Set the distance
        - Set the parent node to the current node.
    3. Push the adjacent node into the queue.
    4. Pop the node from the front of the queue and mark it as discovered.
4. Continue the process until no more nodes can be discovered.

---

### BFS Algorithm (in C++):

```cpp
// Perform breadth-first search O(V + E)
void BFS(int s) {
  // O(V)
  // Initialize default values
  for (int i = 0; i < k; i++) {
    p[i] = -1;     // Flag value (can be adjusted to NULL or -1)
    color[i] = 0;  // Undiscovered
  }
  
  Queue<int> q;
  // Initialization of the node we will search from (root)
  color[s] = 1;
  d[s] = 0;
  p[s] = -1;
  q.push(s);
  
  // Main section O(E)
  while (!q.empty()) {
    int u = q.front();
    std::vector<int> adj = find_adj(u);
    for (const int &v : adj) {
      if (color[v] == 0) {  // Node is undiscovered
        color[v] = 1;
        d[v] = d[u] + 1;
        p[v] = u;
        q.push(v);
      }
    }
    // Mark the node as fully explored
    q.pop();
    color[u] = 2;
  }
}
```

We’ll choose a flag value to signify unvisited nodes (e.g., `-1` or `NULL`).

We can't simplify the time complexity between $O(V)$ and $O(E)$ since we don’t know which will dominate, so the overall complexity is $O(V + E)$.

---

### Example:

Let’s consider a graph $G$ with vertices: $\{a, b, c, d, e, f, g, h, i, j\}$

```
a - b - c
|   |   |
d - e - f - j
|       |
g - h - i
```

If we start from node $e$, we’ll explore the closest adjacent nodes and add them to the queue. The queue order grouped by distance $d$ will be:

- **$d = 1$**: $\{b, d, f\}$
- **$d = 2$**: $\{a, c, i, g, j\}$
- **$d = 3$**: $\{h\}$

We can now find the shortest path from $e$ to any other node.

---

### Adjacency List:

| Node | Adjacent Nodes |
| ---- | -------------- |
| a    | b, d           |
| b    | a, e, c        |
| c    | b, f           |
| d    | a, e, c        |
| e    | b, d, f        |
| f    | c, e, j        |
| g    | d, h           |
| h    | g, i           |
| i    | f, h           |
| j    | f              |

---

## Building the Adjacency List:

To build our adjacency list (a list of adjacent nodes), we search adjacent nodes for the current node, ensuring they are within bounds and connected to the current node.

```cpp
// Find all adjacent nodes to the current node v
std::vector<int> find_adj(int v) {
  std::vector<int> adj;
  int y = v / n;     // Row index
  int x = v % n;     // Column index
  int directions[8] = {0, 0, 1, -1, 1, -1, 0, 0};
  
  for (std::size_t i = 0; i < 4; i++) {
    int new_x = x + directions[i];
    int new_y = y + directions[i + 4];
    
    if (in_bounds(new_x, new_y) && is_connected(x, y, new_x, new_y)) {
      adj.push_back(new_y * n + new_x);
    }
  }
  
  return adj;
}
```

---

## Additional Use Cases for BFS:

- **Shortest Path in Unweighted Graphs:** BFS is ideal for finding the shortest path in unweighted graphs, as it guarantees finding the shortest path from the source to all reachable nodes.
- **Level Order Traversal in Trees:** BFS can be used to traverse a tree level by level, which is useful in various problems like printing a tree’s level order.
- **Finding Connected Components:** In an undirected graph, BFS can be used to find all connected components. Starting from an undiscovered node, it will explore all nodes in the same connected component.
- **Web Crawling:** BFS is used in web crawlers to explore the web by starting from a given URL and exploring all adjacent links (webpages), level by level.
- **Social Network Analysis:** BFS can be used to analyze social networks by finding the shortest path between users or determining the degree of separation between users.
- **Solving Puzzles:** BFS is used in puzzles like the 8-puzzle or sliding puzzle, where we need to explore all possible states level by level to find the shortest sequence of moves to solve the puzzle.

## Conclusion:

If you want to see a working example of breadth first search, check out my git repositories:
- [Written in C++](https://github.com/ethanokamura/dsa/tree/main/graphs/bfs/cpp)
- [Written in C](https://github.com/ethanokamura/dsa/tree/main/graphs/bfs/c)