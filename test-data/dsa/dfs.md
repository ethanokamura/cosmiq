# Depth First Search
A classic searching algorithm

---
## Overview:

Depth First Search (DFS) is an algorithm used to explore all the vertices and edges in a graph. It starts from a source node and explores as far as possible along each branch before backtracking. The core idea of DFS is to go as deep as possible down one path before exploring other paths.

### Key Features of DFS:

- **Searches deeper into the graph first**: It uses recursion or a stack to keep track of where we are in the search.
- **Discovers all nodes**: Even if the nodes are not connected, it will explore all nodes in the graph.
- **Uses timestamps**: Every node gets a discovery time (`d[]`) and finishing time (`f[]`), where `d[]` is the time when the node is first discovered and `f[]` is the time when all of its adjacent nodes are explored.

### DFS Data Structures:

1. **Coloring**: 
   - **White** (0) – undiscovered node
   - **Gray** (1) – node is in the stack and being explored
   - **Black** (2) – node has been fully explored

2. **Discovery Time**: `d[]`, records the time when a node is first discovered.
3. **Finish Time**: `f[]`, records the time when all adjacent nodes of a node have been fully explored.
4. **Parent**: `p[]`, stores the predecessor of each node during DFS traversal.

---

## DFS Algorithm:

Here's a basic implementation of DFS in C++ using recursion:

```cpp
void DFS() {
  // Initialize all nodes to undiscovered
  for (int v = 0; v < n; v++) {
    color[v] = 0;
    p[v] = -1;
  }
  
  time = 0; // Start the time for discovery
  for (int v = 0; v < n; v++) {
    if (color[v] == 0) // If node is undiscovered
      visit(v); // Start DFS from the node
  }
}

// Recursive DFS helper function
void visit(Node* u) {
  color[u] = 1;  // Mark as discovered (in progress)
  d[u] = ++time; // Record discovery time
  std::vector<int> adj = adjacency_list(u);
  for (int v: adj) {
    if (color[v] == 0) {  // If node v is undiscovered
      p[v] = u;           // Set parent
      visit(v);            // Recursively visit the node
    }
  }
  
  color[u] = 2;   // Mark as fully explored
  f[u] = ++time;  // Record finishing time
}
```

---

### Classifying Edges:

Based on the discovery and finish times, edges in a DFS traversal can be classified into four types:

1. **Tree Edge**: An edge that leads to an undiscovered node (discovery edge).
2. **Back Edge**: An edge that points to an ancestor in the DFS tree.
3. **Forward Edge**: An edge that connects a node to one of its descendants in the DFS tree.
4. **Cross Edge**: An edge that connects nodes from different subtrees or across different components.

---

### Example Graph:

Given a directed graph, here’s how we can identify the discovery and finish times for each node:

| Node | Discovery Time (d) | Finish Time (f) |
| ---- | ------------------ | --------------- |
| a    | 1                  | 12              |
| b    | 2                  | 11              |
| c    | 3                  | 4               |
| d    | 5                  | 10              |
| e    | 6                  | 9               |
| f    | 7                  | 8               |

---

## Finding Strongly Connected Components (SCC):

A **Strongly Connected Component (SCC)** is a maximal subgraph where there is a directed path between any pair of vertices within that component.

### Steps to Find SCC Using DFS:

1. Perform DFS on the graph \( G \) and record the finish times of each node.
2. Generate the **transpose** of the graph \( G^T \), where all edges are reversed.
3. Perform DFS on \( G^T \) but process nodes in the **decreasing order of finish times** from the first DFS.
4. The strongly connected components are the groups of nodes that are reachable from one another in \( G^T \) during this second DFS traversal.

### Example:

Consider the graph \( G \) with nodes and edges as follows:

| Node | Discovery Time (d) | Finish Time (f) |
| ---- | ------------------ | --------------- |
| d    | 1                  | 6               |
| e    | 2                  | 5               |
| f    | 3                  | 4               |
| b    | 8                  | 11              |
| c    | 9                  | 10              |
| a    | 7                  | 12              |

After the DFS traversal, you generate the transpose of the graph \( G^T \) by reversing all the edges. The transpose graph \( G^T \) will have the following discovery and finish times:

| Node | Discovery Time (d) | Finish Time (f) |
| ---- | ------------------ | --------------- |
| a    | 1                  | 6               |
| c    | 2                  | 5               |
| b    | 3                  | 4               |
| d    | 7                  | 8               |
| e    | 9                  | 12              |
| f    | 10                 | 11              |

By performing DFS on the transposed graph \( G^T \) in decreasing finish time order, we discover the following SCCs:

- **SCC 1**: \( \{a, b, c\} \)
- **SCC 2**: \( \{d\} \)
- **SCC 3**: \( \{e, f\} \)

---

### Why Are Strongly Connected Components Important?

1. **Graph Analysis**: SCCs help in identifying clusters of highly interconnected nodes. In directed graphs, SCCs are essential for understanding the structure of the graph.
   
2. **Component Decomposition**: SCCs can be used to decompose a graph into smaller components, which makes the analysis of the graph more manageable and efficient.

3. **Reachability**: Knowing the SCCs of a graph helps in determining whether there is a path between two nodes. If both nodes are in the same SCC, they are mutually reachable.

4. **Optimizations in Algorithms**: Many graph algorithms (like finding the shortest paths, connectivity problems, and network flow) can be optimized by first identifying the SCCs. This reduces the complexity of the problem.

5. **Real-World Applications**:
   - **Web Crawling**: SCCs can help in determining highly interconnected web pages, which might indicate important content clusters.
   - **Social Network Analysis**: In social media, SCCs can help identify tightly connected communities or groups of users who are mutually interacting.
   - **Recommendation Systems**: SCCs can be used in collaborative filtering methods, where connections between users and products form tightly knit groups.
   - **Electrical Circuits**: In electronic design automation, SCCs can be used to identify components in circuits that are strongly coupled.

---

By finding SCCs, we gain deep insights into the structure and relationships within a directed graph, which is pivotal for both theoretical and practical graph-related problems. 

To see a working example of DFS written in C check out this [git repo](https://github.com/ethanokamura/dsa/tree/main/graphs/dfs/c)!