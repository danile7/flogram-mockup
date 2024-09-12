---
title: Functions with Mutable Parameters
publishedOn: 1717800000000
author: Matt Flogram
summary: Functions with Mutable Parameters in Flogram
published: true
order: 12
---

<h2>Functions with Mutable Parameters in Flogram</h2>

<h3>Introduction</h3>

In our last lesson, we looked at function parameters in Flogram and how they allow functions to work with various inputs. 
In this lesson, we're diving deeper to explore mutable parameters, which allow functions to modify the values passed into them. 
This powerful feature allows you to change a variable within a function which can improve performance by avoiding unnecessary copying.

<h3>Mutable Parameters</h3>

In Flogram, you can declare a function parameter as mutable using the mut keyword. 
This means that the function has the ability to change the value of the parameter, and this change will be reflected outside the function.

<h3>Syntax for Mutable Parameters</h3>

To declare a mutable parameter, use the `mut` keyword in the function signature:

```
fn modifyValue(mut a: I32) -> (result: I32):
  a = a + 1
  return a
```

When calling a function with a mutable parameter, you must also use the mut keyword to explicitly acknowledge that the value might be changed:

```
mut a:= 10
modifyValue(mut a)  # This code fails to compile without the mut keyword here
draw(a)  # outputs 11 as a was changed
```

<h3>Productivity tip!</h3>

If you have a bug in your code and something changed for an object in an unexpected way, you don’t have to worry about looking through function calls that don’t pass the object in using ‘mut’. 
In general this is the beauty of constants by default, it significantly reduces the amount of debugging you need to do.

<h3>Working with Mutable and Immutable Parameters</h3>

You can use mutable, and immutable parameters together in your code. Here's an example that illustrates these concepts:

```
fn increment(mut a: I32):
  a = a + 1

fn doubleValue(b: I32) -> (b: I32):
  return b * 2

fn processValue(mut c: I32):
  c = c * 3

fn main():
  mut a:= 5
  b:= 4
  
  increment(mut a)
  draw(a)  # outputs 6
  
  c:= doubleValue(b)
  draw(b) # outputs 4, b is unchanged
  draw(c) # outputs 8
  
  processValue(mut a)
  draw(a)  # outputs 18
```

<h3>Restrictions</h3>

- Constants cannot be passed as mutable parameters.
- Variables can be passed into functions that accept constants.

<h3>Conclusion</h3>

Mutable parameters in Flogram offer a new level of control and flexibility in how functions interact with their input. By understanding the distinction between mutable, immutable, and copy parameters, you can create more nuanced and expressive functions. Remember to use the mut keyword with care, we will usually optimize your code for you if you pass in a constant and return one. Happy coding, and see you in the next lesson!