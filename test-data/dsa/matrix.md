# Matrix
Let's build some matrices

---
## Overview
A matrix, at a basic level, is simply a multi-dimensional array. In our case, we will represent it as a multidimensional linked list.

Here's an example of a 2D matrix using an array of arrays:
```cpp
int A[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
```

Mathematically, this represents the following 3x3 matrix:
$$
A = \left[ \begin{array}{ccc} 1&2&3 \\ 4&5&6 \\ 7&8&9 \end{array} \right]
$$

Matrices are widely used in computer science. Some common applications include:
- **Machine Learning & AI**: Matrices are fundamental in neural networks and optimization algorithms.
- **Computer Graphics**: Used for transformations such as scaling, rotation, and translation.
- **Physics Simulations**: Representing vector spaces, fluid dynamics, and mechanics.
- **Graph Theory**: Representing adjacency matrices for networks.

For our implementation, we will structure our matrix using an array of linked lists:
```cpp
LinkedList* matrix;  // An array of linked lists representing rows
```

To test our matrix structure, we will implement basic arithmetic operations: addition, subtraction, and multiplication.

---

## Addition and Subtraction

Matrix addition is straightforward: each value from one matrix is added to the corresponding value in another matrix. Given two 2x2 matrices $A$ and $B$:
$$
A + B = \left[ \begin{array}{cc} x_1&x_2 \\ x_3&x_4 \end{array} \right] + \left[ \begin{array}{cc} y_1&y_2 \\ y_3&y_4 \end{array} \right] = \left[ \begin{array}{cc} x_1+y_1&x_2+y_2 \\ x_3+y_3&x_4+y_4 \end{array} \right]
$$

In code, using a 2D array, it looks like this:
```cpp
for (int i = 0; i < rows; i++) {
  for (int j = 0; j < cols; j++) {
    res[i][j] = A[i][j] + B[i][j];
  }
}
```

However, when using linked lists, direct indexing isn’t possible. Instead, we traverse the lists using pointers:
```cpp
LinkedList add(const LinkedList& A, const LinkedList& B) {
  LinkedList* sum_list = new LinkedList[A.size()];
  Node* cur_A = A.head;
  Node* cur_B = B.head;
  int index = 0;
  
  while (cur_A != nullptr) {
    while (cur_B != nullptr) {
      sum_list[index].append(cur_A->data + cur_B->data);
      cur_B = cur_B->next;
    }
    cur_A = cur_A->next;
    cur_B = B.head;  // Reset B to start for each new row in A
    index++;
  }
  return *sum_list;
}
```

Subtraction follows the same logic but subtracts values instead of adding them.

---

## Handling Unequal Sizes
If matrices have different dimensions, one approach is to assume missing values are zero to conserve memory. This requires additional indexing within the `Node` object, which is beyond the scope of this course. You can find an example implementation in [this GitHub repo](https://github.com/ethanokamura/dsa/tree/main/linked-list/c/matrix).

---

## Multiplication
Matrix multiplication is more complex and involves helper functions: `transpose()` and `dotProduct()`.

### 1. Transpose
A matrix transpose flips its rows and columns (_where $A$ is the example matrix from earlier._):
$$
A^T = \left[ \begin{array}{ccc} 1&4&7 \\ 2&5&8 \\ 3&6&9 \end{array} \right]
$$



Pseudo code:
```
transpose(Matrix A):
  for i in A_row
    for j in A_col
      M[i].append(A[j][i])
  return M
```

### 2. Dot Product
The dot product is computed by multiplying corresponding elements and summing the results:
$$
[1, 2, 3] \cdot [4, 5, 6] = (1 \times 4) + (2 \times 5) + (3 \times 6) = 32
$$

Pseudo code:
```
vectorDot(LinkedList x, LinkedList y):
  sum = 0
  for item in x and y:
    sum += x.item.data * y.item.data
  return sum
```

### 3. Combining Everything
Matrix multiplication combines these operations:
```
for i in A:
  for j in B:
    prod = vectorDot(A[i], transpose(B[j]))
    M[i].append(prod)
```

Mathematically:
$$
M = A \times B = \left[ \begin{array}{cc} x_1 y_1 + x_2 y_3 & x_1 y_2 + x_2 y_4 \\ x_3 y_1 + x_4 y_3 & x_3 y_2 + x_4 y_4 \end{array} \right]
$$

---

## Conclusion
We have implemented matrix addition, subtraction, and multiplication using a linked list representation. This approach provides flexibility in handling sparse matrices, though indexing is more complex compared to arrays.

For a working example of a matrix ADT in C, check out this [GitHub repository](https://github.com/ethanokamura/dsa/tree/main/linked-list/c/matrix).

Next, we will explore a `BigInteger` class.

