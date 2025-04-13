# Big Integer
Let's put our linked-list to use by creating a Big Integer object

---
## Overview:

Big Integer is a data structure that allows arithmetic operations with extremely large numbers. The built-in type `long` is typically 4-8 bytes (depending on your system). This means that we are limited to values that stay within that range. Specifically, the type `long` has a maximum value of `9,223,372,036,854,775,807` and a minimum value of `-9,223,372,036,854,775,808`.

Now at this point, you might ask yourself, who the f*ck needs numbers bigger than this? Well, probably not you, but we're going to learn how it works anyway.

With the BigInteger structure, we could (hypothetically) have a countably infinite value.

The most common way to go about building something like this is by using a linked list. Remember that a linked list is a fancy dynamically sized (array-like) container. We could have an ever-growing list of numbers where appending, prepending, and removal is super fast!

Here's a look at the basic structure:
```cpp
class BigInteger {
 public:
  // Main functions
  BigInteger add(const BigInteger& A, const BigInteger& B) const;
  BigInteger sub(const BigInteger& A, const BigInteger& B) const;
  BigInteger mult(const BigInteger& A, const BigInteger& B) const;
 private:
  int signum;   // +1 (positive), -1 (negative), 0 (zero)
  LinkedList digits;  // List of digits in this BigInteger
  // Private Helper Methods
  void negateList(LinkedList &S);
  void sumList(LinkedList &S, LinkedList A, LinkedList B, int sgn);
  int normalizeList(LinkedList &S);
  void shiftList(LinkedList &S, int p);
  void scalarMultList(LinkedList &S, ListElement m);
  void negate();
}
```

Now, this might sound familiar, but what basic arithmetic operations might we want to implement for our Big Integer class? You guessed it! Addition, subtraction, and multiplication. These functions are not as straightforward as you might think, but with the help of some other methods, it can easily be broken down into sub-tasks.

---

## Possible Use Cases:
BigInteger is useful in scenarios where standard data types are not sufficient. Here are some practical use cases:
1. **Cryptography**: Many encryption algorithms, such as RSA, rely on operations with extremely large prime numbers.
2. **Scientific Computing**: Simulations in physics, astronomy, and other fields often require high-precision arithmetic.
3. **Financial Calculations**: Some financial computations involve precise, arbitrarily large numbers beyond standard floating-point or integer limits.
4. **Factorial and Combinatorics**: Computing large factorials or combinatorial numbers (e.g., Pascal’s triangle) benefits from BigInteger.
5. **Blockchain and Digital Signatures**: Cryptographic hash functions and digital signatures depend on large integer operations.
6. **Arbitrary Precision Calculators**: Some software applications require precision beyond built-in floating-point limitations.

---

## Helper Functions:
I will not be going over the exact code of the helper functions. If that is something you would like to see, check out the GitHub repo for the full source code linked below.

That being said, I will cover the general ideas. `sumList()` simply combines the two lists into list `S`, but note that there is an argument for a variable called `sign`. This is because we can use `sumList()` for both addition and subtraction (addition being `1` and subtraction being `-1`).

Normalize list is a little more complex, but still not that hard to understand. We want to normalize our lists to ensure the structure is well balanced and does not destroy the integrity of our number.

For example, subtract bigints A and B:
```
A = (34)<->(23)<->(01)  // 342,301
B = (01)<->(30)<->(99)  // 13,099
```

With `sumList()` this would get you:
```
(34 - 01)<->(23 - 30)<->(01 - 99)
= (33)<->(-7)<->(-98)
```

Which, as we know, is completely wrong...

After normalizing the list, we should get:
```
(32)<->(92)<->(02)
```

---

## Main Functions:
For the main functions, the code provided here is merely to get an idea of how the code works. This does not test for all cases and outliers in the data. These serve as a good starting point for writing them on your own.

When performing arithmetic, there are a few cases we need to be careful of:
1. A > B
2. A < B
3. A == B
4. A or B == 0
5. A or B are negative

---

## Addition:
Adding two `BigInteger` objects is fairly straightforward. You just sum the elements in their list and clean up using `normalize()`.

```cpp
BigInteger add(BigInteger A, BigInteger B)
  // vector sum
  BigInteger res;
  // get the sum
  sumList(res.digits, A.digits, B.digits, 1);
  // normalize
  normalizeList(res.digits);
  return res;
```

When you are implementing it on your own, it might be smart to check for the following cases:
1. $A + B$
2. $A + (-B) \rightarrow$ subtraction
3. $(-A) + B \rightarrow$ subtraction
4. $(-A) + (-B) \rightarrow$ addition (with negative output)

If case 2 or 3 occurs, you will likely want to call `sub()` instead.

---

## Subtraction:
Subtraction is similar to addition, but this time the `sign` parameter being passed into `sumList()` is now negative. We also need to check and make sure that `A > B`. If it's not, we need to correctly handle the outcome of having a negative end result.

```cpp
BigInteger sub(BigInteger A, BigInteger B)
  // vector sum
  BigInteger res;
  // get the difference
  sumList(res.digits, A.digits, B.digits, -1);
  // check if the output should be negative
  // note that this requires overloading the < operator
  bool negative = A < B;
  // inverse each digit's sign
  if (negative) negateList(res.digits);
  // normalize
  normalizeList(res.digits);
  // end result should be negative
  if (negative) res.negate();
  return res;
```

Similarly to addition, there are a few scenarios to look out for. If case 2 or 3 occurs, you might want to instead call `add()`.

---

## Multiplication:
When implementing multiplication, I highly reccommend drawing diagrams or wrting out the examples by hand. I think getting a good visual here is super important.

When multiplying, you will want to achieve the following:

For each digit in B
1. Create a temporary list that stores the values in A
2. Shift the temporary list by a shift amount (starting at 0)
3. Multiply the temporary list by the current digit of B
4. Add the sum of the lists to the resulting product
5. Normalize the resulting product

Note that we are normalizing at each step. This is so that we can avoid stack overflows or overflows within each node object.

With that aside, let's look at the code:
```cpp
BigInteger mult(BigInteger A, BigInteger B):
  BigInteger res;
  int shift == 0;
  for each digit d in B:
    // shift A (add zeros at the end)
    temp_list = A
    shiftList(temp_list, shift++);
    // multiply A's digits by the current digit in B
    scalarMultList(temp_list, d);
    // add the multiplied number
    sumList(res, temp_list, B, 1);
    // normalize
    normalizeList(res);
  return res;
```

The function above is more pseudo-code-oriented so keep in might that this is not a solution. Again if you want to check out the source code it is linked above!

---

## Conclusion

To wrap this up, the point of a `BigInteger` is to allow us to compute large integer values without being limited by the storage capacity of built-in types. The main functions we want to implement are basic arithmetic operations such as addition, subtraction, and multiplication.

Once again, if you get stuck or want to see a working solution, check out my [source code](https://github.com/ethanokamura/dsa/tree/main/linked-list/cpp/bigint).

