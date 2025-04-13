---
title: Introduction to Graph Structures
description: What are Graphs, and why do they matter?
tags:
  - bfs
  - dfs
  - apsp
  - sssp
  - disjoint-set
published: true
lang: cpp
course: graphs
order: 0
---
# Introduction to Graph Structures
What are Graphs, and why do they matter?

---
## Overview of the Course:

In this section, We will cover the following topics:
- Breadth First Search
- Depth First Search
- All Pairs, Shortest Path
- Single Source, Shortest Path
- Disjoint Set

But first! What is a graph in the world of computer science?

## Overview of Graphs:
A **graph** is a fundamental data structure that consists of two key components:  
- **Vertices (Nodes)**: Represent entities or objects in the graph.  
- **Edges (Arcs)**: Represent relationships or connections between the vertices.  

A graph is often defined as:  
$$ G = \{ V, E \} $$  
Where:  
- $V$ is the set of vertices (nodes).  
- $E$ is the set of edges (connections between nodes).  

## Types of Graphs:
- **Directed Graph (Digraph)**: Edges have a direction, represented as an ordered pair $(u, v)$.  
- **Undirected Graph**: Edges do not have a direction, represented as an unordered pair $\{u, v\}$.

Additional Notes:  
- The set of vertices, $V$, is finite.  
- Edges, $E$, can be thought of as a binary relation, where each edge connects two vertices.

## Important Graph Definitions:
- **Cycle**: A path that starts and ends at the same vertex, with no other repeated vertices.  
- **Acyclic**: A graph that contains no cycles.  
- **Incident**: The relationship between an edge and the two nodes it connects.  
- **Adjacent**: Two nodes are adjacent if there is an edge connecting them.  
- **Node Degree**: The number of edges incident to a particular node.  
- **Regular Graph**: A graph where every node has the same degree.  
- **Sparse Graph**: A graph with relatively few edges compared to the number of vertices.

## Edge Properties:
- In a **disconnected graph**, the minimum number of edges is 0 (no connections between vertices).  
- In a **connected graph**, the minimum number of edges is approximately $n-1$ (where $n$ is the number of vertices), and the maximum number of edges is approximately $n(n-1)/2$ for an undirected graph (dense graphs).

## Path Definition:
A **path** of length $k$ from vertex $a$ to vertex $b$ is a sequence of vertices:  
$$ V_0, V_1, V_2, ..., V_k $$  
Where:  
$$
a = V_0, \;\;\; b = V_k
$$

$(V_i, V_{i+1}) \in E \text{ for all } i = 0, 1, ..., k-1$ (i.e., each pair of consecutive vertices is connected by an edge).  

- A **simple path** means all vertices on the path are distinct.  

If there exists a path from $a$ to $b$, then $b$ is said to be **reachable** from $a$.  

## Connected Components:
A **connected component** is a subset of a graph where there is a path between every pair of nodes in the component. 

For example:
- Graph $G$ with $V = \{a, b, c, d\}$ and $E = \{\{a, b\}, \{b, c\}, \{c, d\}\}$ is **connected** because every node is reachable from every other node.  
- Graph $G$ with $V = \{a, b, c, d\}$ and $E = \{\{a, b\}, \{c, d\}\}$ has two connected components: one containing nodes $a$ and $b$, and the other containing nodes $c$ and $d$. Nodes $a$ and $d$ are not connected.

## Directed Graphs:
- Directed graphs may have **cycles**, where you can traverse from one vertex and return to it by following directed edges.  
- **Self-loops**: A directed graph can have edges where both ends are the same vertex. This is not relevant for our example in maze graphs.  
- A **strongly connected** subgraph is a subgraph where any vertex can reach any other vertex within the subgraph. For example, in the cycle $a \rightarrow b \rightarrow c \rightarrow a$, all nodes are mutually reachable.

## Graph Representation:
There are several ways to represent graphs in memory. Below are the two most commonly used representations:

1. **Adjacency Matrix**  
2. **Adjacency List**  
3. **Custom Method** (e.g., for maze graphs)

### Adjacency List:
- **Adjacency Lists** are a preferred representation, especially for **sparse graphs** (graphs with few edges compared to the number of vertices).  

#### Properties of Adjacency Lists:
- For each node, an array or list contains its adjacent nodes (nodes connected to it by an edge).  
- **Space Complexity**: $O(E)$, where $E$ is the number of edges.  
- **Time Complexity**: To traverse all adjacent nodes, the time complexity is $O(n)$ (where $n$ is the number of vertices).

#### Example:
For the graph $G$ with $V = \{a, b, c, d\}$ and $E = \{\{a, b\}, \{a, c\}, \{a, d\}, \{b, c\}, \{b, d\}, \{c, d\}\}$, the adjacency list representation would be:

- A: $\{b, c, d\}$
- B: $\{a, c, d\}$
- C: $\{a, b, d\}$
- D: $\{a, b, c\}$

### Adjacency Matrix:
- An **Adjacency Matrix** is a 2D array where the cell at row $i$, column $j$ contains 1 if there is an edge between vertex $i$ and vertex $j$, and 0 if there is no edge.

#### Example:
For the same graph $G$:

|     | a   | b   | c   | d   |
| --- | --- | --- | --- | --- |
| a   | 0   | 1   | 1   | 1   |
| b   | 1   | 0   | 1   | 1   |
| c   | 1   | 1   | 0   | 1   |
| d   | 1   | 1   | 1   | 0   |

#### Properties:
- **Space Complexity**: $O(n^2)$, where $n$ is the number of vertices (because every pair of vertices is represented by an entry in the matrix).  
- **Time Complexity**: $O(1)$ for checking if an edge exists between two vertices.

### Use Case for Adjacency Matrix:
- **Efficient for dense graphs**: If a graph is dense (many edges), the adjacency matrix is efficient as it allows $O(1)$ time complexity for checking if two vertices are connected.
- **Memory Use**: Can become inefficient if the graph is sparse, as it requires $O(n^2)$ memory.
