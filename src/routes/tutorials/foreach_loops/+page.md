---
title: Foreach Loops 
publishedOn: 1717800000000
author: Matt Flogram
summary: Foreach Loops in Flogram
published: true
order: 12.3
---

<h2>Foreach Loops</h2>

<h3>Introduction</h3>

In this lesson, we'll explore the foreach loop in Flogram, a powerful tool for iterating over arrays and other iterable objects.
The foreach loop provides a concise and readable way to process each element in a collection, making your code more expressive and efficient.

<h3>Basic Syntax </h3>

The basic syntax of a foreach loop in Flogram is as follows:

```
foreach element in iterable: 
# code to be executed for each element
```

Here, element is a constant that represents the current element being processed in the loop, and iterable is the collection being iterated over, such as an array.


<h3>Example: Iterating Over an Array </h3>

Let's look at a simple example of using a foreach loop to iterate over an array of numbers:

```
fn main(): 
  values:= [10, 15, 23, 9, 60] 
  
  foreach value in values: 
    draw(value)
```

In this example, the foreach loop iterates over the values array, and for each iteration, the current element is assigned to the constant value. The draw function is then called with value, which outputs each number in the array.

Accessing the Index with 'at' Flogram's foreach loop also allows you to access the current index of the element being processed using the optional at keyword followed by a constant name. Here's an example:

```

fn main():
  fruits:= ["apple", "banana", "orange"]
  
  foreach fruit at index in fruits:
    draw("Fruit at index {index} is {fruit}")
```

In this case, the foreach loop assigns the current element to the constant fruit and the current index to the constant index. The output would be: Fruit at index 0 is apple Fruit at index 1 is banana Fruit at index 2 is orange

<h3>Mutating elements of the collection with ‘mut’</h3>

By default, the element constant in a foreach loop is immutable. However, Flogram allows you to mutate the element using the mut keyword. When you mutate the element, the corresponding entry in the original iterable is also mutated. This means the original collection must be mutable. Here's an example:

```

fn main(): 
  mut values:= [10, 15, 23, 9, 60] 

  foreach mut value in values: 
    value = value + 1 
    draw(values) # outputs [11, 16, 24, 10, 61]
```

In this example, the `mut` keyword is used to declare value as mutable. Inside the loop, each value is incremented by 1, which modifies the original values array.

** 📝 Note: ** The index constant cannot be mutated within the loop.

<h3>Best Practices </h3>

When using foreach loops, consider the following best practices:

Use descriptive names for the element constant to improve code readability.
Avoid mutating elements unless necessary, as it can make your code harder to reason about.

<h3>Conclusion </h3>

The foreach loop in Flogram provides a convenient and expressive way to iterate over arrays and other iterable objects. By understanding its syntax and capabilities, such as accessing the index with at and mutating elements with mut, you can write more concise and efficient code. As you continue to learn Flogram, look for opportunities to leverage foreach loops in your own projects to simplify your code and boost your productivity.
