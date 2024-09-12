---
title: Flogram/Arrays
publishedOn: 1690604006050
author: Didier Munezero
summary: Intro before starting
published: true
order: 9
---

## Arrays in Flogram

##### Arrays are a fundamental concept in programming that allows us to store multiple values of the same type together. In Flogram, arrays are also considered objects.

##### Declaring an Array

You can declare an array in Flogram by specifying its type and length. Here's an example of creating an array of integers (I32) with a length of 3:

```
array: Array{I32}(size = 3) = [10, 40, 60]
```

Note ‘size =’ is optional

The size of an array must be as long or longer than the length if the array it’s being initialized to.

Notice that the I32 within is used to declare the types that an Array is allowed to hold. Flogram uses for generics which will be covered more in depth later.

If defined using type inference then the array that is created is assumed to have a length the size of the array it’s initialized with. With the type inferred to have the type as inferred by the array.

`array := [10, 40, 60]`

Alternatively you can create an empty array of a certain length as such:

`mut empty_array := Array(size = 5)`

mut was included because an empty array isn’t very useful if you can’t mutate it.

Coming soon: you can choose the initial value all members of the array are initialized to.

##### Accessing Elements

You can access the value of an element in an array by using its index (position) within square brackets. Remember, array indices start from 0, so the first element is at index 0, the second at index 1, and so on:

`val := array[0]`

##### Setting an element in an array to a new value

This sets the 3rd element in the array to a value of ‘newVal’:

array[2] := newVal

##### Finding the Length

You can find the length of an array using the `size` function, which returns a `U64` (unsigned 64-bit integer):

length := array.size() # This will give you the length of the array

#### **Example Code**

Here's a complete code example that demonstrates the above concepts. You can run this code in the Flogram IDE.

```
fn main():

array: Array{I32}(length = 3) = [10, 40, 60]

val := array[2] # Accessing the third element

length := array.size() # Getting the length

print("Value at index 2: ", val)

print("Array: ", array)

print("Length of the array: ", length)
```

When run, this code will output:

**Value at index 2: 60**

**Array: [10, 40, 60]**

**Length of the array: 4**

##### Summary

Arrays provide a versatile way to manage collections of data in your programs. They are a vital part of many algorithms and data processing tasks.
