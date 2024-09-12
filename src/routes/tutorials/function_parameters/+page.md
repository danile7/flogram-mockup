---
title: Function parameters
publishedOn: 1717800000000
author: Matt Flogram
summary: Function parameters in Flogram
published: true
order: 11
---

<h2>Lesson: Function Parameters in Flogram</h2>

<h3>Introduction</h3>

Welcome to another exciting lesson in Flogram! Today, we'll explore function parameters, which enable functions to take input constants and variables and operate on them. Understanding function parameters is key to creating flexible and reusable code.

<h3>What are Function Parameters?</h3>

In Flogram, a function parameter is a variable used inside a function to represent the value passed into the function when it's called. Parameters allow you to define functions that can work with different inputs, making them more flexible.

<h3>Declaring Function Parameters</h3>

Function parameters are declared by specifying the variable name (lowercase) followed by the type of the variable (uppercase). Here's the basic syntax:

```
fn functionName(parameterName: TYPE) -> (returnVariable: TYPE):
```

<h3>Passing Parameters by Value</h3>

In Flogram, function parameters are passed by value, also known as pass by copy. 
This means that a copy of the value is passed into the function, and changes to the parameter within the function do not affect the original value outside the function. 
Note the majority of the time we optimize this for you so no copy is actually needed.

<h3>Examples of Functions with Parameters</h3>

**Identity Function**: A simple function that takes an integer value and returns the same value:

```
fn identity(a: I32) -> (b: I32):
  return a
```

**Sum Function**: A function that takes two integers and returns their sum:
```
fn sum(a: I32, b: I32) -> (c: I32):
  return a + b
```

<h3>Calling Functions with Parameters</h3>

To call a function and pass values to its parameters, you provide the values in the same order as the parameters were declared. Here's an example of calling the `sum` function:

```
fn main():
  total: I32 = sum(5, 3)
  draw("The total is: {total}")
```

<h3>Conclusion</h3>

Function parameters are a powerful feature in Flogram that allows functions to operate on different inputs. 
By understanding how to declare and use function parameters, you can write code that is more reusable and adaptable to various needs. 
Remember that in Flogram, parameters are passed by value, meaning that they are copied into the function and do not affect the original values. 
Happy coding, and see you in the next lesson!