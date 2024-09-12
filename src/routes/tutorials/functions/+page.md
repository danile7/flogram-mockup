---
title: Functions
publishedOn: 1717800000000
author: Matt Flogram
summary: Introduction to functions in Flogram
published: true
order: 3
---

<h3>Introduction to Functions in Flogram</h3>

It’s finally time to write some actual code using Flogram! In this lesson, we'll be introducing the concept of functions in Flogram and how they are used to organize and execute code.

Note that this tutorial introduces concepts in the order that you should prefer them for the sake of maximizing productivity and performance.

<h3>What is a function?</h3>

In programming, a function is a block of code that can be executed by calling it by its name. Functions are useful for organizing and reusing code, as well as for breaking up large programs into smaller, more manageable pieces.

<h3>Declaring a function in Flogram</h3>

In Flogram, functions are declared using the fn keyword, followed by the function's name and a set of parentheses. For example, the code below declares a function named main:

    **fn main():**

📝 **Note:** When declaring functions, function names are not allowed to start with uppercase letters. Lowercase letters and symbols are allowed.

<h3>The main function</h3>

In Flogram, the main function is the starting point of a program. This is where execution of the program begins after which point the program executes one line at a time. The main function is declared in the same way as any other function, but it must be set as the main file by right clicking on it and selecting "Set as main file" in the Flogram IDE (Coming soon).

<h3>The body of a function</h3>

The code that makes up the function's behavior is placed within the function's body. The body of a function is denoted by indenting the code following the function's declaration. The body of the main function in Flogram might look like this:

```
fn main():
	# The following line calls a different function defined elsewhere
	# in the program that prints text to the screen
	draw("I am excited to learn Flogram")
```

In the above example the main function calls the draw function which draws the string “I am excited to learn Flogram” to the screen. You may run this code by clicking on the green ‘Run’ on the right.

<h3>What are Blocks?</h3>

In Flogram, a "block" is a chunk of code that belongs together. You start a block with a colon `:` and then write the following code that belongs to that function under this and indented. Any code that has the same level of indentation belongs to the same block of code. A block ends when the indentation level is decreased. Blocks are used in functions, control structures, and other parts of the Flogram language to define scope and encapsulate code.

For example:

```
fn main():  # The colon starts a new block
	draw("Hello!")  # This line is indented, so it belongs to the main function
```

<h3>Conclusion</h3>

In this lesson, we've covered the basics of functions in Flogram and how they are used to organize and execute code. We've also introduced the main function and how it is used to begin execution of a Flogram program.
