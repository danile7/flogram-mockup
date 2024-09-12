---
title: Arrays
publishedOn: 1717800000000
author: Matt Flogram
summary: Arrays and Vectors in Flogram
published: true
order: 9
---

<h2>Arrays and Vectors in Flogram</h2>

<h3>Arrays are a fundamental concept in programming that allows us to store multiple values of the same type together.</h3>

<h3>Declaring an Array</h3>

You can declare an array in Flogram using square brackets `[]`. Here are a few examples:

```
# Create an empty array
arr : [I32] = []
# Explicit typing
arr : [I32] = [1, 2, 3, 4, 5]
# Implicit typing
arr:= [1, 2, 3, 4, 5]
# Explicit capacity
arr : [I32] = [1, 2, 3, 4, 5](capacity = 6)

```

When declaring an array, you can specify the type explicitly using the syntax `[type]`, or let Flogram infer the type based on the values you provide. If you don't provide any initial values, you can create an empty array using `[]`. Empty arrays cannot have their type inferred and must use explicit assignment and set the type of the array.

You can also specify the capacity of an array using the `capacity` parameter. The capacity represents the maximum number of elements the array can hold without resizing. If not specified, the capacity defaults to the length of the array.

<h3>Accessing Elements</h3>

You can access elements in an array using their index (position) within square brackets. Array indices start from 0, so the first element is at index 0, the second at index 1, and so on:

```
val:= arr[0]  # Accessing the first element
```

<h3>Modifying Elements</h3>

To modify an element in an array, you can assign a new value to a specific index:

```
mut arr:= [1, 2, 3, 4, 5]

arr[2] = 10  # Modifying the third element
```

Remember to declare the array as mutable using the mut keyword if you intend to modify its elements.

<h3>Array Length</h3>

You can find the length of an array using the size function, which returns a U64 (unsigned 64-bit integer):

```
length:= size(arr)  # Getting the length of the array
```

<h2 class="title-filled">Example Code</h2>

Here's an updated code example that demonstrates the new array syntax:

```
fn main():
arr : [I32] = [10, 40, 60]

val:= arr[2]  # Accessing the third element
length:= size(arr)  # Getting the length

draw("Value at index 2: {val}”)
draw("Array: {arr}”)
draw("Length of the array: {length}”)
```

** When run, this code will output: **

```
Value at index 2: 60
Array: [10, 40, 60]
Length of the array: 3
```

<h3>Summary</h3>

Arrays provide a convenient way to store and manipulate collections of data in Flogram.
With the updated syntax, declaring and working with arrays is more concise and intuitive.
Remember to specify the type when needed, and use the capacity parameter to optimize memory usage for larger arrays.
